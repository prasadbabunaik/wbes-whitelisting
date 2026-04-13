import { NextResponse } from "next/server";
import { prisma } from "@/server/db/client"; 
import { validateSecureSession } from "@/lib/auth";

// GET: Fetch entities based on Jurisdiction
export async function GET(req: Request) {
  try {
    // 🛡️ VAPT: Validate HttpOnly Cookie (Backend securely knows who the user is)
    const user = await validateSecureSession(req, false);

    let whereClause: any = {};

    // 🛡️ MULTI-TENANCY FIREWALL (Enforced securely via DB Session, ignoring URL params)
    if (user.role === "RLDC" && user.organizationId) {
        const userOrg = await prisma.organization.findUnique({
            where: { id: user.organizationId },
            select: { name: true }
        });
        
        const orgName = userOrg?.name?.toUpperCase() || "";
        let userRegion = "";
        if (orgName.includes("SRLDC")) userRegion = "SRLDC";
        else if (orgName.includes("NRLDC")) userRegion = "NRLDC";
        else if (orgName.includes("WRLDC")) userRegion = "WRLDC";
        else if (orgName.includes("ERLDC")) userRegion = "ERLDC";
        else if (orgName.includes("NERLDC")) userRegion = "NERLDC";

        // Filter by explicit mapping OR matching region column
        whereClause = {
            OR: [
                { region: userRegion }, 
                { controllerMappings: { some: { controller: { organizationId: user.organizationId } } } } 
            ]
        };
    }

    const entities = await prisma.entity.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        region: true,
        createdAt: true,
      },
      orderBy: { name: 'asc' } 
    });

    return NextResponse.json({ success: true, data: entities });
  } catch (error) {
    console.error("Error fetching entities:", error);
    return NextResponse.json({ error: "Failed to fetch entities" }, { status: 500 });
  }
}

// POST: Create a new entity
export async function POST(req: Request) {
  try {
    // 🛡️ VAPT: Require Cookie AND CSRF Token Match! 
    const user = await validateSecureSession(req, true);
    const body = await req.json();
    const { name, region } = body;

    if (!name || name.trim() === "") {
      return NextResponse.json({ error: "Entity name is required" }, { status: 400 });
    }

    // 🛡️ SECURE REGION ASSIGNMENT
    let finalRegion = region;
    
    // If the user is RLDC, force the entity to belong to their region (Prevents "UNKNOWN" bugs)
    if (user.role === "RLDC" && user.organizationId) {
        const userOrg = await prisma.organization.findUnique({ where: { id: user.organizationId }});
        const orgName = userOrg?.name?.toUpperCase() || "";
        if (orgName.includes("SRLDC")) finalRegion = "SRLDC";
        else if (orgName.includes("NRLDC")) finalRegion = "NRLDC";
        else if (orgName.includes("WRLDC")) finalRegion = "WRLDC";
        else if (orgName.includes("ERLDC")) finalRegion = "ERLDC";
        else if (orgName.includes("NERLDC")) finalRegion = "NERLDC";
    } 
    // Fallback parsing for NLDC/Admins creating entities
    else if (!finalRegion || finalRegion === "UNKNOWN") {
        const upperName = name.toUpperCase();
        if (upperName.includes("SRLDC")) finalRegion = "SRLDC";
        else if (upperName.includes("NRLDC")) finalRegion = "NRLDC";
        else if (upperName.includes("WRLDC")) finalRegion = "WRLDC";
        else if (upperName.includes("ERLDC")) finalRegion = "ERLDC";
        else if (upperName.includes("NERLDC")) finalRegion = "NERLDC";
    }

    const newEntity = await prisma.entity.create({
      data: { 
        name: name.trim(),
        region: finalRegion || "UNKNOWN" 
      }
    });

    return NextResponse.json({ success: true, data: newEntity });
  } catch (error: any) {
    console.error("Error creating entity:", error);
    if (error.message?.includes("Forbidden")) return NextResponse.json({ error: "CSRF Validation Failed" }, { status: 403 });
    if (error.code === 'P2002') return NextResponse.json({ error: "An entity with this name already exists." }, { status: 400 });
    return NextResponse.json({ error: "Failed to create entity" }, { status: 500 });
  }
}

// PUT: Update an existing entity
export async function PUT(req: Request) {
  try {
    // 🛡️ VAPT: Require Cookie AND CSRF Token Match!
    const user = await validateSecureSession(req, true);
    const body = await req.json();
    const { id, name, region } = body;

    if (!id) return NextResponse.json({ error: "Entity ID is required for updating" }, { status: 400 });
    if (!name || name.trim() === "") return NextResponse.json({ error: "Entity name cannot be empty" }, { status: 400 });

    const updatedEntity = await prisma.entity.update({
      where: { id },
      data: { 
        name: name.trim(),
        region: region || "UNKNOWN" 
      }
    });

    return NextResponse.json({ success: true, data: updatedEntity });
  } catch (error: any) {
    console.error("Error updating entity:", error);
    if (error.message?.includes("Forbidden")) return NextResponse.json({ error: "CSRF Validation Failed" }, { status: 403 });
    if (error.code === 'P2002') return NextResponse.json({ error: "Another entity with this name already exists." }, { status: 400 });
    return NextResponse.json({ error: "Failed to update entity" }, { status: 500 });
  }
}