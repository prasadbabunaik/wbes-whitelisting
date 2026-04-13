"use client";
import AllRequestsTable from "@/components/request/AllRequestsTable";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { Role } from "@prisma/client";

export default function CISOPage() {
  return (
    <RoleGuard allowedRoles={[Role.CISO, Role.ADMIN]}>
      <AllRequestsTable simulatedRole={Role.CISO} pageTitle="CISO Approval Dashboard" />
    </RoleGuard>
  );
}