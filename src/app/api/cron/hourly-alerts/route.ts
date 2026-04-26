import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db/client";
import { sendAlertEmail } from "src/lib/mailer";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    // Accept the secret in either the Authorization header or a query param
    const cronSecret = process.env.CRON_SECRET;
    if (cronSecret) {
      const headerSecret = req.headers.get("authorization");
      const querySecret  = req.nextUrl.searchParams.get("secret");
      const valid =
        headerSecret === `Bearer ${cronSecret}` || querySecret === cronSecret;

      if (!valid) {
        return NextResponse.json(
          { error: "Unauthorized — invalid or missing secret" },
          { status: 401 }
        );
      }
    }

    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    const staleRequests = await prisma.ipRequest.findMany({
      where: {
        status:      { notIn: ["COMPLETED", "REJECTED"] },
        updatedAt:   { lt: oneHourAgo },
        isEmergency: true,
      },
      select: {
        ticketNo:        true,
        entityName:      true,
        currentRole:     true,
        initiatorRegion: true,
        submittedByRole: true,
        updatedAt:       true,
      },
    });

    if (staleRequests.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No stale emergency requests. System is up to date.",
      });
    }

    // Build entity-region fallback map once
    const entities = await prisma.entity.findMany({
      select: { name: true, region: true },
    });
    const entityRegionMap = new Map(entities.map((e) => [e.name, e.region]));

    let emailsSent = 0;

    for (const request of staleRequests) {
      const region =
        request.initiatorRegion &&
        request.initiatorRegion !== "UNKNOWN" &&
        request.initiatorRegion !== "RLDC"
          ? request.initiatorRegion
          : entityRegionMap.get(request.entityName) ??
            request.submittedByRole ??
            "UNKNOWN";

      const hoursPending = Math.floor(
        (Date.now() - new Date(request.updatedAt).getTime()) / (1000 * 60 * 60)
      );

      await sendAlertEmail(
        request.ticketNo,
        request.entityName,
        request.currentRole,
        region,
        request.submittedByRole ?? "RLDC",
        hoursPending
      );

      emailsSent++;
    }

    return NextResponse.json({
      success: true,
      message: `Dispatched ${emailsSent} emergency reminder email${emailsSent !== 1 ? "s" : ""}.`,
    });
  } catch (error: any) {
    console.error("[CRON] hourly-alerts error:", error.message);
    return NextResponse.json(
      { error: "Failed to process hourly alerts" },
      { status: 500 }
    );
  }
}
