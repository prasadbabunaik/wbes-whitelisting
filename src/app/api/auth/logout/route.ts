import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/server/db/client";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const isProd = process.env.NODE_ENV === "production";
    const cookieName = isProd ? "__Host-session" : "wbes_session";
    
    const sessionToken = cookieStore.get(cookieName)?.value;

    // If a session exists, delete it from the database to instantly revoke access
    if (sessionToken) {
      await prisma.session.deleteMany({
        where: { sessionToken }
      });
      
      // Destroy the cookie in the user's browser
      cookieStore.delete(cookieName);
    }

    return NextResponse.json({ success: true, message: "Logged out securely" });
  } catch (error) {
    console.error("LOGOUT_ERROR:", error);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}