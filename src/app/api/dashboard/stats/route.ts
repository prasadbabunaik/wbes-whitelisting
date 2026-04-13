import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db/client";
import { Prisma } from "@prisma/client";

const ORG_REGION_MAP: Record<string, string> = {
  "org-id-srldc": "SRLDC", "org-id-nrldc": "NRLDC", "org-id-wrldc": "WRLDC",
  "org-id-erldc": "ERLDC", "org-id-nerldc": "NERLDC", "org-id-nldc": "NLDC",
};

function normalize(value: string | null | undefined, fallback = "") {
  return (value || fallback).trim().toUpperCase();
}

export async function GET(req: NextRequest) {
  try {
    const role = normalize(req.nextUrl.searchParams.get("role"), "NLDC");
    const orgId = req.nextUrl.searchParams.get("orgId") || "";

    let requestWhere: Prisma.IpRequestWhereInput = {};
    let logWhere: Prisma.WorkflowLogWhereInput = {};
    let userRegion = "UNKNOWN";

    if (role === "RLDC" && orgId) {
      const userOrg = await prisma.organization.findUnique({
        where: { id: orgId },
        select: { name: true }
      });
      
      const orgName = userOrg?.name?.toUpperCase() || "";
      
      if (orgName.includes("SRLDC")) userRegion = "SRLDC";
      else if (orgName.includes("NRLDC")) userRegion = "NRLDC";
      else if (orgName.includes("WRLDC")) userRegion = "WRLDC";
      else if (orgName.includes("ERLDC")) userRegion = "ERLDC";
      else if (orgName.includes("NERLDC")) userRegion = "NERLDC";

      const allowedEntities = await prisma.entity.findMany({
        where: { region: userRegion },
        select: { name: true }
      });
      
      const allowedEntityNames = allowedEntities.map((e: any) => e.name);

      requestWhere = {
        OR: [
          { entityName: { in: allowedEntityNames } },
          { initiatorRegion: userRegion }
        ]
      };

      logWhere = { request: requestWhere };
    }

    const allEntities = await prisma.entity.findMany({ select: { name: true, region: true } });
    const entityMap = new Map(allEntities.map(e => [(e.name || "").toUpperCase(), (e.region || "").toUpperCase()]));

    // ✅ ADDED: Two new queries to explicitly split emergency requests by category
    const [
      totalRequests, pendingRequests, completedRequests, emergencyRequests, 
      newUsersCount, existingUsersCount, rejectedRequests, slaBreachCount, 
      workflowRaw, regionRaw, 
      emergencyNewCount, emergencyExistingCount // 👈 New Variables
    ] = await Promise.all([
        prisma.ipRequest.count({ where: requestWhere }),
        prisma.ipRequest.count({ where: { ...requestWhere, status: { notIn: ["COMPLETED", "REJECTED"] } } }),
        prisma.ipRequest.count({ where: { ...requestWhere, status: "COMPLETED" } }),
        prisma.ipRequest.count({ where: { ...requestWhere, isEmergency: true } }),
        prisma.ipRequest.count({ where: { ...requestWhere, category: "NEW_USER" } }),
        prisma.ipRequest.count({ where: { ...requestWhere, category: "EXISTING_USER" } }),
        prisma.ipRequest.count({ where: { ...requestWhere, status: "REJECTED" } }),
        prisma.ipRequest.count({
          where: {
            ...requestWhere,
            status: { notIn: ["COMPLETED", "REJECTED"] },
            createdAt: { lt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
          },
        }),
        prisma.ipRequest.groupBy({
          by: ["currentRole"],
          where: { ...requestWhere, status: { notIn: ["COMPLETED", "REJECTED"] } },
          _count: { id: true },
        }),
        prisma.ipRequest.groupBy({
          by: ["initiatorRegion", "entityName"], 
          where: requestWhere,
          _count: { id: true },
        }),
        // 👈 NEW: Specific Emergency Queries
        prisma.ipRequest.count({ where: { ...requestWhere, isEmergency: true, category: "NEW_USER" } }),
        prisma.ipRequest.count({ where: { ...requestWhere, isEmergency: true, category: "EXISTING_USER" } }),
      ]);

    const workflow: Record<string, number> = { rldc: 0, nldc: 0, ciso: 0, soc: 0, it: 0 };
    workflowRaw.forEach((w) => {
      const stage = w.currentRole?.toLowerCase() || "";
      if (workflow[stage] !== undefined) workflow[stage] = w._count.id;
    });

    const regions: Record<string, number> = { SRLDC: 0, NRLDC: 0, WRLDC: 0, ERLDC: 0, NERLDC: 0, NLDC: 0 };
    
    regionRaw.forEach((r) => {
      const eName = (r.entityName || "").toUpperCase();
      let reg = entityMap.get(eName) || (r.initiatorRegion || "").toUpperCase();

      if (reg === "RLDC" && userRegion !== "UNKNOWN") reg = userRegion; 
      if (regions[reg] !== undefined) regions[reg] += r._count.id;
    });

    let finalRegions: Record<string, number> = {};
    if (role === "RLDC" && userRegion !== "UNKNOWN") {
      finalRegions[userRegion] = regions[userRegion] || 0; 
    } else {
      finalRegions = regions; 
    }

    const [recentRequests, recentLogs] = await Promise.all([
        prisma.ipRequest.findMany({ where: requestWhere, orderBy: { createdAt: "desc" }, take: 6 }),
        prisma.workflowLog.findMany({ 
            where: logWhere, 
            orderBy: { createdAt: "desc" }, 
            take: 8, 
            include: { request: { select: { ticketNo: true, entityName: true } } } 
        })
    ]);

    return NextResponse.json({
      success: true,
      data: {
        widgets: { total: totalRequests, pending: pendingRequests, completed: completedRequests, emergency: emergencyRequests },
        // ✅ ADDED: Passing the split emergency counts to the frontend
        breakdown: { 
          newUsers: newUsersCount, 
          existingUsers: existingUsersCount, 
          rejected: rejectedRequests,
          emergencyNew: emergencyNewCount,
          emergencyExisting: emergencyExistingCount
        },
        workflow,        
        compliance: { excessIps: 0, inactiveIps: 0, clarifications: 0, slaBreach: slaBreachCount },
        regions: finalRegions,      
        recentRequests,
        recentLogs,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: "Failed to load stats" }, { status: 500 });
  }
}