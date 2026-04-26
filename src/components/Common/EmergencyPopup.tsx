"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Modal, ModalHeader, ModalBody, ModalFooter, Badge, Button } from "reactstrap";

interface PendingEmergency {
  id: string;
  ticketNo: string;
  entityName: string;
  username: string;
  currentRole: string;
  createdAt: string;
  updatedAt: string;
  duration: string | null;
}

const ROLE_LINK: Record<string, string> = {
  NLDC:  "/modules/approval/nldc",
  CISO:  "/modules/approval/ciso",
  SOC:   "/modules/approval/soc",
  IT:    "/modules/approval/it",
  RLDC:  "/modules/request/all",
  ADMIN: "/modules/request/all",
};

const SESSION_KEY = "wbes_emergency_popup_shown";

function hoursAgo(dateStr: string) {
  return Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60));
}

const EmergencyPopup: React.FC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen]               = useState(false);
  const [emergencies, setEmergencies]     = useState<PendingEmergency[]>([]);
  const [userRole, setUserRole]           = useState<string>("");
  const checkedRef                        = useRef(false);

  const fetchAndShow = useCallback(async () => {
    if (checkedRef.current) return;
    checkedRef.current = true;

    // Only show once per browser session
    if (sessionStorage.getItem(SESSION_KEY)) return;

    try {
      const meRes = await fetch("/api/auth/me");
      if (!meRes.ok) return;
      const meData = await meRes.json();
      const role = meData.user?.role?.toUpperCase() ?? "";
      setUserRole(role);

      // ADMIN and NLDC see everything; others see only their own stage
      const res = await fetch(`/api/ip-request?role=${role}&orgId=${meData.user?.organizationId ?? ""}`);
      if (!res.ok) return;
      const data: any[] = await res.json();

      const pending = data.filter(
        (r) =>
          r.isEmergency === true &&
          r.status !== "COMPLETED" &&
          r.status !== "REJECTED" &&
          (role === "ADMIN" || role === "NLDC" || r.currentRole === role)
      );

      if (pending.length > 0) {
        setEmergencies(pending);
        setIsOpen(true);
        sessionStorage.setItem(SESSION_KEY, "1");
      }
    } catch (_) {}
  }, []);

  useEffect(() => {
    // Wait a moment for auth to settle after login redirect
    const t = setTimeout(fetchAndShow, 1200);
    return () => clearTimeout(t);
  }, [fetchAndShow]);

  const navigateTo = (role: string) => {
    setIsOpen(false);
    const link = ROLE_LINK[role] ?? ROLE_LINK["ADMIN"];
    router.push(link);
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @keyframes em-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(240,101,72,0.5); }
          50%       { box-shadow: 0 0 0 10px rgba(240,101,72,0); }
        }
        .em-header-pulse { animation: em-pulse 1.8s infinite; }
      `}</style>

      <Modal isOpen={isOpen} centered size="lg" backdrop="static" toggle={() => setIsOpen(false)}>
        <ModalHeader
          toggle={() => setIsOpen(false)}
          className="bg-danger text-white em-header-pulse"
          style={{ borderRadius: "8px 8px 0 0" }}
        >
          <span className="d-flex align-items-center gap-2">
            <i className="ri-alarm-warning-fill fs-20"></i>
            <span>
              {emergencies.length} Emergency Request{emergencies.length > 1 ? "s" : ""} Pending Your Action
            </span>
          </span>
        </ModalHeader>

        <ModalBody className="p-0">
          <div className="px-4 pt-3 pb-1">
            <p className="text-muted mb-3" style={{ fontSize: "13px" }}>
              The following emergency IP whitelisting requests require your immediate attention.
              Please review and act on them as soon as possible.
            </p>
          </div>

          <div style={{ maxHeight: "340px", overflowY: "auto" }}>
            {emergencies.map((req) => {
              const hours = hoursAgo(req.updatedAt);
              return (
                <div
                  key={req.id}
                  className="d-flex justify-content-between align-items-start px-4 py-3 border-top"
                  style={{ background: "rgba(240,101,72,0.04)" }}
                >
                  <div>
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <span className="fw-bold text-primary" style={{ fontSize: "14px" }}>{req.ticketNo}</span>
                      <Badge color="danger" className="text-uppercase" style={{ fontSize: "10px" }}>Emergency</Badge>
                      {req.duration && (
                        <Badge color="warning" className="text-dark" style={{ fontSize: "10px" }}>
                          <i className="ri-time-line me-1"></i>{req.duration}
                        </Badge>
                      )}
                    </div>
                    <div className="fw-medium text-dark" style={{ fontSize: "13px" }}>{req.entityName}</div>
                    <div className="text-muted" style={{ fontSize: "12px" }}>
                      Username: <span className="text-dark">{req.username || "N/A"}</span>
                      <span className="mx-2">·</span>
                      Pending with: <span className="text-danger fw-semibold">{req.currentRole}</span>
                    </div>
                    <div className="text-muted" style={{ fontSize: "11px", marginTop: "2px" }}>
                      <i className="ri-time-line me-1"></i>
                      Waiting for <span className="text-danger fw-bold">{hours}h</span>
                    </div>
                  </div>

                  <Button
                    color="danger"
                    size="sm"
                    className="flex-shrink-0"
                    onClick={() => navigateTo(req.currentRole)}
                  >
                    Take Action <i className="ri-arrow-right-line align-bottom"></i>
                  </Button>
                </div>
              );
            })}
          </div>
        </ModalBody>

        <ModalFooter className="justify-content-between bg-light">
          <span className="text-muted" style={{ fontSize: "12px" }}>
            This popup is shown once per session.
          </span>
          <div className="d-flex gap-2">
            <Button color="light" size="sm" onClick={() => setIsOpen(false)}>
              Dismiss
            </Button>
            <Button
              color="danger"
              size="sm"
              onClick={() => navigateTo(userRole)}
            >
              <i className="ri-arrow-right-circle-line me-1"></i> Go to My Approvals
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EmergencyPopup;
