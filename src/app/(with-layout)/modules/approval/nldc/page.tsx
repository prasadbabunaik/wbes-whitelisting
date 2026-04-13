"use client";
import AllRequestsTable from "@/components/request/AllRequestsTable";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { Role } from "@prisma/client";

export default function NLDCPage() {
  return (
    <RoleGuard allowedRoles={[Role.NLDC, Role.ADMIN]}>
      <AllRequestsTable simulatedRole={Role.NLDC} pageTitle="NLDC Review Dashboard" />
    </RoleGuard>
  );
}