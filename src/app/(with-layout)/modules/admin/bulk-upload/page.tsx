"use client";

import React, { useCallback, useRef, useState } from "react";
import * as XLSX from "xlsx";
import {
  Badge, Button, Card, CardBody, CardHeader, Col, Container,
  Modal, ModalBody, ModalFooter, ModalHeader, Progress, Row, Spinner, Table,
} from "reactstrap";
import BreadCrumb from "@common/BreadCrumb";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ── Types ─────────────────────────────────────────────────────────────────────
interface UploadRow {
  _id: number;
  username: string;
  entityName: string;
  ipAddresses: string;
  remarks: string;
  region: string;
  isApiAccess: boolean;
  parsedIps: string[];
  hasError: boolean;
  errorMsg: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function ipToInt(ip: string): number {
  const p = ip.split(".").map(Number);
  return ((p[0] << 24) | (p[1] << 16) | (p[2] << 8) | p[3]) >>> 0;
}
function intToIp(n: number): string {
  return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");
}
function isValidIp(ip: string): boolean {
  const parts = ip.split(".");
  return parts.length === 4 && parts.every((p) => { const n = Number(p); return /^\d+$/.test(p) && n >= 0 && n <= 255; });
}
function expandCidr(cidr: string): string[] {
  const [ipStr, maskStr] = cidr.split("/");
  if (!isValidIp(ipStr)) return [cidr];
  const maskLen = parseInt(maskStr, 10);
  if (isNaN(maskLen) || maskLen < 0 || maskLen > 32) return [cidr];
  const maskInt  = maskLen === 0 ? 0 : (0xffffffff << (32 - maskLen)) >>> 0;
  const network  = (ipToInt(ipStr) & maskInt) >>> 0;
  const broadcast = (network | (~maskInt >>> 0)) >>> 0;
  const count = broadcast - network + 1;
  if (count > 1024) return [cidr];   // keep as-is if subnet is too large
  const result: string[] = [];
  for (let i = network; i <= broadcast; i++) result.push(intToIp(i));
  return result;
}

function extractIps(raw: string): string[] {
  if (!raw) return [];
  // Normalise all common delimiters to comma, then tokenise
  const normalised = String(raw)
    .replace(/[\r\n\t;|]+/g, ",")
    .replace(/\s+/g, " ")
    .trim();

  // Pull out every IP/CIDR token — no word-boundary needed after tokenisation
  const cidrRegex = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(?:\/\d{1,2})?)/g;
  const tokens = normalised.match(cidrRegex) || [];

  const result: string[] = [];
  for (const token of tokens) {
    if (token.includes("/")) {
      result.push(...expandCidr(token));
    } else if (isValidIp(token)) {
      result.push(token);
    }
  }
  return [...new Set(result)];
}

const KNOWN_HEADERS: Record<string, keyof Omit<UploadRow, "_id" | "parsedIps" | "hasError" | "errorMsg">> = {
  "username":               "username",
  "user name":              "username",
  "user":                   "username",
  "beneficiary name":       "entityName",
  "beneficiary":            "entityName",
  "entity":                 "entityName",
  "entity name":            "entityName",
  "ip to be whitelisted":   "ipAddresses",
  "ip address":             "ipAddresses",
  "ip addresses":           "ipAddresses",
  "ip":                     "ipAddresses",
  "ips":                    "ipAddresses",
  "nldc it remarks":        "remarks",
  "remarks":                "remarks",
  "it remarks":             "remarks",
  "region":                 "region",
};

function mapHeaders(headers: string[]): Record<number, keyof Omit<UploadRow, "_id" | "parsedIps" | "hasError" | "errorMsg">> {
  const map: Record<number, any> = {};
  headers.forEach((h, i) => {
    const normalised = h.toLowerCase().trim();
    if (KNOWN_HEADERS[normalised]) map[i] = KNOWN_HEADERS[normalised];
  });
  return map;
}

let _idCounter = 0;
function parseSheet(workbook: XLSX.WorkBook, sheetName: string): UploadRow[] {
  const sheet = workbook.Sheets[sheetName];
  const raw: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });
  if (raw.length < 2) return [];

  // Find first non-empty row as header
  let headerRowIdx = 0;
  for (let i = 0; i < Math.min(5, raw.length); i++) {
    if (raw[i].some((c: any) => String(c).toLowerCase().includes("username") || String(c).toLowerCase().includes("beneficiary") || String(c).toLowerCase().includes("ip"))) {
      headerRowIdx = i;
      break;
    }
  }

  const headers = raw[headerRowIdx].map((h: any) => String(h));
  const colMap = mapHeaders(headers);
  const rows: UploadRow[] = [];

  for (let i = headerRowIdx + 1; i < raw.length; i++) {
    const cells = raw[i];
    const isEmpty = cells.every((c: any) => !c && c !== 0);
    if (isEmpty) continue;

    const row: UploadRow = {
      _id:          ++_idCounter,
      username:     "",
      entityName:   "",
      ipAddresses:  "",
      remarks:      "",
      region:       "",
      isApiAccess:  false,
      parsedIps:    [],
      hasError:     false,
      errorMsg:     "",
    };

    Object.entries(colMap).forEach(([colIdx, field]) => {
      const val = String(cells[Number(colIdx)] ?? "").trim();
      (row as any)[field] = val;
    });

    // Split comma-separated usernames into individual rows
    const usernames = row.username
      ? row.username.split(",").map((u) => u.trim()).filter(Boolean)
      : [""];

    for (const uname of usernames) {
      const r: UploadRow = {
        ...row,
        _id:          ++_idCounter,
        username:     uname,
        region:       row.region || sheetName,
        isApiAccess:  false,
        parsedIps:    extractIps(row.ipAddresses),
        hasError:     false,
        errorMsg:     "",
      };
      if (!r.entityName) { r.hasError = true; r.errorMsg = "Missing entity name"; }
      else if (r.parsedIps.length === 0) { r.hasError = true; r.errorMsg = "No valid IPs found"; }
      rows.push(r);
    }
  }

  return rows;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function BulkUploadPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging]     = useState(false);
  const [fileName, setFileName]     = useState("");
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [activeSheet, setActiveSheet] = useState("");
  const [workbook, setWorkbook]     = useState<XLSX.WorkBook | null>(null);
  const [rows, setRows]             = useState<UploadRow[]>([]);
  const [importing, setImporting]   = useState(false);
  const [progress, setProgress]     = useState(0);
  const [resultModal, setResultModal] = useState(false);
  const [resultData, setResultData] = useState<{ inserted: number; skipped: number; errors: string[] } | null>(null);
  const [search, setSearch]         = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "ok" | "error">("all");

  // ── File handling ────────────────────────────────────────────────────────
  const processFile = useCallback((file: File) => {
    if (!file) return;
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!["xlsx", "xls", "csv"].includes(ext || "")) {
      toast.error("Please upload a .xlsx, .xls or .csv file.");
      return;
    }
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target!.result as ArrayBuffer);
      const wb = XLSX.read(data, { type: "array" });
      setWorkbook(wb);
      setSheetNames(wb.SheetNames);
      const first = wb.SheetNames[0];
      setActiveSheet(first);
      setRows(parseSheet(wb, first));
    };
    reader.readAsArrayBuffer(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = "";
  };

  const switchSheet = (name: string) => {
    if (!workbook) return;
    setActiveSheet(name);
    setRows(parseSheet(workbook, name));
  };

  // ── Row editing ──────────────────────────────────────────────────────────
  const deleteRow = (id: number) => setRows((prev) => prev.filter((r) => r._id !== id));

  const toggleApiAccess = (id: number) =>
    setRows((prev) => prev.map((r) => r._id === id ? { ...r, isApiAccess: !r.isApiAccess } : r));

  const updateCell = (id: number, field: keyof UploadRow, value: string) => {
    setRows((prev) =>
      prev.map((r) => {
        if (r._id !== id) return r;
        const updated = { ...r, [field]: value };
        if (field === "ipAddresses") {
          updated.parsedIps = extractIps(value);
          updated.hasError  = !updated.entityName || updated.parsedIps.length === 0;
          updated.errorMsg  = !updated.entityName ? "Missing entity name" : updated.parsedIps.length === 0 ? "No valid IPs found" : "";
        }
        if (field === "entityName") {
          updated.hasError  = !value || r.parsedIps.length === 0;
          updated.errorMsg  = !value ? "Missing entity name" : r.parsedIps.length === 0 ? "No valid IPs found" : "";
        }
        return updated;
      })
    );
  };

  const clearAll = () => {
    setRows([]);
    setFileName("");
    setWorkbook(null);
    setSheetNames([]);
    setActiveSheet("");
  };

  // ── Derived lists ────────────────────────────────────────────────────────
  const validRows   = rows.filter((r) => !r.hasError);
  const invalidRows = rows.filter((r) => r.hasError);

  const visibleRows = rows.filter((r) => {
    if (statusFilter === "ok"    &&  r.hasError) return false;
    if (statusFilter === "error" && !r.hasError) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        r.username.toLowerCase().includes(q)   ||
        r.entityName.toLowerCase().includes(q) ||
        r.ipAddresses.toLowerCase().includes(q)||
        r.remarks.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleImport = async () => {
    if (validRows.length === 0) { toast.error("No valid rows to import."); return; }
    setImporting(true);
    setProgress(10);

    try {
      const csrfToken = sessionStorage.getItem("csrfToken") || "";
      setProgress(30);

      const res = await fetch("/api/admin/bulk-upload", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-csrf-token": csrfToken },
        body: JSON.stringify({
          records: validRows.map((r) => ({
            username:     r.username,
            entityName:   r.entityName,
            ipAddresses:  r.ipAddresses,
            remarks:      r.remarks,
            region:       r.region,
            isApiAccess:  r.isApiAccess,
          })),
        }),
      });

      setProgress(80);
      const json = await res.json();
      setProgress(100);

      if (!res.ok) throw new Error(json.error || "Import failed");

      setResultData(json);
      setResultModal(true);

      if (json.inserted > 0) {
        setRows((prev) => prev.filter((r) => r.hasError));
      }
    } catch (err: any) {
      toast.error(err.message || "Import failed. Please try again.");
    } finally {
      setImporting(false);
      setTimeout(() => setProgress(0), 800);
    }
  };

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="page-content">
      <ToastContainer position="top-right" autoClose={4000} closeButton={false} />
      <Container fluid>
        <BreadCrumb title="Bulk Upload" pageTitle="Administration" />

        {/* Upload zone */}
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader className="d-flex align-items-center gap-2">
                <i className="ri-upload-cloud-2-line fs-18 text-primary"></i>
                <h5 className="mb-0 fw-semibold">Upload Excel / CSV</h5>
              </CardHeader>
              <CardBody>
                {!fileName ? (
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileRef.current?.click()}
                    className={`border-2 border-dashed rounded-3 text-center py-5 px-3 ${dragging ? "border-primary bg-primary bg-opacity-10" : "border-secondary"}`}
                    style={{ cursor: "pointer", transition: "all .2s", borderStyle: "dashed" }}
                  >
                    <i className="ri-file-excel-2-line fs-1 text-success d-block mb-2"></i>
                    <h6 className="fw-semibold mb-1">Drag & drop your file here</h6>
                    <p className="text-muted fs-13 mb-3">Supports .xlsx, .xls, .csv</p>
                    <Button color="primary" outline size="sm">
                      <i className="ri-upload-2-line me-1"></i>Browse File
                    </Button>
                  </div>
                ) : (
                  <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3">
                    <i className="ri-file-excel-2-line fs-2 text-success"></i>
                    <div className="flex-grow-1">
                      <div className="fw-semibold">{fileName}</div>
                      <div className="text-muted fs-13">{rows.length} rows parsed</div>
                    </div>
                    <Button color="danger" outline size="sm" onClick={clearAll}>
                      <i className="ri-delete-bin-line me-1"></i>Remove
                    </Button>
                  </div>
                )}
                <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" className="d-none" onChange={handleFileChange} />

                {/* Sheet tabs */}
                {sheetNames.length > 1 && (
                  <div className="d-flex gap-2 mt-3 flex-wrap">
                    {sheetNames.map((s) => (
                      <Button key={s} size="sm" color={activeSheet === s ? "primary" : "light"} onClick={() => switchSheet(s)}>
                        <i className="ri-table-line me-1"></i>{s}
                      </Button>
                    ))}
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Column mapping guide */}
        {rows.length > 0 && (
          <Row>
            <Col xs={12}>
              <Card className="border-0 shadow-sm">
                <CardBody className="py-3">
                  <div className="d-flex align-items-center flex-wrap gap-2">
                    <span className="fw-semibold fs-13 me-2"><i className="ri-information-line text-info me-1"></i>Expected columns:</span>
                    {["Username", "Beneficiary Name", "IP to be Whitelisted", "NLDC IT Remarks", "Region (optional)"].map((c) => (
                      <Badge key={c} color="light" className="text-dark border fs-12 fw-normal">{c}</Badge>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}

        {/* Preview table */}
        {rows.length > 0 && (
          <Row>
            <Col xs={12}>
              <Card>
                <CardHeader>
                  {/* Row 1 — title + import button */}
                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
                    <div className="d-flex align-items-center gap-3">
                      <h5 className="mb-0 fw-semibold">
                        <i className="ri-eye-line me-1 text-primary"></i>Preview
                      </h5>
                      <Badge color="success" className="fs-12">{validRows.length} valid</Badge>
                      {invalidRows.length > 0 && (
                        <Badge color="danger" className="fs-12">{invalidRows.length} with errors</Badge>
                      )}
                      {(search || statusFilter !== "all") && (
                        <Badge color="info" className="fs-12">{visibleRows.length} shown</Badge>
                      )}
                    </div>
                    <div className="d-flex gap-2 align-items-center">
                      {importing && (
                        <div style={{ width: 160 }}>
                          <Progress value={progress} color="primary" className="mb-0" style={{ height: "6px" }} />
                          <div className="text-muted fs-11 mt-1 text-center">Importing… {progress}%</div>
                        </div>
                      )}
                      <Button
                        color="primary"
                        onClick={handleImport}
                        disabled={importing || validRows.length === 0}
                        className="d-flex align-items-center gap-1"
                      >
                        {importing ? <Spinner size="sm" /> : <i className="ri-database-2-line"></i>}
                        Import {validRows.length} Records
                      </Button>
                    </div>
                  </div>

                  {/* Row 2 — search + filter */}
                  <div className="d-flex gap-2 flex-wrap align-items-center">
                    <div className="position-relative flex-grow-1" style={{ maxWidth: 320 }}>
                      <i className="ri-search-line position-absolute text-muted" style={{ top: "50%", left: 10, transform: "translateY(-50%)", pointerEvents: "none" }}></i>
                      <input
                        type="text"
                        className="form-control form-control-sm ps-4"
                        placeholder="Search username, entity, IP…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      {search && (
                        <button className="btn btn-sm p-0 position-absolute text-muted" style={{ top: "50%", right: 8, transform: "translateY(-50%)" }} onClick={() => setSearch("")}>
                          <i className="ri-close-line"></i>
                        </button>
                      )}
                    </div>

                    <div className="d-flex gap-1">
                      {(["all", "ok", "error"] as const).map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => setStatusFilter(f)}
                          className={`btn btn-sm px-3 ${
                            statusFilter === f
                              ? f === "error" ? "btn-danger" : f === "ok" ? "btn-success" : "btn-primary"
                              : "btn-light"
                          }`}
                        >
                          {f === "all"   && <><i className="ri-list-check me-1"></i>All ({rows.length})</>}
                          {f === "ok"    && <><i className="ri-checkbox-circle-line me-1"></i>OK ({validRows.length})</>}
                          {f === "error" && <><i className="ri-error-warning-line me-1"></i>Errors ({invalidRows.length})</>}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="p-0">
                  <div className="table-responsive" style={{ maxHeight: "520px", overflowY: "auto" }}>
                    <Table bordered hover className="mb-0 align-middle" style={{ fontSize: "13px" }}>
                      <thead className="table-light sticky-top" style={{ top: 0, zIndex: 1 }}>
                        <tr>
                          <th style={{ width: 40 }}>#</th>
                          <th style={{ minWidth: 140 }}>Username</th>
                          <th style={{ minWidth: 160 }}>Entity / Beneficiary</th>
                          <th style={{ minWidth: 200 }}>IP Address(es)</th>
                          <th style={{ minWidth: 80 }}>Parsed IPs</th>
                          <th style={{ minWidth: 130 }}>Remarks</th>
                          <th style={{ minWidth: 90 }}>Region</th>
                          <th style={{ minWidth: 100 }}>API Access</th>
                          <th style={{ width: 70 }}>Status</th>
                          <th style={{ width: 60 }}>Del</th>
                        </tr>
                      </thead>
                      <tbody>
                        {visibleRows.length === 0 ? (
                          <tr>
                            <td colSpan={9} className="text-center text-muted py-4 fs-13">
                              <i className="ri-search-line me-2 opacity-50"></i>No rows match your search / filter
                            </td>
                          </tr>
                        ) : null}
                        {visibleRows.map((row, idx) => (
                          <tr key={row._id} className={row.hasError ? "table-danger" : ""}>
                            <td className="text-muted">{idx + 1}</td>

                            <td>
                              <input
                                className="form-control form-control-sm border-0 bg-transparent p-0"
                                value={row.username}
                                onChange={(e) => updateCell(row._id, "username", e.target.value)}
                                style={{ minWidth: 120 }}
                              />
                            </td>

                            <td>
                              <input
                                className={`form-control form-control-sm border-0 bg-transparent p-0 ${!row.entityName ? "is-invalid" : ""}`}
                                value={row.entityName}
                                onChange={(e) => updateCell(row._id, "entityName", e.target.value)}
                                style={{ minWidth: 140 }}
                              />
                            </td>

                            <td>
                              <textarea
                                className="form-control form-control-sm border-0 bg-transparent p-0"
                                value={row.ipAddresses}
                                rows={Math.min(3, row.ipAddresses.split("\n").length || 1)}
                                onChange={(e) => updateCell(row._id, "ipAddresses", e.target.value)}
                                style={{ minWidth: 180, resize: "vertical" }}
                              />
                            </td>

                            <td>
                              {row.parsedIps.length > 0 ? (
                                <div className="d-flex flex-column gap-1">
                                  {row.parsedIps.map((ip) => (
                                    <Badge key={ip} color="soft-success" className="text-success fw-normal font-monospace fs-11">
                                      {ip}
                                    </Badge>
                                  ))}
                                </div>
                              ) : (
                                <Badge color="danger" className="fs-11">None</Badge>
                              )}
                            </td>

                            <td>
                              <input
                                className="form-control form-control-sm border-0 bg-transparent p-0"
                                value={row.remarks}
                                onChange={(e) => updateCell(row._id, "remarks", e.target.value)}
                                style={{ minWidth: 120 }}
                              />
                            </td>

                            <td>
                              <input
                                className="form-control form-control-sm border-0 bg-transparent p-0"
                                value={row.region}
                                placeholder="NLDC"
                                onChange={(e) => updateCell(row._id, "region", e.target.value)}
                                style={{ minWidth: 70 }}
                              />
                            </td>

                            <td className="text-center">
                              <div className="form-check form-switch d-flex justify-content-center mb-0">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  checked={row.isApiAccess}
                                  onChange={() => toggleApiAccess(row._id)}
                                  title={row.isApiAccess ? "API Access: Yes" : "API Access: No"}
                                />
                              </div>
                            </td>

                            <td className="text-center">
                              {row.hasError ? (
                                <span title={row.errorMsg}>
                                  <Badge color="danger" className="fs-11">
                                    <i className="ri-error-warning-line me-1"></i>Error
                                  </Badge>
                                </span>
                              ) : (
                                <Badge color="success" className="fs-11">
                                  <i className="ri-checkbox-circle-line me-1"></i>OK
                                </Badge>
                              )}
                            </td>

                            <td className="text-center">
                              <button
                                type="button"
                                className="btn btn-sm btn-ghost-danger p-1"
                                onClick={() => deleteRow(row._id)}
                                title="Remove row"
                              >
                                <i className="ri-delete-bin-5-line fs-15"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}

        {/* Result modal */}
        <Modal isOpen={resultModal} toggle={() => setResultModal(false)} centered>
          <ModalHeader toggle={() => setResultModal(false)} className="bg-light">
            <i className="ri-checkbox-circle-line text-success me-2"></i>Import Complete
          </ModalHeader>
          <ModalBody className="p-4">
            {resultData && (
              <>
                <div className="d-flex gap-4 justify-content-center mb-4">
                  <div className="text-center">
                    <div className="fs-1 fw-bold text-success">{resultData.inserted}</div>
                    <div className="text-muted fs-13">Inserted</div>
                  </div>
                  <div className="text-center">
                    <div className="fs-1 fw-bold text-warning">{resultData.skipped}</div>
                    <div className="text-muted fs-13">Skipped</div>
                  </div>
                </div>

                {resultData.errors.length > 0 && (
                  <div className="bg-danger bg-opacity-10 rounded-3 p-3">
                    <div className="fw-semibold text-danger mb-2 fs-13">
                      <i className="ri-error-warning-line me-1"></i>Errors ({resultData.errors.length})
                    </div>
                    <ul className="mb-0 ps-3" style={{ fontSize: "12px" }}>
                      {resultData.errors.map((e, i) => (
                        <li key={i} className="text-danger mb-1">{e}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => { setResultModal(false); if (resultData?.inserted) clearAll(); }}>
              Done
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </div>
  );
}
