import nodemailer, { Transporter } from "nodemailer";

// ── Config (all values from environment, never hardcoded) ─────────────────────
const smtpConfig = {
  host:    process.env.SMTP_HOST!,
  port:    parseInt(process.env.SMTP_PORT ?? "587", 10),
  secure:  process.env.SMTP_SECURE === "true",
  user:    process.env.SMTP_USER!,
  pass:    process.env.SMTP_PASS!,
  from:    process.env.SMTP_FROM!,
  ccAlways: process.env.MAIL_CC_ALWAYS ?? "",
  // Allow self-signed certs only when explicitly enabled (e.g. in dev)
  rejectUnauthorized: process.env.SMTP_TLS_REJECT_UNAUTHORIZED !== "false",
};

// ── Lazy singleton transporter ────────────────────────────────────────────────
let _transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (!_transporter) {
    if (!smtpConfig.host || !smtpConfig.user || !smtpConfig.pass) {
      throw new Error(
        "SMTP not configured. Set SMTP_HOST, SMTP_USER and SMTP_PASS in your .env file."
      );
    }
    _transporter = nodemailer.createTransport({
      host:   smtpConfig.host,
      port:   smtpConfig.port,
      secure: smtpConfig.secure,
      auth: {
        user: smtpConfig.user,
        pass: smtpConfig.pass,
      },
      tls: {
        rejectUnauthorized: smtpConfig.rejectUnauthorized,
      },
    });
  }
  return _transporter;
}

// ── Workflow constants ────────────────────────────────────────────────────────
export const WORKFLOW_STAGES = ["RLDC", "NLDC", "CISO", "SOC", "IT", "COMPLETED"] as const;

// ── Role → email resolver ─────────────────────────────────────────────────────
const CENTRAL_ROLE_EMAILS: Record<string, string> = {
  NLDC:  "nldc@gridindia.in",
  CISO:  "ciso@gridindia.in",
  SOC:   "soc@gridindia.in",
  IT:    "it@gridindia.in",
  ADMIN: "admin@gridindia.in",
};

export function getEmailForRole(role: string, region: string): string {
  const rl = (role   ?? "").toUpperCase().trim();
  const r  = (region ?? "").toUpperCase().trim();

  if (CENTRAL_ROLE_EMAILS[rl]) return CENTRAL_ROLE_EMAILS[rl];

  // Regional RLDC — resolve by region string
  const isRldc =
    rl.includes("LDC") ||
    ["NR", "SR", "WR", "ER", "NER"].some((p) => rl.startsWith(p));

  if (isRldc) {
    if (r.startsWith("NER") || rl.startsWith("NER")) return "nerldc@gridindia.in";
    if (r.startsWith("NR")  || rl.startsWith("NR"))  return "nrldc@gridindia.in";
    if (r.startsWith("SR")  || rl.startsWith("SR"))  return "srldc@gridindia.in";
    if (r.startsWith("WR")  || rl.startsWith("WR"))  return "wrldc@gridindia.in";
    if (r.startsWith("ER")  || rl.startsWith("ER"))  return "erldc@gridindia.in";
  }

  return "";
}

// ── Email routing logic ───────────────────────────────────────────────────────
interface EmailRouting {
  to: string;
  cc: string;
}

export function getEmailRouting(
  actorRole: string,
  action: string,
  initiatorRole: string,
  initiatorRegion: string
): EmailRouting {
  // Normalise actor: any regional RLDC variant → "RLDC"; ADMIN acts as "IT"
  let normalizedActor = actorRole.toUpperCase();
  if (normalizedActor.includes("LDC") && normalizedActor !== "NLDC") normalizedActor = "RLDC";
  if (normalizedActor === "ADMIN") normalizedActor = "IT";

  // Honour explicit NLDC region even when submittedByRole says RLDC
  let trueInitiator = initiatorRole.toUpperCase();
  if (initiatorRegion === "NLDC") trueInitiator = "NLDC";
  const normalizedInitiator =
    trueInitiator.includes("LDC") && trueInitiator !== "NLDC" ? "RLDC" : trueInitiator;

  const currentIndex  = WORKFLOW_STAGES.indexOf(normalizedActor as any);
  const initiatorIndex = WORKFLOW_STAGES.indexOf(normalizedInitiator as any);
  const isRejected    = action.toUpperCase().includes("REJECT");

  let toEmails: string[] = [];
  let ccEmails: string[] = [];

  if (isRejected) {
    // Send back to the true initiator
    toEmails.push(getEmailForRole(trueInitiator, initiatorRegion));

    // Always CC NLDC on rejections from CISO, SOC, or IT
    if (normalizedActor !== "NLDC" && normalizedInitiator !== "NLDC") {
      ccEmails.push(getEmailForRole("NLDC", initiatorRegion));
    }

    // CC everyone who already approved it
    for (let i = initiatorIndex + 1; i < currentIndex; i++) {
      ccEmails.push(getEmailForRole(WORKFLOW_STAGES[i], initiatorRegion));
    }
  } else {
    const nextRole = WORKFLOW_STAGES[currentIndex + 1];

    if (nextRole === "COMPLETED") {
      // Final approval — notify the initiator
      toEmails.push(getEmailForRole(trueInitiator, initiatorRegion));
    } else if (nextRole) {
      toEmails.push(getEmailForRole(nextRole, initiatorRegion));
    }

    // CC the full chain up to and including the current actor
    for (let i = initiatorIndex; i <= currentIndex; i++) {
      const roleToLookup = WORKFLOW_STAGES[i] === "RLDC" ? trueInitiator : WORKFLOW_STAGES[i];
      ccEmails.push(getEmailForRole(roleToLookup, initiatorRegion));
    }
  }

  // Deduplicate; append the always-CC address if configured
  if (smtpConfig.ccAlways) ccEmails.push(smtpConfig.ccAlways);

  const uniqueTo = [...new Set(toEmails.filter(Boolean))];
  const uniqueCc = [...new Set(ccEmails.filter(Boolean))].filter(
    (e) => !uniqueTo.includes(e)
  );

  return { to: uniqueTo.join(", "), cc: uniqueCc.join(", ") };
}

const PORTAL_URL = process.env.NEXT_PUBLIC_DEV_API_URL ?? "#";

// ── Email templates ───────────────────────────────────────────────────────────
function workflowEmailTemplate(
  ticketNo: string,
  entityName: string,
  actionText: string,
  actionColor: string,
  actorRole: string,
  remarks: string
): string {
  return `
<div style="font-family:Arial,sans-serif;font-size:14px;color:#333;line-height:1.8;max-width:600px;">

  <p>Sir/Madam,</p>

  <p>
    Please be informed that the IP Whitelisting request for <strong>${entityName}</strong>
    (Ticket No: <strong>${ticketNo}</strong>) has been
    <strong style="color:${actionColor};">${actionText}</strong>
    at the <strong>${actorRole}</strong> stage.
  </p>

  <table style="border-collapse:collapse;width:100%;margin:16px 0;">
    <tr>
      <td style="padding:8px 12px;border:1px solid #ddd;background:#f5f5f5;font-weight:bold;width:35%;">Ticket No.</td>
      <td style="padding:8px 12px;border:1px solid #ddd;">${ticketNo}</td>
    </tr>
    <tr>
      <td style="padding:8px 12px;border:1px solid #ddd;background:#f5f5f5;font-weight:bold;">Entity / Beneficiary</td>
      <td style="padding:8px 12px;border:1px solid #ddd;">${entityName}</td>
    </tr>
    <tr>
      <td style="padding:8px 12px;border:1px solid #ddd;background:#f5f5f5;font-weight:bold;">Status</td>
      <td style="padding:8px 12px;border:1px solid #ddd;color:${actionColor};font-weight:bold;">${actionText}</td>
    </tr>
    <tr>
      <td style="padding:8px 12px;border:1px solid #ddd;background:#f5f5f5;font-weight:bold;">Stage</td>
      <td style="padding:8px 12px;border:1px solid #ddd;">${actorRole}</td>
    </tr>
    <tr>
      <td style="padding:8px 12px;border:1px solid #ddd;background:#f5f5f5;font-weight:bold;">Remarks</td>
      <td style="padding:8px 12px;border:1px solid #ddd;">${remarks || "—"}</td>
    </tr>
  </table>

  <p>
    Please log into the <a href="${PORTAL_URL}">WBES Administration Portal</a>
    to view the full timeline and take any further action.
  </p>

  <br/>
  <p>
    धन्यवाद एवं आभार / Thanks and Regards,<br/>
    <strong>WBES Administration Portal</strong><br/>
    Grid Controller of India Limited
  </p>

</div>`;
}

function alertEmailTemplate(
  ticketNo: string,
  entityName: string,
  currentRole: string,
  hoursPending: number
): string {
  return `
<div style="font-family:Arial,sans-serif;font-size:14px;color:#333;line-height:1.8;max-width:600px;">

  <p>Sir/Madam,</p>

  <p>
    This is an automated reminder. An <strong>Emergency</strong> IP Whitelisting request for
    <strong>${entityName}</strong> (Ticket No: <strong>${ticketNo}</strong>) is currently
    pending at the <strong>${currentRole}</strong> stage and has exceeded the expected SLA.
  </p>

  <table style="border-collapse:collapse;width:100%;margin:16px 0;">
    <tr>
      <td style="padding:8px 12px;border:1px solid #ddd;background:#f5f5f5;font-weight:bold;width:35%;">Ticket No.</td>
      <td style="padding:8px 12px;border:1px solid #ddd;">${ticketNo}</td>
    </tr>
    <tr>
      <td style="padding:8px 12px;border:1px solid #ddd;background:#f5f5f5;font-weight:bold;">Entity / Beneficiary</td>
      <td style="padding:8px 12px;border:1px solid #ddd;">${entityName}</td>
    </tr>
    <tr>
      <td style="padding:8px 12px;border:1px solid #ddd;background:#f5f5f5;font-weight:bold;">Pending Stage</td>
      <td style="padding:8px 12px;border:1px solid #ddd;color:#f06548;font-weight:bold;">${currentRole}</td>
    </tr>
    <tr>
      <td style="padding:8px 12px;border:1px solid #ddd;background:#f5f5f5;font-weight:bold;">Time Pending</td>
      <td style="padding:8px 12px;border:1px solid #ddd;color:#f06548;font-weight:bold;">${hoursPending} hour${hoursPending !== 1 ? "s" : ""}</td>
    </tr>
    <tr>
      <td style="padding:8px 12px;border:1px solid #ddd;background:#f5f5f5;font-weight:bold;">Priority</td>
      <td style="padding:8px 12px;border:1px solid #ddd;color:#f06548;font-weight:bold;">EMERGENCY</td>
    </tr>
  </table>

  <p>
    Please log into the <a href="${PORTAL_URL}">WBES Administration Portal</a>
    <strong>immediately</strong> to process this request.
  </p>

  <br/>
  <p>
    धन्यवाद एवं आभार / Thanks and Regards,<br/>
    <strong>WBES Automated System</strong><br/>
    Grid Controller of India Limited
  </p>

</div>`;
}

// ── Public send helpers ───────────────────────────────────────────────────────

function buildWorkflowMailPayload(
  ticketNo: string,
  entityName: string,
  action: string,
  actorRole: string,
  remarks: string,
  initiatorRole: string,
  initiatorRegion: string
) {
  const isRejected  = action.toUpperCase().includes("REJECT");
  const isCompleted = actorRole.toUpperCase() === "IT" || actorRole.toUpperCase() === "ADMIN";
  const isSubmission = actorRole.toUpperCase().includes("LDC") && actorRole.toUpperCase() !== "NLDC";

  const actionText = isRejected
    ? "Rejected"
    : isCompleted
    ? "Fully Approved & Completed"
    : isSubmission
    ? "Submitted / Forwarded"
    : "Approved & Forwarded";

  const actionColor = isRejected ? "#f06548" : "#0ab39c";
  const { to, cc } = getEmailRouting(actorRole, action, initiatorRole, initiatorRegion);

  if (!to && !cc) return null;

  return {
    from:    smtpConfig.from,
    to:      to || smtpConfig.ccAlways,
    cc:      cc || undefined,
    subject: `WBES IP Whitelisting – Ticket ${ticketNo} – ${actionText} by ${actorRole}`,
    html:    workflowEmailTemplate(ticketNo, entityName, actionText, actionColor, actorRole, remarks),
  };
}

export async function sendWorkflowEmail(
  ticketNo: string,
  entityName: string,
  action: string,
  actorRole: string,
  remarks: string,
  initiatorRole: string,
  initiatorRegion: string
): Promise<void> {
  const payload = buildWorkflowMailPayload(ticketNo, entityName, action, actorRole, remarks, initiatorRole, initiatorRegion);
  if (!payload) return;

  try {
    await getTransporter().sendMail(payload);
  } catch (err) {
    // Log but never throw — email failure must not break the workflow
    console.error("[MAIL] sendWorkflowEmail failed:", err);
  }
}

/** Same as sendWorkflowEmail but THROWS on SMTP failure (use only in resend/test routes). */
export async function sendWorkflowEmailOrThrow(
  ticketNo: string,
  entityName: string,
  action: string,
  actorRole: string,
  remarks: string,
  initiatorRole: string,
  initiatorRegion: string
): Promise<void> {
  const payload = buildWorkflowMailPayload(ticketNo, entityName, action, actorRole, remarks, initiatorRole, initiatorRegion);
  if (!payload) throw new Error("No recipients resolved for this request — check region/role configuration.");

  await getTransporter().sendMail(payload);
}

export async function sendAlertEmail(
  ticketNo: string,
  entityName: string,
  currentRole: string,
  initiatorRegion: string,
  submittedByRole: string,
  hoursPending: number
): Promise<void> {
  let normalizedRole = currentRole.toUpperCase();
  if (normalizedRole.includes("LDC") && normalizedRole !== "NLDC") normalizedRole = "RLDC";

  const currentIndex = WORKFLOW_STAGES.indexOf(normalizedRole as any);

  const toEmails: string[] = [];
  const ccEmails: string[] = smtpConfig.ccAlways ? [smtpConfig.ccAlways] : [];

  if (currentIndex !== -1) {
    toEmails.push(getEmailForRole(normalizedRole, initiatorRegion));
    for (let i = 0; i < currentIndex; i++) {
      ccEmails.push(getEmailForRole(WORKFLOW_STAGES[i], initiatorRegion));
    }
    const nextRole = WORKFLOW_STAGES[currentIndex + 1];
    if (nextRole && nextRole !== "COMPLETED") {
      ccEmails.push(getEmailForRole(nextRole, initiatorRegion));
    }
  } else {
    toEmails.push(getEmailForRole(normalizedRole, initiatorRegion));
  }

  const uniqueTo = [...new Set(toEmails.filter(Boolean))];
  const uniqueCc = [...new Set(ccEmails.filter(Boolean))].filter(
    (e) => !uniqueTo.includes(e)
  );

  if (uniqueTo.length === 0) return;

  const subject = `[URGENT – EMERGENCY TICKET] WBES Ticket ${ticketNo} pending at ${normalizedRole}`;

  try {
    await getTransporter().sendMail({
      from:    smtpConfig.from,
      to:      uniqueTo.join(", "),
      cc:      uniqueCc.length ? uniqueCc.join(", ") : undefined,
      subject,
      html:    alertEmailTemplate(ticketNo, entityName, normalizedRole, hoursPending),
    });
  } catch (err) {
    console.error("[MAIL] sendAlertEmail failed:", err);
  }
}

// ── Revocation email ──────────────────────────────────────────────────────────
export interface RevocationEmailParams {
  username:    string;
  entityName:  string;
  revokedIps:  string[];
  actorRole:   string;
  actorName:   string;
  region:      string;
}

export async function sendRevocationEmail(p: RevocationEmailParams): Promise<void> {
  const region = (p.region ?? "UNKNOWN").toUpperCase();

  // TO: IT desk; CC: the full security chain + always-CC address
  const toEmail = getEmailForRole("IT", region) || smtpConfig.ccAlways;
  const ccAddresses = [
    getEmailForRole("RLDC", region),
    getEmailForRole("NLDC", region),
    getEmailForRole("CISO", region),
    getEmailForRole("SOC",  region),
    smtpConfig.ccAlways,
  ];

  const uniqueCc = [...new Set(ccAddresses.filter(Boolean))].filter(
    (e) => e !== toEmail
  );

  if (!toEmail) return;

  const subject =
    p.revokedIps.length === 1
      ? `[SECURITY ALERT] Manual IP Revocation – ${p.username}`
      : `[SECURITY ALERT] Manual IP Revocation (${p.revokedIps.length} IPs) – ${p.username}`;

  const ipList = p.revokedIps.map((ip) => `<li style="padding:2px 0;">${ip}</li>`).join("");

  const html = `
<div style="font-family:Arial,sans-serif;font-size:14px;color:#333;line-height:1.8;max-width:600px;">

  <p>Sir/Madam,</p>

  <p>
    Please be informed that the following active IP address(es) for
    <strong>${p.username}</strong> have been <strong style="color:#f06548;">Manually Revoked</strong>
    outside the standard whitelisting workflow.
  </p>

  <table style="border-collapse:collapse;width:100%;margin:16px 0;">
    <tr>
      <td style="padding:8px 12px;border:1px solid #ddd;background:#f5f5f5;font-weight:bold;width:35%;">Username</td>
      <td style="padding:8px 12px;border:1px solid #ddd;">${p.username}</td>
    </tr>
    <tr>
      <td style="padding:8px 12px;border:1px solid #ddd;background:#f5f5f5;font-weight:bold;">Entity / Beneficiary</td>
      <td style="padding:8px 12px;border:1px solid #ddd;">${p.entityName}</td>
    </tr>
    <tr>
      <td style="padding:8px 12px;border:1px solid #ddd;background:#f5f5f5;font-weight:bold;">Total IPs Revoked</td>
      <td style="padding:8px 12px;border:1px solid #ddd;color:#f06548;font-weight:bold;">${p.revokedIps.length}</td>
    </tr>
    <tr>
      <td style="padding:8px 12px;border:1px solid #ddd;background:#f5f5f5;font-weight:bold;">Action Performed By</td>
      <td style="padding:8px 12px;border:1px solid #ddd;">${p.actorRole}${p.actorName ? ` (${p.actorName})` : ""}</td>
    </tr>
    <tr>
      <td style="padding:8px 12px;border:1px solid #ddd;background:#f5f5f5;font-weight:bold;">Revoked IP Address(es)</td>
      <td style="padding:8px 12px;border:1px solid #ddd;">
        <ul style="margin:0;padding-left:18px;">${ipList}</ul>
      </td>
    </tr>
  </table>

  <p>
    Please log into the <a href="${PORTAL_URL}">WBES Administration Portal</a>
    to review this action.
  </p>

  <br/>
  <p>
    धन्यवाद एवं आभार / Thanks and Regards,<br/>
    <strong>WBES Administration Portal</strong><br/>
    Grid Controller of India Limited
  </p>

</div>`;

  try {
    await getTransporter().sendMail({
      from:    smtpConfig.from,
      to:      toEmail,
      cc:      uniqueCc.length ? uniqueCc.join(", ") : undefined,
      subject,
      html,
    });
  } catch (err) {
    console.error("[MAIL] sendRevocationEmail failed:", err);
  }
}
