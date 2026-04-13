"use client";
import AllRequestsTable from "@/components/request/AllRequestsTable";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { Role } from "@prisma/client";

export default function SOCPage() {
  return (
    <RoleGuard allowedRoles={[Role.SOC, Role.ADMIN]}>
      <AllRequestsTable simulatedRole={Role.SOC} pageTitle="SOC Security Clearance" />
    </RoleGuard>
  );
}