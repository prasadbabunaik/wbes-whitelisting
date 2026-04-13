import { NextResponse } from "next/server";
import { prisma } from "@/server/db/client"; 
import { validateSecureSession } from "src/lib/auth";

export async function GET(req: Request) {
  try {

    // VAPT: Validate HttpOnly Cookie (false = no CSRF check)
    const user = await validateSecureSession(req, false);
    // 1. Fetch all users from the database
    const users = await prisma.user.findMany();

    // 2. Format the data so the frontend dropdown filter works
    const formattedUsers = users.map((u: any) => ({
      ...u,
      // CRITICAL: The frontend filters the username dropdown by matching 'entityName'.
      // If your database uses 'organizationId' or a relation, map it here:
      entityName: u.entityName || u.organizationId || "", 
      
      // If your DB doesn't store IPs directly on the user, default to an empty array
      availableIps: u.availableIps || [] 
    }));

    return NextResponse.json({ success: true, data: formattedUsers });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}