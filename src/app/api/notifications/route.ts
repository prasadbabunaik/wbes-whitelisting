import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/server/db/client";

export const dynamic = "force-dynamic";

export async function GET() {
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

    const notifications = await prisma.notification.findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: "desc" },
      take: 30,
    });

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    return NextResponse.json({ success: true, data: notifications, unreadCount });
  } catch (err) {
    console.error("[NOTIFICATIONS GET]", err);
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 });
  }
}
