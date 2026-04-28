"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import SimpleBar from "simplebar-react";

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
  if (diff < 60)    return `${diff}s ago`;
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

const NotificationsDropdown: React.FC = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount]     = useState(0);
  const pollRef    = useRef<NodeJS.Timeout | null>(null);
  const isOpenRef  = useRef(false);

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

  const handleToggleClick = () => {
    if (!isOpenRef.current && unreadCount > 0) markAllRead();
    isOpenRef.current = !isOpenRef.current;
  };

  const handleNotifClick = (n: Notification) => {
    if (n.link) router.push(n.link);
  };

  return (
    <UncontrolledDropdown
      nav
      inNavbar
      className="topbar-head-dropdown ms-1 header-item"
    >
      <DropdownToggle
        tag="button"
        type="button"
        className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
        onClick={handleToggleClick}
      >
        <i className="bx bx-bell fs-22"></i>
        {unreadCount > 0 && (
          <span className="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger">
            {unreadCount > 9 ? "9+" : unreadCount}
            <span className="visually-hidden">unread notifications</span>
          </span>
        )}
      </DropdownToggle>

      <DropdownMenu className="dropdown-menu-lg dropdown-menu-end p-0 shadow-lg">
        {/* Header */}
        <div className="dropdown-head bg-primary bg-pattern rounded-top">
          <div className="p-3">
            <div className="d-flex align-items-center justify-content-between">
              <h6 className="m-0 fs-16 fw-semibold text-white">Notifications</h6>
              {unreadCount > 0 && (
                <span className="badge bg-light-subtle fs-13 text-body">
                  {unreadCount} New
                </span>
              )}
            </div>
          </div>
        </div>

        {/* List */}
        <SimpleBar style={{ maxHeight: "300px" }} className="pe-2">
          {notifications.length === 0 ? (
            <div className="text-center text-muted py-5" style={{ fontSize: "13px" }}>
              <i className="bx bx-bell-off fs-28 d-block mb-2 opacity-50"></i>
              No notifications yet
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => handleNotifClick(n)}
                className={`text-reset notification-item d-block dropdown-item position-relative${!n.isRead ? " active" : ""}`}
                style={{ cursor: n.link ? "pointer" : "default" }}
              >
                <div className="d-flex">
                  <div className="avatar-xs me-3 mt-1">
                    <span
                      className={`avatar-title rounded-circle fs-16 ${
                        !n.isRead
                          ? "bg-primary-subtle text-primary"
                          : "bg-secondary-subtle text-secondary"
                      }`}
                    >
                      <i className="bx bx-bell"></i>
                    </span>
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start">
                      <h6 className="mt-0 mb-1 fs-13 fw-semibold">{n.title}</h6>
                      <span className="text-muted fs-11 flex-shrink-0 ms-2">
                        {timeAgo(n.createdAt)}
                      </span>
                    </div>
                    <p className="mb-1 fs-13 text-muted lh-base">{n.message}</p>
                    {n.ticketNo && (
                      <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                        <i className="mdi mdi-ticket-outline me-1"></i>{n.ticketNo}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </SimpleBar>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="my-3 text-center">
            <button
              type="button"
              className="btn btn-soft-success waves-effect waves-light btn-sm"
              onClick={() => router.push("/modules/request/all")}
            >
              View All Requests <i className="ri-arrow-right-line align-middle"></i>
            </button>
          </div>
        )}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default NotificationsDropdown;
