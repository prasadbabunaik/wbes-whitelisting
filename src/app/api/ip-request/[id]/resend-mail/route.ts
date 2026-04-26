import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db/client";
import { validateSecureSession } from "src/lib/auth";
import { sendWorkflowEmail } from "src/lib/mailer";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await validateSecureSession(req, false);

    const { id: requestId } = await params;

    const request = await prisma.ipRequest.findUnique({
      where: { id: requestId },
      select: {
        ticketNo:        true,
        entityName:      true,
        status:          true,
        currentRole:     true,
        submittedByRole: true,
        initiatorRegion: true,
        remarks:         true,
      },
    });

    if (!request) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    let finalRegion = request.initiatorRegion;
    if (!finalRegion || finalRegion === "UNKNOWN" || finalRegion === "RLDC") {
      const entity = await prisma.entity.findUnique({
        where: { name: request.entityName },
        select: { region: true },
      });
      finalRegion = entity?.region ?? request.submittedByRole ?? "UNKNOWN";
    }

    // Resend using the current state of the request
    await sendWorkflowEmail(
      request.ticketNo,
      request.entityName,
      "APPROVE",                          // treated as a forwarding/reminder
      request.currentRole,
      `[REMINDER] ${request.remarks ?? "Status update notification resent by admin."}`,
      request.submittedByRole ?? "RLDC",
      finalRegion ?? "UNKNOWN"
    );

    return NextResponse.json({ success: true, message: "Email resent successfully." });
  } catch (error: any) {
    console.error("[RESEND-MAIL]", error.message);
    const msg = error.message ?? "";
    if (msg.includes("Unauthorized")) return NextResponse.json({ error: msg }, { status: 401 });
    if (msg.includes("Forbidden"))    return NextResponse.json({ error: msg }, { status: 403 });
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
