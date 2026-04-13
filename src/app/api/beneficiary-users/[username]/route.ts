import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db/client";
import { validateSecureSession } from "src/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {

    // VAPT: Validate HttpOnly Cookie (false = no CSRF check)
    const user = await validateSecureSession(req, false);
    const resolvedParams = await params;
    const username = resolvedParams.username;

    // Fetch only COMPLETED requests for this specific user, oldest first
    const userRequests = await prisma.ipRequest.findMany({
      where: { 
        username: username,
        status: "COMPLETED" 
      },
      orderBy: { createdAt: 'asc' },
      include: { ips: true }
    });

    // Calculate Before & After snapshots chronologically
    let currentActiveIps: string[] = [];
    
    const historyLine = userRequests.map(req => {
      const beforeIps = [...currentActiveIps];
      let afterIps = [...currentActiveIps];

      // Subtract removed IP(s)
      if (req.ipToRemove) {
        const removedIps = req.ipToRemove
          .split(",")
          .map((ip: string) => ip.trim())
          .filter(Boolean);
        removedIps.forEach((removeIp: string) => {
          afterIps = afterIps.filter(ip => ip !== removeIp);
        });
      }
      
      // Add new IPs
      if (req.ips && Array.isArray(req.ips)) {
        req.ips.forEach((ipObj: any) => {
          if (!afterIps.includes(ipObj.ipAddress)) {
            afterIps.push(ipObj.ipAddress);
          }
        });
      }

      // Update the running tally
      currentActiveIps = [...afterIps];

      return {
        ...req,
        beforeIps,
        afterIps
      };
    });

    // Reverse so the newest changes show at the top of the timeline
    historyLine.reverse();

    return NextResponse.json({ success: true, data: historyLine, currentActiveIps });
  } catch (error) {
    console.error("Error fetching user history:", error);
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
  }
}