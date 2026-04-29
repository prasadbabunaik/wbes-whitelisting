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

function ipToInt(ip: string): number {
  const p = ip.split(".").map(Number);
  return ((p[0] << 24) | (p[1] << 16) | (p[2] << 8) | p[3]) >>> 0;
}
function intToIp(n: number): string {
  return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");
}
function isValidIp(ip: string): boolean {
  const parts = ip.split(".");
  return parts.length === 4 && parts.every((p) => { const n = Number(p); return /^\d+$/.test(p) && n >= 0 && n <= 255; });
}
function expandCidr(cidr: string): string[] {
  const [ipStr, maskStr] = cidr.split("/");
  if (!isValidIp(ipStr)) return [cidr];
  const maskLen = parseInt(maskStr, 10);
  if (isNaN(maskLen) || maskLen < 0 || maskLen > 32) return [cidr];
  const maskInt  = maskLen === 0 ? 0 : (0xffffffff << (32 - maskLen)) >>> 0;
  const network  = (ipToInt(ipStr) & maskInt) >>> 0;
  const broadcast = (network | (~maskInt >>> 0)) >>> 0;
  const count = broadcast - network + 1;
  if (count > 1024) return [cidr];
  const result: string[] = [];
  for (let i = network; i <= broadcast; i++) result.push(intToIp(i));
  return result;
}

function extractIps(raw: string): string[] {
  if (!raw) return [];
  const normalised = String(raw)
    .replace(/[\r\n\t;|]+/g, ",")
    .replace(/\s+/g, " ")
    .trim();

  const cidrRegex = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(?:\/\d{1,2})?)/g;
  const tokens = normalised.match(cidrRegex) || [];

  const result: string[] = [];
  for (const token of tokens) {
    if (token.includes("/")) {
      result.push(...expandCidr(token));
    } else if (isValidIp(token)) {
      result.push(token);
    }
  }
  return [...new Set(result)];
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
        isApiAccess?: boolean;
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

        // 1. Upsert Entity — always update region so re-uploads fix missing region
        const entity = await prisma.entity.upsert({
          where:  { name: entityName },
          create: { name: entityName, region: row.region ?? null },
          update: row.region ? { region: row.region } : {},
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

        // 3. Skip IpRequest creation if any completed record already exists for this entity
        const existingRequest = await prisma.ipRequest.findFirst({
          where: { entityName, status: "COMPLETED" },
        });

        if (!existingRequest) {
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
              isApiAccess:     row.isApiAccess ?? false,
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
        }

        // 5. BeneficiaryUserIP (skip duplicates — runs on both new and re-upload)
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
