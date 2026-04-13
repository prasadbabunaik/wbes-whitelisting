import { NextResponse } from "next/server";
import { prisma } from "@/server/db/client";
import { NextApiRequest } from "next";
import { validateSecureSession } from "src/lib/auth";

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Ensures data is never cached and always live

export async function GET(req: Request) {
  try {

    // 🛡️ VAPT: Validate HttpOnly Cookie (false = no CSRF check)
    const user = await validateSecureSession(req, false);
    // 1. Fetch clean users from the actual database to fix bad historical entity names
    const cleanUsers = await prisma.beneficiaryUser.findMany({
      include: { entity: true }
    });

    // Create a fast lookup map: username -> real entity name
    const realEntityMap = new Map<string, string>();
    cleanUsers.forEach(user => {
      if (user.username && user.entity?.name) {
        // Trim and lowercase to ensure the best possible match
        realEntityMap.set(user.username.trim().toLowerCase(), user.entity.name.trim());
      }
    });

    // 2. Fetch all completed requests to replay the IP timeline
    const completedRequests = await prisma.ipRequest.findMany({
      where: { status: "COMPLETED" },
      include: { ips: true },
      orderBy: { createdAt: 'asc' } // Replay oldest to newest
    });

    // Map of IP -> Map of Username -> { entityName, username }
    const ipMap = new Map<string, Map<string, { entityName: string, username: string }>>();

    completedRequests.forEach(req => {
      const username = (req.username || "").trim();
      if (!username) return;

      // ✅ FIXED: Attempt to get the true entity name from BeneficiaryUser table. 
      // If not found, gracefully fallback to the ticket's original entityName instead of "Unknown"
      const ticketEntityName = (req.entityName || "").trim();
      const cleanEntityName = realEntityMap.get(username.toLowerCase()) || ticketEntityName || "Unknown";

      // Add newly granted IPs
      if (req.ips) {
        req.ips.forEach(ipObj => {
          const ip = (ipObj.ipAddress || "").trim();
          if (!ip) return;

          if (!ipMap.has(ip)) {
            ipMap.set(ip, new Map());
          }
          
          // Using .set() ensures that if a newer ticket has a cleaner entity name, it overwrites the old one!
          ipMap.get(ip)!.set(username, { entityName: cleanEntityName, username });
        });
      }

      // Remove revoked IPs
      if (req.ipToRemove) {
        const removed = req.ipToRemove.split(',').map(i => i.trim()).filter(Boolean);
        removed.forEach(ip => {
          if (ipMap.has(ip)) {
            ipMap.get(ip)!.delete(username);
            // Clean up empty IPs
            if (ipMap.get(ip)!.size === 0) ipMap.delete(ip);
          }
        });
      }
    });

    // 3. Filter the map to ONLY include IPs that have MORE THAN ONE user
    const conflicts = Array.from(ipMap.entries())
      .filter(([ip, userMap]) => userMap.size > 1)
      .map(([ip, userMap]) => ({
        ip,
        userCount: userMap.size,
        users: Array.from(userMap.values())
      }));

    // Sort by most shared IPs first
    conflicts.sort((a, b) => b.userCount - a.userCount);

    return NextResponse.json({ success: true, data: conflicts });
  } catch (error) {
    console.error("Shared IPs Report Error:", error);
    return NextResponse.json({ error: "Failed to generate report" }, { status: 500 });
  }
}