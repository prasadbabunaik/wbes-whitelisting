"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, Card, CardBody, CardHeader, Input, Table, Badge, Spinner, Modal, ModalHeader, ModalBody, Button, InputGroup, InputGroupText } from "reactstrap";
import BreadCrumb from "@common/BreadCrumb";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ORG_REGION_MAP: Record<string, string> = {
  "org-id-srldc": "SRLDC",
  "org-id-nrldc": "NRLDC",
  "org-id-wrldc": "WRLDC",
  "org-id-erldc": "ERLDC",
  "org-id-nerldc": "NERLDC",
  "org-id-nldc": "NLDC",
};

export default function AuditLogsPage() {
  const [data, setData] = useState<any[]>([]);
  const [entities, setEntities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("ALL");

  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

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
      else if (name.includes("NERLDC")) region = "NERLDC";
      else if (name.includes("ERLDC")) region = "ERLDC";
      else if (role === "NLDC") region = "NLDC";
      else if (role === "RLDC") region = "RLDC";

      return { role, id: decoded.id || "", orgId, region, name: decoded.name };
    } catch (e) {
      return { role: "NLDC", id: "", orgId: "", region: "UNKNOWN", name: "" };
    }
  }, []);

  const { role: myRole, orgId: myOrgId, region: myRegion } = authData;
  const isAdmin = myRole === "ADMIN";

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

  const fetchAuditLogs = async () => {
    if (!myOrgId && !isAdmin) return;
    try {
      setIsLoading(true);

      let fetchedEntities = [];
      try {
        const entRes = await fetch(`/api/entities?role=${myRole}&orgId=${myOrgId}`);
        if (entRes.ok) {
          const entJson = await entRes.json();
          if (entJson.success) fetchedEntities = entJson.data;
        }
        setEntities(fetchedEntities);
      } catch (e) { console.error("Could not fetch entities for mapping"); }

      const res = await fetch(`/api/audit-logs?role=${myRole}&orgId=${myOrgId}`);
      const json = await res.json();
      
      if (res.ok && json.success) {
        let fetchedData = json.data;

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
      } else {
        toast.error("Failed to fetch logs.");
      }
    } catch (error) {
      toast.error("Network error while fetching logs.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAuditLogs();
  }, [myRole, myOrgId, myRegion]);

  const toggleModal = () => setModalOpen(!modalOpen);

  const filteredData = data.filter((req) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesText = 
      (req.ticketNo || "").toLowerCase().includes(searchLower) ||
      (req.entityName || "").toLowerCase().includes(searchLower) ||
      (req.username || "").toLowerCase().includes(searchLower) ||
      (req.ips?.some((ipObj: any) => ipObj.ipAddress.includes(searchLower)));

    let matchesDate = true;
    if (dateFilter !== "ALL") {
      const days = parseInt(dateFilter, 10);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      matchesDate = new Date(req.createdAt) >= cutoffDate;
    }

    return matchesText && matchesDate;
  });

  const exportToCSV = () => {
    if (filteredData.length === 0) {
      toast.warning("No data to export.");
      return;
    }
    const headers = ["Ticket No", "Entity Name", "Username", "Category", "Status", "Created At"];
    const csvRows = filteredData.map(req => [
      req.ticketNo,
      `"${req.entityName || ""}"`, 
      `"${req.username || "N/A"}"`,
      req.category,
      req.status,
      `"${new Date(req.createdAt).toLocaleString()}"`
    ].join(","));

    const csvContent = [headers.join(","), ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Audit_Logs_${new Date().toISOString().split('T')[0]}.csv`);
    link.click();
  };

  const getLogActor = (log: any, index: number, filteredLogsArray: any[]) => {
    if (log.role === 'ADMIN') return 'ADMIN';
    if (log.action === 'REJECTED') return log.stage; 
    
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

  const handleCopy = (text: string, successMsg: string) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        toast.success(successMsg, { position: "top-right", hideProgressBar: true, className: 'bg-success text-white' });
      }).catch(() => executeFallbackCopy(text, successMsg));
    } else {
      executeFallbackCopy(text, successMsg);
    }
  };

  const executeFallbackCopy = (text: string, successMsg: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      toast.success(successMsg, { position: "top-right", hideProgressBar: true, className: 'bg-success text-white' });
    } catch (err) {
      toast.error("Failed to copy. Browser restricted access.");
    }
    document.body.removeChild(textArea);
  };

  const timelineLogs = selectedRequest?.logs 
    ? [...selectedRequest.logs]
        .sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        .filter((log: any, idx: number) => {
           const isInitialAutoLog = idx === 0 && log.action === 'FORWARDED' && 
                (new Date(log.createdAt).getTime() - new Date(selectedRequest.createdAt).getTime() < 5000);
           return !isInitialAutoLog && log.remarks && log.remarks.trim() !== "" && log.action !== "CREATED";
        })
    : [];

  const modalIsEmergency = selectedRequest?.isEmergency === true || String(selectedRequest?.isEmergency) === "true";
  const modalShouldBlink = modalIsEmergency && selectedRequest?.status !== 'COMPLETED' && selectedRequest?.status !== 'REJECTED';

  return (
    <RoleGuard allowedRoles={["ADMIN", "NLDC", "RLDC", "CISO", "SOC", "IT"]}>
      <React.Fragment>
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes blinkOpacity {
            0% { opacity: 1; }
            50% { opacity: 0.3; }
            100% { opacity: 1; }
          }
          .blink-emergency {
            animation: blinkOpacity 1.2s infinite ease-in-out !important;
            background-color: #f06548 !important; 
            color: white !important;
            border: none !important;
          }
        `}} />

        <div className="page-content">
          <Container fluid>
            <BreadCrumb title="Comprehensive Audit Logs" pageTitle="Administration" />

            <Card>
              <CardHeader className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                <h5 className="card-title mb-0">System Request History <Badge color="soft-info" className="text-info ms-2">{myRegion !== "UNKNOWN" && myRegion !== "RLDC" ? myRegion : ""}</Badge></h5>
                <div className="d-flex flex-wrap gap-2 justify-content-md-end">
                  <InputGroup style={{ width: "220px" }}>
                    <InputGroupText className="bg-light border-light"><i className="ri-search-line"></i></InputGroupText>
                    <Input 
                      type="text" 
                      placeholder="Search Ticket, IP..." 
                      value={searchTerm}
                      className="bg-light border-light"
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                  <Input 
                    type="select" 
                    style={{ width: "160px" }}
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                  >
                    <option value="ALL">All Time</option>
                    <option value="1">Last 24 Hours</option>
                    <option value="7">Last 7 Days</option>
                    <option value="30">Last 30 Days</option>
                  </Input>
                  <Button color="success" onClick={exportToCSV} className="d-flex align-items-center">
                    <i className="ri-file-excel-2-line me-1"></i> Export
                  </Button>
                </div>
              </CardHeader>
              
              <CardBody>
                {isLoading ? (
                  <div className="text-center py-5"><Spinner color="primary" /></div>
                ) : (
                  <div className="table-responsive">
                    <Table className="table-striped table-hover align-middle mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Ticket No</th>
                          <th>Entity / Username</th>
                          <th>Category</th>
                          <th>Created At</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.map((req) => {
                          const isEmergency = req.isEmergency === true || String(req.isEmergency) === "true"; 
                          const isApiAccess = req.isApiAccess === true || String(req.isApiAccess) === "true"; 
                          const shouldBlink = isEmergency && req.status !== "COMPLETED" && req.status !== "REJECTED";

                          return (
                            <tr key={req.id}>
                              <td className="fw-bold text-primary">{req.ticketNo}</td>
                              <td>
                                <div className="fw-medium text-dark">{req.entityName}</div>
                                <div className="small text-muted">{req.username || "N/A"}</div>
                              </td>
                              <td>
                                <div className="d-flex flex-column gap-1 align-items-start">
                                  <Badge 
                                    color={isEmergency ? 'danger' : 'info'}
                                    className={`text-uppercase ${shouldBlink ? 'blink-emergency' : ''}`}
                                  >
                                    {req.category.replace('_', ' ')}
                                  </Badge>
                                  {isApiAccess && (
                                    <Badge color="dark" className="border border-dark bg-transparent text-dark shadow-none fs-10">
                                      <i className="ri-code-s-slash-line align-bottom me-1"></i> API ACCESS
                                    </Badge>
                                  )}
                                </div>
                              </td>
                              <td>{new Date(req.createdAt).toLocaleString()}</td>
                              <td>
                                <Badge color={req.status === 'COMPLETED' ? 'success' : req.status === 'REJECTED' ? 'danger' : 'warning'}>
                                  {req.status.replace(/_/g, " ")}
                                </Badge>
                              </td>
                              <td>
                                <Button color="soft-secondary" size="sm" onClick={() => { setSelectedRequest(req); toggleModal(); }}>
                                  <i className="ri-history-line me-1"></i> View Timeline
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                        {filteredData.length === 0 && (
                           <tr>
                             <td colSpan={6} className="text-center py-4 text-muted">No audit logs found for your jurisdiction.</td>
                           </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                )}
              </CardBody>
            </Card>
          </Container>
        </div>

        <Modal isOpen={modalOpen} toggle={toggleModal} size="lg" scrollable centered>
          <ModalHeader toggle={toggleModal} className="bg-light">
             Request Details: <span className="text-primary">{selectedRequest?.ticketNo}</span>
          </ModalHeader>
          <ModalBody className="p-4 bg-soft-light">
            {selectedRequest && (
              <>
                {/* ✅ UPDATED: 4-Column Grid to properly display API Access field */}
                <div className="bg-white p-3 rounded mb-3 border shadow-sm">
                  <Row>
                    <Col md={3} xs={6} className="mb-3 mb-md-0 border-end border-light">
                      <p className="mb-1 text-muted small text-uppercase fw-bold">Entity / Beneficiary</p>
                      <h6 className="mb-0 fs-14 text-dark">{selectedRequest.entityName}</h6>
                    </Col>
                    
                    <Col md={3} xs={6} className="mb-3 mb-md-0 border-end border-light px-md-3">
                      <p className="mb-1 text-muted small text-uppercase fw-bold">Username</p>
                      <h6 className="mb-0 fs-14 text-primary">{selectedRequest.username || "N/A"}</h6>
                    </Col>
                    
                    <Col md={3} xs={6} className="px-md-3">
                      <p className="mb-1 text-muted small text-uppercase fw-bold">API Access</p>
                      <h6 className="mb-0 fs-14">
                        {selectedRequest.isApiAccess === true || String(selectedRequest.isApiAccess) === "true" ? (
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
                        color={modalIsEmergency ? "danger" : "info"} 
                        className={`fs-12 text-uppercase shadow-sm ${modalShouldBlink ? 'blink-emergency' : ''}`}
                      >
                        {selectedRequest.category?.replace("_", " ")}
                      </Badge>
                    </Col>
                  </Row>
                </div>

                <div className="mb-4 bg-white p-3 rounded border shadow-sm">
                  <Row>
                    <Col sm={6} className="border-end">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="fs-12 fw-bold text-uppercase text-muted mb-0">IPs to Add ({selectedRequest.ips?.length || 0})</h6>
                        {selectedRequest.ips?.length > 0 && (
                          <Button color="soft-primary" size="sm" className="py-0 px-2" onClick={() => handleCopy(selectedRequest.ips.map((i:any)=>i.ipAddress).join(", "), "Copied Added IPs")}>
                            Copy
                          </Button>
                        )}
                      </div>
                      <div className="d-flex flex-wrap gap-1">
                        {selectedRequest.ips?.slice(0, 5).map((ip: any, i: number) => (
                          <Badge color="success" className="fw-normal" key={i}>+ {ip.ipAddress}</Badge>
                        ))}
                        {selectedRequest.ips?.length > 5 && <Badge color="light" className="text-dark border">+ {selectedRequest.ips.length - 5} more...</Badge>}
                        {!selectedRequest.ips?.length && <span className="text-muted small italic">None</span>}
                      </div>
                    </Col>

                    <Col sm={6} className="ps-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="fs-12 fw-bold text-uppercase text-muted mb-0">IPs to Remove</h6>
                        {selectedRequest.ipToRemove && (
                          <Button color="soft-danger" size="sm" className="py-0 px-2" onClick={() => handleCopy(selectedRequest.ipToRemove, "Copied Removed IPs")}>
                            Copy
                          </Button>
                        )}
                      </div>
                      <div className="d-flex flex-wrap gap-1">
                        {selectedRequest.ipToRemove ? selectedRequest.ipToRemove.split(',').slice(0, 5).map((ip: string, i: number) => (
                          <Badge color="danger" className="fw-normal" key={i}>- {ip.trim()}</Badge>
                        )) : <span className="text-muted small italic">None</span>}
                        {selectedRequest.ipToRemove?.split(',').length > 5 && <Badge color="light" className="text-dark border">+ {selectedRequest.ipToRemove.split(',').length - 5} more...</Badge>}
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="mb-4 bg-white p-3 rounded border shadow-sm">
                  <Row>
                    <Col sm={6} className="border-end">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="fs-12 fw-bold text-uppercase text-muted mb-0">Prior IPs ({selectedRequest.beforeIps?.length || 0})</h6>
                        {selectedRequest.beforeIps?.length > 0 && (
                           <Button color="soft-secondary" size="sm" className="py-0 px-2" onClick={() => handleCopy(selectedRequest.beforeIps.join(", "), "Copied Prior IPs")}>Copy</Button>
                        )}
                      </div>
                      <div className="d-flex flex-wrap gap-1">
                        {selectedRequest.beforeIps?.slice(0, 5).map((ip: string, i: number) => (
                          <Badge color="secondary" className="fw-normal" key={i}>{ip}</Badge>
                        ))}
                        {selectedRequest.beforeIps?.length > 5 && <Badge color="light" className="text-dark border">+ {selectedRequest.beforeIps.length - 5} more...</Badge>}
                        {!selectedRequest.beforeIps?.length && <span className="text-muted small italic">None</span>}
                      </div>
                    </Col>
                    
                    <Col sm={6} className="ps-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="fs-12 fw-bold text-uppercase text-muted mb-0">Resulting IPs ({selectedRequest.afterIps?.length || 0})</h6>
                        {selectedRequest.afterIps?.length > 0 && (
                           <Button color="soft-primary" size="sm" className="py-0 px-2" onClick={() => handleCopy(selectedRequest.afterIps.join(", "), "Copied Resulting IPs")}>Copy All</Button>
                        )}
                      </div>
                      <div className="d-flex flex-wrap gap-1">
                        {selectedRequest.afterIps?.slice(0, 5).map((ip: string, i: number) => {
                          const isNew = !selectedRequest.beforeIps?.includes(ip);
                          return <Badge color={isNew ? "success" : "primary"} className="fw-normal" key={i}>{ip}</Badge>;
                        })}
                        {selectedRequest.afterIps?.length > 5 && <Badge color="light" className="text-dark border">+ {selectedRequest.afterIps.length - 5} more...</Badge>}
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="mb-4">
                  <h6 className="fs-12 fw-bold text-uppercase text-muted mb-3 ps-1">Workflow Timeline</h6>
                  <div className="timeline-container ps-3" style={{ borderLeft: "2px solid #ced4da", marginLeft: "8px" }}>
                    {selectedRequest.reason && (
                      <div className="position-relative mb-3">
                        <div className="position-absolute" style={{ left: "-25px", top: "2px", width: "12px", height: "12px", borderRadius: "50%", backgroundColor: '#ced4da', border: "2px solid white", boxShadow: "0 0 0 1px #ced4da" }}></div>
                        <div className="bg-white p-3 rounded border shadow-sm">
                            <div className="d-flex justify-content-between align-items-center mb-1">
                                <Badge color="soft-primary" className="text-primary">INITIATED BY {getInitiatorName(selectedRequest)}</Badge>
                                <span className="text-muted small">{new Date(selectedRequest.createdAt).toLocaleString()}</span>
                            </div>
                            <div className="small text-dark fst-italic">"{selectedRequest.reason}"</div>
                            
                            {modalIsEmergency && selectedRequest.duration && (
                              <div className="mt-2 text-danger small fw-bold">
                                <i className="ri-time-line align-bottom me-1"></i> Emergency Duration: {selectedRequest.duration}
                              </div>
                            )}
                        </div>
                      </div>
                    )}

                    {timelineLogs.map((log: any, idx: number) => {
                        const actor = getLogActor(log, idx, timelineLogs);
                        return (
                          <div className="position-relative mb-3" key={idx}>
                              <div className="position-absolute" style={{ left: "-25px", top: "2px", width: "12px", height: "12px", borderRadius: "50%", backgroundColor: log.action === 'REJECTED' ? '#f06548' : '#0ab39c', border: "2px solid white", boxShadow: "0 0 0 1px #ced4da" }}></div>
                              <div className="bg-white p-3 rounded border shadow-sm">
                                  <div className="d-flex justify-content-between align-items-center mb-1">
                                      <Badge color={log.action === 'REJECTED' ? 'soft-danger' : 'soft-info'} className={log.action === 'REJECTED' ? 'text-danger' : 'text-info'}>
                                          {actor} - {log.action}
                                      </Badge>
                                      <span className="text-muted small">{new Date(log.createdAt).toLocaleString()}</span>
                                  </div>
                                  <div className="small text-dark fst-italic">"{log.remarks}"</div>
                              </div>
                          </div>
                        );
                    })}
                  </div>
                </div>
              </>
            )}
          </ModalBody>
        </Modal>
      </React.Fragment>
    </RoleGuard>
  );
}