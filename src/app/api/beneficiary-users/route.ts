import { NextResponse } from "next/server";
import { prisma } from "@/server/db/client"; 
import { validateSecureSession } from "src/lib/auth";

export async function GET(req: Request) {
  try {

    //  VAPT: Validate HttpOnly Cookie (false = no CSRF check)
    const user = await validateSecureSession(req, false);
    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role") || "";
    const orgId = searchParams.get("orgId") || "";

    // ✅ FIX 1: Fetch chronologically (asc) so we can replay history (Additions -> Removals -> Additions)
    const approvedRequests = await prisma.ipRequest.findMany({
      where: { status: "COMPLETED" },
      include: { ips: true },
      orderBy: { createdAt: 'asc' } 
    });

    // 🛡️ DYNAMIC DATABASE-DRIVEN FIREWALL
    let allowedEntityNames: string[] = [];
    let userRegion = "UNKNOWN";
    
    if (role === "RLDC" && orgId) {
        const userOrg = await prisma.organization.findUnique({
            where: { id: orgId },
            select: { name: true }
        });
        const orgName = userOrg?.name?.toUpperCase() || "";
        
        if (orgName.includes("SRLDC")) userRegion = "SRLDC";
        else if (orgName.includes("NRLDC")) userRegion = "NRLDC";
        else if (orgName.includes("WRLDC")) userRegion = "WRLDC";
        else if (orgName.includes("ERLDC")) userRegion = "ERLDC";
        else if (orgName.includes("NERLDC")) userRegion = "NERLDC";

        const allowedEntities = await prisma.entity.findMany({
            where: { region: userRegion },
            select: { name: true }
        });
        allowedEntityNames = allowedEntities.map((e: any) => e.name);
    }

    const userMap = new Map();

    approvedRequests.forEach((req: any) => {
      if (!req.username || !req.entityName) return;

      // Skip if RLDC user is trying to view an entity outside their mapped region
      if (role === "RLDC" && orgId && !allowedEntityNames.includes(req.entityName) && req.initiatorRegion !== userRegion) {
          return; 
      }

      const key = `${req.entityName}_${req.username}`;

      if (!userMap.has(key)) {
        userMap.set(key, {
          entityName: req.entityName,
          username: req.username,
          contactPerson: req.contactPerson || "",
          email: req.email || "",
          phone: req.phone || "",
          location: req.location || "",
          // ✅ FIX 2: Use a Set to handle pure mathematics (Adding and Deleting IPs)
          activeIpsSet: new Set<string>()
        });
      }

      const profile = userMap.get(key);

      // Overwrite profile info with newest data (since we are looping asc oldest->newest)
      if (req.contactPerson) profile.contactPerson = req.contactPerson;
      if (req.email) profile.email = req.email;
      if (req.phone) profile.phone = req.phone;
      if (req.location) profile.location = req.location;

      // ✅ FIX 3: Add new IPs from this request
      if (req.ips && Array.isArray(req.ips)) {
         req.ips.forEach((ipRecord: any) => {
             profile.activeIpsSet.add(ipRecord.ipAddress);
         });
      }

      // ✅ FIX 4: Immediately subtract any revoked IPs listed in this request
      if (req.ipToRemove) {
          const removedIps = req.ipToRemove.split(',').map((ip: string) => ip.trim()).filter(Boolean);
          removedIps.forEach((ip: string) => {
              profile.activeIpsSet.delete(ip);
          });
      }
    });

    // ✅ FIX 5: Convert Sets back into standard arrays for the frontend response
    const externalUsers = Array.from(userMap.values()).map((user: any) => {
        const availableIps = Array.from(user.activeIpsSet);
        return {
            entityName: user.entityName,
            username: user.username,
            contactPerson: user.contactPerson,
            email: user.email,
            phone: user.phone,
            location: user.location,
            totalIps: availableIps.length,
            availableIps: availableIps
        };
    });

    return NextResponse.json({ success: true, data: externalUsers });

  } catch (error) {
    console.error("API Error fetching beneficiary users:", error);
    return NextResponse.json({ error: "Failed to fetch external users" }, { status: 500 });
  }
}