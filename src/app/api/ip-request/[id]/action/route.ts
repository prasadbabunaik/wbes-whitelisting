import { NextRequest, NextResponse } from "next/server";
import { ipRequestService } from "@/server/services/ipRequestService.service";
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

const WORKFLOW_STAGES = ["RLDC", "NLDC", "CISO", "SOC", "IT", "COMPLETED"];

// ✅ BULLETPROOF EMAIL MAPPER (FIXED)
function getEmailForRole(role: string, region: string): string {
  const r = (region || "").toUpperCase().trim();
  const rl = (role || "").toUpperCase().trim();

  // 1. ALWAYS resolve Central Roles First! (Ignores the region completely)
  const centralMap: Record<string, string> = {
    "NLDC": "nldc@gridindia.in",
    "CISO": "ciso@gridindia.in",
    "SOC": "soc@gridindia.in",
    "IT": "it@gridindia.in",
    "ADMIN": "it@gridindia.in"
  };

  if (centralMap[rl]) {
    return centralMap[rl];
  }

  // 2. If it's not a central role, it MUST be an RLDC/Initiator role. Now we check the region.
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

// --- DYNAMIC EMAIL ROUTING HELPER ---
function getEmailRouting(actorRole: string, action: string, initiatorRole: string, initiatorRegion: string) {
  // Override initiator role if region explicitly proves it was NLDC
  let trueInitiator = initiatorRole.toUpperCase();
  if (initiatorRegion === "NLDC") trueInitiator = "NLDC";

  let normalizedActor = actorRole.toUpperCase();
  if (normalizedActor.includes("LDC") && normalizedActor !== "NLDC") normalizedActor = "RLDC";
  if (normalizedActor === "ADMIN") normalizedActor = "IT";

  let normalizedInitiator = trueInitiator.includes("LDC") && trueInitiator !== "NLDC" ? "RLDC" : trueInitiator;

  const currentIndex = WORKFLOW_STAGES.indexOf(normalizedActor);
  const initiatorIndex = WORKFLOW_STAGES.indexOf(normalizedInitiator);

  let toEmails: string[] = [];
  let ccEmails: string[] = [];

  const isRejected = action.toUpperCase().includes("REJECT");

  if (isRejected) {
    // ❌ REJECTION LOGIC: Send back strictly to the True Initiator
    toEmails.push(getEmailForRole(trueInitiator, initiatorRegion));
    
    // Always CC NLDC if the rejection happened at CISO, SOC, or IT
    if (normalizedActor !== "NLDC" && normalizedInitiator !== "NLDC") {
      ccEmails.push(getEmailForRole("NLDC", initiatorRegion));
    }

    // CC anyone else who approved it previously
    for (let i = initiatorIndex + 1; i < currentIndex; i++) {
      ccEmails.push(getEmailForRole(WORKFLOW_STAGES[i], initiatorRegion));
    }
  } else {
    // ✅ APPROVAL LOGIC
    const nextRole = WORKFLOW_STAGES[currentIndex + 1];
    if (nextRole === "COMPLETED") {
      toEmails.push(getEmailForRole(trueInitiator, initiatorRegion));
    } else if (nextRole) {
      toEmails.push(getEmailForRole(nextRole, initiatorRegion));
    }

    for (let i = initiatorIndex; i <= currentIndex; i++) {
      const stage = WORKFLOW_STAGES[i];
      const roleToLookup = stage === "RLDC" ? trueInitiator : stage;
      ccEmails.push(getEmailForRole(roleToLookup, initiatorRegion));
    }
  }

  toEmails = [...new Set(toEmails.filter(Boolean))];
  ccEmails = [...new Set(ccEmails.filter(Boolean))].filter(email => !toEmails.includes(email));

  return {
    to: toEmails.join(", "),
    cc: [...ccEmails, "mprashad@grid-india.in"].join(", ") 
  };
}

// --- EMAIL SENDING HELPER ---
async function sendWorkflowEmail(ticketNo: string, entityName: string, action: string, actorRole: string, remarks: string, initiatorRole: string, initiatorRegion: string) {
  try {
    const isRejected = action.toUpperCase().includes("REJECT");
    
    let actionText = "";
    let actionColor = ""; 

    if (isRejected) {
        actionText = "Rejected";
        actionColor = "#f06548"; // Red
    } else {
        if (actorRole === "IT" || actorRole.toUpperCase() === "ADMIN") {
            actionText = "Fully Approved & Completed";
            actionColor = "#0ab39c"; // Green
        } else if (actorRole.toUpperCase().includes("LDC") && actorRole.toUpperCase() !== "NLDC") {
            actionText = "Submitted / Forwarded"; 
            actionColor = "#299cdb"; // Blue
        } else {
            actionText = "Approved & Forwarded"; 
            actionColor = "#0ab39c"; // Green
        }
    }
    
    const { to, cc } = getEmailRouting(actorRole, action, initiatorRole, initiatorRegion);

    if (!to && !cc) return;

    const subject = `WBES IP Whitelisting Ticket ${ticketNo} - ${actionText} by ${actorRole}`;
    
    const msgBody = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <p>Sir/Madam,</p>
        <p>Please be informed that the IP Whitelisting request for <b>${entityName}</b> (Ticket: <b>${ticketNo}</b>) has been <b><span style="color: ${actionColor}">${actionText}</span></b> at the <b>${actorRole}</b> stage.</p>
        <p><b>Remarks provided:</b> ${remarks || "None"}</p>
        <br/>
        <p>You can view the full timeline and take action by logging into the WBES Administration Portal.</p>
        <br/>
        <p>धन्यवाद एवं आभार / Thanks and Regards,</p>
        <p>--<br/>
        <b>WBES Administration Portal</b><br/>
        Grid Controller of India Limited</p>
      </div>
    `;

    await transporter.sendMail({
      from: '"WBES Portal" <mprashad@grid-india.in>', 
      to: to || "mprashad@grid-india.in", 
      cc: cc,
      subject: subject,
      html: msgBody,
    });
  } catch (error) {
    console.error("[MAIL ERROR] Failed to send email:", error);
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // VAPT: Require Cookie AND CSRF Token Match! (true = require CSRF)
    const user = await validateSecureSession(req, true);
    const body = await req.json();
    const resolvedParams = await params;
    const requestId = resolvedParams.id;

    let { action, remarks, role, actorId, modifiedIps, modifiedIpToRemove } = body;

    const requestData = await prisma.ipRequest.findUnique({
        where: { id: requestId },
        select: { ticketNo: true, entityName: true, submittedByRole: true, initiatorRegion: true }
    });

    if (!requestData) return NextResponse.json({ error: "Request not found" }, { status: 404 });

    // FORCE REGION EXTRACTION
    let finalRegion = requestData.initiatorRegion;
    if (!finalRegion || finalRegion === "UNKNOWN" || finalRegion === "RLDC") {
        const entityLookup = await prisma.entity.findUnique({ where: { name: requestData.entityName } });
        if (entityLookup && entityLookup.region) {
            finalRegion = entityLookup.region;
        } else {
            finalRegion = requestData.submittedByRole; // Absolute last resort
        }
    }

    const result = await ipRequestService.handleWorkflowAction(requestId, action, remarks, actorId, role);

    await sendWorkflowEmail(
      requestData.ticketNo, 
      requestData.entityName, 
      action, 
      role, 
      remarks,
      requestData.submittedByRole || "RLDC", 
      finalRegion || "UNKNOWN"
    );

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}