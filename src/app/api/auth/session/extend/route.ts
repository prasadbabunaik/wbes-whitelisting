import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/server/db/client";

// Called by the frontend whenever user activity is detected.
// Extends the DB session TTL so the server-side session stays alive
// as long as the user is actively using the application.
export async function POST() {
  try {
    const cookieStore = await cookies();
    const isProd = process.env.NODE_ENV === "production";
    const cookieName = isProd ? "__Host-session" : "wbes_session";
    const sessionToken = cookieStore.get(cookieName)?.value;

    if (!sessionToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const session = await prisma.session.findUnique({
      where: { sessionToken },
      select: { id: true, expiresAt: true },
    });

    if (!session || session.expiresAt < new Date()) {
      return NextResponse.json({ error: "Session expired or invalid" }, { status: 401 });
    }

    const newExpiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000); // extend 8 h from now

    await prisma.session.update({
      where: { sessionToken },
      data: { expiresAt: newExpiresAt },
    });

    return NextResponse.json({ success: true, expiresAt: newExpiresAt.toISOString() });
  } catch (error) {
    console.error("[SESSION-EXTEND]", error);
    return NextResponse.json({ error: "Failed to extend session" }, { status: 500 });
  }
}
