import { cookies } from "next/headers";
import { prisma } from "@/server/db/client";

/**
 * Validates the HttpOnly cookie and optionally enforces Anti-CSRF checks.
 * @param req The incoming NextRequest
 * @param requireCsrf Boolean flag to enforce CSRF validation (use true for POST/PUT/DELETE)
 */
export async function validateSecureSession(req: Request, requireCsrf: boolean = false) {
  const cookieStore = await cookies();
  const isProd = process.env.NODE_ENV === "production";
  const cookieName = isProd ? "__Host-session" : "wbes_session";
  const sessionToken = cookieStore.get(cookieName)?.value;

  if (!sessionToken) {
    throw new Error("Unauthorized - No session cookie found");
  }

  // 1. Validate the Session in the Database
  const session = await prisma.session.findUnique({
    where: { sessionToken },
    include: { user: true }
  });

  if (!session || session.expiresAt < new Date()) {
    throw new Error("Unauthorized - Session expired or invalid");
  }

  // 2. VAPT: Anti-CSRF Validation (For POST, PUT, DELETE)
  if (requireCsrf) {
    const csrfHeader = req.headers.get("x-csrf-token");
    
    if (!csrfHeader) {
      throw new Error("Forbidden - Missing CSRF Token");
    }
    
    if (csrfHeader !== session.csrfToken) {
      throw new Error("Forbidden - CSRF Token Mismatch");
    }
  }

  // Return the validated user object so API routes can use it safely
  return session.user;
}