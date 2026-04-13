"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner } from "reactstrap";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export const RoleGuard = ({ children, allowedRoles }: RoleGuardProps) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const verifySecureAccess = async () => {
      try {
        // VAPT: Securely verify the HttpOnly session cookie against the DB
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        const data = await res.json();

        if (!res.ok || !data.success) {
          console.warn("⛔ Session Invalid or Expired. Redirecting to login.");
          router.replace("/auth/login");
          return;
        }

        const userRole = data.user.role.toUpperCase();
        const safeAllowedRoles = allowedRoles.map(role => role.toUpperCase());

        if (!safeAllowedRoles.includes(userRole)) {
          console.warn(`⛔ Role Blocked. Required: [${safeAllowedRoles}]. Found: ${userRole}`);
          router.replace("/dashboard"); 
        } else {
          setAuthorized(true);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        router.replace("/auth/login");
      } finally {
        setIsChecking(false);
      }
    };

    verifySecureAccess();
  }, [router, allowedRoles]);

  if (isChecking || !authorized) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
        <Spinner color="primary" />
        <span className="ms-2 text-muted fw-medium">Verifying Security Clearance...</span>
      </div>
    );
  }

  return <>{children}</>;
};