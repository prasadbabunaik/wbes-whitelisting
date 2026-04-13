"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logoutUser } from "@slices/auth/login/thunk";
import type { AppDispatch } from "@slices/store";
import { UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";

// Import the Modal
import ResetPasswordModal from "../auth/ResetPasswordModal"; 

const ProfileDropdown = () => {
  const [userName, setUserName] = useState("Loading...");
  const [role, setRole] = useState("...");
  const [userId, setUserId] = useState<string | null>(null);
  
  // Modal State
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const toggleResetModal = () => setIsResetModalOpen(!isResetModalOpen);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    // 1. Optimistic load from localStorage for instant UI rendering
    const storedName = localStorage.getItem("userName");
    const storedRole = localStorage.getItem("role") || localStorage.getItem("userRole");
    
    if (storedName) setUserName(storedName);
    if (storedRole) setRole(storedRole.replace(/['"]/g, "").toUpperCase());

    // 2. VAPT: Securely fetch the exact user details (including ID) using the HttpOnly Cookie
    const fetchSecureUserData = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setUserName(data.user.name || data.user.role);
            setRole(data.user.role.toUpperCase());
            setUserId(data.user.id);
          }
        }
      } catch (error) {
        console.error("Failed to verify secure session", error);
      }
    };

    fetchSecureUserData();
  }, []);

  const handleLogout = async () => {
    try {
      // 1. Destroy the DB session and wipe the HttpOnly cookie securely
      await fetch('/api/auth/logout', { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
      });
      
      // 2. Clear all frontend traces
      sessionStorage.clear();
      localStorage.clear();
      
      // 3. Clear Redux state
      dispatch(logoutUser());
      
      // 4. Redirect to login
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout process encountered an error", error);
      router.push("/auth/login"); // Fallback redirect
    }
  };

  return (
    <React.Fragment>
      <UncontrolledDropdown nav inNavbar className="ms-sm-3 header-item topbar-user">
        <DropdownToggle tag="button" type="button" className="btn shadow-none">
          <span className="d-flex align-items-center">
            <div className="rounded-circle d-flex align-items-center justify-content-center border border-light bg-light text-primary" style={{ width: "35px", height: "35px" }}>
              <i className="ri-user-fill fs-5"></i>
            </div>
            <span className="text-start ms-xl-2">
              <span className="d-none d-xl-inline-block ms-1 fw-bold text-dark user-name-text">{userName}</span>
              <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">{role}</span>
            </span>
          </span>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end shadow-lg">
          <h6 className="dropdown-header fw-medium bg-light">Welcome {userName}!</h6>
          
          {/* Trigger Modal instead of Router.push */}
          <DropdownItem tag="div" className="p-0">
            <button type="button" onClick={toggleResetModal} className="dropdown-item d-flex align-items-center py-2 w-100 bg-transparent border-0 text-start">
              <i className="mdi mdi-lock-reset fs-18 align-middle me-2 text-muted" />
              <span className="align-middle fw-medium">Reset Password</span>
            </button>
          </DropdownItem>

          <div className="dropdown-divider"></div>

          <DropdownItem tag="div" className="p-0">
            <button type="button" onClick={handleLogout} className="dropdown-item d-flex align-items-center py-2 w-100 bg-transparent border-0 text-start">
              <i className="mdi mdi-logout text-danger fs-18 align-middle me-2" />
              <span className="align-middle fw-medium">Logout</span>
            </button>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>

      {/* Add the Modal Component here */}
      <ResetPasswordModal 
        isOpen={isResetModalOpen} 
        toggle={toggleResetModal} 
        isAdmin={role === 'ADMIN'} 
        currentUserId={userId} 
        currentUserName={userName} // Matches the state variable
      />
    </React.Fragment>
  );
};

export default ProfileDropdown;