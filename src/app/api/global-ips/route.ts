import { NextResponse } from "next/server";
import { prisma } from "@/server/db/client";
import { validateSecureSession } from "src/lib/auth";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {

    // VAPT: Validate HttpOnly Cookie (false = no CSRF check)
    const user = await validateSecureSession(req, false);
    // Fetch all completed requests chronologically
    const completedRequests = await prisma.ipRequest.findMany({
      where: { status: "COMPLETED" },
      include: { ips: true },
      orderBy: { createdAt: 'asc' }
    });

    const ipMap = new Map<string, Set<string>>();

    completedRequests.forEach(req => {
      // Use username or entityName as the identifier
      const identifier = req.username || req.entityName;
      if (!identifier) return;

      // Add newly granted IPs
      if (req.ips) {
        req.ips.forEach(ip => {
          if (!ipMap.has(ip.ipAddress)) ipMap.set(ip.ipAddress, new Set());
          ipMap.get(ip.ipAddress)!.add(identifier);
        });
      }

      // Remove revoked IPs
      if (req.ipToRemove) {
        const removed = req.ipToRemove.split(',').map(i => i.trim()).filter(Boolean);
        removed.forEach(ip => {
          if (ipMap.has(ip)) {
            ipMap.get(ip)!.delete(identifier);
            if (ipMap.get(ip)!.size === 0) ipMap.delete(ip);
          }
        });
      }
    });

    // Format for the frontend
    const result = Array.from(ipMap.entries()).map(([ip, users]) => ({
      ip,
      users: Array.from(users)
    }));

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Global IP Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch global IPs" }, { status: 500 });
  }
}