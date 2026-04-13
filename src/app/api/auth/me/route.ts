import { NextResponse } from "next/server";
import { prisma } from "@/server/db/client";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {

    
    
    const cookieStore = await cookies();
    const isProd = process.env.NODE_ENV === "production";
    const sessionToken = cookieStore.get(isProd ? "__Host-session" : "wbes_session")?.value;

    if (!sessionToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // VAPT: Validate DB Session
    const session = await prisma.session.findUnique({
      where: { sessionToken },
      include: { user: true }
    });

    if (!session || session.expiresAt < new Date()) {
      return NextResponse.json({ error: "Session expired or invalid" }, { status: 401 });
    }

    return NextResponse.json({ 
      success: true, 
      user: {
        id: session.user.id,
        role: session.user.role,
        name: session.user.name,
        organizationId: session.user.organizationId
      }
    });
  } catch (error) {
    console.error("AUTH_ME_ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}