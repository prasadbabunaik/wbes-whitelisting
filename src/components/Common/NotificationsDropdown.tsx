"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Dropdown, DropdownToggle, DropdownMenu, Badge } from "reactstrap";

interface Notification {
  id: string;
  title: string;
  message: string;
  ticketNo: string | null;
  link: string | null;
  isRead: boolean;
  createdAt: string;
}

const POLL_INTERVAL_MS = 30_000;

function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60)  return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

const NotificationsDropdown: React.FC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen]             = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount]   = useState(0);
  const pollRef = useRef<NodeJS.Timeout | null>(null);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch("/api/notifications");
      if (!res.ok) return;
      const json = await res.json();
      if (json.success) {
        setNotifications(json.data);
        setUnreadCount(json.unreadCount);
      }
    } catch (_) {}
  }, []);

  // Initial fetch + polling
  useEffect(() => {
    fetchNotifications();
    pollRef.current = setInterval(fetchNotifications, POLL_INTERVAL_MS);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [fetchNotifications]);

  const markAllRead = async () => {
    try {
      await fetch("/api/notifications/read-all", { method: "POST" });
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (_) {}
  };

  const handleOpen = () => {
    setIsOpen((v) => {
      if (!v && unreadCount > 0) markAllRead();
      return !v;
    });
  };

  const handleNotifClick = (n: Notification) => {
    setIsOpen(false);
    if (n.link) router.push(n.link);
  };

  return (
    <Dropdown isOpen={isOpen} toggle={handleOpen} className="topbar-head-dropdown header-item">
      <DropdownToggle
        tag="button"
        type="button"
        className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle position-relative"
        style={{ width: "38px", height: "38px" }}
      >
        <i className="bx bx-bell fs-22"></i>
        {unreadCount > 0 && (
          <span
            className="position-absolute bg-danger text-white rounded-circle d-flex align-items-center justify-content-center fw-bold"
            style={{ top: "2px", right: "2px", width: "18px", height: "18px", fontSize: "10px", lineHeight: 1 }}
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </DropdownToggle>

      <DropdownMenu end className="dropdown-menu-lg shadow-lg p-0" style={{ width: "360px" }}>
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between px-3 py-2 border-bottom bg-light rounded-top">
          <h6 className="mb-0 fw-semibold">Notifications</h6>
          {unreadCount > 0 && (
            <button className="btn btn-sm btn-link p-0 text-muted text-decoration-none" style={{ fontSize: "12px" }} onClick={markAllRead}>
              Mark all read
            </button>
          )}
        </div>

        {/* List */}
        <div style={{ maxHeight: "340px", overflowY: "auto" }}>
          {notifications.length === 0 ? (
            <div className="text-center text-muted py-4" style={{ fontSize: "13px" }}>
              <i className="bx bx-bell-off fs-24 d-block mb-2 opacity-50"></i>
              No notifications yet
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => handleNotifClick(n)}
                className={`d-flex gap-3 px-3 py-2 border-bottom ${n.link ? "cursor-pointer" : ""} ${!n.isRead ? "bg-primary bg-opacity-10" : ""}`}
                style={{ cursor: n.link ? "pointer" : "default", transition: "background 0.15s" }}
                onMouseEnter={(e) => { if (n.link) (e.currentTarget as HTMLElement).style.background = "rgba(64,81,137,0.08)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = ""; }}
              >
                {/* Icon dot */}
                <div className="flex-shrink-0 mt-1">
                  <span
                    className="rounded-circle d-inline-block"
                    style={{
                      width: "8px", height: "8px", marginTop: "4px",
                      background: !n.isRead ? "#405189" : "#ced4da",
                    }}
                  />
                </div>

                <div className="flex-grow-1 min-width-0">
                  <div className="d-flex justify-content-between align-items-start gap-1">
                    <p className="mb-0 fw-semibold text-dark" style={{ fontSize: "13px", lineHeight: "1.3" }}>
                      {n.title}
                    </p>
                    <span className="text-muted flex-shrink-0" style={{ fontSize: "11px" }}>
                      {timeAgo(n.createdAt)}
                    </span>
                  </div>
                  <p className="mb-0 text-muted" style={{ fontSize: "12px", lineHeight: "1.4" }}>
                    {n.message}
                  </p>
                  {n.ticketNo && (
                    <Badge color="soft-primary" className="text-primary mt-1" style={{ fontSize: "10px" }}>
                      {n.ticketNo}
                    </Badge>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="text-center py-2 border-top">
            <button className="btn btn-sm btn-link text-muted text-decoration-none" style={{ fontSize: "12px" }} onClick={() => { setIsOpen(false); router.push("/modules/request/all"); }}>
              View all requests <i className="ri-arrow-right-line align-bottom"></i>
            </button>
          </div>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default NotificationsDropdown;
