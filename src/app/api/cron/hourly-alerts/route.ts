import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db/client";
import nodemailer from "nodemailer";

export const dynamic = 'force-dynamic';

// --- EMAIL TRANSPORTER ---
const transporter = nodemailer.createTransport({
  host: "mail.grid-india.in",
  port: 587,
  secure: false, 
  auth: { user: "00173", pass: "Sakura@12345" },
  tls: { rejectUnauthorized: false }
});

const WORKFLOW_STAGES = ["RLDC", "NLDC", "CISO", "SOC", "IT", "COMPLETED"];

// ✅ BULLETPROOF EMAIL MAPPER
function getEmailForRole(role: string, region: string): string {
  const r = (region || "").toUpperCase().trim();
  const rl = (role || "").toUpperCase().trim();

  const centralMap: Record<string, string> = {
    "NLDC": "nldc@gridindia.in",
    "CISO": "ciso@gridindia.in",
    "SOC": "soc@gridindia.in",
    "IT": "it@gridindia.in",
    "ADMIN": "it@gridindia.in"
  };

  if (centralMap[rl]) return centralMap[rl];

  if (rl.includes("LDC") || ["NR", "SR", "WR", "ER", "NER"].some(prefix => rl.includes(prefix))) {
    if (r.includes("NR") || rl.includes("NR")) return "nrldc@gridindia.in";
    if (r.includes("SR") || rl.includes("SR")) return "srldc@gridindia.in";
    if (r.includes("WR") || rl.includes("WR")) return "wrldc@gridindia.in";
    if (r.includes("ER") || rl.includes("ER")) return "erldc@gridindia.in";
    if (r.includes("NER") || rl.includes("NER")) return "nerldc@gridindia.in";
    return "rldc@gridindia.in"; 
  }
  return "";
}

export async function GET(req: NextRequest) {
  try {
    // 🛡️ SECURITY: Flexible check for Cron Services or Browser Testing
    const authHeader = req.headers.get("authorization");
    const querySecret = req.nextUrl.searchParams.get("secret");
    const cronSecret = process.env.CRON_SECRET;
    
    // If a secret is set in .env, require it in either the Header OR the URL
    if (cronSecret) {
      const isValidHeader = authHeader === `Bearer ${cronSecret}`;
      const isValidQuery = querySecret === cronSecret;
      
      if (!isValidHeader && !isValidQuery) {
        return NextResponse.json({ error: "Unauthorized - Invalid or missing secret" }, { status: 401 });
      }
    }

    // 1. Find EMERGENCY requests that are NOT completed/rejected AND haven't been updated in over 1 hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    const staleRequests = await prisma.ipRequest.findMany({
      where: {
        status: { notIn: ["COMPLETED", "REJECTED"] },
        updatedAt: { lt: oneHourAgo },
        isEmergency: true // Strictly filter for Emergency Requests ONLY
      },
      select: {
        ticketNo: true,
        entityName: true,
        currentRole: true,
        initiatorRegion: true,
        submittedByRole: true,
        updatedAt: true
      }
    });

    if (staleRequests.length === 0) {
      return NextResponse.json({ success: true, message: "No stale emergency requests found. System is up to date." });
    }

    // 2. Fetch Entity Region Map for Fallbacks
    const allEntities = await prisma.entity.findMany({ select: { name: true, region: true } });
    const entityRegionMap = new Map(allEntities.map(e => [e.name, e.region]));

    let emailsSent = 0;

    // 3. Dispatch Emails
    for (const req of staleRequests) {
      let finalRegion = req.initiatorRegion;
      if (!finalRegion || finalRegion === "UNKNOWN" || finalRegion === "RLDC") {
        finalRegion = entityRegionMap.get(req.entityName) || req.submittedByRole || "UNKNOWN";
      }

      let currentRoleStr = req.currentRole.toUpperCase();
      if (currentRoleStr.includes("LDC") && currentRoleStr !== "NLDC") currentRoleStr = "RLDC";

      const currentIndex = WORKFLOW_STAGES.indexOf(currentRoleStr);

      let rawToEmails: string[] = [];
      let rawCcEmails: string[] = ["mprashad@grid-india.in"];

      if (currentIndex !== -1) {
        // ✅ TO: Current pending stage
        rawToEmails.push(getEmailForRole(currentRoleStr, finalRegion));

        // ✅ CC: All previous stages in the workflow
        for (let i = 0; i < currentIndex; i++) {
          rawCcEmails.push(getEmailForRole(WORKFLOW_STAGES[i], finalRegion));
        }

        // ✅ CC: The next immediate stage (if it isn't COMPLETED)
        const nextRoleStr = WORKFLOW_STAGES[currentIndex + 1];
        if (nextRoleStr && nextRoleStr !== "COMPLETED") {
          rawCcEmails.push(getEmailForRole(nextRoleStr, finalRegion));
        }
      } else {
        // Fallback if the role isn't explicitly in the workflow array (e.g. ADMIN)
        rawToEmails.push(getEmailForRole(currentRoleStr, finalRegion));
      }

      // Deduplicate and remove empty strings
      const toEmails = [...new Set(rawToEmails.filter(Boolean))];
      let ccEmails = [...new Set(rawCcEmails.filter(Boolean))];
      
      // Ensure we don't accidentally CC someone who is already in the TO field
      ccEmails = ccEmails.filter(email => !toEmails.includes(email));

      if (toEmails.length === 0) continue;

      const hoursPending = Math.floor((Date.now() - new Date(req.updatedAt).getTime()) / (1000 * 60 * 60));

      const subject = `[URGENT: EMERGENCY TICKET] WBES Ticket ${req.ticketNo} pending at ${currentRoleStr}`;
      const msgBody = `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
          <p>Sir/Madam,</p>
          <p>This is an automated system reminder. An <b>EMERGENCY</b> IP Whitelisting request <b>${req.ticketNo}</b> for <b>${req.entityName}</b> is currently pending your action and has breached the expected SLA.</p>
          
          <div style="background-color: #f8d7da; border-left: 4px solid #dc3545; padding: 10px; margin: 15px 0;">
            <strong style="color: #dc3545;">⚠ HIGH PRIORITY (EMERGENCY)</strong><br/>
            <strong>Pending Stage:</strong> ${currentRoleStr}<br/>
            <strong>Time Pending:</strong> ${hoursPending} Hours
          </div>

          <p>Please log into the WBES Administration Portal <b>immediately</b> to review and process this request so it can advance to the next stage.</p>
          <br/>
          <p>धन्यवाद एवं आभार / Thanks and Regards,</p>
          <p>--<br/><b>WBES Automated System</b><br/>Grid Controller of India Limited</p>
        </div>
      `;

      await transporter.sendMail({
        from: '"WBES Portal" <mprashad@grid-india.in>',
        to: toEmails.join(", "),
        cc: ccEmails.join(", "),
        subject: subject,
        html: msgBody,
      });

      emailsSent++;
    }

    return NextResponse.json({ success: true, message: `Dispatched ${emailsSent} emergency reminder emails.` });
  } catch (error: any) {
    console.error("CRON ERROR:", error.message);
    return NextResponse.json({ error: "Failed to process hourly alerts" }, { status: 500 });
  }
}