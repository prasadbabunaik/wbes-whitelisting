"use client";

import React, { useEffect, useMemo, useState } from "react";
import TableContainer from "@common/TableContainerReactTable";
import BreadCrumb from "@common/BreadCrumb";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  Spinner,
  Button,
} from "reactstrap";
import ApprovalActionForm from "./ApprovalActionForm";
import { Role } from "@prisma/client";
import { toast, ToastContainer } from "react-toastify";
import Select, { StylesConfig, MultiValue } from "react-select";
import CreatableSelect from "react-select/creatable";
import "react-toastify/dist/ReactToastify.css";

interface AllRequestsTableProps {
  simulatedRole?: Role;
  pageTitle?: string;
}

interface SelectOption {
  label: string;
  value: string;
}

const STATUS_OPTIONS: SelectOption[] = [
  { value: "UNDER_NLDC_REVIEW", label: "Under NLDC Review" },
  { value: "SENT_TO_CISO",      label: "Sent to CISO" },
  { value: "CISO_APPROVED",     label: "CISO Approved" },
  { value: "SENT_TO_SOC",       label: "Sent to SOC" },
  { value: "SOC_VERIFIED",      label: "SOC Verified" },
  { value: "SENT_TO_IT",        label: "Sent to IT" },
  { value: "WHITELISTED",       label: "Whitelisted" },
  { value: "COMPLETED",         label: "Completed" },
  { value: "NEED_MORE_INFO",    label: "Need More Info" },
  { value: "REJECTED",          label: "Rejected" },
  { value: "CREATED",           label: "Created" },
];

const CATEGORY_OPTIONS: SelectOption[] = [
  { value: "NEW_USER",      label: "New User" },
  { value: "EXISTING_USER", label: "Existing User" },
];

const REGION_OPTIONS: SelectOption[] = [
  { value: "NLDC",   label: "NLDC" },
  { value: "NRLDC",  label: "NRLDC" },
  { value: "SRLDC",  label: "SRLDC" },
  { value: "WRLDC",  label: "WRLDC" },
  { value: "ERLDC",  label: "ERLDC" },
  { value: "NERLDC", label: "NERLDC" },
];

const ORG_REGION_MAP: Record<string, string> = {
  "org-id-srldc": "SRLDC",
  "org-id-nrldc": "NRLDC",
  "org-id-wrldc": "WRLDC",
  "org-id-erldc": "ERLDC",
  "org-id-nerldc": "NERLDC",
  "org-id-nldc": "NLDC",
};

// --- STYLES FOR EDITABLE SELECTS ---
const baseSelectStyles: StylesConfig<SelectOption, any> = {
  control: (base, state) => ({
    ...base,
    borderColor: state.isFocused ? "#878a99" : "#ced4da",
    boxShadow: state.isFocused ? "0 0 0 0.15rem rgba(64, 81, 137, 0.25)" : "none",
    "&:hover": { borderColor: state.isFocused ? "#878a99" : "#ced4da" },
  }),
};

const matteBlueStyles: StylesConfig<SelectOption, true> = {
  ...baseSelectStyles,
  multiValue: (base) => ({ ...base, backgroundColor: "#0ab39c", borderRadius: "3px" }), 
  multiValueLabel: (base) => ({ ...base, color: "white" }),
  multiValueRemove: (base) => ({ ...base, color: "white", ":hover": { backgroundColor: "#099885", color: "white" } }),
};

const matteRedStyles: StylesConfig<SelectOption, true> = {
  ...baseSelectStyles,
  multiValue: (base) => ({ ...base, backgroundColor: "#f06548", borderRadius: "3px" }), 
  multiValueLabel: (base) => ({ ...base, color: "white" }),
  multiValueRemove: (base) => ({ ...base, color: "white", ":hover": { backgroundColor: "#cc563d", color: "white" } }),
};

// --- IP EXPANSION LOGIC ---
const ipToInt = (ip: string) => {
  const p = ip.split(".").map(Number);
  return ((p[0] << 24) | (p[1] << 16) | (p[2] << 8) | p[3]) >>> 0;
};
const intToIp = (int: number) => [(int >>> 24) & 255, (int >>> 16) & 255, (int >>> 8) & 255, int & 255].join(".");
const expandIps = (ipString: string): string[] => {
  if (!ipString) return [];
  const rawInputs = ipString.split(",").map((i) => i.trim()).filter(Boolean);
  let expandedIps: string[] = [];

  rawInputs.forEach((item) => {
    if (item.includes("/")) {
      const [ipStr, maskStr] = item.split("/");
      const ipParts = ipStr.split(".").map(Number);

      if (ipParts.length === 4 && ipParts.every((p) => !isNaN(p) && p >= 0 && p <= 255)) {
        const ipInt = ipToInt(ipStr);
        let maskInt = 0, isValidMask = false;

        if (maskStr.includes(".")) {
          const mParts = maskStr.split(".").map(Number);
          if (mParts.length === 4 && mParts.every((p) => !isNaN(p) && p >= 0 && p <= 255)) {
            maskInt = ipToInt(maskStr);
            isValidMask = true;
          }
        } else {
          const maskLen = parseInt(maskStr, 10);
          if (!isNaN(maskLen) && maskLen >= 0 && maskLen <= 32) {
            maskInt = maskLen === 0 ? 0 : (0xffffffff << (32 - maskLen)) >>> 0;
            isValidMask = true;
          }
        }

        if (isValidMask) {
          const wildcard = ~maskInt >>> 0;
          const network = (ipInt & maskInt) >>> 0;
          const broadcast = (network | wildcard) >>> 0;
          const numIps = broadcast - network + 1;

          if (numIps <= 1024) {
            for (let i = network; i <= broadcast; i++) {
              if (((i & maskInt) >>> 0) === network) expandedIps.push(intToIp(i));
            }
          } else { expandedIps.push(item); }
        } else { expandedIps.push(item); }
      } else { expandedIps.push(item); }
    } else { expandedIps.push(item); }
  });

  return Array.from(new Set(expandedIps));
};

const AllRequestsTable = ({
  simulatedRole,
  pageTitle = "All Requests",
}: AllRequestsTableProps) => {
  const [data, setData] = useState([]);
  const [entities, setEntities] = useState<any[]>([]); 
  const [existingUsers, setExistingUsers] = useState<any[]>([]); 

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [actionModal, setActionModal] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isSendingMail, setIsSendingMail] = useState<string | null>(null);

  // Editable States for Selects
  const [editIps, setEditIps] = useState<string>("");
  const [editIpToRemove, setEditIpToRemove] = useState<string[]>([]);

  // ── Filter state ───────────────────────────────────────────────────────────
  const [filterStatus,    setFilterStatus]    = useState<SelectOption[]>([]);
  const [filterCategory,  setFilterCategory]  = useState<SelectOption | null>(null);
  const [filterRegion,    setFilterRegion]    = useState<SelectOption | null>(null);
  const [filterEmergency, setFilterEmergency] = useState<boolean>(false);

  const clearFilters = () => {
    setFilterStatus([]);
    setFilterCategory(null);
    setFilterRegion(null);
    setFilterEmergency(false);
  };

  const hasActiveFilters =
    filterStatus.length > 0 || filterCategory || filterRegion || filterEmergency;

  // 🛡️ SECURE TOKEN EXTRACTION
  const authData = useMemo(() => {
    if (typeof window === "undefined") {
      return { role: "NLDC", id: "", orgId: "", region: "UNKNOWN", name: "" };
    }
    
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    
    if (!token) {
      const fallbackRole = (localStorage.getItem("userRole") || localStorage.getItem("role") || "NLDC").replace(/['"]/g, "").toUpperCase();
      const fallbackOrgId = localStorage.getItem("organizationId") || "";
      return { 
        role: fallbackRole, 
        id: "", 
        orgId: fallbackOrgId, 
        region: ORG_REGION_MAP[fallbackOrgId] || "UNKNOWN", 
        name: "" 
      };
    }

    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(atob(base64).split("").map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join(""));
      const decoded = JSON.parse(jsonPayload);

      const role = decoded.role?.replace(/['"]/g, "").toUpperCase() || "NLDC";
      const orgId = decoded.organizationId || decoded.orgId || "";
      const name = (decoded.name || "").toUpperCase();

      let region = "UNKNOWN";
      if (decoded.initiatorRegion) region = decoded.initiatorRegion.toUpperCase();
      else if (ORG_REGION_MAP[orgId]) region = ORG_REGION_MAP[orgId];
      else if (name.includes("SRLDC")) region = "SRLDC";
      else if (name.includes("NRLDC")) region = "NRLDC";
      else if (name.includes("WRLDC")) region = "WRLDC";
      else if (name.includes("ERLDC")) region = "ERLDC";
      else if (name.includes("NERLDC")) region = "NERLDC";
      else if (role === "NLDC") region = "NLDC";
      else if (role === "RLDC") region = "RLDC";

      return { role, id: decoded.id || "", orgId, region, name: decoded.name };
    } catch (e) {
      return { role: "NLDC", id: "", orgId: "", region: "UNKNOWN", name: "" };
    }
  }, []);

  let { role: myRole, orgId: myOrgId, region: myRegion } = authData;

  if (simulatedRole) {
    myRole = simulatedRole.replace(/['"]/g, "").toUpperCase();
  }

  const isAdmin = myRole === "ADMIN";

  const toggleActionModal = () => setActionModal(!actionModal);

  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal);
    if (deleteModal) setRequestToDelete(null);
  };

  const getInitiatorName = (req: any) => {
    if (req?.initiatorRegion && req.initiatorRegion !== "UNKNOWN" && req.initiatorRegion !== "RLDC") {
      return req.initiatorRegion;
    }
    
    if (req?.entityName) {
      const match = entities.find(e => e.name === req.entityName);
      if (match?.region && match.region !== "UNKNOWN") return match.region;
    }

    const role = req?.submittedByRole?.toUpperCase() || "";
    if (role === "NLDC") return "NLDC";
    return myRegion !== "UNKNOWN" ? myRegion : "RLDC";
  };

  const fetchData = async () => {
    if (!myOrgId && !isAdmin) return;
    try {
      setLoading(true);

      let fetchedEntities = [];
      let fetchedUsers = [];
      
      try {
        const cacheBuster = Date.now();
        const [entRes, userRes] = await Promise.all([
          fetch(`/api/entities?role=${myRole}&orgId=${myOrgId}&_t=${cacheBuster}`),
          fetch(`/api/beneficiary-users?role=${myRole}&orgId=${myOrgId}&_t=${cacheBuster}`)
        ]);

        if (entRes.ok) {
          const entJson = await entRes.json();
          if (entJson.success) fetchedEntities = entJson.data;
        }
        setEntities(fetchedEntities);

        if (userRes.ok) {
          const userJson = await userRes.json();
          if (userJson.success) fetchedUsers = userJson.data;
        }
        setExistingUsers(fetchedUsers);
      } catch (e) { 
        console.error("Could not fetch entities/users for mapping"); 
      }

      const res = await fetch(`/api/ip-request?role=${myRole}&orgId=${myOrgId}`);
      const json = await res.json();
      
      let fetchedData = json;

      if (myRole === "RLDC" && myRegion !== "RLDC" && myRegion !== "UNKNOWN") {
        const entityRegionMap = new Map();
        fetchedEntities.forEach((e: any) => {
          if (e.name && e.region) entityRegionMap.set(e.name.toUpperCase().trim(), e.region.toUpperCase().trim());
        });

        fetchedData = fetchedData.filter((req: any) => {
          const eName = (req.entityName || "").toUpperCase().trim();
          if (entityRegionMap.has(eName)) return entityRegionMap.get(eName) === myRegion;
          const reqRegion = (req.initiatorRegion || "").toUpperCase().trim();
          if (reqRegion && reqRegion !== "UNKNOWN" && reqRegion !== "RLDC") return reqRegion === myRegion;
          return false;
        });
      }

      setData(fetchedData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [myRole, myOrgId, myRegion]);

  useEffect(() => {
    if (selectedRequest) {
      setEditIps(selectedRequest.ips?.map((i: any) => i.ipAddress).join(", ") || "");
      setEditIpToRemove(
        selectedRequest.ipToRemove 
          ? selectedRequest.ipToRemove.split(",").map((i: string) => i.trim()).filter(Boolean)
          : []
      );
    }
  }, [selectedRequest]);

  // ── Derived filtered data ─────────────────────────────────────────────────
  const filteredData = useMemo(() => {
    let result = data as any[];

    if (filterStatus.length > 0) {
      const allowed = new Set(filterStatus.map((o) => o.value));
      result = result.filter((r) => allowed.has(r.status));
    }

    if (filterCategory) {
      result = result.filter((r) => r.category === filterCategory.value);
    }

    if (filterRegion) {
      result = result.filter(
        (r) =>
          (r.initiatorRegion || "").toUpperCase() === filterRegion.value ||
          (r.submittedByRole || "").toUpperCase() === filterRegion.value
      );
    }

    if (filterEmergency) {
      result = result.filter((r) => r.isEmergency === true);
    }

    return result;
  }, [data, filterStatus, filterCategory, filterRegion, filterEmergency]);

  const confirmDelete = (requestId: string) => {
    setRequestToDelete(requestId);
    setDeleteModal(true);
  };

  const executeDelete = async () => {
    if (!requestToDelete) return;

    setIsDeleting(requestToDelete);
    try {
      const response = await fetch(`/api/ip-request/${requestToDelete}`, {
        method: "DELETE",
      });

      const json = await response.json();

      if (response.ok && json.success) {
        toast.success("Request permanently deleted.");
        fetchData();
      } else {
        toast.error(json.error || "Failed to delete request.");
      }
    } catch (err) {
      toast.error("A network error occurred while deleting.");
    } finally {
      setIsDeleting(null);
      toggleDeleteModal();
    }
  };

  const handleResendMail = async (requestId: string) => {
    setIsSendingMail(requestId);
    try {
      const res = await fetch(`/api/ip-request/${requestId}/resend-mail`, { method: "POST" });
      const json = await res.json();
      if (res.ok && json.success) {
        toast.success("Email resent successfully.");
      } else {
        toast.error(json.error || "Failed to resend email.");
      }
    } catch {
      toast.error("Network error while resending email.");
    } finally {
      setIsSendingMail(null);
    }
  };

  const columns = useMemo(
    () => [
      {
        header: "Ticket No",
        accessorKey: "ticketNo",
        enableSorting: true,
        cell: (cell: any) => (
          <span className="fw-bold text-primary">{cell.getValue()}</span>
        ),
        enableColumnFilter: false,
      },
      {
        header: "Entity Name",
        accessorKey: "entityName",
        enableSorting: true,
        enableColumnFilter: false,
      },
      {
        header: "Initiated By",
        accessorFn: (row: any) => getInitiatorName(row),
        id: "initiatedBy",
        enableSorting: true,
        enableColumnFilter: false,
        cell: (cell: any) => {
          const initiator = cell.getValue() as string;
          const isRegional = initiator.includes("RLDC") && initiator !== "RLDC";
          
          return (
            <Badge 
              color={isRegional ? "info" : "light"} 
              className={isRegional ? "text-white text-uppercase shadow-sm" : "text-dark border text-uppercase shadow-sm"}
            >
              {initiator}
            </Badge>
          );
        },
      },
      {
        header: "Category",
        accessorKey: "category",
        enableSorting: true,
        enableColumnFilter: false,
        cell: (cell: any) => {
          const categoryVal = cell.getValue();
          const isEmergency = cell.row.original.isEmergency === true; 
          const isApiAccess = cell.row.original.isApiAccess === true;
          const status = cell.row.original.status;
          
          const shouldBlink = isEmergency && status !== "COMPLETED" && status !== "REJECTED";
          const badgeColor = isEmergency ? "danger" : "info";

          return (
            <div className="d-flex flex-column gap-1 align-items-start">
              {shouldBlink && (
                <style dangerouslySetInnerHTML={{ __html: `
                  @keyframes blinkRed {
                    0% { background-color: #f06548; color: white; opacity: 1; }
                    50% { background-color: white; color: #f06548; opacity: 0.8; }
                    100% { background-color: #f06548; color: white; opacity: 1; }
                  }
                  .blink-emergency {
                    animation: blinkRed 1.5s infinite ease-in-out;
                    border: 1px solid #f06548 !important;
                  }
                `}} />
              )}
              <Badge
                color={badgeColor}
                className={`text-uppercase ${shouldBlink ? 'blink-emergency' : ''}`}
              >
                {categoryVal.replace(/_/g, " ")}
              </Badge>

              {isApiAccess && (
                <Badge color="dark" className="border border-dark bg-transparent text-dark shadow-none fs-10">
                  <i className="ri-code-s-slash-line align-bottom me-1"></i> API ACCESS
                </Badge>
              )}
            </div>
          );
        },
      },
      {
        header: "Status",
        accessorKey: "status",
        enableSorting: true,
        enableColumnFilter: false,
        cell: (cell: any) => {
          const status = cell.getValue();
          let color = "secondary";
          if (status === "COMPLETED") color = "success";
          if (status === "REJECTED") color = "danger";
          if (status.includes("SENT") || status.includes("UNDER")) color = "warning";

          return (
            <Badge color={color} className="text-uppercase">
              {status.replace(/_/g, " ")}
            </Badge>
          );
        },
      },
      {
        header: "Pending With",
        accessorKey: "currentRole",
        enableSorting: true,
        enableColumnFilter: false,
        cell: (cell: any) => {
          const status = cell.row.original.status;
          if (status === "COMPLETED" || status === "REJECTED") {
            return (
              <Badge color={status === "COMPLETED" ? "success" : "danger"} className="bg-opacity-10 border text-uppercase" style={{ color: status === "COMPLETED" ? "#0ab39c" : "#f06548" }}>
                {status === "COMPLETED" ? "Done" : "Closed"}
              </Badge>
            );
          }
          return (
            <Badge color="light" className="text-dark border">
              {cell.getValue()}
            </Badge>
          );
        },
      },
      {
        header: "Actions",
        enableSorting: false,
        enableColumnFilter: false,
        cell: (cell: any) => {
          const rowData = cell.row.original;

          const isMyTurn = isAdmin
            ? rowData.status !== "COMPLETED" && rowData.status !== "REJECTED"
            : rowData.currentRole === myRole;

          return (
            <div className="hstack gap-2">
              {isMyTurn ? (
                <button
                  className={`btn btn-sm ${
                    isAdmin && rowData.currentRole !== myRole
                      ? "btn-warning"
                      : "btn-success"
                  }`}
                  onClick={() => {
                    setSelectedRequest(rowData);
                    toggleActionModal();
                  }}
                >
                  {isAdmin && rowData.currentRole !== myRole 
                    ? "Override Action" 
                    : myRole === "RLDC" 
                      ? "Modify & Resubmit" 
                      : "Take Action"}
                </button>
              ) : (
                <button className="btn btn-sm btn-soft-secondary" disabled>
                  {rowData.status === "COMPLETED" ? "Done" : `With ${rowData.currentRole}`}
                </button>
              )}

              {/* Resend mail — visible to ADMIN and any role whose turn it is */}
              {(isAdmin || rowData.currentRole === myRole) && (
                <button
                  className="btn btn-sm btn-soft-primary d-flex align-items-center justify-content-center"
                  style={{ width: "32px", padding: "0.25rem" }}
                  title="Resend notification email"
                  disabled={isSendingMail === rowData.id}
                  onClick={() => handleResendMail(rowData.id)}
                >
                  {isSendingMail === rowData.id
                    ? <Spinner size="sm" />
                    : <i className="ri-mail-send-line"></i>}
                </button>
              )}

              {isAdmin && (
                <button
                  className="btn btn-sm btn-danger d-flex align-items-center justify-content-center"
                  style={{ width: "32px", padding: "0.25rem" }}
                  title="Permanently Delete Request"
                  onClick={() => confirmDelete(rowData.id)}
                >
                  <i className="ri-delete-bin-line"></i>
                </button>
              )}
            </div>
          );
        },
      },
    ],
    [myRole, isAdmin, entities]
  );

  const getStrictSystemRole = (roleStr: string): Role => {
    const r = roleStr?.toUpperCase() || "";
    if (r.includes("RLDC")) return "RLDC" as Role;
    if (r === "NLDC") return "NLDC" as Role;
    if (r === "CISO") return "CISO" as Role;
    if (r === "SOC") return "SOC" as Role;
    if (r === "IT") return "IT" as Role;
    return "ADMIN" as Role; 
  };

  const effectiveRole = isAdmin && selectedRequest 
    ? getStrictSystemRole(selectedRequest.currentRole) 
    : getStrictSystemRole(myRole);

  const getLogActor = (log: any, index: number, filteredLogsArray: any[]) => {
    if (log.role === 'ADMIN') return 'ADMIN';
    
    if (log.action === 'REJECTED') {
      if (log.stage === 'NLDC') return 'NLDC';
      if (log.stage === 'CISO') return 'CISO';
      if (log.stage === 'SOC') return 'SOC';
      if (log.stage === 'IT') return 'IT';
    }
    
    // Normal Forward Flow logic
    if (log.stage === 'NLDC') return 'RLDC';
    if (log.stage === 'CISO') return 'NLDC';
    if (log.stage === 'SOC') return 'CISO';
    if (log.stage === 'IT') {
      const firstItIndex = filteredLogsArray.findIndex((l: any) => l.stage === 'IT');
      return index === firstItIndex ? 'SOC' : 'IT';
    }
    if (log.stage === 'COMPLETED') return 'IT';
    
    return log.role || log.stage;
  };

  const getCurrentActiveIpsCount = (req: any) => {
    const user = existingUsers.find((u) => u.username === req.username);
    if (user && Array.isArray(user.availableIps)) {
      return user.availableIps.length;
    }
    
    if (Array.isArray(req?.beforeIps) && req.beforeIps.length > 0) return req.beforeIps.length;
    if (typeof req?.currentActiveIps === "number") return req.currentActiveIps;
    if (typeof req?.currentActiveIpsCount === "number") return req.currentActiveIpsCount;
    if (typeof req?.currentIps === "number") return req.currentIps;
    if (typeof req?.activeIpsCount === "number") return req.activeIpsCount;
    if (typeof req?.totalIps === "number") return req.totalIps;
    if (typeof req?.user?.totalIps === "number") return req.user.totalIps;
    if (typeof req?.beneficiaryUser?.totalIps === "number") return req.beneficiaryUser.totalIps;
    if (Array.isArray(req?.availableIps)) return req.availableIps.length;
    if (Array.isArray(req?.afterIps)) return req.afterIps.length;
    return 0;
  };

  const fallbackCopy = (text: string, successMsg: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      toast.success(successMsg);
    } catch (err) {
      toast.error("Failed to copy IPs.");
    }
    document.body.removeChild(textArea);
  };

  const handleCopy = (text: string, successMsg: string) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(text)
        .then(() => toast.success(successMsg))
        .catch(() => fallbackCopy(text, successMsg));
    } else {
      fallbackCopy(text, successMsg);
    }
  };

  const enrichedSelectedRequest = selectedRequest
    ? {
        ...selectedRequest,
        username: selectedRequest.username || selectedRequest.user?.username || selectedRequest.beneficiaryUser?.username || "N/A",
        beforeIps: selectedRequest.beforeIps || selectedRequest.currentIps || [],
        currentActiveIps: getCurrentActiveIpsCount(selectedRequest),
      }
    : null;

  const isEditableTurn = enrichedSelectedRequest && (
    (["RLDC", "NLDC", "SOC", "IT"].includes(myRole) && enrichedSelectedRequest.currentRole === myRole) ||
    (isAdmin && enrichedSelectedRequest.status !== "COMPLETED" && enrichedSelectedRequest.status !== "REJECTED")
  );

  const handleEditAddIps = (newValue: MultiValue<SelectOption>) => {
    const rawString = newValue ? newValue.map((v) => v.value).join(", ") : "";
    const expanded = expandIps(rawString);
    setEditIps(expanded.join(", "));
  };

  const handleEditRemoveIps = (newValue: MultiValue<SelectOption>) => {
    const selection = newValue ? newValue.map((v) => v.value) : [];
    setEditIpToRemove(selection);
  };

  const getAddIpValuesForSelect = () => {
    if (!editIps) return [];
    return editIps.split(", ").filter(Boolean).map((ip) => ({ label: ip, value: ip }));
  };

  const getRemovableIpsOptions = (): SelectOption[] => {
    if (!enrichedSelectedRequest?.username) return [];
    const userDetails = existingUsers.find(
      (u) => u.username === enrichedSelectedRequest.username
    );
    if (userDetails && userDetails.availableIps) {
      return userDetails.availableIps.map((ip: string) => ({
        label: ip,
        value: ip,
      }));
    }
    return [];
  };

  const timelineLogs = enrichedSelectedRequest?.logs 
    ? [...enrichedSelectedRequest.logs]
        .sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        .filter((log: any, idx: number) => {
           const isInitialAutoLog = idx === 0 && log.action === 'FORWARDED' && 
                (new Date(log.createdAt).getTime() - new Date(enrichedSelectedRequest.createdAt).getTime() < 5000);
           return !isInitialAutoLog && log.remarks && log.remarks.trim() !== "" && log.action !== "CREATED";
        })
    : [];

  return (
    <React.Fragment>
      <ToastContainer theme="colored" position="top-right" autoClose={3000} hideProgressBar={true} />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title={pageTitle} pageTitle="Approval Workflow" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                  <h4 className="card-title mb-0">
                    Role View: <Badge color={isAdmin ? "danger" : "primary"}>{myRole}</Badge>
                  </h4>
                  <button className="btn btn-sm btn-soft-info" onClick={fetchData}>
                    Refresh Data
                  </button>
                </CardHeader>
                <CardBody>
                  {/* ── Filter Bar ─────────────────────────────────────────── */}
                  <div className="bg-light rounded p-3 mb-3 border">
                    <Row className="g-2 align-items-end">
                      <Col lg={3} md={6}>
                        <label className="form-label text-muted small fw-semibold text-uppercase mb-1">Status</label>
                        <Select
                          isMulti
                          options={STATUS_OPTIONS}
                          value={filterStatus}
                          onChange={(val) => setFilterStatus(val as SelectOption[])}
                          placeholder="All statuses..."
                          classNamePrefix="filter-select"
                          styles={{
                            control: (b) => ({ ...b, minHeight: "36px", fontSize: "13px" }),
                            multiValue: (b) => ({ ...b, backgroundColor: "#405189", borderRadius: "3px" }),
                            multiValueLabel: (b) => ({ ...b, color: "white", fontSize: "11px" }),
                            multiValueRemove: (b) => ({ ...b, color: "white", ":hover": { backgroundColor: "#2c3a6e" } }),
                          }}
                        />
                      </Col>

                      <Col lg={2} md={6}>
                        <label className="form-label text-muted small fw-semibold text-uppercase mb-1">Category</label>
                        <Select
                          isClearable
                          options={CATEGORY_OPTIONS}
                          value={filterCategory}
                          onChange={(val) => setFilterCategory(val as SelectOption | null)}
                          placeholder="All..."
                          classNamePrefix="filter-select"
                          styles={{ control: (b) => ({ ...b, minHeight: "36px", fontSize: "13px" }) }}
                        />
                      </Col>

                      <Col lg={2} md={6}>
                        <label className="form-label text-muted small fw-semibold text-uppercase mb-1">Region</label>
                        <Select
                          isClearable
                          options={REGION_OPTIONS}
                          value={filterRegion}
                          onChange={(val) => setFilterRegion(val as SelectOption | null)}
                          placeholder="All regions..."
                          classNamePrefix="filter-select"
                          styles={{ control: (b) => ({ ...b, minHeight: "36px", fontSize: "13px" }) }}
                        />
                      </Col>

                      <Col lg={2} md={6}>
                        <label className="form-label text-muted small fw-semibold text-uppercase mb-1">Emergency</label>
                        <div>
                          <button
                            className={`btn btn-sm w-100 ${filterEmergency ? "btn-danger" : "btn-outline-secondary"}`}
                            onClick={() => setFilterEmergency((v) => !v)}
                          >
                            <i className={`ri-alarm-warning-line me-1 ${filterEmergency ? "" : "opacity-50"}`}></i>
                            {filterEmergency ? "Emergency Only" : "Show All"}
                          </button>
                        </div>
                      </Col>

                      <Col lg={3} md={12} className="d-flex align-items-end justify-content-end gap-2">
                        {hasActiveFilters && (
                          <span className="badge bg-warning text-dark align-self-center">
                            {filteredData.length} / {(data as any[]).length} shown
                          </span>
                        )}
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={clearFilters}
                          disabled={!hasActiveFilters}
                        >
                          <i className="ri-filter-off-line me-1"></i> Clear
                        </button>
                      </Col>
                    </Row>
                  </div>

                  {loading ? (
                    <div className="text-center py-5">
                      <div className="spinner-border text-primary" role="status"></div>
                    </div>
                  ) : (
                    <TableContainer
                      columns={columns || []}
                      data={filteredData}
                      isGlobalFilter={true}
                      customPageSize={10}
                      tableClass="table-centered align-middle table-nowrap mb-0"
                      theadClass="text-muted table-light"
                      SearchPlaceholder="Search Ticket, Entity, or Status..."
                    />
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <Modal isOpen={actionModal} toggle={toggleActionModal} centered size="lg" scrollable>
        <ModalHeader toggle={toggleActionModal} className="bg-light pb-3">
          {isAdmin ? (
            <span><Badge color="warning" className="me-2">Admin Override</Badge>Acting as {effectiveRole}</span>
          ) : (
            `Action by ${myRole}`
          )}
          : <span className="text-primary">{enrichedSelectedRequest?.ticketNo}</span>
        </ModalHeader>

        <ModalBody className="p-4 bg-soft-light">
          
          {/* ✅ NEW: Redesigned Top Header showing API Access clearly as a field */}
          <div className="bg-white p-3 rounded mb-3 border shadow-sm">
            <Row>
              <Col md={3} xs={6} className="mb-3 mb-md-0 border-end border-light">
                <p className="mb-1 text-muted small text-uppercase fw-bold">Entity / Beneficiary</p>
                <h6 className="mb-0 fs-14 text-dark">{enrichedSelectedRequest?.entityName}</h6>
              </Col>
              
              <Col md={3} xs={6} className="mb-3 mb-md-0 border-end border-light px-md-3">
                <p className="mb-1 text-muted small text-uppercase fw-bold">Username</p>
                <h6 className="mb-0 fs-14 text-primary">{enrichedSelectedRequest?.username || "N/A"}</h6>
              </Col>
              
              <Col md={3} xs={6} className="px-md-3">
                <p className="mb-1 text-muted small text-uppercase fw-bold">API Access</p>
                <h6 className="mb-0 fs-14">
                  {enrichedSelectedRequest?.isApiAccess ? (
                    <Badge color="success" className="fs-12 px-2 shadow-sm">
                      <i className="ri-code-s-slash-line align-bottom me-1"></i> Yes
                    </Badge>
                  ) : (
                    <Badge color="secondary" className="fs-12 px-2 bg-opacity-10 text-secondary border">
                      <i className="ri-close-line align-bottom me-1"></i> No
                    </Badge>
                  )}
                </h6>
              </Col>
              
              <Col md={3} xs={6} className="text-md-end">
                <p className="mb-1 text-muted small text-uppercase fw-bold">Category</p>
                <Badge 
                  color={enrichedSelectedRequest?.isEmergency ? "danger" : "info"} 
                  className={`fs-12 shadow-sm ${enrichedSelectedRequest?.isEmergency && enrichedSelectedRequest?.status !== 'COMPLETED' && enrichedSelectedRequest?.status !== 'REJECTED' ? 'blink-emergency' : ''}`}
                >
                  {enrichedSelectedRequest?.category?.replace("_", " ")}
                </Badge>
              </Col>
            </Row>
          </div>

          {enrichedSelectedRequest && (enrichedSelectedRequest.ips?.length > 0 || enrichedSelectedRequest.ipToRemove) && (
            <div className="mb-4 bg-white p-3 rounded border shadow-sm">
              <Row>
                <Col sm={6} className="border-end">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="fs-12 fw-bold text-uppercase text-muted mb-0">
                      {isEditableTurn ? "Modify IPs to Add" : "IPs to Add"}
                    </h6>
                    {["SOC", "IT", "ADMIN"].includes(myRole) && enrichedSelectedRequest.ips?.length > 0 && (
                      <button className="btn btn-sm btn-soft-primary py-0 px-2 d-flex align-items-center" onClick={() => handleCopy(enrichedSelectedRequest.ips.map((i: any) => i.ipAddress).join(", "), "Added IPs copied to clipboard!")}>
                        <i className="ri-file-copy-line align-bottom me-1"></i> Copy IPs
                      </button>
                    )}
                  </div>
                  
                  {isEditableTurn ? (
                    <CreatableSelect
                      styles={matteBlueStyles}
                      isMulti
                      isClearable
                      placeholder="Enter IPs and press Enter..."
                      value={getAddIpValuesForSelect()}
                      onChange={handleEditAddIps}
                      classNamePrefix="js-example-basic-multiple"
                    />
                  ) : (
                    <div className="d-flex flex-wrap gap-1" style={{ maxHeight: "120px", overflowY: "auto" }}>
                      {enrichedSelectedRequest.ips?.length > 0 ? (
                        enrichedSelectedRequest.ips.slice(0, 5).map((ip: any, i: number) => (
                          <Badge color="success" className="fw-normal" key={i}>+ {ip.ipAddress}</Badge>
                        ))
                      ) : <span className="text-muted small fst-italic">None</span>}
                      {enrichedSelectedRequest.ips?.length > 5 && <Badge color="light" className="text-dark border">+ {enrichedSelectedRequest.ips.length - 5} more...</Badge>}
                    </div>
                  )}
                </Col>

                <Col sm={6} className="ps-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="fs-12 fw-bold text-uppercase text-muted mb-0">
                      {isEditableTurn ? "Modify IPs to Remove" : "IPs to Remove"}
                    </h6>
                    {["SOC", "IT", "ADMIN"].includes(myRole) && enrichedSelectedRequest.ipToRemove && (
                      <button className="btn btn-sm btn-soft-danger py-0 px-2 d-flex align-items-center" onClick={() => handleCopy(enrichedSelectedRequest.ipToRemove, "Removed IPs copied to clipboard!")}>
                        <i className="ri-file-copy-line align-bottom me-1"></i> Copy IPs
                      </button>
                    )}
                  </div>

                  {isEditableTurn ? (
                    <CreatableSelect
                      styles={matteRedStyles}
                      isMulti
                      isClearable
                      options={getRemovableIpsOptions()}
                      placeholder="Select active IPs or enter..."
                      value={editIpToRemove.map(ip => ({ label: ip, value: ip }))}
                      onChange={handleEditRemoveIps}
                      classNamePrefix="js-example-basic-multiple"
                    />
                  ) : (
                    <div className="d-flex flex-wrap gap-1" style={{ maxHeight: "120px", overflowY: "auto" }}>
                      {enrichedSelectedRequest.ipToRemove ? (
                        enrichedSelectedRequest.ipToRemove.split(",").slice(0, 5).map((ip: string, i: number) => (
                          <Badge color="danger" className="fw-normal" key={i}>- {ip.trim()}</Badge>
                        ))
                      ) : <span className="text-muted small fst-italic">None</span>}
                      {enrichedSelectedRequest.ipToRemove && enrichedSelectedRequest.ipToRemove.split(",").length > 5 && (
                        <Badge color="light" className="text-dark border">+ {enrichedSelectedRequest.ipToRemove.split(",").length - 5} more...</Badge>
                      )}
                    </div>
                  )}
                </Col>
              </Row>
            </div>
          )}

          {enrichedSelectedRequest && (
            <div className="mb-4">
              <h6 className="fs-12 fw-bold text-uppercase text-muted mb-3 ps-1">Workflow Timeline & Justifications</h6>
              <div className="timeline-container ps-3" style={{ borderLeft: "2px solid #ced4da", marginLeft: "8px" }}>
                {enrichedSelectedRequest.reason && (
                  <div className="position-relative mb-3">
                    <div className="position-absolute" style={{ left: "-25px", top: "2px", width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#ced4da", border: "2px solid white", boxShadow: "0 0 0 1px #ced4da" }}></div>
                    <div className="bg-white p-3 rounded border shadow-sm">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <Badge color="soft-primary" className="text-primary">
                          INITIATED BY {getInitiatorName(enrichedSelectedRequest)}
                        </Badge>
                        <span className="text-muted" style={{ fontSize: "10px" }}>{new Date(enrichedSelectedRequest.createdAt).toLocaleString()}</span>
                      </div>
                      <div className="small text-muted mt-2 mb-1" style={{ fontSize: "11px" }}>Justification provided on behalf of user:</div>
                      <div className="small text-dark fst-italic">"{enrichedSelectedRequest.reason}"</div>
                      
                      {enrichedSelectedRequest.isEmergency && enrichedSelectedRequest.duration && (
                        <div className="mt-2 text-danger small fw-bold">
                          <i className="ri-time-line align-bottom me-1"></i> Emergency Duration: {enrichedSelectedRequest.duration}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {timelineLogs.map((log: any, idx: number) => {
                  const actor = getLogActor(log, idx, timelineLogs);

                  return (
                    <div className="position-relative mb-3" key={idx}>
                      <div className="position-absolute" style={{ left: "-25px", top: "2px", width: "12px", height: "12px", borderRadius: "50%", backgroundColor: log.action === "REJECTED" ? "#f06548" : "#0ab39c", border: "2px solid white", boxShadow: "0 0 0 1px #ced4da" }}></div>
                      <div className="bg-white p-3 rounded border shadow-sm">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <Badge color={log.action === "REJECTED" ? "soft-danger" : "soft-info"} className={log.action === "REJECTED" ? "text-danger" : "text-info"}>
                            {actor} - {log.action}
                          </Badge>
                          <span className="text-muted" style={{ fontSize: "10px" }}>{new Date(log.createdAt).toLocaleString()}</span>
                        </div>
                        <div className="small text-dark fst-italic mt-2">"{log.remarks}"</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <hr className="border-secondary opacity-25" />

          <ApprovalActionForm
            requestData={{
              ...enrichedSelectedRequest,
              modifiedIps: editIps, 
              modifiedIpToRemove: editIpToRemove.join(", "),
            }}
            userRole={effectiveRole as Role}
            onComplete={() => { toggleActionModal(); fetchData(); }}
          />
        </ModalBody>
      </Modal>

      <Modal isOpen={deleteModal} toggle={toggleDeleteModal} centered>
        <ModalBody className="text-center p-5">
          <div className="mt-2">
            <div className="fs-1 text-danger mb-3"><i className="ri-error-warning-line"></i></div>
            <h4 className="mb-3">Are you absolutely sure?</h4>
            <p className="text-muted mb-4">You are about to permanently delete this request. All associated IPs and workflow logs will be erased. This action cannot be undone.</p>
            <div className="hstack gap-2 justify-content-center">
              <button type="button" className="btn btn-light" onClick={toggleDeleteModal} disabled={!!isDeleting}>Close</button>
              <button type="button" className="btn btn-danger" onClick={executeDelete} disabled={!!isDeleting}>
                {isDeleting ? <Spinner size="sm" className="me-2" /> : null} Yes, Delete It!
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default AllRequestsTable;