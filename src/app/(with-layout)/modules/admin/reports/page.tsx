"use client";

import React, { useState, useMemo } from "react";
import { 
  Container, Row, Col, Card, CardBody, CardHeader, 
  Modal, ModalHeader, ModalBody, Table, Badge, Button, Spinner, Input
} from "reactstrap";
import BreadCrumb from "@common/BreadCrumb";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RoleGuard } from "@/components/auth/RoleGuard";

interface SharedUser {
  entityName?: string;
  username?: string;
}

interface SharedIpRecord {
  ip: string;
  userCount: number;
  users: SharedUser[]; 
}

export default function ReportsDashboard() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' | null }>({ key: 'userCount', direction: 'desc' });
  
  const [sharedIpsData, setSharedIpsData] = useState<SharedIpRecord[]>([]);

  const handleOpenReport = async (reportType: string) => {
    setActiveModal(reportType);
    setIsLoading(true);
    setSearchTerm(""); 
    setSortConfig({ key: 'userCount', direction: 'desc' }); 

    try {
      if (reportType === "SHARED_IPS") {
        const res = await fetch(`/api/reports/shared-ips?_t=${Date.now()}`);
        const json = await res.json();
        
        if (json.success) {
          setSharedIpsData(json.data);
        } else {
          toast.error(json.error || "Failed to load report data.");
          setActiveModal(null);
        }
      }
    } catch (error) {
      toast.error("Network error while fetching the report.");
      setActiveModal(null);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => setActiveModal(null);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) return <i className="ri-expand-up-down-line ms-1 text-muted opacity-50"></i>;
    return sortConfig.direction === 'asc' ? <i className="ri-arrow-up-s-line ms-1"></i> : <i className="ri-arrow-down-s-line ms-1"></i>;
  };

  // ✅ SORTING & FILTERING LOGIC
  const processedSharedIps = useMemo(() => {
    let result = [...sharedIpsData];

    // 1. Filter
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(record => 
        record.ip.toLowerCase().includes(lowerTerm) ||
        record.users.some(u => {
          const entName = typeof u === 'string' ? u : (u.entityName || "");
          const usrName = typeof u === 'string' ? u : (u.username || "");
          return entName.toLowerCase().includes(lowerTerm) || usrName.toLowerCase().includes(lowerTerm);
        })
      );
    }

    // 2. Sort
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (sortConfig.key === 'ip') {
          return sortConfig.direction === 'asc' ? a.ip.localeCompare(b.ip) : b.ip.localeCompare(a.ip);
        }
        if (sortConfig.key === 'userCount') {
          return sortConfig.direction === 'asc' ? a.userCount - b.userCount : b.userCount - a.userCount;
        }
        return 0;
      });
    }

    return result;
  }, [sharedIpsData, searchTerm, sortConfig]);

  // ✅ DOWNLOAD CSV EXPORT LOGIC
  const downloadCSV = () => {
    if (processedSharedIps.length === 0) {
      toast.warning("No data available to download.");
      return;
    }

    const headers = ["IP Address", "User Count", "Entities", "Usernames"];
    
    const csvRows = processedSharedIps.map(record => {
      const ip = record.ip;
      const count = record.userCount;
      
      const entities = record.users.map(u => {
        return typeof u === 'string' ? u : (u.entityName || "Unknown");
      }).join(" | ");
      
      const usernames = record.users.map(u => {
        return typeof u === 'string' ? u : (u.username || "Unknown");
      }).join(" | ");

      return `"${ip}","${count}","${entities}","${usernames}"`;
    });

    const csvContent = [headers.join(","), ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `WBES_Shared_IPs_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <RoleGuard allowedRoles={["ADMIN", "NLDC", "RLDC", "IT", "CISO", "SOC"]}>
      <React.Fragment>
        <ToastContainer theme="colored" position="top-right" autoClose={3000} hideProgressBar={true} />
        
        <div className="page-content">
          <Container fluid>
            <BreadCrumb title="System Reports" pageTitle="Administration" />

            <Row>
              <Col xl={4} md={6}>
                <Card className="card-animate border-0 shadow-sm">
                  <CardBody>
                    <div className="d-flex align-items-center mb-3">
                      <div className="avatar-sm flex-shrink-0">
                        <span className="avatar-title bg-warning-subtle rounded fs-3 text-warning">
                          <i className="ri-mac-line"></i>
                        </span>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h5 className="mb-0 fw-bold">Shared IPs Report</h5>
                      </div>
                    </div>
                    <p className="text-muted mb-4">
                      Identifies and lists all active IP addresses that are currently mapped to more than one system user.
                    </p>
                    <div className="text-end">
                      <Button 
                        color="primary" 
                        className="btn-soft-primary"
                        onClick={() => handleOpenReport("SHARED_IPS")}
                      >
                        <i className="ri-file-list-3-line align-bottom me-1"></i> View Report
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>

        <Modal 
          isOpen={activeModal === "SHARED_IPS"} 
          toggle={closeModal} 
          size="xl" 
          scrollable 
          centered
        >
          <ModalHeader toggle={closeModal} className="bg-light pb-3 border-bottom-dashed">
            <div className="h5 mb-0"><i className="ri-mac-line text-warning me-2"></i> IPs Assigned to Multiple Users</div>
          </ModalHeader>
          <ModalBody className="p-4 bg-soft-light">
            {isLoading ? (
              <div className="text-center py-5">
                <Spinner color="primary" />
                <p className="mt-2 text-muted">Generating report...</p>
              </div>
            ) : sharedIpsData.length === 0 ? (
              <div className="text-center py-5 text-muted">
                <i className="ri-shield-check-line display-4 text-success mb-3"></i>
                <h5>All Clear!</h5>
                <p>There are currently no IPs shared between multiple users in the system.</p>
              </div>
            ) : (
              <Card className="border-0 shadow-none mb-0">
                <CardHeader className="bg-white border-bottom d-flex flex-wrap gap-3 justify-content-between align-items-center">
                  <h6 className="mb-0 text-muted">Found <Badge color="danger" className="fs-13 px-2">{processedSharedIps.length}</Badge> Conflicting IPs</h6>
                  
                  <div className="d-flex flex-wrap gap-2 align-items-center">
                    <div className="search-box" style={{ width: "300px" }}>
                      <Input 
                        type="text" 
                        className="form-control bg-light border-light" 
                        placeholder="Search IP, Entity, or Username..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <i className="ri-search-line search-icon"></i>
                    </div>

                    <Button color="success" onClick={downloadCSV} className="btn-label shadow-sm">
                      <i className="ri-file-excel-2-line label-icon align-middle fs-16 me-2"></i> Export Report
                    </Button>
                  </div>
                </CardHeader>
                <CardBody className="p-0">
                  <div className="table-responsive">
                    <Table className="align-middle table-nowrap table-hover mb-0">
                      <thead className="table-light sticky-top">
                        <tr>
                          <th onClick={() => handleSort('ip')} style={{ width: "20%", cursor: "pointer" }}>
                            IP Address {getSortIcon('ip')}
                          </th>
                          <th onClick={() => handleSort('userCount')} style={{ width: "15%", cursor: "pointer" }}>
                            User Count {getSortIcon('userCount')}
                          </th>
                          <th style={{ width: "30%" }}>Entities</th>
                          <th style={{ width: "35%" }}>Usernames</th>
                        </tr>
                      </thead>
                      <tbody>
                        {processedSharedIps.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="text-center py-5 text-muted">
                              <i className="ri-search-line fs-1 mb-2 d-block text-muted opacity-50"></i>
                              No results found for "{searchTerm}"
                            </td>
                          </tr>
                        ) : (
                          processedSharedIps.map((record, idx) => (
                            <tr key={idx}>
                              <td>
                                <span className="fw-bold text-danger fs-14">{record.ip}</span>
                              </td>
                              <td>
                                <Badge color="warning" className="fs-12 px-2 py-1">
                                  {record.userCount} Users
                                </Badge>
                              </td>
                              
                              <td>
                                <div className="d-flex flex-column gap-1 align-items-start">
                                  {record.users.map((u, i) => {
                                    let entName = typeof u === 'string' ? u : (u.entityName || "Unknown Entity");
                                    return (
                                      <Badge color="info" className="bg-opacity-10 text-info border fw-medium" key={i}>
                                        {entName}
                                      </Badge>
                                    );
                                  })}
                                </div>
                              </td>
                              
                              <td>
                                <div className="d-flex flex-column gap-1 align-items-start">
                                  {record.users.map((u, i) => {
                                    const usrName = typeof u === 'string' ? u : (u.username || "Unknown Username");
                                    return (
                                      <Badge color="dark" className="bg-opacity-10 text-dark border fw-medium" key={i}>
                                        <i className="ri-user-line text-muted me-1"></i> {usrName}
                                      </Badge>
                                    );
                                  })}
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            )}
          </ModalBody>
        </Modal>

      </React.Fragment>
    </RoleGuard>
  );
}