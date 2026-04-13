import { NextRequest, NextResponse } from "next/server";
import { ipRequestService } from "@/server/services/ipRequestService.service";
import { Role } from "@prisma/client";
import { ipRequestRepository } from "@/server/repositories/ipRequestRepository";
import { validateSecureSession } from "src/lib/auth";

// GET API (ROLE BASED)
export async function GET(req: NextRequest) {
  try {

    // VAPT: Validate HttpOnly Cookie (false = no CSRF check)
    const user = await validateSecureSession(req, false);
    const role = req.nextUrl.searchParams.get("role") || undefined;
    const orgId = req.nextUrl.searchParams.get("orgId") || undefined;
    
    // Call the repository directly to pass the firewall parameters
    const data = await ipRequestRepository.findAll(role, orgId);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch requests" }, { status: 500 });
  }
}

// POST API (CREATE REQUEST)
export async function POST(req: NextRequest) {
  try {
    // VAPT: Require Cookie AND CSRF Token Match! (true = require CSRF)
    const user = await validateSecureSession(req, true);
    const body = await req.json();

    // Explicitly format the new Emergency and API fields before sending to the service
    const requestPayload = {
      ...body,
      isEmergency: body.isEmergency === true,
      duration: body.duration || null,
      isApiAccess: body.isApiAccess === true, // ✅ NEW: Catch API Access flag
    };

    // Extract this role from the actual logged-in user's session token.
    const submitterRole = requestPayload.submittedByRole ? (requestPayload.submittedByRole as Role) : Role.RLDC;

    // Pass the enhanced payload and the submitter role directly to the service
    const request = await ipRequestService.createRequest(requestPayload, submitterRole);

    return NextResponse.json(request, { status: 201 });

  } catch (error: any) {
    console.error("CREATE REQUEST ERROR:", error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}