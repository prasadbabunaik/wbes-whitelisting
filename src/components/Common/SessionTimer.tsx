"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// ── Constants ─────────────────────────────────────────────────────────────────
const IDLE_TIMEOUT_S   = 30 * 60;       // 30 minutes idle → auto-logout
const WARN_AT_S        = 5  * 60;       // turn yellow at 5 min
const DANGER_AT_S      = 2  * 60;       // turn red + pulse at 2 min
const EXTEND_EVERY_MS  = 30 * 60_000;   // hit extend API at most once per 30 min

// ── Helpers ───────────────────────────────────────────────────────────────────
function pad(n: number) {
  return String(n).padStart(2, "0");
}

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  return `${pad(m)}:${pad(s % 60)}`;
}

// ── Component ─────────────────────────────────────────────────────────────────
const SessionTimer: React.FC = () => {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft]   = useState(IDLE_TIMEOUT_S);
  const [showTooltip, setShowTooltip]   = useState(false);

  const lastActivityRef = useRef<number>(Date.now());
  const lastExtendRef   = useRef<number>(Date.now());
  const isLoggingOutRef = useRef(false);

  // ── Logout ──────────────────────────────────────────────────────────────────
  const logout = useCallback(async (reason: "idle" | "manual" = "idle") => {
    if (isLoggingOutRef.current) return;
    isLoggingOutRef.current = true;

    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (_) {}

    sessionStorage.clear();
    localStorage.clear();

    const path = reason === "idle"
      ? "/auth/login?reason=idle_timeout"
      : "/auth/login";

    router.push(path);
  }, [router]);

  // ── Extend server session (debounced) ────────────────────────────────────────
  const extendSession = useCallback(async () => {
    const now = Date.now();
    if (now - lastExtendRef.current < EXTEND_EVERY_MS) return;
    lastExtendRef.current = now;

    try {
      await fetch("/api/auth/session/extend", { method: "POST" });
    } catch (_) {}
  }, []);

  // ── Activity handler ─────────────────────────────────────────────────────────
  const onActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
    extendSession();
  }, [extendSession]);

  // ── Register / unregister activity listeners ──────────────────────────────
  useEffect(() => {
    const events = ["mousemove", "keydown", "mousedown", "touchstart", "scroll"] as const;
    events.forEach((e) => window.addEventListener(e, onActivity, { passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, onActivity));
  }, [onActivity]);

  // ── Countdown tick ─────────────────────────────────────────────────────────
  useEffect(() => {
    const interval = setInterval(() => {
      const idleSec = Math.floor((Date.now() - lastActivityRef.current) / 1000);
      const remaining = Math.max(0, IDLE_TIMEOUT_S - idleSec);

      setSecondsLeft(remaining);

      if (remaining === 0) {
        clearInterval(interval);
        logout("idle");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [logout]);

  // ── Derived display values ─────────────────────────────────────────────────
  const isDanger  = secondsLeft < DANGER_AT_S;
  const isWarning = secondsLeft < WARN_AT_S;

  const logoutTime = new Date(lastActivityRef.current + IDLE_TIMEOUT_S * 1000);
  const logoutTimeStr = logoutTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const colorClass = isDanger
    ? "text-danger"
    : isWarning
    ? "text-warning"
    : "text-muted";

  const bgClass = isDanger
    ? "bg-danger bg-opacity-10 border border-danger border-opacity-25"
    : isWarning
    ? "bg-warning bg-opacity-10 border border-warning border-opacity-25"
    : "bg-light border border-0";

  return (
    <>
      {/* Keyframe for danger pulse — injected once */}
      <style>{`
        @keyframes session-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.55; }
        }
        .session-pulse { animation: session-pulse 1.2s ease-in-out infinite; }
      `}</style>

      <div
        className={`d-flex align-items-center gap-1 px-2 py-1 rounded-2 ${bgClass} ${colorClass} position-relative`}
        style={{ cursor: "default", userSelect: "none", minWidth: "130px" }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Icon */}
        <i
          className={`ri-timer-line fs-16 ${isDanger ? "session-pulse" : ""}`}
          style={{ lineHeight: 1 }}
        />

        {/* Countdown */}
        <span className={`fw-semibold ${isDanger ? "session-pulse" : ""}`} style={{ fontSize: "13px", letterSpacing: "0.04em", fontVariantNumeric: "tabular-nums" }}>
          {secondsLeft > 0 ? formatTime(secondsLeft) : "00:00"}
        </span>

        {/* Label */}
        <span className="d-none d-md-inline" style={{ fontSize: "11px", opacity: 0.75 }}>
          {isDanger ? "Session expiring!" : "idle logout"}
        </span>

        {/* Tooltip on hover */}
        {showTooltip && (
          <div
            className="position-absolute bg-dark text-white rounded shadow-lg px-3 py-2"
            style={{
              top: "calc(100% + 8px)",
              right: 0,
              whiteSpace: "nowrap",
              fontSize: "12px",
              zIndex: 9999,
              lineHeight: 1.6,
              pointerEvents: "none",
            }}
          >
            <div className="fw-semibold mb-1" style={{ borderBottom: "1px solid rgba(255,255,255,0.15)", paddingBottom: "4px" }}>
              Session Inactivity Timer
            </div>
            <div>Logout at: <span className="text-warning fw-bold">{logoutTimeStr}</span></div>
            <div className="text-secondary" style={{ fontSize: "11px", marginTop: "2px" }}>
              Any activity resets this timer.
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SessionTimer;
