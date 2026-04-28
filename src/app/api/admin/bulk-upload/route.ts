import { NextResponse } from "next/server";
import { prisma } from "@/server/db/client";
import { validateSecureSession } from "src/lib/auth";

function generateTicketNo(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `WBES-BK-${y}${m}${d}-${rand}`;
}

function extractIps(raw: string): string[] {
  if (!raw) return [];
  const ipRegex = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(?:\/\d{1,2})?\b/g;
  const matches = raw.match(ipRegex) || [];
  return [...new Set(matches.map((ip) => ip.trim()))];
}

export async function POST(req: Request) {
  try {
    const user = await validateSecureSession(req, false);
    if (!["ADMIN", "NLDC", "IT"].includes(user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { records } = body as {
      records: Array<{
        username: string;
        entityName: string;
        ipAddresses: string;
        remarks: string;
        region?: string;
      }>;
    };

    if (!records?.length) {
      return NextResponse.json({ error: "No records provided" }, { status: 400 });
    }

    const nldc = await prisma.organization.findFirst({ where: { name: "NLDC" } });
    if (!nldc) {
      return NextResponse.json({ error: "NLDC organisation not found" }, { status: 500 });
    }

    const results = { inserted: 0, skipped: 0, errors: [] as string[] };

    for (const row of records) {
      try {
        const username   = (row.username   ?? "").trim();
        const entityName = (row.entityName ?? "").trim();
        const rawIps     = (row.ipAddresses ?? "").trim();

        if (!entityName || !rawIps) {
          results.skipped++;
          continue;
        }

        const ips = extractIps(rawIps);
        if (ips.length === 0) {
          results.skipped++;
          results.errors.push(`"${entityName}": no valid IPs found in "${rawIps}"`);
          continue;
        }

        // 1. Upsert Entity
        const entity = await prisma.entity.upsert({
          where:  { name: entityName },
          create: { name: entityName, region: row.region ?? null },
          update: {},
        });

        // 2. Upsert BeneficiaryUser
        let beneficiaryUser = null;
        if (username) {
          beneficiaryUser = await prisma.beneficiaryUser.upsert({
            where:  { username },
            create: { entityId: entity.id, username },
            update: {},
          });
        }

        // 3. Create completed IpRequest
        const ticketNo = generateTicketNo();
        const request = await prisma.ipRequest.create({
          data: {
            userId:          user.id,
            organizationId:  nldc.id,
            category:        "NEW_USER",
            status:          "COMPLETED",
            entityName,
            username:        username || entityName,
            currentRole:     "IT",
            submittedByRole: "RLDC",
            ticketNo,
            remarks:         (row.remarks || "Backdated bulk import").trim(),
            initiatorRegion: row.region || "NLDC",
            ips: {
              create: ips.map((ip) => ({ ipAddress: ip })),
            },
          },
        });

        // 4. IpWhitelist
        for (const ip of ips) {
          await prisma.ipWhitelist.create({
            data: { userId: user.id, ipAddress: ip, active: true, requestId: request.id },
          });
        }

        // 5. BeneficiaryUserIP (skip duplicates)
        if (beneficiaryUser) {
          for (const ip of ips) {
            const exists = await prisma.beneficiaryUserIP.findFirst({
              where: { beneficiaryUserId: beneficiaryUser.id, ipAddress: ip },
            });
            if (!exists) {
              await prisma.beneficiaryUserIP.create({
                data: { beneficiaryUserId: beneficiaryUser.id, ipAddress: ip, active: true },
              });
            }
          }
        }

        results.inserted++;
      } catch (rowErr: any) {
        results.errors.push(`"${row.entityName}": ${rowErr.message}`);
        results.skipped++;
      }
    }

    return NextResponse.json({ success: true, ...results });
  } catch (error: any) {
    console.error("[BULK_UPLOAD]", error);
    const msg = error.message ?? "";
    if (msg.includes("Unauthorized")) return NextResponse.json({ error: msg }, { status: 401 });
    if (msg.includes("Forbidden"))    return NextResponse.json({ error: msg }, { status: 403 });
    return NextResponse.json({ error: "Bulk upload failed" }, { status: 500 });
  }
}
