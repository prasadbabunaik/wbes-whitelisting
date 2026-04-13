import { NextResponse } from "next/server";
import { prisma } from "@/server/db/client";

export const dynamic = 'force-dynamic';
export const revalidate = 0; // ✅ Added to prevent Next.js from caching old logs

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role") || "";
    const orgId = searchParams.get("orgId") || "";

    let whereClause: any = {};

    // 🛡️ DYNAMIC DATABASE-DRIVEN FIREWALL
    if (role === "RLDC" && orgId) {
      // 1. Identify User Region from Organization
      const userOrg = await prisma.organization.findUnique({
          where: { id: orgId },
          select: { name: true }
      });
      
      const orgName = userOrg?.name?.toUpperCase() || "";
      let userRegion = "UNKNOWN";
      if (orgName.includes("SRLDC")) userRegion = "SRLDC";
      else if (orgName.includes("NRLDC")) userRegion = "NRLDC";
      else if (orgName.includes("WRLDC")) userRegion = "WRLDC";
      else if (orgName.includes("ERLDC")) userRegion = "ERLDC";
      else if (orgName.includes("NERLDC")) userRegion = "NERLDC";

      // 2. Fetch all Entity Names that belong to this region from the Entity table
      const allowedEntities = await prisma.entity.findMany({
        where: { region: userRegion }, // Dynamically fetches UNCHAHAR, DNHHDD, etc.
        select: { name: true }
      });
      
      const allowedEntityNames = allowedEntities.map((e: any) => e.name);

      // 3. Apply strict filter
      whereClause = {
        OR: [
          { entityName: { in: allowedEntityNames } },
          { initiatorRegion: userRegion }
        ]
      };
    }

    const allRequests = await prisma.ipRequest.findMany({
      where: whereClause, 
      orderBy: { createdAt: 'asc' },
      include: {
        ips: true,
        logs: { orderBy: { createdAt: 'desc' } }
      }
    });

    const userIpState: Record<string, string[]> = {};

    const enrichedRequests = allRequests.map(req => {
      const username = req.username || "unknown";
      if (!userIpState[username]) userIpState[username] = [];

      const beforeIps = [...userIpState[username]];
      let afterIps = [...beforeIps];
      
      if (req.ipToRemove) {
        const removedIps = req.ipToRemove.split(",").map((ip: string) => ip.trim()).filter(Boolean);
        removedIps.forEach((removeIp: string) => { afterIps = afterIps.filter(ip => ip !== removeIp); });
      }
      
      if (req.ips && Array.isArray(req.ips)) {
        req.ips.forEach((ipObj: any) => {
          if (!afterIps.includes(ipObj.ipAddress)) afterIps.push(ipObj.ipAddress);
        });
      }

      if (req.status === "COMPLETED") userIpState[username] = [...afterIps];

      return { ...req, beforeIps, afterIps };
    });

    enrichedRequests.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({ success: true, data: enrichedRequests });
  } catch (error) {
    console.error("Error fetching audit logs:", error);
    return NextResponse.json({ error: "Failed to fetch audit logs" }, { status: 500 });
  }
}