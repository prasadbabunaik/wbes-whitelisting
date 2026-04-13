import { NextResponse } from "next/server";
import { prisma } from "@/server/db/client"; 
import bcrypt from "bcrypt";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, captchaToken } = body;

    // 1. Verify CAPTCHA
    if (!captchaToken) {
      return NextResponse.json({ error: "CAPTCHA validation is required" }, { status: 400 });
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) return NextResponse.json({ error: "Server config error." }, { status: 500 });

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`;
    const captchaRes = await fetch(verifyUrl, { method: "POST" });
    const captchaData = await captchaRes.json();

    if (!captchaData.success) {
      return NextResponse.json({ error: "CAPTCHA verification failed." }, { status: 401 });
    }

    // 2. Validate User
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });

    // 3. VAPT: Generate Secure Opaque Tokens (NO JWT)
    const sessionToken = crypto.randomBytes(32).toString('hex');
    const csrfToken = crypto.randomBytes(32).toString('hex');

    // 4. VAPT: DB-Backed Session
    await prisma.session.create({
      data: {
        userId: user.id,
        sessionToken,
        csrfToken,
        expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours
        ipAddress: req.headers.get("x-forwarded-for") || "unknown",
        userAgent: req.headers.get("user-agent") || "unknown",
      }
    });

    // 5. VAPT: HttpOnly Cookie Configuration
    const isProd = process.env.NODE_ENV === "production";
    const cookieName = isProd ? "__Host-session" : "wbes_session"; // __Host- strictly requires HTTPS and Path=/

    const response = NextResponse.json({
      success: true,
      csrfToken: csrfToken, // Sent to frontend to be attached to state-changing requests
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name, 
        organizationId: user.organizationId 
      }
    });

    response.cookies.set(cookieName, sessionToken, {
      httpOnly: true, // JS cannot read it (Stops XSS)
      secure: isProd, // HTTPS only in production
      sameSite: "lax", // Protects against standard CSRF
      path: "/",
      maxAge: 8 * 60 * 60, // 8 hours
    });

    return response;

  } catch (error: any) {
    console.error("LOGIN_ERROR:", error.message);
    return NextResponse.json({ error: "Login process failed." }, { status: 500 });
  }
}