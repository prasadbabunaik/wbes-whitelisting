import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db/client";
import nodemailer from "nodemailer";
import { validateSecureSession } from "src/lib/auth";

// --- EMAIL TRANSPORTER CONFIGURATION ---
const transporter = nodemailer.createTransport({
  host: "mail.grid-india.in",
  port: 587,
  secure: false, 
  auth: {
    user: "00173", 
    pass: "Sakura@12345",
  },
  tls: {
    rejectUnauthorized: false
  }
});

// ✅ BULLETPROOF REGION MAPPER (Ported from the Action Route)
function getEmailForRole(role: string, region: string): string {
  const r = (region || "").toUpperCase().trim();
  const rl = (role || "").toUpperCase().trim();

  // 1. Central Roles (Ignore Region)
  const centralMap: Record<string, string> = {
    "NLDC": "nldc@gridindia.in",
    "CISO": "ciso@gridindia.in",
    "SOC": "soc@gridindia.in",
    "IT": "it@gridindia.in",
    "ADMIN": "it@gridindia.in"
  };

  if (centralMap[rl]) return centralMap[rl];

  // 2. Regional Roles (Check Region String)
  if (rl.includes("LDC") || ["NR", "SR", "WR", "ER", "NER"].some(prefix => rl.includes(prefix))) {
    if (r.includes("NR") || rl.includes("NR")) return "nrldc@gridindia.in";
    if (r.includes("SR") || rl.includes("SR")) return "srldc@gridindia.in";
    if (r.includes("WR") || rl.includes("WR")) return "wrldc@gridindia.in";
    if (r.includes("ER") || rl.includes("ER")) return "erldc@gridindia.in";
    if (r.includes("NER") || rl.includes("NER")) return "nerldc@gridindia.in";
    return "rldc@gridindia.in"; // Absolute fallback
  }

  return "";
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<any> }
) {
  try {

    // VAPT: Require Cookie AND CSRF Token Match! (true = require CSRF)
    const user = await validateSecureSession(req, true);
    const resolvedParams = await params;
    
    const body = await req.json();
    const { ipAddresses, ipAddress, actorRole, actorName, username: bodyUsername, region: clientRegion } = body;

    const finalUsername = String(bodyUsername || resolvedParams.username || resolvedParams.id || "").trim();

    if (!finalUsername) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    const normalizedIpAddresses: string[] = Array.isArray(ipAddresses)
      ? ipAddresses.filter((ip): ip is string => typeof ip === "string" && ip.trim() !== "").map(ip => ip.trim())
      : typeof ipAddress === "string" && ipAddress.trim() !== ""
      ? [ipAddress.trim()]
      : [];

    if (normalizedIpAddresses.length === 0) {
      return NextResponse.json(
        { error: "At least one IP Address is required" },
        { status: 400 }
      );
    }

    const benUser = await prisma.beneficiaryUser.findFirst({
      where: { 
        username: {
          equals: finalUsername,
          mode: 'insensitive' 
        } 
      },
      include: { entity: true },
    });

    const latestCompleted = await prisma.ipRequest.findFirst({
      where: { 
        username: { equals: finalUsername, mode: 'insensitive' }, 
        status: "COMPLETED" 
      },
      orderBy: { createdAt: 'desc' }
    });

    if (!benUser && !latestCompleted) {
      return NextResponse.json({ error: `User '${finalUsername}' has no records to revoke from.` }, { status: 404 });
    }

    let revokedCount = 0;

    // 1. Physically DELETE the IPs
    if (benUser) {
      const deleteResult = await prisma.beneficiaryUserIP.deleteMany({
        where: {
          beneficiaryUserId: benUser.id,
          ipAddress: { in: normalizedIpAddresses },
        },
      });
      revokedCount += deleteResult.count;
    }

    // 2. Append to timeline
    if (latestCompleted) {
      const existingToRemove = latestCompleted.ipToRemove 
        ? latestCompleted.ipToRemove.split(',').map(i => i.trim()).filter(Boolean) 
        : [];
      
      const mergedToRemove = Array.from(new Set([...existingToRemove, ...normalizedIpAddresses])).join(", ");
      
      await prisma.ipRequest.update({
        where: { id: latestCompleted.id },
        data: { ipToRemove: mergedToRemove }
      });
      revokedCount += normalizedIpAddresses.length; 
    }

    if (revokedCount === 0) {
      return NextResponse.json(
        { error: "No active matching IPs found for this user to revoke" },
        { status: 404 }
      );
    }

    // 3. Prepare the mailing list
    let resolvedRegion = clientRegion && clientRegion !== "UNKNOWN" 
        ? clientRegion 
        : benUser?.entity?.region;

    if (!resolvedRegion || resolvedRegion === "UNKNOWN") {
        resolvedRegion = latestCompleted?.initiatorRegion;
    }

    // ✅ FORCE DB LOOKUP: If still unknown, grab the region directly from the Entity table
    if (!resolvedRegion || resolvedRegion === "UNKNOWN" || resolvedRegion === "RLDC") {
        const entityName = benUser?.entity?.name || latestCompleted?.entityName;
        if (entityName) {
            const entityLookup = await prisma.entity.findUnique({ where: { name: entityName } });
            if (entityLookup && entityLookup.region) {
                resolvedRegion = entityLookup.region;
            }
        }
    }

    const ccEmails = [
      getEmailForRole("RLDC", resolvedRegion || "UNKNOWN"),
      getEmailForRole("NLDC", resolvedRegion || "UNKNOWN"),
      getEmailForRole("CISO", resolvedRegion || "UNKNOWN"),
      getEmailForRole("SOC", resolvedRegion || "UNKNOWN"),
      "mprashad@grid-india.in",
    ].filter(Boolean);

    const uniqueCcEmails = [...new Set(ccEmails)].join(", ");

    // 4. Send notification email
    try {
      const subject =
        normalizedIpAddresses.length === 1
          ? `[SECURITY ALERT] Manual IP Revocation - ${finalUsername}`
          : `[SECURITY ALERT] Manual IP Revocation (${normalizedIpAddresses.length} IPs) - ${finalUsername}`;

      const revokedIpsHtml = normalizedIpAddresses
        .map(
          (ip) => `
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; color: #f06548; font-weight: bold;">
                ${ip}
              </td>
            </tr>
          `
        )
        .join("");

      const msgBody = `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
          <p>Sir/Madam,</p>
          <p>
            Please be informed that active IP Address(es) have been
            <b><span style="color: #f06548">Manually Revoked</span></b>
            outside of the standard workflow process.
          </p>

          <table style="border-collapse: collapse; width: 100%; max-width: 700px; margin-top: 15px; margin-bottom: 15px;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f8f9fa; width: 30%;">
                Target Username
              </td>
              <td style="padding: 8px; border: 1px solid #ddd;">${finalUsername}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f8f9fa;">
                Entity / Beneficiary
              </td>
              <td style="padding: 8px; border: 1px solid #ddd;">${benUser?.entity?.name || latestCompleted?.entityName || "Unknown"}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f8f9fa;">
                Total IPs Revoked
              </td>
              <td style="padding: 8px; border: 1px solid #ddd;">${normalizedIpAddresses.length}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f8f9fa;">
                Action Performed By
              </td>
              <td style="padding: 8px; border: 1px solid #ddd;">
                ${(actorRole || "Unknown")} ${actorName ? `(${actorName})` : ""}
              </td>
            </tr>
          </table>

          <table style="border-collapse: collapse; width: 100%; max-width: 700px; margin-top: 10px; margin-bottom: 15px;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f8f9fa;">
                Revoked IP Address(es)
              </td>
            </tr>
            ${revokedIpsHtml}
          </table>

          <br/>
          <p>धन्यवाद एवं आभार / Thanks and Regards,</p>
          <p>
            --<br/>
            <b>WBES Administration Portal</b><br/>
            Grid Controller of India Limited
          </p>
        </div>
      `;

      await transporter.sendMail({
        from: '"WBES Security Bot" <mprashad@grid-india.in>',
        to: getEmailForRole("IT", resolvedRegion || "UNKNOWN") || "mprashad@grid-india.in", 
        cc: uniqueCcEmails,
        subject,
        html: msgBody,
      });

      console.log(`[MAIL SUCCESS] IP Revocation Alert sent for ${normalizedIpAddresses.join(", ")} (${finalUsername})`);
    } catch (mailError) {
      console.error("[MAIL ERROR] Failed to send revocation email:", mailError);
    }

    return NextResponse.json({
      success: true,
      message: `${normalizedIpAddresses.length} IP(s) successfully revoked`,
      revokedIps: normalizedIpAddresses,
    });
  } catch (error: any) {
    console.error("IP REVOCATION ERROR:", error.message);
    return NextResponse.json(
      { error: "Failed to revoke IP address" },
      { status: 500 }
    );
  }
}