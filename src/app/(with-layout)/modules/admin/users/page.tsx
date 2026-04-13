"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Card, CardBody, CardHeader, Table, Badge, Spinner, Button, Input, Form, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupText, Alert } from "reactstrap";
import BreadCrumb from "@common/BreadCrumb";
import { toast, ToastContainer } from "react-toastify";
import Select, { StylesConfig } from "react-select";
import "react-toastify/dist/ReactToastify.css";

const ORG_REGION_MAP: Record<string, string> = {
  "org-id-srldc": "SRLDC",
  "org-id-nrldc": "NRLDC",
  "org-id-wrldc": "WRLDC",
  "org-id-erldc": "ERLDC",
  "org-id-nerldc": "NERLDC",
  "org-id-nldc": "NLDC",
};

interface FetchedUser {
  entityName: string;
  username: string;
  contactPerson: string;
  email: string;
  phone: string;
  location: string;
  totalIps: number;
  availableIps: string[];
  [key: string]: any;
}

// --- STYLES FOR REACT-SELECT ---
type SelectOption = { label: string; value: string };

const baseSelectStyles: StylesConfig<SelectOption, boolean> = {
  control: (base, state) => ({
    ...base,
    borderColor: state.isFocused ? "#878a99" : "#ced4da",
    boxShadow: state.isFocused ? "0 0 0 0.15rem rgba(64, 81, 137, 0.25)" : "none",
    "&:hover": { borderColor: state.isFocused ? "#878a99" : "#ced4da" },
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? "#405189" : state.isFocused ? "rgba(64, 81, 137, 0.08)" : "white",
    color: state.isSelected ? "white" : "#212529",
    "&:active": { backgroundColor: state.isSelected ? "#405189" : "rgba(64, 81, 137, 0.1)" },
  }),
};

const matteRedStyles: StylesConfig<SelectOption, true> = {
  ...baseSelectStyles,
  multiValue: (base) => ({ ...base, backgroundColor: "#f06548", borderRadius: "3px" }),
  multiValueLabel: (base) => ({ ...base, color: "white" }),
  multiValueRemove: (base) => ({ ...base, color: "white", ":hover": { backgroundColor: "#cc563d", color: "white" } }),
};

// 🛡️ VAPT: Helper to grab CSRF token securely
const getCsrfToken = () => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("csrfToken") || "";
  }
  return "";
};

export default function EntityUsersManagement() {
  const [entities, setEntities] = useState<any[]>([]);
  const [users, setUsers] = useState<FetchedUser[]>([]);
  const [loadingEntities, setLoadingEntities] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  
  const [entitySearch, setEntitySearch] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [entitySort, setEntitySort] = useState<{ key: string; direction: 'asc' | 'desc' | null }>({ key: '', direction: null });
  const [userSort, setUserSort] = useState<{ key: string; direction: 'asc' | 'desc' | null }>({ key: '', direction: null });

  const [viewEntitiesModal, setViewEntitiesModal] = useState(false);
  const [addEntityModal, setAddEntityModal] = useState(false);
  const [historyModal, setHistoryModal] = useState(false);
  
  const [manageIpsModal, setManageIpsModal] = useState(false);
  const [selectedManageUser, setSelectedManageUser] = useState<FetchedUser | null>(null);
  const [isRevokingIp, setIsRevokingIp] = useState<boolean>(false); 
  const [selectedIpsToRevoke, setSelectedIpsToRevoke] = useState<string[]>([]); 

  const [newEntityName, setNewEntityName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState("");
  const [userHistory, setUserHistory] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const [editingEntityId, setEditingEntityId] = useState<string | null>(null);
  const [editEntityName, setEditEntityName] = useState("");
  const [editEntityRegion, setEditEntityRegion] = useState("");

  const authData = useMemo(() => {
    if (typeof window === "undefined") return { role: "NLDC", id: "", orgId: "", region: "UNKNOWN", name: "" };

    // 🛡️ VAPT FIX: Read from the safe metadata set during login, not the removed JWT token
    const role = (localStorage.getItem("userRole") || localStorage.getItem("role") || "NLDC").replace(/['"]/g, "").toUpperCase();
    const orgId = localStorage.getItem("organizationId") || "";
    const name = (localStorage.getItem("userName") || "").toUpperCase();

    let region = "UNKNOWN";
    if (name.includes("SRLDC")) region = "SRLDC";
    else if (name.includes("NRLDC")) region = "NRLDC";
    else if (name.includes("WRLDC")) region = "WRLDC";
    else if (name.includes("ERLDC")) region = "ERLDC";
    else if (name.includes("NERLDC")) region = "NERLDC";
    else if (ORG_REGION_MAP[orgId]) region = ORG_REGION_MAP[orgId];
    else if (role === "NLDC") region = "NLDC";

    return { role, id: "", orgId, region, name };
  }, []);

  const { role: myRole, orgId: myOrgId, region: myRegion, name: myName } = authData;

  const canManageIps = ["IT", "ADMIN"].includes(myRole);

  const notifySuccess = (msg: string) => toast(msg, { position: "top-right", hideProgressBar: true, className: 'bg-success text-white' });
  const notifyError = (msg: string) => toast(msg, { position: "top-right", hideProgressBar: true, className: 'bg-danger text-white' });

  const copyToClipboard = (text: string, successMsg: string) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => notifySuccess(successMsg)).catch(() => executeFallbackCopy(text, successMsg));
    } else {
      executeFallbackCopy(text, successMsg);
    }
  };

  const executeFallbackCopy = (text: string, successMsg: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try { document.execCommand('copy'); notifySuccess(successMsg); } catch (err) { notifyError("Failed to copy."); }
    document.body.removeChild(textArea);
  };

  const toggleViewEntitiesModal = () => { setViewEntitiesModal(!viewEntitiesModal); setEditingEntityId(null); };
  const toggleAddEntityModal = () => { setAddEntityModal(!addEntityModal); setNewEntityName(""); };
  const toggleHistoryModal = () => setHistoryModal(!historyModal);
  
  const toggleManageIpsModal = (user?: FetchedUser) => {
    if (user) setSelectedManageUser(user);
    setManageIpsModal(!manageIpsModal);
    setSelectedIpsToRevoke([]); 
  };

  const fetchData = async () => {
    setLoadingEntities(true);
    setLoadingUsers(true);
    try {
      const cacheBuster = Date.now();
      const [entRes, userRes] = await Promise.all([
        fetch(`/api/entities?_t=${cacheBuster}`), // Role/orgId removed from URL for security
        fetch(`/api/beneficiary-users?_t=${cacheBuster}`)
      ]);

      if (entRes.ok) {
        const entJson = await entRes.json();
        if (entJson.success) setEntities(entJson.data);
      }
      
      if (userRes.ok) {
        const userJson = await userRes.json();
        if (userJson.success) setUsers(userJson.data);
      }
    } catch (e) {
      notifyError("Failed to fetch data.");
    } finally {
      setLoadingEntities(false);
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    if (!myOrgId && myRole !== "ADMIN") return; 
    fetchData();
  }, [myRole, myOrgId, myRegion]);

  const handleAddEntity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntityName.trim()) return notifyError("Entity name is required.");
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/entities", {
        method: "POST", 
        headers: { 
          "Content-Type": "application/json",
          "X-CSRF-Token": getCsrfToken() // 🛡️ VAPT: CSRF Attached
        },
        body: JSON.stringify({ name: newEntityName.trim(), region: myRegion })
      });
      if (res.ok) {
        notifySuccess("Entity created successfully!");
        toggleAddEntityModal();
        fetchData(); 
      } else {
        const err = await res.json();
        notifyError(err.error || "Failed to create entity");
      }
    } catch (e) {
      notifyError("Network error while creating entity.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveEdit = async (id: string) => {
    if (!editEntityName.trim()) return notifyError("Entity name cannot be empty.");
    try {
      const res = await fetch("/api/entities", {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "X-CSRF-Token": getCsrfToken() // 🛡️ VAPT: CSRF Attached
        },
        body: JSON.stringify({ id, name: editEntityName, region: editEntityRegion })
      });
      if (res.ok) {
        notifySuccess("Entity updated successfully!");
        setEditingEntityId(null);
        fetchData(); 
      } else {
        const err = await res.json();
        notifyError(err.error || "Failed to update entity");
      }
    } catch (e) {
      notifyError("Network error while updating entity.");
    }
  };

  const viewUserHistory = async (username: string) => {
    setSelectedUsername(username); setHistoryModal(true); setLoadingHistory(true);
    try {
      const res = await fetch(`/api/beneficiary-users/${username}`);
      const json = await res.json();
      if (json.success) setUserHistory(json.data);
    } catch (e) { notifyError("Failed to fetch history."); } 
    finally { setLoadingHistory(false); }
  };

  const handleRevokeIps = async () => {
    if (!selectedManageUser || selectedIpsToRevoke.length === 0) return;

    setIsRevokingIp(true);
    try {
      const res = await fetch(`/api/beneficiary-users/${selectedManageUser.username}/remove-ip`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "X-CSRF-Token": getCsrfToken() // 🛡️ VAPT: CSRF Attached
        },
        body: JSON.stringify({
          username: selectedManageUser.username,
          ipAddresses: selectedIpsToRevoke,
          actorRole: myRole,
          actorName: myName || "Administrator"
        })
      });

      const json = await res.json();

      if (res.ok && json.success) {
        notifySuccess(`${selectedIpsToRevoke.length} IP(s) successfully revoked.`);
        setSelectedIpsToRevoke([]);
        setManageIpsModal(false); 
        setTimeout(() => fetchData(), 800); 
      } else {
        notifyError(json.error || "Failed to revoke IPs.");
      }
    } catch (e) {
      notifyError("Network error while revoking IPs.");
    } finally {
      setIsRevokingIp(false);
    }
  };

  const handleEntitySort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (entitySort.key === key && entitySort.direction === 'asc') direction = 'desc';
    setEntitySort({ key, direction });
  };

  const handleUserSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (userSort.key === key && userSort.direction === 'asc') direction = 'desc';
    setUserSort({ key, direction });
  };

  const filteredEntities = entities.filter(e => 
    e.name?.toLowerCase().includes(entitySearch.toLowerCase()) || e.region?.toLowerCase().includes(entitySearch.toLowerCase())
  ).sort((a, b) => {
    if (!entitySort.key) return 0;
    const aVal = a[entitySort.key]?.toString().toLowerCase() || "";
    const bVal = b[entitySort.key]?.toString().toLowerCase() || "";
    return aVal < bVal ? (entitySort.direction === 'asc' ? -1 : 1) : aVal > bVal ? (entitySort.direction === 'asc' ? 1 : -1) : 0;
  });

  const filteredUsers = users.filter(u => {
    const searchLower = userSearch.toLowerCase();
    return u.username?.toLowerCase().includes(searchLower) || u.entityName?.toLowerCase().includes(searchLower) || u.availableIps?.some((ip: string) => ip.includes(searchLower));
  }).sort((a, b) => {
    if (!userSort.key) return 0;
    const aVal = a[userSort.key]?.toString().toLowerCase() || "";
    const bVal = b[userSort.key]?.toString().toLowerCase() || "";
    return aVal < bVal ? (userSort.direction === 'asc' ? -1 : 1) : aVal > bVal ? (userSort.direction === 'asc' ? 1 : -1) : 0;
  });

  const getSortIcon = (sortState: any, key: string) => {
    if (sortState.key !== key) return <i className="ri-expand-up-down-line ms-1 text-muted opacity-50"></i>;
    return sortState.direction === 'asc' ? <i className="ri-arrow-up-s-line ms-1"></i> : <i className="ri-arrow-down-s-line ms-1"></i>;
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Entity & Users Management" pageTitle="Administration" />

          <Row>
            <Col lg={12}>
              <Card className="shadow-sm border-0">
                <CardHeader className="bg-white border-bottom-dashed pt-4 pb-3">
                  <Row className="g-3 align-items-center">
                    <Col sm={4}>
                      <h5 className="card-title mb-0 flex-grow-1">
                        System Users (Active Beneficiaries) <Badge color="soft-success" className="text-success ms-2">{users.length}</Badge>
                      </h5>
                    </Col>
                    <Col sm={8}>
                      <div className="d-flex justify-content-sm-end gap-2 flex-wrap">
                        <div className="search-box">
                          <InputGroup>
                            <InputGroupText className="bg-light border-light"><i className="ri-search-line search-icon"></i></InputGroupText>
                            <Input type="text" className="form-control bg-light border-light" placeholder="Search user, entity, or IP..." value={userSearch} onChange={(e) => setUserSearch(e.target.value)} style={{ width: "250px" }} />
                          </InputGroup>
                        </div>
                          <Button color="info" onClick={toggleViewEntitiesModal}>
                            <i className="ri-building-line me-1"></i> Manage Entities
                          </Button>                      
                        </div>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className="p-0">
                  {loadingUsers ? (<div className="text-center p-5"><Spinner color="primary" /></div>) : filteredUsers.length === 0 ? (
                    <div className="text-center text-muted p-5"><i className="ri-user-search-line display-5 text-light mb-3"></i><h5>No Users Found</h5></div>
                  ) : (
                    <div className="table-responsive" style={{ minHeight: "500px" }}>
                      <Table className="align-middle table-nowrap mb-0 table-hover">
                        <thead className="table-light">
                          <tr>
                            <th onClick={() => handleUserSort('entityName')} style={{ cursor: 'pointer', width: "20%" }}>Entity / Beneficiary {getSortIcon(userSort, 'entityName')}</th>
                            <th onClick={() => handleUserSort('username')} style={{ cursor: 'pointer', width: "25%" }}>Username {getSortIcon(userSort, 'username')}</th>
                            <th style={{ width: "40%" }}>Currently Active IPs</th>
                            <th className="text-end" style={{ width: "15%" }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredUsers.map((user, idx) => {
                            const ips = user.availableIps || [];
                            const visibleIps = ips.slice(0, 5); 
                            const hiddenCount = ips.length - 5;
                            return (
                              <tr key={idx}>
                                <td><Badge color="soft-primary" className="text-primary fs-12 px-2 py-1 border border-primary border-opacity-25">{user.entityName}</Badge></td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <div className="flex-shrink-0 me-2"><i className="ri-account-circle-line fs-3 text-muted"></i></div>
                                    <div><h6 className="mb-0">{user.username}</h6><span className="text-muted small">{user.email || "No email provided"}</span></div>
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex flex-column gap-1">
                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                        <span className="text-muted small fw-medium">Total: {ips.length} IPs</span>
                                        {ips.length > 0 && (<button className="btn btn-sm btn-soft-secondary py-0 px-2 d-flex align-items-center" onClick={() => copyToClipboard(ips.join(", "), `${ips.length} IPs copied!`)}><i className="ri-file-copy-line align-bottom me-1"></i> </button>)}
                                    </div>
                                    <div className="d-flex flex-wrap gap-1">
                                      {visibleIps.map((ip: string, i: number) => (<Badge color="info" className="fw-medium px-2 py-1" key={i}><i className="ri-global-line me-1 align-bottom"></i>{ip}</Badge>))}
                                      {hiddenCount > 0 && (<Badge color="light" className="text-dark fw-medium px-2 py-1 border">+ {hiddenCount} more...</Badge>)}
                                    </div>
                                  </div>
                                </td>
                                <td className="text-end">
                                  {canManageIps && (
                                    <Button size="sm" color="danger" className="btn-soft-danger me-2" onClick={() => toggleManageIpsModal(user)}>
                                      <i className="ri-delete-bin-line align-bottom me-1"></i> Manage IPs
                                    </Button>
                                  )}
                                  <Button size="sm" color="primary" className="btn-soft-primary" onClick={() => viewUserHistory(user.username)}>
                                    <i className="ri-history-line align-bottom me-1"></i> Change History
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <Modal isOpen={addEntityModal} toggle={toggleAddEntityModal} centered zIndex={1055}>
        <ModalHeader toggle={toggleAddEntityModal} className="bg-light pb-3">Create New Entity</ModalHeader>
        <Form onSubmit={handleAddEntity}>
          <ModalBody className="p-4">
            <div className="text-center mb-4">
              <div className="avatar-md mx-auto mb-3"><div className="avatar-title bg-soft-primary text-primary display-5 rounded-circle"><i className="ri-building-line"></i></div></div>
              <h5 className="text-muted">Add a new WBES Beneficiary</h5>
            </div>
            <FormGroup>
              <Label className="fw-semibold">Entity Name <span className="text-danger">*</span></Label>
              <Input type="text" placeholder="e.g. APSLDC, KPTCL..." value={newEntityName} onChange={(e) => setNewEntityName(e.target.value)} disabled={isSubmitting} className="form-control-lg text-uppercase" />
            </FormGroup>
          </ModalBody>
          <ModalFooter className="bg-light">
            <Button color="light" type="button" onClick={toggleAddEntityModal} disabled={isSubmitting}>Cancel</Button>
            <Button color="primary" type="submit" disabled={isSubmitting}>{isSubmitting ? <Spinner size="sm" className="me-2"/> : <i className="ri-save-line align-bottom me-1"></i>}Save Entity</Button>
          </ModalFooter>
        </Form>
      </Modal>

      <Modal isOpen={manageIpsModal} toggle={() => toggleManageIpsModal()} size="md" centered scrollable>
        <ModalHeader toggle={() => toggleManageIpsModal()} className="bg-light pb-3 text-dark fw-bold border-bottom-0">
          <i className="ri-alarm-warning-line me-2"></i> Revoke Active IPs
        </ModalHeader>
        <ModalBody className="p-4 bg-soft-light pt-0">
          {selectedManageUser && (
            <>
              <div className="mb-4">
                <p className="text-muted small text-uppercase fw-bold mb-1">Target User</p>
                <h5 className="mb-0 text-dark">{selectedManageUser.username} <Badge color="primary" className="ms-2">{selectedManageUser.entityName}</Badge></h5>
                <p className="text-muted small mt-2">
                  <i className="ri-information-line me-1"></i> Revoking an IP immediately removes access and notifies all regional stakeholders.
                </p>
              </div>

              <div className="bg-white rounded border shadow-sm p-4">
                {selectedManageUser.availableIps.length === 0 ? (
                  <div className="text-center text-muted py-3">This user currently has no active IPs.</div>
                ) : (
                  <FormGroup className="mb-0">
                    <Label className="fw-bold text-dark mb-3">Search & Select IPs to Revoke <span className="text-danger">*</span></Label>
                    
                    <Alert color="danger" className="border-danger border-opacity-25 bg-soft-danger d-flex align-items-start mb-3 p-3">
                      <i className="ri-error-warning-line fs-5 me-2 text-danger mt-1"></i>
                      <div>
                        <div className="fw-bold text-danger mb-1">Warning</div>
                        <div className="small text-danger">Revoking selected IPs will immediately remove access for this user and notify all regional stakeholders. Please review the selected IPs carefully before proceeding.</div>
                      </div>
                    </Alert>

                    <Select<SelectOption, true>
                      isMulti
                      styles={matteRedStyles}
                      options={selectedManageUser.availableIps.map(ip => ({ label: ip, value: ip }))}
                      placeholder="Select multiple active IP addresses..."
                      value={selectedIpsToRevoke.map(ip => ({ label: ip, value: ip }))}
                      onChange={(opts) => setSelectedIpsToRevoke(opts ? opts.map((opt) => opt.value) : [])}
                      isClearable
                      classNamePrefix="js-example-basic-multiple"
                      isDisabled={isRevokingIp}
                    />

                    {selectedIpsToRevoke.length > 0 && (
                      <div className="mt-3">
                        <span className="text-danger small border border-danger rounded px-2 py-1 d-inline-block">
                          {selectedIpsToRevoke.length} IP(s) selected for revocation
                        </span>
                      </div>
                    )}
                    
                    <div className="mt-4 text-end">
                      <Button color="danger" onClick={handleRevokeIps} disabled={selectedIpsToRevoke.length === 0 || isRevokingIp}>
                        {isRevokingIp ? (<><Spinner size="sm" className="me-1"/> Revoking...</>) : (<><i className="ri-delete-bin-line me-1 align-bottom"></i> Revoke Selected IPs</>)}
                      </Button>
                    </div>
                  </FormGroup>
                )}
              </div>
            </>
          )}
        </ModalBody>
      </Modal>

      <Modal isOpen={viewEntitiesModal} toggle={toggleViewEntitiesModal} size="xl" scrollable centered>
        <ModalHeader toggle={toggleViewEntitiesModal} className="bg-light pb-3">Registered Entities <Badge color="primary" className="ms-2">{entities.length}</Badge></ModalHeader>
        <ModalBody className="p-0">
          <div className="p-3 bg-soft-light border-bottom d-flex justify-content-between align-items-center">
            <InputGroup style={{ width: "300px" }}><InputGroupText className="bg-white"><i className="ri-search-line"></i></InputGroupText><Input type="text" placeholder="Search entities or region..." value={entitySearch} onChange={(e) => setEntitySearch(e.target.value)}/></InputGroup>
            <Button color="primary" onClick={toggleAddEntityModal}><i className="ri-add-line align-bottom me-1"></i> Add Entity</Button>
          </div>
          {loadingEntities ? (<div className="text-center p-5"><Spinner color="primary" /></div>) : filteredEntities.length === 0 ? (
            <div className="text-center text-muted p-5"><i className="ri-building-line display-5 text-light mb-3"></i><h5>No Entities Found</h5></div>
          ) : (
            <div className="table-responsive">
              <Table className="align-middle table-nowrap mb-0 table-hover">
                <thead className="table-light sticky-top">
                  <tr>
                    <th className="ps-4" style={{ width: "10%" }}>ID</th>
                    <th onClick={() => handleEntitySort('name')} style={{ cursor: 'pointer', width: "30%" }}>Entity Name {getSortIcon(entitySort, 'name')}</th>
                    <th onClick={() => handleEntitySort('region')} style={{ cursor: 'pointer', width: "20%" }}>Region {getSortIcon(entitySort, 'region')}</th>
                    <th onClick={() => handleEntitySort('createdAt')} style={{ cursor: 'pointer', width: "20%" }}>Date Added {getSortIcon(entitySort, 'createdAt')}</th>
                    {myRole !== "RLDC" && <th className="text-end pe-4" style={{ width: "20%" }}>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {filteredEntities.map((ent, idx) => (
                    <tr key={ent.id || idx}>
                      <td className="ps-4"><span className="text-muted fw-medium">#{idx + 1}</span></td>
                      
                      <td>
                        {editingEntityId === ent.id ? (
                          <Input bsSize="sm" type="text" value={editEntityName} onChange={(e) => setEditEntityName(e.target.value)} className="text-uppercase" autoFocus />
                        ) : (
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0 avatar-xs me-2">
                              <div className="avatar-title bg-soft-primary text-primary rounded-circle fs-13">{ent.name?.charAt(0).toUpperCase()}</div>
                            </div>
                            <span className="fw-bold text-dark">{ent.name}</span>
                          </div>
                        )}
                      </td>
                      
                      <td>
                        {editingEntityId === ent.id ? (
                          <Input bsSize="sm" type="select" value={editEntityRegion} onChange={(e) => setEditEntityRegion(e.target.value)}>
                            <option value="UNKNOWN">UNKNOWN</option>
                            <option value="SRLDC">SRLDC</option>
                            <option value="NRLDC">NRLDC</option>
                            <option value="WRLDC">WRLDC</option>
                            <option value="ERLDC">ERLDC</option>
                            <option value="NERLDC">NERLDC</option>
                          </Input>
                        ) : (
                          <Badge color={ent.region?.includes("RLDC") ? "info" : "light"} className={ent.region?.includes("RLDC") ? "text-white" : "text-dark border"}>{ent.region || "N/A"}</Badge>
                        )}
                      </td>
                      
                      <td className="text-muted"><i className="ri-calendar-event-line me-1 align-bottom"></i>{ent.createdAt ? new Date(ent.createdAt).toLocaleDateString('en-GB') : 'N/A'}</td>
                      
                      {myRole !== "RLDC" && (
                        <td className="text-end pe-4">
                          {editingEntityId === ent.id ? (
                            <div className="d-flex gap-1 justify-content-end">
                              <Button size="sm" color="success" onClick={() => handleSaveEdit(ent.id)}><i className="ri-check-line"></i> Save</Button>
                              <Button size="sm" color="light" onClick={() => setEditingEntityId(null)}><i className="ri-close-line"></i></Button>
                            </div>
                          ) : (
                            <Button size="sm" color="soft-primary" onClick={() => {
                              setEditingEntityId(ent.id);
                              setEditEntityName(ent.name);
                              setEditEntityRegion(ent.region);
                            }}>
                              <i className="ri-pencil-line me-1 align-bottom"></i> Edit
                            </Button>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </ModalBody>
      </Modal>

      <Modal isOpen={historyModal} toggle={toggleHistoryModal} size="lg" scrollable centered>
        <ModalHeader toggle={toggleHistoryModal} className="bg-light pb-3">Complete IP Change History: <span className="text-primary">{selectedUsername}</span></ModalHeader>
        <ModalBody className="p-4 bg-soft-light">
          {loadingHistory ? (<div className="text-center py-5"><Spinner color="primary" /> Fetching timeline...</div>) : userHistory.length === 0 ? (<div className="text-center text-muted py-5"><i className="ri-history-line display-5 text-light mb-3"></i><h5>No History Found</h5></div>) : (
            <div className="timeline-container ps-4" style={{ borderLeft: "2px solid #ced4da" }}>
              {userHistory.map((req, index) => {
                const addedIps = req.ips?.map((i: any) => i.ipAddress) || [];
                const removedIps = req.ipToRemove ? req.ipToRemove.split(',').map((ip: string) => ip.trim()).filter(Boolean) : [];
                const afterIps = req.afterIps || [];

                return (
                  <div className="position-relative mb-5" key={req.id}>
                    <div className="position-absolute" style={{ left: "-33px", top: "0px", width: "16px", height: "16px", borderRadius: "50%", backgroundColor: "#0ab39c", border: "3px solid white", boxShadow: "0 0 0 1px #ced4da" }}></div>
                    <Card className="border shadow-none mb-0">
                      <CardHeader className="bg-white border-bottom py-2 d-flex justify-content-between align-items-center">
                        <div><span className="fw-bold text-dark me-2">{req.ticketNo}</span><Badge color={req.category === 'NEW_USER' ? 'success' : 'info'}>{req.category.replace('_', ' ')}</Badge></div>
                        <small className="text-muted fw-medium">{new Date(req.createdAt).toLocaleString()}</small>
                      </CardHeader>
                      <CardBody className="py-3">
                        <Row className="mb-3">
                          <Col sm={6}>
                            <div className="d-flex justify-content-between align-items-center mb-1">
                              <span className="text-muted small fw-bold">IPs Added</span>
                              {addedIps.length > 0 && (
                                <button type="button" className="btn btn-sm btn-link p-0 text-primary shadow-none text-decoration-none" onClick={() => copyToClipboard(addedIps.join(", "), "Added IPs copied!")}>
                                  <i className="ri-file-copy-line"></i> Copy
                                </button>
                              )}
                            </div>
                            <div className="d-flex flex-wrap gap-1">{addedIps.length > 0 ? addedIps.slice(0, 5).map((ip: string, i: number) => (<Badge color="success" className="fw-normal px-2 py-1 mb-1" key={i}>+ {ip}</Badge>)) : <span className="text-muted small">None</span>}</div>
                          </Col>
                          <Col sm={6}>
                            <div className="d-flex justify-content-between align-items-center mb-1">
                              <span className="text-muted small fw-bold">IPs Removed</span>
                              {removedIps.length > 0 && (
                                <button type="button" className="btn btn-sm btn-link p-0 text-danger shadow-none text-decoration-none" onClick={() => copyToClipboard(removedIps.join(", "), "Removed IPs copied!")}>
                                  <i className="ri-file-copy-line"></i> Copy
                                </button>
                              )}
                            </div>
                            <div className="d-flex flex-wrap gap-1">{removedIps.length > 0 ? removedIps.slice(0, 5).map((ip: string, i: number) => (<Badge color="danger" className="fw-normal px-2 py-1 mb-1" key={i}>- {ip}</Badge>)) : <span className="text-muted small">None</span>}</div>
                          </Col>
                        </Row>
                        <div className="bg-light p-3 rounded border border-dashed mt-2">
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <span className="text-muted small fw-bold">Resulting Active IPs</span>
                            {afterIps.length > 0 && (
                              <button type="button" className="btn btn-sm btn-link p-0 text-primary shadow-none text-decoration-none" onClick={() => copyToClipboard(afterIps.join(", "), "Active IPs copied!")}>
                                <i className="ri-file-copy-line"></i> Copy All
                              </button>
                            )}
                          </div>
                          <div className="d-flex flex-wrap gap-1">{afterIps.length > 0 ? afterIps.slice(0, 5).map((ip: string, i: number) => (<Badge color="primary" className="fw-normal px-2 py-1" key={i}>{ip}</Badge>)) : <span className="text-muted small">0 IPs</span>}</div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                );
              })}
            </div>
          )}
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}