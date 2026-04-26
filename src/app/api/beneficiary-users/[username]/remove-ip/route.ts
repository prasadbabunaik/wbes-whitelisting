import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db/client";
import { validateSecureSession } from "src/lib/auth";
import { sendRevocationEmail } from "src/lib/mailer";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<any> }
) {
  try {
    // VAPT: Require session cookie + CSRF token
    await validateSecureSession(req, true);

    const resolvedParams = await params;
    const body = await req.json();
    const {
      ipAddresses,
      ipAddress,
      actorRole,
      actorName,
      username: bodyUsername,
      region: clientRegion,
    } = body;

    const finalUsername = String(
      bodyUsername || resolvedParams.username || resolvedParams.id || ""
    ).trim();

    if (!finalUsername) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    const normalizedIps: string[] = Array.isArray(ipAddresses)
      ? ipAddresses.filter((ip): ip is string => typeof ip === "string" && ip.trim() !== "").map((ip) => ip.trim())
      : typeof ipAddress === "string" && ipAddress.trim() !== ""
      ? [ipAddress.trim()]
      : [];

    if (normalizedIps.length === 0) {
      return NextResponse.json(
        { error: "At least one IP address is required" },
        { status: 400 }
      );
    }

    const [benUser, latestCompleted] = await Promise.all([
      prisma.beneficiaryUser.findFirst({
        where: { username: { equals: finalUsername, mode: "insensitive" } },
        include: { entity: true },
      }),
      prisma.ipRequest.findFirst({
        where: { username: { equals: finalUsername, mode: "insensitive" }, status: "COMPLETED" },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    if (!benUser && !latestCompleted) {
      return NextResponse.json(
        { error: `User '${finalUsername}' has no records to revoke from.` },
        { status: 404 }
      );
    }

    let revokedCount = 0;

    // 1. Remove IPs from BeneficiaryUserIP table
    if (benUser) {
      const deleted = await prisma.beneficiaryUserIP.deleteMany({
        where: { beneficiaryUserId: benUser.id, ipAddress: { in: normalizedIps } },
      });
      revokedCount += deleted.count;
    }

    // 2. Append to the latest completed request's ipToRemove timeline field
    if (latestCompleted) {
      const existing = latestCompleted.ipToRemove
        ? latestCompleted.ipToRemove.split(",").map((i) => i.trim()).filter(Boolean)
        : [];
      const merged = Array.from(new Set([...existing, ...normalizedIps])).join(", ");
      await prisma.ipRequest.update({
        where: { id: latestCompleted.id },
        data: { ipToRemove: merged },
      });
      revokedCount += normalizedIps.length;
    }

    if (revokedCount === 0) {
      return NextResponse.json(
        { error: "No active matching IPs found for this user to revoke" },
        { status: 404 }
      );
    }

    // 3. Resolve region for email routing
    let resolvedRegion =
      clientRegion && clientRegion !== "UNKNOWN"
        ? clientRegion
        : benUser?.entity?.region ?? latestCompleted?.initiatorRegion;

    if (!resolvedRegion || resolvedRegion === "UNKNOWN" || resolvedRegion === "RLDC") {
      const entityName = benUser?.entity?.name ?? latestCompleted?.entityName;
      if (entityName) {
        const entity = await prisma.entity.findUnique({
          where: { name: entityName },
          select: { region: true },
        });
        if (entity?.region) resolvedRegion = entity.region;
      }
    }

    // Fire-and-forget — email failure must not fail the revocation response
    sendRevocationEmail({
      username:   finalUsername,
      entityName: benUser?.entity?.name ?? latestCompleted?.entityName ?? "Unknown",
      revokedIps: normalizedIps,
      actorRole:  actorRole ?? "Unknown",
      actorName:  actorName ?? "",
      region:     resolvedRegion ?? "UNKNOWN",
    });

    return NextResponse.json({
      success:    true,
      message:    `${normalizedIps.length} IP(s) successfully revoked`,
      revokedIps: normalizedIps,
    });
  } catch (error: any) {
    console.error("[REVOKE-IP]", error.message);
    return NextResponse.json({ error: "Failed to revoke IP address" }, { status: 500 });
  }
}
