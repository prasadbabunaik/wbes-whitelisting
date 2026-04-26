import { NextRequest, NextResponse } from "next/server";
import { ipRequestService } from "@/server/services/ipRequestService.service";
import { prisma } from "@/server/db/client";
import { validateSecureSession } from "src/lib/auth";
import { sendWorkflowEmail } from "src/lib/mailer";

// Role → approval page link
const ROLE_LINK: Record<string, string> = {
  NLDC:  "/modules/approval/nldc",
  CISO:  "/modules/approval/ciso",
  SOC:   "/modules/approval/soc",
  IT:    "/modules/approval/it",
  RLDC:  "/modules/request/all",
  ADMIN: "/modules/request/all",
};

async function createNotificationsForRole(
  targetRole: string,
  title: string,
  message: string,
  requestId: string,
  ticketNo: string,
  link: string
) {
  const users = await prisma.user.findMany({ where: { role: targetRole as any }, select: { id: true } });
  if (users.length === 0) return;
  await prisma.notification.createMany({
    data: users.map((u) => ({ userId: u.id, title, message, requestId, ticketNo, link })),
  });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await validateSecureSession(req, true);

    const body = await req.json();
    const { id: requestId } = await params;
    const { action, remarks, role, actorId } = body;

    const requestData = await prisma.ipRequest.findUnique({
      where: { id: requestId },
      select: {
        ticketNo:        true,
        entityName:      true,
        submittedByRole: true,
        initiatorRegion: true,
        userId:          true,
      },
    });

    if (!requestData) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    let finalRegion = requestData.initiatorRegion;
    if (!finalRegion || finalRegion === "UNKNOWN" || finalRegion === "RLDC") {
      const entity = await prisma.entity.findUnique({
        where: { name: requestData.entityName },
        select: { region: true },
      });
      finalRegion = entity?.region ?? requestData.submittedByRole ?? "UNKNOWN";
    }

    const result = await ipRequestService.handleWorkflowAction(requestId, action, remarks, actorId, role);

    // Get the updated request status to know who to notify
    const updated = await prisma.ipRequest.findUnique({
      where: { id: requestId },
      select: { status: true, currentRole: true },
    });

    const isRejected = action.toUpperCase().includes("REJECT");
    const isCompleted = updated?.status === "COMPLETED";
    const nextRole = updated?.currentRole ?? "";

    // Notify next role in workflow
    if (!isRejected && !isCompleted && nextRole && ROLE_LINK[nextRole]) {
      createNotificationsForRole(
        nextRole,
        `New Request Pending: ${requestData.ticketNo}`,
        `IP Whitelisting request for ${requestData.entityName} is now pending your action.`,
        requestId,
        requestData.ticketNo,
        ROLE_LINK[nextRole]
      );
    }

    // Notify the original submitter on rejection or completion
    if ((isRejected || isCompleted) && requestData.userId) {
      const notifTitle = isRejected
        ? `Request Rejected: ${requestData.ticketNo}`
        : `Request Completed: ${requestData.ticketNo}`;
      const notifMsg = isRejected
        ? `Your IP whitelisting request for ${requestData.entityName} was rejected at the ${role} stage.`
        : `Your IP whitelisting request for ${requestData.entityName} has been completed and IPs are now whitelisted.`;

      prisma.notification.create({
        data: {
          userId:    requestData.userId,
          title:     notifTitle,
          message:   notifMsg,
          requestId,
          ticketNo:  requestData.ticketNo,
          link:      "/modules/request/all",
        },
      });
    }

    sendWorkflowEmail(
      requestData.ticketNo,
      requestData.entityName,
      action,
      role,
      remarks,
      requestData.submittedByRole ?? "RLDC",
      finalRegion ?? "UNKNOWN"
    );

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
