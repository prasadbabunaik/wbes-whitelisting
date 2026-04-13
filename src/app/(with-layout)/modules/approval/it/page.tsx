"use client";
import AllRequestsTable from "@/components/request/AllRequestsTable";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { Role } from "@prisma/client";

export default function ITPage() {
  return (
    <RoleGuard allowedRoles={[Role.IT, Role.ADMIN]}>
      <AllRequestsTable simulatedRole={Role.IT} pageTitle="IT Implementation Dashboard" />
    </RoleGuard>
  );
}