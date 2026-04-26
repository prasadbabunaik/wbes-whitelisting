const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding dummy requests...");

  // ── 1. Fetch seeded users ─────────────────────────────────────────────────
  const users = await prisma.user.findMany({ include: { organization: true } });
  const byRole = (role: string) => users.find((u: any) => u.role === role);
  const byEmail = (email: string) => users.find((u: any) => u.email === email);

  const adminUser  = byRole("ADMIN");
  const nldcUser   = byEmail("nldc@gridindia.in");
  const cisoUser   = byEmail("ciso@gridindia.in");
  const socUser    = byEmail("soc@gridindia.in");
  const itUser     = byEmail("it@gridindia.in");
  const srldcUser  = byEmail("srldc@gridindia.in");
  const nrldcUser  = byEmail("nrldc@gridindia.in");
  const wrldcUser  = byEmail("wrldc@gridindia.in");
  const erldcUser  = byEmail("erldc@gridindia.in");
  const nerldcUser = byEmail("nerldc@gridindia.in");

  if (!nldcUser || !srldcUser) throw new Error("Core users not found — run prisma db seed first.");

  // ── 2. Ensure entities exist ──────────────────────────────────────────────
  const entityDefs = [
    { name: "TAMILNADU SLDC",  region: "SRLDC" },
    { name: "APSLDC",          region: "SRLDC" },
    { name: "KSEB",            region: "SRLDC" },
    { name: "MSEDCL",          region: "WRLDC" },
    { name: "PGCIL NRLDC",     region: "NRLDC" },
    { name: "DVC",             region: "ERLDC" },
    { name: "MEGHALAYA SLDC",  region: "NERLDC" },
    { name: "KARNATAKASLDC",   region: "SRLDC" },
    { name: "UPPCL",           region: "NRLDC" },
  ];

  const entityMap: Record<string, any> = {};
  for (const def of entityDefs) {
    entityMap[def.name] = await prisma.entity.upsert({
      where: { name: def.name },
      update: { region: def.region },
      create: { name: def.name, region: def.region },
    });
  }

  // Helper: map entity RLDC user
  const regionUser: Record<string, any> = {
    SRLDC:  srldcUser,
    NRLDC:  nrldcUser,
    WRLDC:  wrldcUser,
    ERLDC:  erldcUser,
    NERLDC: nerldcUser,
    NLDC:   nldcUser,
  };

  // ── 3. Delete old dummy requests ──────────────────────────────────────────
  await prisma.ipRequest.deleteMany({
    where: { ticketNo: { startsWith: "WBES-DUMMY-" } },
  });

  // ── 4. Seed requests ──────────────────────────────────────────────────────
  type ReqDef = {
    ticketNo: string;
    entityName: string;
    region: string;
    username: string;
    contactPerson: string;
    email: string;
    phone: string;
    location: string;
    category: string;
    status: string;
    currentRole: string;
    submittedByRole: string;
    reason: string;
    ips: string[];
    isEmergency?: boolean;
    duration?: string;
    isApiAccess?: boolean;
    logs: { stage: string; action: string; role: string; remarks: string; actorEmail: string }[];
  };

  const requestDefs: ReqDef[] = [
    // ── STAGE: UNDER_NLDC_REVIEW (submitted by RLDC, pending with NLDC) ──────
    {
      ticketNo: "WBES-DUMMY-001",
      entityName: "TAMILNADU SLDC", region: "SRLDC",
      username: "tn_user01", contactPerson: "Ramesh Kumar", email: "ramesh@tnsldc.in",
      phone: "9876543210", location: "Chennai",
      category: "NEW_USER", status: "UNDER_NLDC_REVIEW", currentRole: "NLDC",
      submittedByRole: "RLDC", reason: "New user requires WBES portal access for real-time scheduling.",
      ips: ["10.10.1.1", "10.10.1.2"],
      logs: [
        { stage: "NLDC", action: "FORWARDED", role: "RLDC", remarks: "Forwarding to NLDC for review.", actorEmail: "srldc@gridindia.in" },
      ],
    },
    {
      ticketNo: "WBES-DUMMY-002",
      entityName: "APSLDC", region: "SRLDC",
      username: "ap_user01", contactPerson: "Venkat Rao", email: "venkat@apsldc.in",
      phone: "9123456780", location: "Hyderabad",
      category: "EXISTING_USER", status: "UNDER_NLDC_REVIEW", currentRole: "NLDC",
      submittedByRole: "RLDC", reason: "Additional IP required for backup connectivity.",
      ips: ["172.16.5.10"],
      isApiAccess: true,
      logs: [
        { stage: "NLDC", action: "FORWARDED", role: "RLDC", remarks: "Forwarding for NLDC approval.", actorEmail: "srldc@gridindia.in" },
      ],
    },
    {
      ticketNo: "WBES-DUMMY-003",
      entityName: "KSEB", region: "SRLDC",
      username: "kseb_user02", contactPerson: "Priya Nair", email: "priya@kseb.in",
      phone: "9988776655", location: "Thiruvananthapuram",
      category: "NEW_USER", status: "UNDER_NLDC_REVIEW", currentRole: "NLDC",
      submittedByRole: "RLDC", isEmergency: true, duration: "48 hours",
      reason: "Emergency access required due to outage — temporary connectivity needed.",
      ips: ["192.168.10.5", "192.168.10.6"],
      logs: [
        { stage: "NLDC", action: "FORWARDED", role: "RLDC", remarks: "Emergency — please prioritise.", actorEmail: "srldc@gridindia.in" },
      ],
    },

    // ── STAGE: SENT_TO_CISO (NLDC forwarded, pending with CISO) ─────────────
    {
      ticketNo: "WBES-DUMMY-004",
      entityName: "MSEDCL", region: "WRLDC",
      username: "ms_user01", contactPerson: "Sunil Patil", email: "sunil@msedcl.in",
      phone: "9012345678", location: "Mumbai",
      category: "NEW_USER", status: "SENT_TO_CISO", currentRole: "CISO",
      submittedByRole: "RLDC", reason: "MSEDCL requires IP whitelisting for SCADA integration.",
      ips: ["10.20.30.1", "10.20.30.2", "10.20.30.3"],
      logs: [
        { stage: "NLDC", action: "FORWARDED", role: "RLDC", remarks: "Forwarded to NLDC for initial review.", actorEmail: "wrldc@gridindia.in" },
        { stage: "CISO", action: "FORWARDED", role: "NLDC", remarks: "NLDC verified — forwarding to CISO for security approval.", actorEmail: "nldc@gridindia.in" },
      ],
    },
    {
      ticketNo: "WBES-DUMMY-005",
      entityName: "PGCIL NRLDC", region: "NRLDC",
      username: "pgcil_user01", contactPerson: "Amit Singh", email: "amit@pgcil.in",
      phone: "9988001122", location: "New Delhi",
      category: "EXISTING_USER", status: "SENT_TO_CISO", currentRole: "CISO",
      submittedByRole: "NLDC", reason: "NLDC submitting on behalf of PGCIL for additional IP access.",
      ips: ["10.0.0.10", "10.0.0.11"],
      isApiAccess: true,
      logs: [
        { stage: "CISO", action: "FORWARDED", role: "NLDC", remarks: "Reviewed and forwarding to CISO.", actorEmail: "nldc@gridindia.in" },
      ],
    },
    {
      ticketNo: "WBES-DUMMY-006",
      entityName: "UPPCL", region: "NRLDC",
      username: "up_user01", contactPerson: "Rajesh Yadav", email: "rajesh@uppcl.in",
      phone: "9876501234", location: "Lucknow",
      category: "NEW_USER", status: "SENT_TO_CISO", currentRole: "CISO",
      submittedByRole: "RLDC", reason: "New UPPCL scheduler requires WBES access.",
      ips: ["172.24.1.100"],
      logs: [
        { stage: "NLDC", action: "FORWARDED", role: "RLDC", remarks: "Forwarding to NLDC.", actorEmail: "nrldc@gridindia.in" },
        { stage: "CISO", action: "FORWARDED", role: "NLDC", remarks: "NLDC review complete. Sending to CISO.", actorEmail: "nldc@gridindia.in" },
      ],
    },

    // ── STAGE: SENT_TO_SOC (CISO approved, pending with SOC) ────────────────
    {
      ticketNo: "WBES-DUMMY-007",
      entityName: "DVC", region: "ERLDC",
      username: "dvc_user01", contactPerson: "Tapas Roy", email: "tapas@dvc.in",
      phone: "9337654321", location: "Kolkata",
      category: "NEW_USER", status: "SENT_TO_SOC", currentRole: "SOC",
      submittedByRole: "RLDC", reason: "DVC real-time metering access required.",
      ips: ["192.168.50.5", "192.168.50.6"],
      logs: [
        { stage: "NLDC", action: "FORWARDED", role: "RLDC", remarks: "Forwarding to NLDC.", actorEmail: "erldc@gridindia.in" },
        { stage: "CISO", action: "FORWARDED", role: "NLDC", remarks: "NLDC review complete.", actorEmail: "nldc@gridindia.in" },
        { stage: "SOC", action: "FORWARDED", role: "CISO", remarks: "CISO approved — forwarding to SOC for security clearance.", actorEmail: "ciso@gridindia.in" },
      ],
    },
    {
      ticketNo: "WBES-DUMMY-008",
      entityName: "KARNATAKASLDC", region: "SRLDC",
      username: "ka_user01", contactPerson: "Suresh Gowda", email: "suresh@ksldc.in",
      phone: "9845012345", location: "Bengaluru",
      category: "EXISTING_USER", status: "SENT_TO_SOC", currentRole: "SOC",
      submittedByRole: "RLDC", reason: "IP range update for Karnataka SLDC backup system.",
      ips: ["10.100.5.1", "10.100.5.2"],
      logs: [
        { stage: "NLDC", action: "FORWARDED", role: "RLDC", remarks: "Forwarded to NLDC for review.", actorEmail: "srldc@gridindia.in" },
        { stage: "CISO", action: "FORWARDED", role: "NLDC", remarks: "NLDC approved.", actorEmail: "nldc@gridindia.in" },
        { stage: "SOC", action: "FORWARDED", role: "CISO", remarks: "Security policy check cleared.", actorEmail: "ciso@gridindia.in" },
      ],
    },

    // ── STAGE: SOC_VERIFIED (SOC approved, pending with IT) ─────────────────
    {
      ticketNo: "WBES-DUMMY-009",
      entityName: "MEGHALAYA SLDC", region: "NERLDC",
      username: "meg_user01", contactPerson: "John Sangma", email: "john@megsldc.in",
      phone: "9402112233", location: "Shillong",
      category: "NEW_USER", status: "SOC_VERIFIED", currentRole: "IT",
      submittedByRole: "RLDC", reason: "New scheduler for NER region requires portal access.",
      ips: ["172.30.1.1", "172.30.1.2", "172.30.1.3"],
      logs: [
        { stage: "NLDC", action: "FORWARDED", role: "RLDC", remarks: "Forwarding to NLDC.", actorEmail: "nerldc@gridindia.in" },
        { stage: "CISO", action: "FORWARDED", role: "NLDC", remarks: "NLDC cleared.", actorEmail: "nldc@gridindia.in" },
        { stage: "SOC", action: "FORWARDED", role: "CISO", remarks: "CISO approved.", actorEmail: "ciso@gridindia.in" },
        { stage: "IT", action: "FORWARDED", role: "SOC", remarks: "SOC verified — forwarding to IT for implementation.", actorEmail: "soc@gridindia.in" },
      ],
    },
    {
      ticketNo: "WBES-DUMMY-010",
      entityName: "TAMILNADU SLDC", region: "SRLDC",
      username: "tn_user02", contactPerson: "Deepa Krishnan", email: "deepa@tnsldc.in",
      phone: "9751234560", location: "Chennai",
      category: "EXISTING_USER", status: "SOC_VERIFIED", currentRole: "IT",
      submittedByRole: "RLDC", reason: "Additional IPs for DR site connectivity.",
      ips: ["10.10.2.1", "10.10.2.2"],
      isApiAccess: true,
      logs: [
        { stage: "NLDC", action: "FORWARDED", role: "RLDC", remarks: "Forwarding to NLDC.", actorEmail: "srldc@gridindia.in" },
        { stage: "CISO", action: "FORWARDED", role: "NLDC", remarks: "NLDC review complete.", actorEmail: "nldc@gridindia.in" },
        { stage: "SOC", action: "FORWARDED", role: "CISO", remarks: "CISO approved.", actorEmail: "ciso@gridindia.in" },
        { stage: "IT", action: "FORWARDED", role: "SOC", remarks: "SOC verified all IPs — cleared for whitelisting.", actorEmail: "soc@gridindia.in" },
      ],
    },

    // ── STAGE: COMPLETED ─────────────────────────────────────────────────────
    {
      ticketNo: "WBES-DUMMY-011",
      entityName: "APSLDC", region: "SRLDC",
      username: "ap_user02", contactPerson: "Srinivas Reddy", email: "srinivas@apsldc.in",
      phone: "9391234567", location: "Vijayawada",
      category: "NEW_USER", status: "COMPLETED", currentRole: "ADMIN",
      submittedByRole: "RLDC", reason: "New user onboarded — WBES access required.",
      ips: ["172.16.10.1", "172.16.10.2"],
      logs: [
        { stage: "NLDC", action: "FORWARDED", role: "RLDC", remarks: "Forwarding to NLDC for review.", actorEmail: "srldc@gridindia.in" },
        { stage: "CISO", action: "FORWARDED", role: "NLDC", remarks: "NLDC review done. Sending to CISO.", actorEmail: "nldc@gridindia.in" },
        { stage: "SOC", action: "FORWARDED", role: "CISO", remarks: "CISO approved after policy check.", actorEmail: "ciso@gridindia.in" },
        { stage: "IT", action: "FORWARDED", role: "SOC", remarks: "SOC verified. No threats detected.", actorEmail: "soc@gridindia.in" },
        { stage: "IT", action: "APPROVED", role: "IT", remarks: "IPs whitelisted in firewall. Access granted.", actorEmail: "it@gridindia.in" },
      ],
    },
    {
      ticketNo: "WBES-DUMMY-012",
      entityName: "MSEDCL", region: "WRLDC",
      username: "ms_user02", contactPerson: "Nandini Joshi", email: "nandini@msedcl.in",
      phone: "9820011223", location: "Pune",
      category: "EXISTING_USER", status: "COMPLETED", currentRole: "ADMIN",
      submittedByRole: "NLDC", reason: "NLDC-initiated access update for MSEDCL DR system.",
      ips: ["10.20.40.1"],
      isApiAccess: true,
      logs: [
        { stage: "CISO", action: "FORWARDED", role: "NLDC", remarks: "NLDC directly forwarding to CISO.", actorEmail: "nldc@gridindia.in" },
        { stage: "SOC", action: "FORWARDED", role: "CISO", remarks: "CISO approved.", actorEmail: "ciso@gridindia.in" },
        { stage: "IT", action: "FORWARDED", role: "SOC", remarks: "SOC security scan passed.", actorEmail: "soc@gridindia.in" },
        { stage: "IT", action: "APPROVED", role: "IT", remarks: "Access implemented successfully.", actorEmail: "it@gridindia.in" },
      ],
    },
    {
      ticketNo: "WBES-DUMMY-013",
      entityName: "DVC", region: "ERLDC",
      username: "dvc_user02", contactPerson: "Arjun Biswas", email: "arjun@dvc.in",
      phone: "9434001122", location: "Jharkhand",
      category: "NEW_USER", status: "COMPLETED", currentRole: "ADMIN",
      submittedByRole: "RLDC", reason: "DVC scheduler access for eastern region grid management.",
      ips: ["192.168.50.10", "192.168.50.11"],
      logs: [
        { stage: "NLDC", action: "FORWARDED", role: "RLDC", remarks: "Forwarded to NLDC.", actorEmail: "erldc@gridindia.in" },
        { stage: "CISO", action: "FORWARDED", role: "NLDC", remarks: "Forwarded to CISO after review.", actorEmail: "nldc@gridindia.in" },
        { stage: "SOC", action: "FORWARDED", role: "CISO", remarks: "Approved by CISO.", actorEmail: "ciso@gridindia.in" },
        { stage: "IT", action: "FORWARDED", role: "SOC", remarks: "SOC verified.", actorEmail: "soc@gridindia.in" },
        { stage: "IT", action: "APPROVED", role: "IT", remarks: "Whitelisted. User can now access WBES.", actorEmail: "it@gridindia.in" },
      ],
    },

    // ── STAGE: REJECTED ───────────────────────────────────────────────────────
    {
      ticketNo: "WBES-DUMMY-014",
      entityName: "KSEB", region: "SRLDC",
      username: "kseb_user03", contactPerson: "Manoj Thomas", email: "manoj@kseb.in",
      phone: "9847123456", location: "Kochi",
      category: "NEW_USER", status: "REJECTED", currentRole: "RLDC",
      submittedByRole: "RLDC", reason: "New KSEB user onboarding request.",
      ips: ["192.168.200.1"],
      logs: [
        { stage: "NLDC", action: "FORWARDED", role: "RLDC", remarks: "Forwarding to NLDC.", actorEmail: "srldc@gridindia.in" },
        { stage: "NLDC", action: "REJECTED", role: "NLDC", remarks: "IP 192.168.200.1 is a private reserved range — not permitted for whitelisting. Please resubmit with valid IP.", actorEmail: "nldc@gridindia.in" },
      ],
    },
    {
      ticketNo: "WBES-DUMMY-015",
      entityName: "UPPCL", region: "NRLDC",
      username: "up_user02", contactPerson: "Vikram Tiwari", email: "vikram@uppcl.in",
      phone: "9415001234", location: "Varanasi",
      category: "EXISTING_USER", status: "REJECTED", currentRole: "RLDC",
      submittedByRole: "RLDC", reason: "Additional IP for new workstation.",
      ips: ["10.0.0.55", "10.0.0.56", "10.0.0.57"],
      logs: [
        { stage: "NLDC", action: "FORWARDED", role: "RLDC", remarks: "Forwarding to NLDC.", actorEmail: "nrldc@gridindia.in" },
        { stage: "CISO", action: "FORWARDED", role: "NLDC", remarks: "NLDC cleared.", actorEmail: "nldc@gridindia.in" },
        { stage: "CISO", action: "REJECTED", role: "CISO", remarks: "IP range overlaps with internal NLDC reserved subnet. Request cannot be approved.", actorEmail: "ciso@gridindia.in" },
      ],
    },
  ];

  // ── 5. Create all requests ────────────────────────────────────────────────
  for (const def of requestDefs) {
    const rldc = regionUser[def.region] || nldcUser;
    const submitter = def.submittedByRole === "NLDC" ? nldcUser : rldc;
    const org = submitter.organization;

    const request = await prisma.ipRequest.create({
      data: {
        ticketNo:       def.ticketNo,
        userId:         submitter.id,
        organizationId: org.id,
        category:       def.category,
        status:         def.status,
        currentRole:    def.currentRole,
        submittedByRole: def.submittedByRole,
        entityName:     def.entityName,
        username:       def.username,
        contactPerson:  def.contactPerson,
        email:          def.email,
        phone:          def.phone,
        location:       def.location,
        reason:         def.reason,
        isEmergency:    def.isEmergency ?? false,
        duration:       def.duration ?? null,
        isApiAccess:    def.isApiAccess ?? false,
        initiatorRegion: def.region,
        ips: {
          create: def.ips.map((ip) => ({ ipAddress: ip })),
        },
      },
    });

    // Create workflow logs
    for (let i = 0; i < def.logs.length; i++) {
      const log = def.logs[i];
      const actor = users.find((u: any) => u.email === log.actorEmail);
      await prisma.workflowLog.create({
        data: {
          requestId:   request.id,
          stage:       log.stage,
          action:      log.action,
          role:        log.role,
          approvedById: actor?.id ?? null,
          remarks:     log.remarks,
          createdAt:   new Date(Date.now() + i * 60_000), // stagger by 1 min each
        },
      });
    }

    // For COMPLETED requests, add IP whitelist entries
    if (def.status === "COMPLETED") {
      for (const ip of def.ips) {
        await prisma.ipWhitelist.upsert({
          where: { id: `whitelist-${def.ticketNo}-${ip.replace(/\./g, "-")}` },
          update: {},
          create: {
            id:        `whitelist-${def.ticketNo}-${ip.replace(/\./g, "-")}`,
            userId:    submitter.id,
            ipAddress: ip,
            active:    true,
            requestId: request.id,
          },
        });
      }
    }

    console.log(`  ✅ ${def.ticketNo} — ${def.entityName} [${def.status}]`);
  }

  console.log(`\n🎉 Done! ${requestDefs.length} dummy requests created.`);
}

main()
  .catch((e) => { console.error("❌ Seed failed:", e); process.exit(1); })
  .finally(() => prisma.$disconnect());
