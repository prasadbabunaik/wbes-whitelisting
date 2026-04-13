import { prisma } from "../db/client";
import { Role, WorkflowStage, WorkflowAction, RequestStatus } from "@prisma/client";

const ORG_REGION_MAP: Record<string, string> = {
  "org-id-srldc": "SRLDC",
  "org-id-nrldc": "NRLDC",
  "org-id-wrldc": "WRLDC",
  "org-id-erldc": "ERLDC",
  "org-id-nerldc": "NERLDC",
  "org-id-nldc": "NLDC",
};

export const ipRequestRepository = {
  
async create(data: any) {
    let initiatorRegion = data.initiatorRegion;

    // 1. Resolve Region if missing
    if (!initiatorRegion && data.userId) {
      const user = await prisma.user.findUnique({
        where: { id: data.userId },
        select: { name: true, organizationId: true },
      });

      const name = user?.name?.toUpperCase() || "";
      const orgId = user?.organizationId || "";

      if (ORG_REGION_MAP[orgId]) initiatorRegion = ORG_REGION_MAP[orgId];
      else if (name.includes("SRLDC")) initiatorRegion = "SRLDC";
      else if (name.includes("NRLDC")) initiatorRegion = "NRLDC";
      else if (name.includes("WRLDC")) initiatorRegion = "WRLDC";
      else if (name.includes("ERLDC")) initiatorRegion = "ERLDC";
      else if (name.includes("NERLDC")) initiatorRegion = "NERLDC";
      else if (data.submittedByRole === "NLDC") initiatorRegion = "NLDC";
      else if (data.submittedByRole === "RLDC") initiatorRegion = "RLDC";
    }

    // ✅ FIX: Normalize the region string to ensure it matches the email map keys
    if (initiatorRegion) {
        initiatorRegion = initiatorRegion.toUpperCase().trim();
        // Handle common shorthand variants
        if (initiatorRegion === "NR") initiatorRegion = "NRLDC";
        if (initiatorRegion === "SR") initiatorRegion = "SRLDC";
        if (initiatorRegion === "WR") initiatorRegion = "WRLDC";
        if (initiatorRegion === "ER") initiatorRegion = "ERLDC";
        if (initiatorRegion === "NER") initiatorRegion = "NERLDC";
    }

    return prisma.ipRequest.create({
      data: {
        ...data,
        submittedByRole: data.submittedByRole,
        initiatorRegion: initiatorRegion || "UNKNOWN",
        isEmergency: data.isEmergency === true,
        duration: data.duration || null,
        isApiAccess: data.isApiAccess === true,
      },
    });
  },

  async countActiveIps(userId: string) {
    return prisma.ipWhitelist.count({
      where: { userId, active: true }
    });
  },

  async findAll(role?: string, orgId?: string) {
    let whereClause: any = {};

    // 1. Initial Pre-Filter based on mapped entities
    if (role === "RLDC" && orgId) {
      const allowedEntities = await prisma.entity.findMany({
        where: {
          controllerMappings: {
            some: { controller: { organizationId: orgId } }
          }
        },
        select: { name: true }
      });
      
      if (allowedEntities.length > 0) {
        whereClause = { entityName: { in: allowedEntities.map(e => e.name) } };
      }
    }

    const requests = await prisma.ipRequest.findMany({
      where: whereClause,
      include: {
        ips: true,
        user: true, 
        logs: {
          include: { approvedBy: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // 2. Fetch Entities to resolve regions
    const entities = await prisma.entity.findMany({
      select: { name: true, region: true }
    });
    const entityRegionMap = new Map(entities.map(e => [e.name, e.region]));

    // 3. Map and enrich all requests
    let enrichedRequests = await Promise.all(requests.map(async (req) => {
      const completedReqs = await prisma.ipRequest.findMany({
        where: { username: req.username, status: "COMPLETED" },
        include: { ips: true }
      });

      const activeIps = new Set<string>();
      completedReqs.forEach(prev => {
        prev.ips.forEach(ip => activeIps.add(ip.ipAddress));
        if (prev.ipToRemove) {
          prev.ipToRemove.split(',').forEach(ip => activeIps.delete(ip.trim()));
        }
      });

      const actualEntityRegion = entityRegionMap.get(req.entityName);
      let finalInitiatorRegion = actualEntityRegion || (req as any).initiatorRegion || req.submittedByRole || "UNKNOWN"; 

      return {
        ...req,
        initiatorRegion: finalInitiatorRegion, 
        currentActiveIpsCount: activeIps.size
      };
    }));

    // 🛡️ 4. ABSOLUTE BACKEND FIREWALL 🛡️
    // Guarantee that an RLDC user ONLY sees requests matching their specific region!
    if (role === "RLDC" && orgId) {
      const userRegion = ORG_REGION_MAP[orgId];
      if (userRegion) {
        // Strip out any request that does not perfectly match their region
        enrichedRequests = enrichedRequests.filter(req => req.initiatorRegion === userRegion);
      }
    }

    return enrichedRequests;
  },

  async findByRole(role: Role) {
    return prisma.ipRequest.findMany({
      where: { currentRole: role },
      include: { user: true, ips: true, logs: true }
    });
  },

  async addLog(data: {
    requestId: string;
    stage: WorkflowStage;
    action?: WorkflowAction;
    role?: Role;
    approvedById?: string;
    remarks?: string;
  }) {
    return prisma.workflowLog.create({ data });
  },

  async updateWorkflowStatus(
    requestId: string,
    data: {
      status: RequestStatus;
      currentRole: Role;
      remarks?: string;
    },
    logData: {
      stage: WorkflowStage;
      action: WorkflowAction;
      approvedById: string;
      remarks: string;
    }
  ) {
    return prisma.$transaction([
      prisma.ipRequest.update({
        where: { id: requestId },
        data: {
          status: data.status,
          currentRole: data.currentRole,
          remarks: data.remarks
        }
      }),
      prisma.workflowLog.create({
        data: {
          requestId,
          stage: logData.stage,
          action: logData.action,
          remarks: logData.remarks,
          approvedById: logData.approvedById,
          role: data.currentRole,
        },
      }),
    ]);
  }
};