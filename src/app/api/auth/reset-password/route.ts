import { NextResponse } from "next/server";
import { prisma } from "@/server/db/client";
import bcrypt from "bcryptjs";
import { validateSecureSession } from "src/lib/auth";

export async function POST(req: Request) {
  try {

    // VAPT: Require Cookie AND CSRF Token Match! (true = require CSRF)
    const user = await validateSecureSession(req, true);
    const body = await req.json();
    const { userId, password } = body;

    if (!userId || !password) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    // 1. Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Update the user in database
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ success: true, message: "Password updated successfully" });
  } catch (error: any) {
    console.error("RESET_PWD_ERROR:", error.message);
    return NextResponse.json({ error: "Failed to reset password" }, { status: 500 });
  }
}