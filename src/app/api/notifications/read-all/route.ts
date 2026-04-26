import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/server/db/client";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const isProd = process.env.NODE_ENV === "production";
    const sessionToken = cookieStore.get(isProd ? "__Host-session" : "wbes_session")?.value;
    if (!sessionToken) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const session = await prisma.session.findUnique({
      where: { sessionToken },
      select: { userId: true, expiresAt: true },
    });
    if (!session || session.expiresAt < new Date())
      return NextResponse.json({ error: "Session expired" }, { status: 401 });

    await prisma.notification.updateMany({
      where: { userId: session.userId, isRead: false },
      data: { isRead: true },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[NOTIFICATIONS READ-ALL]", err);
    return NextResponse.json({ error: "Failed to mark notifications as read" }, { status: 500 });
  }
}
