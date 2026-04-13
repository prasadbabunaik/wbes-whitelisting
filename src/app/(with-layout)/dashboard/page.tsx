"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, Card, CardBody, CardHeader, Badge, Spinner, Table, Progress, Nav, NavItem, NavLink, TabContent, TabPane, Button } from "reactstrap";
import BreadCrumb from "@common/BreadCrumb";
import CountUp from "react-countup";
import Link from "next/link";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import dynamic from "next/dynamic";
import classnames from "classnames";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ORG_REGION_MAP: Record<string, string> = {
  "org-id-srldc": "SRLDC", "org-id-nrldc": "NRLDC", "org-id-wrldc": "WRLDC",
  "org-id-erldc": "ERLDC", "org-id-nerldc": "NERLDC", "org-id-nldc": "NLDC",
};

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("1");

  const toggleTab = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const authData = useMemo(() => {
    if (typeof window === "undefined") return { role: "NLDC", orgId: "", region: "UNKNOWN", name: "" };
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) return { role: "NLDC", orgId: "", region: "UNKNOWN", name: "" };

    try {
      const base64Url = token.split(".")[1];
      const decoded = JSON.parse(decodeURIComponent(atob(base64Url.replace(/-/g, "+").replace(/_/g, "/")).split("").map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join("")));

      const role = decoded.role?.replace(/['"]/g, "").toUpperCase() || "NLDC";
      const orgId = decoded.organizationId || decoded.orgId || "";
      const name = (decoded.name || "").toUpperCase();

      let region = "UNKNOWN";
      if (decoded.initiatorRegion) region = decoded.initiatorRegion.toUpperCase();
      else if (name.includes("SRLDC")) region = "SRLDC";
      else if (name.includes("NRLDC")) region = "NRLDC";
      else if (name.includes("WRLDC")) region = "WRLDC";
      else if (name.includes("NERLDC")) region = "NERLDC";
      else if (name.includes("ERLDC")) region = "ERLDC";
      else if (ORG_REGION_MAP[orgId]) region = ORG_REGION_MAP[orgId];
      else if (role === "NLDC") region = "NLDC";
      else if (role === "RLDC") region = "RLDC";

      return { role, orgId, region, name: decoded.name || role };
    } catch (e) {
      return { role: "NLDC", orgId: "", region: "UNKNOWN", name: "" };
    }
  }, []);

  const isAdminOrNLDC = ["ADMIN", "NLDC"].includes(authData.role);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/dashboard/stats?role=${authData.role}&orgId=${authData.orgId}&region=${authData.region}`);
        const json = await res.json();
        if (json.success) {
          setStats(json.data);
        } else {
          toast.error(json.error || "Failed to load dashboard data");
        }
      } catch (err) {
        console.error(err);
        toast.error("Network error while fetching dashboard data");
      } finally {
        setLoading(false);
      }
    };

    if (authData.role) {
      fetchStats();
    }
  }, [authData.role, authData.orgId, authData.region]);

  const getLogActor = (log: any) => {
    if (log.role === 'ADMIN') return 'ADMIN';
    if (log.action === 'REJECTED') return log.stage; 
    if (log.action === 'COMPLETED') return 'IT'; 
    if (log.action === 'CLARIFICATION') return log.stage; 
    
    if (log.action === 'FORWARDED' || log.action === 'APPROVE') {
      if (log.stage === 'NLDC') return 'RLDC';
      if (log.stage === 'CISO') return 'NLDC';
      if (log.stage === 'SOC') return 'CISO';
      if (log.stage === 'IT') return 'SOC';
    }
    
    return log.role || log.stage;
  };

  if (loading || !stats) {
    return (
      <div className="page-content d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <Spinner color="primary" />
      </div>
    );
  }

  const totalWorkflow = Math.max(stats.widgets?.pending || 1, 1);

  const regionChartOptions: any = {
      chart: { type: 'bar', height: 250, toolbar: { show: false } },
      plotOptions: { bar: { borderRadius: 4, horizontal: false, columnWidth: '45%' } },
      dataLabels: { enabled: false },
      xaxis: { categories: Object.keys(stats.regions || {}) },
      yaxis: {
        labels: { formatter: (val: number) => val.toFixed(0) },
        forceNiceScale: true,
        decimalsInFloat: 0,
      },
      colors: ['#405189'],
    };

// ✅ PERFECTED CHART LOGIC: Wider donut hole and shorter text to prevent overlap
  const categoryChartOptions: any = {
    chart: { type: 'donut', height: 250 }, // Slightly increased height to give it room
    labels: ['Existing Users', 'New Users'], 
    colors: ['#299cdb', '#0ab39c'], 
    legend: { position: 'bottom', offsetY: 5 },
    dataLabels: { enabled: false },
    tooltip: {
      y: {
        formatter: function (val: number, opts: any) {
          const isExisting = opts.seriesIndex === 0;
          const emergencyCount = isExisting 
            ? (stats?.breakdown?.emergencyExisting || 0) 
            : (stats?.breakdown?.emergencyNew || 0);
          
          return `${val} Requests  |  🚨 ${emergencyCount} Emergencies`;
        }
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '78%', // 👈 Increased hole size from 65% to 78% to fit the text
          labels: {
            show: true,
            name: { show: true, fontSize: '13px', fontWeight: 600, offsetY: -5 },
            value: { show: true, fontSize: '24px', fontWeight: 700, offsetY: 5 },
            total: {
              show: true,
              showAlways: true,
              label: 'Emergencies', // 👈 Shortened from "Total Emergencies"
              color: '#f06548',
              formatter: function () {
                return stats?.widgets?.emergency || 0;
              }
            }
          }
        }
      }
    }
  };

  return (
    <RoleGuard allowedRoles={["ADMIN", "NLDC", "RLDC", "CISO", "SOC", "IT"]}>
      <React.Fragment>
        <ToastContainer />
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes blinkRed { 0% { background-color: #f06548; color: white; opacity: 1; } 50% { background-color: white; color: #f06548; opacity: 0.8; } 100% { background-color: #f06548; color: white; opacity: 1; } }
          .blink-emergency { animation: blinkRed 1.5s infinite ease-in-out !important; border: 1px solid #f06548 !important; }
        `}} />
        
        <BreadCrumb title="DASHBOARD" pageTitle="Dashboard" />
        <div className="page-content pt-2">
          <Container fluid className="pt-0">
            
            <Row>
              <Col xl={3} md={6}><Card className="card-animate border-0 shadow-sm"><CardBody><div className="d-flex justify-content-between"><div><p className="text-muted mb-0 text-uppercase fs-12 fw-medium">Total Requests</p><h2 className="mt-4 ff-secondary fw-semibold"><CountUp start={0} end={stats.widgets?.total || 0} /></h2><p className="mb-0 text-muted fs-12"><span className="text-primary"><i className="ri-line-chart-line"></i> All Time</span></p></div><div className="avatar-sm flex-shrink-0"><span className="avatar-title bg-primary-subtle rounded fs-3 text-primary"><i className="ri-file-copy-2-line"></i></span></div></div></CardBody></Card></Col>
              <Col xl={3} md={6}><Card className="card-animate border-0 shadow-sm"><CardBody><div className="d-flex justify-content-between"><div><p className="text-muted mb-0 text-uppercase fs-12 fw-medium">Pending Approvals</p><h2 className="mt-4 ff-secondary fw-semibold"><CountUp start={0} end={stats.widgets?.pending || 0} /></h2><p className="mb-0 text-muted fs-12"><span className="text-warning"><i className="ri-loader-4-line"></i> In Workflow</span></p></div><div className="avatar-sm flex-shrink-0"><span className="avatar-title bg-warning-subtle rounded fs-3 text-warning"><i className="ri-time-line"></i></span></div></div></CardBody></Card></Col>
              <Col xl={3} md={6}><Card className="card-animate border-0 shadow-sm"><CardBody><div className="d-flex justify-content-between"><div><p className="text-muted mb-0 text-uppercase fs-12 fw-medium">Completed</p><h2 className="mt-4 ff-secondary fw-semibold"><CountUp start={0} end={stats.widgets?.completed || 0} /></h2><p className="mb-0 text-muted fs-12"><span className="text-success"><i className="ri-check-double-line"></i> Fully Whitelisted</span></p></div><div className="avatar-sm flex-shrink-0"><span className="avatar-title bg-success-subtle rounded fs-3 text-success"><i className="ri-shield-check-line"></i></span></div></div></CardBody></Card></Col>
              <Col xl={3} md={6}><Card className="card-animate border-0 shadow-sm"><CardBody><div className="d-flex justify-content-between"><div><p className="text-muted mb-0 text-uppercase fs-12 fw-medium">Emergencies</p><h2 className="mt-4 ff-secondary fw-semibold text-danger"><CountUp start={0} end={stats.widgets?.emergency || 0} /></h2><p className="mb-0 text-muted fs-12"><span className="text-danger"><i className="ri-alarm-warning-line"></i> High Priority</span></p></div><div className="avatar-sm flex-shrink-0"><span className="avatar-title bg-danger-subtle rounded fs-3 text-danger blink-emergency"><i className="ri-alert-fill text-white"></i></span></div></div></CardBody></Card></Col>
            </Row>

            <Row>
              <Col xl={8}>
                <Card className="border-0 shadow-sm">
                  <CardHeader className="bg-transparent border-bottom-dashed">
                    <h4 className="card-title mb-0">Live Workflow Pipeline (Pending Approvals)</h4>
                  </CardHeader>
                  <CardBody>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div className="text-center"><Badge color="info" className="fs-12 mb-1">{stats.workflow?.rldc || 0}</Badge><p className="small text-muted mb-0">RLDC</p></div>
                      <i className="ri-arrow-right-line text-muted"></i>
                      <div className="text-center"><Badge color="warning" className="fs-12 mb-1">{stats.workflow?.nldc || 0}</Badge><p className="small text-muted mb-0">NLDC</p></div>
                      <i className="ri-arrow-right-line text-muted"></i>
                      <div className="text-center"><Badge color="danger" className="fs-12 mb-1">{stats.workflow?.ciso || 0}</Badge><p className="small text-muted mb-0">CISO</p></div>
                      <i className="ri-arrow-right-line text-muted"></i>
                      <div className="text-center"><Badge color="dark" className="fs-12 mb-1">{stats.workflow?.soc || 0}</Badge><p className="small text-muted mb-0">SOC</p></div>
                      <i className="ri-arrow-right-line text-muted"></i>
                      <div className="text-center"><Badge color="success" className="fs-12 mb-1">{stats.workflow?.it || 0}</Badge><p className="small text-muted mb-0">IT (Impl.)</p></div>
                    </div>
                    <Progress multi style={{ height: "10px" }} className="mt-3">
                      <Progress bar color="info" value={((stats.workflow?.rldc || 0)/totalWorkflow)*100} />
                      <Progress bar color="warning" value={((stats.workflow?.nldc || 0)/totalWorkflow)*100} />
                      <Progress bar color="danger" value={((stats.workflow?.ciso || 0)/totalWorkflow)*100} />
                      <Progress bar color="dark" value={((stats.workflow?.soc || 0)/totalWorkflow)*100} />
                      <Progress bar color="success" value={((stats.workflow?.it || 0)/totalWorkflow)*100} />
                    </Progress>
                  </CardBody>
                </Card>

                <Row>
                  <Col md={6}>
                    <Card className="border-0 shadow-sm card-height-100">
                      <CardHeader className="bg-transparent border-bottom-dashed"><h4 className="card-title mb-0">Requests by Category</h4></CardHeader>
                      <CardBody dir="ltr">
                        <ReactApexChart 
                          options={categoryChartOptions} 
                          series={[stats.breakdown?.existingUsers || 0, stats.breakdown?.newUsers || 0]} 
                          type="donut" 
                          height={230} 
                        />
                        {/* ✅ NEW: Visually clear breakdown badges directly under the chart */}
                        <div className="d-flex justify-content-center gap-2 mt-3">
                          <Badge color="danger" className="bg-opacity-10 text-danger border border-danger fw-medium px-2 py-1">
                            🚨 {stats?.breakdown?.emergencyExisting || 0} Existing
                          </Badge>
                          <Badge color="danger" className="bg-opacity-10 text-danger border border-danger fw-medium px-2 py-1">
                            🚨 {stats?.breakdown?.emergencyNew || 0} New
                          </Badge>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card className="border-0 shadow-sm card-height-100">
                      <CardHeader className="bg-transparent border-bottom-dashed"><h4 className="card-title mb-0">Regional Distribution</h4></CardHeader>
                      <CardBody dir="ltr"><ReactApexChart options={regionChartOptions} series={[{ name: "Requests", data: Object.values(stats.regions || {}) }]} type="bar" height={260} /></CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>

              <Col xl={4}>
                <Card className="card-height-100 border-0 shadow-sm">
                  <CardHeader className="bg-transparent border-bottom-dashed">
                    <div className="d-flex align-items-center justify-content-between">
                       <h6 className="card-title mb-0">Live Audit Activity</h6>
                       <Link href="/modules/admin/logs" className="text-primary fs-13 text-decoration-underline">All Logs</Link>
                    </div>
                  </CardHeader>
                  <CardBody className="p-0">
                    <SimpleBar style={{ maxHeight: "550px" }} className="p-3 pt-4">
                      <div className="acitivity-timeline acitivity-main">
                        {(stats.recentLogs || []).map((log: any, index: number) => {
                          const actor = getLogActor(log); 
                          
                          return (
                            <div className="acitivity-item py-3 d-flex" key={index}>
                              <div className="flex-shrink-0 avatar-xs acitivity-avatar">
                                <div className={`avatar-title bg-${log.action === 'REJECTED' ? 'danger' : 'success'}-subtle text-${log.action === 'REJECTED' ? 'danger' : 'success'} rounded-circle`}><i className="ri-shield-keyhole-line"></i></div>
                              </div>
                              <div className="flex-grow-1 ms-3">
                                <h6 className="mb-1 lh-base fs-13">{actor} - {log.action} <br/><span className="fw-semibold text-primary">{log.request?.entityName} ({log.request?.ticketNo})</span></h6>
                                <p className="text-muted mb-1 fst-italic fs-12">"{log.remarks}"</p>
                              </div>
                            </div>
                          );
                        })}
                        {stats.recentLogs?.length === 0 && (
                          <div className="text-center text-muted py-4">No recent activity.</div>
                        )}
                      </div>
                    </SimpleBar>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    </RoleGuard>
  );
}