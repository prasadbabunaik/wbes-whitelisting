"use client";

import React, { useState } from "react";
import { Role } from "@prisma/client";
import { Spinner, Alert, Badge } from "reactstrap";
import { toast } from "react-toastify";

interface ApprovalActionFormProps {
  requestData: any;
  userRole: Role;
  onComplete: () => void;
}

const ApprovalActionForm: React.FC<ApprovalActionFormProps> = ({
  requestData,
  userRole,
  onComplete,
}) => {
  const [remarks, setRemarks] = useState("");
  const [loadingAction, setLoadingAction] = useState<"APPROVE" | "REJECT" | null>(null);

  if (!requestData) return <p>Loading request details...</p>;

  const parseIPs = (ipData: any) => {
    if (!ipData) return [];
    if (Array.isArray(ipData)) return ipData;
    try {
      return JSON.parse(ipData);
    } catch {
      return [ipData];
    }
  };

  const requestedIps = parseIPs(requestData.requestedIps || requestData.ips);

  const currentIps = parseIPs(
    requestData.beforeIps || requestData.currentIps || requestData.availableIps
  );

  const requestedIpsCount = requestedIps.length;

  const currentIpsCount =
    currentIps.length > 0
      ? currentIps.length
      : typeof requestData.currentActiveIps === "number"
      ? requestData.currentActiveIps
      : typeof requestData.currentActiveIpsCount === "number"
      ? requestData.currentActiveIpsCount
      : typeof requestData.totalIps === "number"
      ? requestData.totalIps
      : 0;

  const isOverLimit = requestedIpsCount > 5;
  const userJustification =
    requestData.justification ||
    requestData.reason ||
    requestData.userRemarks ||
    "No justification provided by the user.";

  const categoryStr = (requestData.category || "").toUpperCase();
  let actionLabel = "IPs Requested:";
  let badgeColor: "primary" | "danger" | "success" | "warning" = "primary";
  let prefix = "";

  if (categoryStr.includes("REMOVE") || categoryStr.includes("DELETE")) {
    actionLabel = "IPs to Remove:";
    badgeColor = "danger";
    prefix = "- ";
  } else if (categoryStr.includes("ADD") || categoryStr.includes("NEW")) {
    actionLabel = "IPs to Add:";
    badgeColor = "success";
    prefix = "+ ";
  } else if (categoryStr.includes("MODIFY")) {
    actionLabel = "IPs to Modify:";
    badgeColor = "warning";
    prefix = "~ ";
  }

  const showExactIps = userRole === "SOC" || userRole === "IT";
  const getIpString = (ipObj: any) =>
    typeof ipObj === "object" ? ipObj.ipAddress : ipObj;

  const handleAction = async (actionType: "APPROVE" | "REJECT") => {
    if (!remarks.trim()) {
      toast.error("Please enter remarks before submitting.");
      return;
    }

    setLoadingAction(actionType);

    try {
      const response = await fetch(`/api/ip-request/${requestData.id}/action`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: actionType,
          role: userRole,
          remarks: remarks,
          modifiedIps: requestData.modifiedIps,
          modifiedIpToRemove: requestData.modifiedIpToRemove,
        }),
      });

      if (response.ok) {
        toast.success(
          `Request ${userRole === "RLDC" ? "resubmitted" : actionType === "APPROVE" ? "Approved" : "Rejected"} successfully!`
        );
        onComplete();
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to process action.");
      }
    } catch (error) {
      console.error("Action error:", error);
      toast.error("A network error occurred.");
    } finally {
      setLoadingAction(null);
    }
  };

  const isRldc = userRole === "RLDC";

  return (
    <div className="p-1">
      <div className="mb-4 bg-light rounded p-3 border">
        <div className="row mb-2">
          <div className="col-5 text-muted fw-medium">Username:</div>
          <div className="col-7">
            <Badge color="info" className="border">
              {requestData.username || "N/A"}
            </Badge>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-5 text-muted fw-medium">Current Active IPs:</div>
          <div className="col-7">
            {showExactIps ? (
              currentIps.length > 0 ? (
                currentIps.map((ipObj: any, i: number) => (
                  <Badge color="secondary" className="me-1 mb-1 border" key={i}>
                    {getIpString(ipObj)}
                  </Badge>
                ))
              ) : (
                <Badge color="secondary" className="border">
                  {currentIpsCount} IPs
                </Badge>
              )
            ) : (
              <Badge color="secondary" className="border">
                {currentIpsCount} IPs
              </Badge>
            )}
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-5 text-muted fw-medium">{actionLabel}</div>
          <div className="col-7">
            {showExactIps ? (
              requestedIps.length > 0 ? (
                requestedIps.map((ipObj: any, i: number) => (
                  <Badge color={badgeColor} className="me-1 mb-1" key={i}>
                    {getIpString(ipObj)}
                  </Badge>
                ))
              ) : (
                <span className="text-muted fst-italic small">None</span>
              )
            ) : (
              <Badge color={badgeColor}>
                {prefix}
                {requestedIpsCount} IPs
              </Badge>
            )}
          </div>
        </div>

        {isOverLimit && (
          <Alert color="warning" className="mt-3 mb-0 py-2">
            <div className="d-flex align-items-center mb-2">
              <i className="ri-error-warning-line fs-5 me-2"></i>
              <div className="small">
                <strong>High Volume:</strong> Entity is requesting to modify{" "}
                <b>{requestedIpsCount}</b> IPs (Standard limit is 5).
              </div>
            </div>
            <hr className="my-1 border-warning opacity-50" />
            <div className="small mt-2">
              <strong className="text-dark">User Justification:</strong>
              <br />
              <span className="fst-italic">{userJustification}</span>
            </div>
          </Alert>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label fw-medium text-danger">
          {isRldc ? "Reason for Modification / Resubmission *" : "Approval/Rejection Remarks *"}
        </label>
        <textarea
          className="form-control"
          rows={3}
          placeholder="Enter your remarks here..."
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          disabled={loadingAction !== null}
        ></textarea>
      </div>

      <div className="d-flex gap-2">
        <button
          className="btn btn-success flex-grow-1"
          onClick={() => handleAction("APPROVE")}
          disabled={loadingAction !== null}
        >
          {loadingAction === "APPROVE" ? (
            <Spinner size="sm" />
          ) : isRldc ? (
            "Request Again" 
          ) : userRole === "IT" ? (
            "Complete"
          ) : (
            "Approve & Forward"
          )}
        </button>

        {!isRldc && (
          <button
            className="btn btn-outline-danger flex-grow-1"
            onClick={() => handleAction("REJECT")}
            disabled={loadingAction !== null}
          >
            {loadingAction === "REJECT" ? (
              <Spinner size="sm" />
            ) : (
              "Reject / Send Back"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default ApprovalActionForm;