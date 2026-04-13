import { prisma } from "../db/client";
import { ipRequestRepository } from "../repositories/ipRequestRepository";
import {
  RequestStatus,
  Role,
  WorkflowAction,
  WorkflowStage,
  RequestCategory
} from "@prisma/client";

export const ipRequestService = {

  async createRequest(data: any, submitterRole: Role = Role.RLDC) {

    // 1. Get user from DB
    const user = await prisma.user.findFirst();
    if (!user) throw new Error("No user found in system");

    const userId = user.id;
    const organizationId = user.organizationId;

    // 2. Process Requested IPs
    const ipList = data.ipAddresses
      ?.split(",")
      .map((ip: string) => ip.trim())
      .filter(Boolean);

    if (!ipList || ipList.length === 0) {
      throw new Error("At least one IP is required");
    }

    // ==========================================
    //  PENDING REQUEST CHECK
    // ==========================================
    const pendingRequest = await prisma.ipRequest.findFirst({
      where: {
        username: data.username,
        status: {
          notIn: [RequestStatus.COMPLETED, RequestStatus.REJECTED] // Finds anything currently in the workflow
        }
      }
    });

    if (pendingRequest) {
      throw new Error(`A request (${pendingRequest.ticketNo}) is already pending for '${data.username}'. Please wait for it to be processed or reject it first.`);
    }

    // ==========================================
    //  REDUNDANT IP CHECK
    // ==========================================
    const completedRequests = await prisma.ipRequest.findMany({
      where: { 
        username: data.username,
        status: RequestStatus.COMPLETED 
      },
      include: { ips: true }
    });

    const currentlyActiveIps = new Set<string>();
    completedRequests.forEach(req => {
      if (req.ips) {
        req.ips.forEach((ip: any) => currentlyActiveIps.add(ip.ipAddress));
      }
      if (req.ipToRemove) {
        const removedIps = Array.isArray(req.ipToRemove)
          ? req.ipToRemove
          : req.ipToRemove
              .split(",")
              .map((ip: string) => ip.trim())
              .filter(Boolean);

        removedIps.forEach((ip: string) => {
          currentlyActiveIps.delete(ip);
        });
      }
    });

    const duplicateIps = ipList.filter((ip: string) => currentlyActiveIps.has(ip));
    
    if (duplicateIps.length > 0) {
      throw new Error(`Redundant Request: The following IPs are already active for this user: ${duplicateIps.join(", ")}`);
    }

    // ==========================================
    // 3. Check active IP count limit
    // ==========================================
    const activeIpCount = currentlyActiveIps.size; 
    
    const isEmergency = data.isEmergency === true || String(data.isEmergency) === "true";
    
    // ✅ FIX: Explicitly extract the API Access flag
    const isApiAccess = data.isApiAccess === true || String(data.isApiAccess) === "true";

    const removedIps = (Array.isArray(data.ipToRemove)
      ? data.ipToRemove
      : (data.ipToRemove || "")
          .split(",")
          .map((ip: string) => ip.trim())
          .filter(Boolean)
    );

    const hasValidReason = data.reason && data.reason.trim().length > 0;

    if (!isEmergency && (activeIpCount + ipList.length > 5) && removedIps.length === 0 && !hasValidReason) {
      throw new Error(
        `Limit Exceeded. User has ${activeIpCount} active IPs. Cannot add ${ipList.length} more without providing an IP to remove or a valid justification reason.`
      );
    }

    // 4. Workflow Routing
    let nextStatus: RequestStatus = RequestStatus.UNDER_NLDC_REVIEW;
    let nextRole: Role = Role.NLDC;
    let stageLog: WorkflowStage = WorkflowStage.NLDC;

    if (submitterRole === Role.NLDC) {
      nextStatus = RequestStatus.SENT_TO_CISO;
      nextRole = Role.CISO;
      stageLog = WorkflowStage.CISO;
    }

    const ticketNo = `WBES-${Date.now()}`;

    // 5. Create Request
    const request = await ipRequestRepository.create({
      ticketNo,
      userId,
      organizationId,
      category: data.category as RequestCategory,
      status: nextStatus,
      currentRole: nextRole,
      submittedByRole: submitterRole,
      entityName: data.entityName,
      username: data.username, 
      contactPerson: data.contactPerson,
      email: data.email,
      phone: data.phone,
      location: data.location,
      reason: data.reason,
      
      isEmergency: isEmergency,
      isApiAccess: isApiAccess, // ✅ FIX: Now passing it to the database creation payload!
      duration: data.duration || null,
      
      ipToRemove:
        Array.isArray(data.ipToRemove) && data.ipToRemove.length > 0
          ? data.ipToRemove.join(", ")
          : data.ipToRemove || null,
      remarks: "Request created via portal",
      
      ips: {
        create: ipList.map((ip: string) => ({ ipAddress: ip }))
      }
    });

    // 6. Add Workflow Log
    await ipRequestRepository.addLog({
      requestId: request.id,
      stage: stageLog,
      action: WorkflowAction.FORWARDED,
      role: submitterRole,
      remarks: `Request forwarded to ${nextRole}`
    });

    return request;
  },

  async getRequests() {
    const requests = await ipRequestRepository.findAll();

    return requests.map((req: any) => ({
      ...req,
      currentActiveIps:
        typeof req.currentActiveIps === "number"
          ? req.currentActiveIps
          : typeof req.currentActiveIpsCount === "number"
          ? req.currentActiveIpsCount
          : 0,
    }));
  },

  async getRequestsByRole(role: Role) {
    return ipRequestRepository.findByRole(role);
  },

  async handleWorkflowAction(
      requestId: string, 
      action: "APPROVE" | "REJECT", 
      remarks: string, 
      actorId: string, 
      actorRole: Role
    ) {
      const currentRequest = await prisma.ipRequest.findUnique({
        where: { id: requestId }
      });

      if (!currentRequest) {
        throw new Error("Request not found in the database.");
      }

      let nextStatus: RequestStatus;
      let nextRole: Role;
      let stage: WorkflowStage;

      // ==========================================
      // GLOBAL REJECTION HANDLER (FIXED)
      // ==========================================
      if (action === "REJECT") {
        nextStatus = RequestStatus.REJECTED;
        
        // 🚨 OVERRIDE: If the region is strictly NLDC, guarantee it returns to NLDC
        let fallbackRole = currentRequest.submittedByRole || Role.RLDC;
        if (currentRequest.initiatorRegion === "NLDC") {
            fallbackRole = Role.NLDC;
        }

        nextRole = fallbackRole; 
        stage = actorRole as unknown as WorkflowStage; 

        return ipRequestRepository.updateWorkflowStatus(
          requestId,
          { status: nextStatus, currentRole: nextRole, remarks },
          { 
            stage, 
            action: WorkflowAction.REJECTED, 
            approvedById: actorId, 
            remarks 
          }
        );
      }

      // ==========================================
      // APPROVALS LOGIC
      // ==========================================
      switch (actorRole) {
        case Role.RLDC:
          nextStatus = RequestStatus.UNDER_NLDC_REVIEW;
          nextRole = Role.NLDC;
          stage = WorkflowStage.NLDC;
          break;
          
        case Role.NLDC:
          nextStatus = RequestStatus.SENT_TO_CISO;
          nextRole = Role.CISO;
          stage = WorkflowStage.CISO;
          break;

        case Role.CISO:
          nextStatus = RequestStatus.SENT_TO_SOC;
          nextRole = Role.SOC;
          stage = WorkflowStage.SOC;
          break;

        case Role.SOC:
          nextStatus = RequestStatus.SOC_VERIFIED;
          nextRole = Role.IT;
          stage = WorkflowStage.IT;
          break;

        case Role.IT:
          nextStatus = RequestStatus.COMPLETED;
          nextRole = Role.ADMIN; 
          stage = WorkflowStage.IT;
          break;

        default:
          throw new Error("Unauthorized role for workflow action");
      }

      return ipRequestRepository.updateWorkflowStatus(
        requestId,
        { status: nextStatus, currentRole: nextRole, remarks },
        { 
          stage, 
          action: WorkflowAction.FORWARDED, 
          approvedById: actorId, 
          remarks 
        }
      );
    }
};