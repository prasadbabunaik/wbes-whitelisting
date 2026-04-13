import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db/client";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // Next.js 15 requirement
) {
  try {
    // 1. Await the params object
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: "Request ID is required" }, { status: 400 });
    }

    // 2. Delete the parent request. 
    // Because you added `onDelete: Cascade` in your schema.prisma, 
    // this single command will safely and automatically wipe out all 
    // associated workflow logs and IPs without throwing undefined errors!
    await prisma.ipRequest.delete({ 
        where: { id: id } 
    });

    return NextResponse.json({ success: true, message: "Request permanently deleted." });
    
  } catch (error: any) {
    console.error("DELETE REQUEST ERROR:", error.message);
    
    // Handle the case where someone tries to delete a ticket that doesn't exist
    if (error.code === 'P2025') {
      return NextResponse.json({ error: "Request not found or already deleted." }, { status: 404 });
    }

    return NextResponse.json({ error: "Failed to delete request." }, { status: 500 });
  }
}