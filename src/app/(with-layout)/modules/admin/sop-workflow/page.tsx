"use client";

import React, { useMemo } from "react";
import { Container, Row, Col, Card, CardBody, CardHeader, Badge } from "reactstrap";
import BreadCrumb from "@common/BreadCrumb";
import { RoleGuard } from "@/components/auth/RoleGuard";

// --- React Flow Imports ---
import ReactFlow, {
  Background,
  MarkerType,
  Node,
  Edge,
  Position,
  Handle,
} from "reactflow";
import "reactflow/dist/style.css";

const ORG_REGION_MAP: Record<string, string> = {
  "org-id-srldc": "SRLDC",
  "org-id-nrldc": "NRLDC",
  "org-id-wrldc": "WRLDC",
  "org-id-erldc": "ERLDC",
  "org-id-nerldc": "NERLDC",
  "org-id-nldc": "NLDC",
};

// ==========================================
// 1. CUSTOM NODE DEFINITION
// Increased width and padding to fill horizontal space
// ==========================================
const CustomNode = ({ data, isConnectable }: any) => {
  return (
    <div
      className={`p-3 bg-white rounded ${data.isMyRole ? "border-primary shadow-lg" : ""}`}
      style={{ border: `2px solid ${data.borderColor}`, width: "450px" }} // 🚨 Increased from 280px to 450px
    >
      {/* Target for Main Flow (Top) */}
      <Handle type="target" position={Position.Top} id="top" isConnectable={isConnectable} style={{ visibility: 'hidden' }} />
      {/* Source for Main Flow (Bottom) */}
      <Handle type="source" position={Position.Bottom} id="bottom" isConnectable={isConnectable} style={{ visibility: 'hidden' }} />
      
      {/* Handles for Rejections (Left Side) */}
      <Handle type="target" position={Position.Left} id="left-target" isConnectable={isConnectable} style={{ top: '30%', visibility: 'hidden' }} />
      <Handle type="source" position={Position.Left} id="left-source" isConnectable={isConnectable} style={{ top: '70%', visibility: 'hidden' }} />

      {/* Handles for Clarifications (Right Side) */}
      <Handle type="target" position={Position.Right} id="right-target" isConnectable={isConnectable} style={{ top: '30%', visibility: 'hidden' }} />
      <Handle type="source" position={Position.Right} id="right-source" isConnectable={isConnectable} style={{ top: '70%', visibility: 'hidden' }} />

      <div className="d-flex align-items-center mb-2">
        <Badge color={`soft-${data.color}`} className={`text-${data.color} me-2 px-3 py-2 fs-13 text-uppercase`}>
          <i className={`${data.icon} align-bottom me-1`}></i> {data.title}
        </Badge>
        {data.isMyRole && <span className="badge bg-primary ms-auto" style={{ fontSize: "11px", padding: "6px 8px" }}>You</span>}
      </div>
      <div style={{ fontSize: "14px", color: "#495057", textAlign: "left", marginTop: "8px", whiteSpace: "normal", lineHeight: "1.5" }}>
        {data.desc}
      </div>
    </div>
  );
};

export default function SopWorkflowPage() {
  // 🛡️ SECURE TOKEN EXTRACTION
  const authData = useMemo(() => {
    if (typeof window === "undefined") return { role: "NLDC", id: "", orgId: "", region: "UNKNOWN" };
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      const fallbackRole = (localStorage.getItem("userRole") || localStorage.getItem("role") || "NLDC").replace(/['"]/g, "").toUpperCase();
      return { role: fallbackRole, id: "", orgId: "", region: "UNKNOWN" };
    }

    try {
      const base64Url = token.split(".")[1];
      const decoded = JSON.parse(decodeURIComponent(atob(base64Url.replace(/-/g, "+").replace(/_/g, "/")).split("").map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join("")));

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

      return { role, id: decoded.id || "", orgId, region };
    } catch (e) {
      return { role: "NLDC", id: "", orgId: "", region: "UNKNOWN" };
    }
  }, []);

  const { role: myRole } = authData;

  // Register Custom Node Type
  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);

  // ==========================================
  // 2. NODE DEFINITIONS (Wider spacing mapped to new 450px width)
  // ==========================================
  const initialNodes: Node[] = [
    {
      id: "1", position: { x: 200, y: 20 }, type: "custom",
      data: { title: "USER", desc: "Request Submission via Annexure/Mail", icon: "ri-user-add-line", color: "secondary", borderColor: "#878a99", isMyRole: false },
    },
    {
      id: "2", position: { x: 200, y: 160 }, type: "custom",
      data: { title: "RLDC", desc: "Initial Verification & Forwarding", icon: "ri-share-forward-line", color: "info", borderColor: "#299cdb", isMyRole: myRole === "RLDC" },
    },
    {
      id: "3", position: { x: 200, y: 300 }, type: "custom",
      data: { title: "NLDC", desc: "Recording & Escalation to CISO", icon: "ri-file-list-3-line", color: "warning", borderColor: "#f7b84b", isMyRole: myRole === "NLDC" },
    },
    {
      id: "4", position: { x: 200, y: 440 }, type: "custom",
      data: { title: "CISO", desc: "Security Review Initiation", icon: "ri-shield-keyhole-line", color: "danger", borderColor: "#f06548", isMyRole: myRole === "CISO" },
    },
    {
      id: "5", position: { x: 200, y: 580 }, type: "custom",
      data: { title: "SOC", desc: "Security Clearance & Approval", icon: "ri-radar-line", color: "dark", borderColor: "#212529", isMyRole: myRole === "SOC" },
    },
    {
      id: "6", position: { x: 200, y: 720 }, type: "custom",
      data: { title: "IT", desc: "Implementation (Whitelisting)", icon: "ri-server-line", color: "success", borderColor: "#0ab39c", isMyRole: myRole === "IT" },
    },
  ];

  // ==========================================
  // 3. EDGE DEFINITIONS
  // ==========================================
  const initialEdges: Edge[] = [
    // --- MAIN FLOW (Top to Bottom - APPROVALS) ---
    { 
      id: "e1-2", source: "1", target: "2", sourceHandle: "bottom", targetHandle: "top", animated: true,  pathOptions: { offset: 80 },
      label: "Submitted",
      markerEnd: { type: MarkerType.ArrowClosed, color: "#878a99" }, style: { stroke: "#878a99", strokeWidth: 2 },
      labelStyle: { fill: "#878a99", fontWeight: 600, fontSize: 12 }, labelBgStyle: { fill: "#ffffff", fillOpacity: 0.9 },
    },
    { 
      id: "e2-3", source: "2", target: "3", sourceHandle: "bottom", targetHandle: "top", animated: true, pathOptions: { offset: 80 }, 
      label: "Approved",
      markerEnd: { type: MarkerType.ArrowClosed, color: "#299cdb" }, style: { stroke: "#299cdb", strokeWidth: 2 },
      labelStyle: { fill: "#0ab39c", fontWeight: 600, fontSize: 12 }, labelBgStyle: { fill: "#ffffff", fillOpacity: 0.9 },
    },
    { 
      id: "e3-4", source: "3", target: "4", sourceHandle: "bottom", targetHandle: "top", animated: true, pathOptions: { offset: 80 }, 
      label: "Approved",
      markerEnd: { type: MarkerType.ArrowClosed, color: "#f7b84b" }, style: { stroke: "#f7b84b", strokeWidth: 2 },
      labelStyle: { fill: "#0ab39c", fontWeight: 600, fontSize: 12 }, labelBgStyle: { fill: "#ffffff", fillOpacity: 0.9 },
    },
    { 
      id: "e4-5", source: "4", target: "5", sourceHandle: "bottom", targetHandle: "top", animated: true, pathOptions: { offset: 80 }, 
      label: "Approved",
      markerEnd: { type: MarkerType.ArrowClosed, color: "#f06548" }, style: { stroke: "#f06548", strokeWidth: 2 },
      labelStyle: { fill: "#0ab39c", fontWeight: 600, fontSize: 12 }, labelBgStyle: { fill: "#ffffff", fillOpacity: 0.9 },
    },
    { 
      id: "e5-6", source: "5", target: "6", sourceHandle: "bottom", targetHandle: "top", animated: true, pathOptions: { offset: 80 }, 
      label: "Approved",
      markerEnd: { type: MarkerType.ArrowClosed, color: "#212529" }, style: { stroke: "#212529", strokeWidth: 2 },
      labelStyle: { fill: "#0ab39c", fontWeight: 600, fontSize: 12 }, labelBgStyle: { fill: "#ffffff", fillOpacity: 0.9 },
    },

    // --- REJECTION LOOPS (Left Side - Solid Red & Animated) ---
    {
      id: "e3-2", source: "3", target: "2", sourceHandle: "left-source", targetHandle: "left-target",
      label: "Rejected", type: "smoothstep", animated: true, pathOptions: { offset: 80 },
      markerEnd: { type: MarkerType.ArrowClosed, color: "#f06548" },
      style: { stroke: "#f06548", strokeWidth: 2 },
      labelStyle: { fill: "#f06548", fontWeight: 600, fontSize: 12 }, labelBgStyle: { fill: "#ffffff", fillOpacity: 0.9 },
    },
    {
      id: "e4-2", source: "4", target: "2", sourceHandle: "left-source", targetHandle: "left-target",
      label: "Rejected", type: "smoothstep", animated: true, pathOptions: { offset: 80 },
      markerEnd: { type: MarkerType.ArrowClosed, color: "#f06548" },
      style: { stroke: "#f06548", strokeWidth: 2 },
      labelStyle: { fill: "#f06548", fontWeight: 600, fontSize: 12 }, labelBgStyle: { fill: "#ffffff", fillOpacity: 0.9 },
    },
    {
      id: "e5-2", source: "5", target: "2", sourceHandle: "left-source", targetHandle: "left-target",
      label: "Rejected", type: "smoothstep", animated: true, pathOptions: { offset: 80 },
      markerEnd: { type: MarkerType.ArrowClosed, color: "#f06548" },
      style: { stroke: "#f06548", strokeWidth: 2 },
      labelStyle: { fill: "#f06548", fontWeight: 600, fontSize: 12 }, labelBgStyle: { fill: "#ffffff", fillOpacity: 0.9 },
    },
    {
      id: "e6-2", source: "6", target: "2", sourceHandle: "left-source", targetHandle: "left-target",
      label: "Rejected", type: "smoothstep", animated: true, pathOptions: { offset: 80 },
      markerEnd: { type: MarkerType.ArrowClosed, color: "#f06548" },
      style: { stroke: "#f06548", strokeWidth: 2 },
      labelStyle: { fill: "#f06548", fontWeight: 600, fontSize: 12 }, labelBgStyle: { fill: "#ffffff", fillOpacity: 0.9 },
    },
  ];

  return (
    <RoleGuard allowedRoles={["ADMIN", "NLDC", "RLDC", "CISO", "SOC", "IT"]}>
      <React.Fragment>
        {/* CSS to hide ReactFlow attribution hyperlink */}
        <style dangerouslySetInnerHTML={{ __html: `
          .react-flow__attribution { display: none !important; }
        `}} />

        <div className="page-content">
          <Container fluid>
            <BreadCrumb title="SOP Process Flow" pageTitle="Administration" />

            <Row>
              <Col lg={8}>
                <Card className="shadow-sm border-0">
                  <CardHeader className="bg-white border-bottom-dashed pt-4 pb-3">
                    <h5 className="card-title mb-0 flex-grow-1">
                      <i className="ri-flow-chart me-2 text-primary"></i> WBES IP Whitelisting Flow
                    </h5>
                  </CardHeader>
                  <CardBody className="p-0 border-bottom">
                    {/* --- REACT FLOW CANVAS (LOCKED VIEW) --- */}
                    <div style={{ height: "720px", width: "100%", backgroundColor: "#f8f9fa" }}>
                      <ReactFlow
                        nodes={initialNodes}
                        edges={initialEdges}
                        nodeTypes={nodeTypes}
                        fitView
                        fitViewOptions={{ padding: 0.1 }}
                        // 🚨 Locks the viewport to prevent accidental zooming/panning
                        panOnDrag={false}
                        zoomOnScroll={false}
                        zoomOnPinch={false}
                        zoomOnDoubleClick={false}
                        nodesDraggable={false}
                        nodesConnectable={false}
                        preventScrolling={false}
                      >
                        <Background color="#ccc" gap={20} />
                      </ReactFlow>
                    </div>
                  </CardBody>
                </Card>

                {/* Workflow Explanations */}
                <Row className="mt-4 g-3">
                  <Col md={6}>
                    <div className="alert alert-success border-0 d-flex align-items-center mb-0 shadow-sm h-100">
                      <i className="ri-check-double-line fs-2 me-3 text-success"></i>
                      <div>
                        <h6 className="fw-bold mb-1 text-success">Approval Paths (Forward)</h6>
                        <p className="mb-0 small text-dark opacity-75">
                          When a request meets requirements and passes security checks, it is approved and forwarded to the next stage in the workflow.
                        </p>
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="alert alert-danger border-0 d-flex align-items-center mb-0 shadow-sm h-100">
                      <i className="ri-close-circle-line fs-2 me-3 text-danger"></i>
                      <div>
                        <h6 className="fw-bold mb-1 text-danger">Rejection Paths (Red)</h6>
                        <p className="mb-0 small text-dark opacity-75">
                          If a request violates policy or fails security clearance at any stage, it is permanently rejected and routed back to the initiating RLDC.
                        </p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>

              {/* SOP GUIDELINES SIDEBAR */}
              <Col lg={4}>
                <Card className="h-100 shadow-sm border-0">
                  <CardHeader className="bg-white border-bottom-dashed pt-4 pb-3">
                    <h5 className="card-title mb-0"><i className="ri-information-line me-2 text-info"></i> SOP Guidelines</h5>
                  </CardHeader>
                  <CardBody>
                    <h6 className="fw-bold text-uppercase fs-12 text-muted mb-3">Request Categories</h6>
                    
                    <div className="mb-4">
                      <Badge color="info" className="mb-2">Category 1: Existing Users</Badge>
                      <p className="small text-muted mb-0">Processed twice a week (Every Tuesday and Wednesday).</p>
                    </div>
                    
                    <div className="mb-4">
                      <Badge color="success" className="mb-2">Category 2: New Users</Badge>
                      <p className="small text-muted mb-0">Must provide IP addresses along with user credentials. Whitelisted within 3 days from NLDC receipt.</p>
                    </div>
                    
                    <div className="mb-4">
                      <Badge color="danger" className="mb-2">Category 3: Emergency</Badge>
                      <p className="small text-muted mb-0">Whitelisted within 60-120 minutes. Requires valid justification. Emergency IPs are removed after the defined expected duration.</p>
                    </div>

                    <hr className="border-dashed my-4" />

                    <h6 className="fw-bold text-uppercase fs-12 text-muted mb-3">Important Rules</h6>
                    <ul className="text-muted small ps-3 mb-0" style={{ lineHeight: '1.8' }}>
                      <li>Maximum of <strong>5 IP addresses</strong> per user allowed.</li>
                      <li>If requesting &gt; 5 IPs, an existing IP must be removed OR proper justification provided.</li>
                      <li>If no activity is observed from an IP for 30 consecutive days, it may be removed from the whitelist after intimation.</li>
                    </ul>
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