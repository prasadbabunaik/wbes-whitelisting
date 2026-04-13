"use client";

import React, { useState, useEffect, useMemo } from "react";
import BreadCrumb from "@common/BreadCrumb";
import UiContent from "@common/UiContent";
import PreviewCardHeader from "@common/PreviewCardHeader";

import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  Label,
  Input,
  Container,
  FormFeedback,
  Form,
  Alert,
  Spinner,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  CardHeader,
} from "reactstrap";

import * as Yup from "yup";
import { useFormik } from "formik";
import Select, { StylesConfig, MultiValue } from "react-select";
import CreatableSelect from "react-select/creatable";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createRequest } from "@/services/ipRequestService";

interface FormValues {
  entityName: string;
  username: string;
  category: string;
  isEmergency: boolean;
  isApiAccess: boolean; 
  ipAddresses: string;
  contactPerson: string;
  email: string;
  phone: string;
  location: string;
  reason: string;
  totalIps: number;
  ipToRemove: string[];
  duration: string;
}

interface SelectOption {
  label: string;
  value: string;
}

interface FetchedEntity {
  id: string;
  name: string;
  region?: string; 
}

interface FetchedUser {
  entityName: string;
  username: string;
  contactPerson: string;
  email: string;
  phone: string;
  location: string;
  totalIps: number;
  availableIps: string[];
}

const CreateRequestForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [existingUsers, setExistingUsers] = useState<FetchedUser[]>([]);
  const [dbEntities, setDbEntities] = useState<FetchedEntity[]>([]);
  const [globalIps, setGlobalIps] = useState<{ip: string, users: string[]}[]>([]);

  const [ipInputValue, setIpInputValue] = useState("");

  const [historyModal, setHistoryModal] = useState(false);
  const [userHistory, setUserHistory] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const ORG_REGION_MAP: Record<string, string> = {
    "org-id-srldc": "SRLDC",
    "org-id-nrldc": "NRLDC",
    "org-id-wrldc": "WRLDC",
    "org-id-erldc": "ERLDC",
    "org-id-nerldc": "NERLDC",
    "org-id-nldc": "NLDC",
  };

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
      const initiatorRegion = decoded.initiatorRegion || decoded.region || "";

      let region = "UNKNOWN";
      if (initiatorRegion) region = initiatorRegion;
      else if (name.includes("SRLDC")) region = "SRLDC";
      else if (name.includes("NRLDC")) region = "NRLDC";
      else if (name.includes("WRLDC")) region = "WRLDC";
      else if (name.includes("ERLDC")) region = "ERLDC";
      else if (name.includes("NERLDC")) region = "NERLDC";
      else if (ORG_REGION_MAP[orgId]) region = ORG_REGION_MAP[orgId];
      else if (role === "NLDC") region = "NLDC";
      else if (role === "RLDC") region = "RLDC";

      return { role, id: decoded.id || "", orgId, region, name: decoded.name };
    } catch (e) {
      return { role: "NLDC", id: "", orgId: "", region: "UNKNOWN", name: "" };
    }
  }, []);

  const { role: myRole, id: myUserId, orgId: myOrgId, region: myRegion } = authData;

  const resolveInitiatorRegion = () => myRegion;

  const canCreate = ["ADMIN", "NLDC", "RLDC"].includes(myRole);
  const effectiveSubmitterRole = myRole === "ADMIN" ? "NLDC" : myRole;

  useEffect(() => {
      if (!myOrgId && myRole !== "ADMIN") return;

      const fetchDataFromDB = async () => {
        try {
          const cacheBuster = Date.now();
          
          const entityRes = await fetch(`/api/entities?role=${myRole}&orgId=${myOrgId}&_t=${cacheBuster}`);
          if (entityRes.ok) {
            const entityJson = await entityRes.json();
            if (entityJson.success) setDbEntities(entityJson.data);
          }

          const userRes = await fetch(`/api/beneficiary-users?role=${myRole}&orgId=${myOrgId}&_t=${cacheBuster}`);
          if (userRes.ok) {
            const userJson = await userRes.json();
            if (userJson.success) setExistingUsers(userJson.data);
          }

          const globalIpsRes = await fetch(`/api/global-ips?_t=${cacheBuster}`);
          if (globalIpsRes.ok) {
            const globalJson = await globalIpsRes.json();
            if (globalJson.success) setGlobalIps(globalJson.data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchDataFromDB();
    }, [myRole, myOrgId, myRegion]);

  const baseSelectStyles: StylesConfig<SelectOption, any> = {
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? "#878a99" : "#ced4da",
      boxShadow: state.isFocused ? "0 0 0 0.15rem rgba(64, 81, 137, 0.25)" : "none",
      "&:hover": { borderColor: state.isFocused ? "#878a99" : "#ced4da" },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#405189" 
        : state.isFocused
        ? "rgba(64, 81, 137, 0.08)" 
        : "white",
      color: state.isSelected ? "white" : "#212529",
      "&:active": {
        backgroundColor: state.isSelected ? "#405189" : "rgba(64, 81, 137, 0.1)",
      },
    }),
  };

  const matteBlueStyles: StylesConfig<SelectOption, true> = {
    ...baseSelectStyles,
    multiValue: (base) => ({ 
      ...base, 
      backgroundColor: "#405189",
      borderRadius: "3px" 
    }),
    multiValueLabel: (base) => ({ 
      ...base, 
      color: "white" 
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "white",
      ":hover": { backgroundColor: "#354475", color: "white" }, 
    }),
  };

  const ipToInt = (ip: string) => {
    const p = ip.split(".").map(Number);
    return ((p[0] << 24) | (p[1] << 16) | (p[2] << 8) | p[3]) >>> 0;
  };

  const intToIp = (int: number) =>
    [
      (int >>> 24) & 255,
      (int >>> 16) & 255,
      (int >>> 8) & 255,
      int & 255,
    ].join(".");

  const expandIps = (ipString: string, silent = false): string[] => {
    if (!ipString) return [];
    const rawInputs = ipString
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);
    let expandedIps: string[] = [];
    let isTooLarge = false;

    rawInputs.forEach((item) => {
      if (item.includes("/")) {
        const [ipStr, maskStr] = item.split("/");
        const ipParts = ipStr.split(".").map(Number);

        if (
          ipParts.length === 4 &&
          ipParts.every((p) => !isNaN(p) && p >= 0 && p <= 255)
        ) {
          const ipInt = ipToInt(ipStr);
          let maskInt = 0,
            isValidMask = false;

          if (maskStr.includes(".")) {
            const mParts = maskStr.split(".").map(Number);
            if (
              mParts.length === 4 &&
              mParts.every((p) => !isNaN(p) && p >= 0 && p <= 255)
            ) {
              maskInt = ipToInt(maskStr);
              isValidMask = true;
            }
          } else {
            const maskLen = parseInt(maskStr, 10);
            if (!isNaN(maskLen) && maskLen >= 0 && maskLen <= 32) {
              maskInt =
                maskLen === 0 ? 0 : (0xffffffff << (32 - maskLen)) >>> 0;
              isValidMask = true;
            }
          }

          if (isValidMask) {
            const wildcard = ~maskInt >>> 0;
            const network = (ipInt & maskInt) >>> 0;
            const broadcast = (network | wildcard) >>> 0;
            const numIps = broadcast - network + 1;

            if (numIps > 1024) {
              isTooLarge = true;
              expandedIps.push(item);
            } else {
              for (let i = network; i <= broadcast; i++) {
                if (((i & maskInt) >>> 0) === network)
                  expandedIps.push(intToIp(i));
              }
            }
          } else {
            expandedIps.push(item);
          }
        } else {
          expandedIps.push(item);
        }
      } else {
        expandedIps.push(item);
      }
    });

    if (isTooLarge && !silent) {
      toast.warning(
        "Warning: Some IP ranges were over 1024 IPs and were not fully expanded."
      );
    }
    return Array.from(new Set(expandedIps));
  };

  const validation = useFormik<FormValues>({
    enableReinitialize: true,
    initialValues: {
      entityName: "",
      username: "",
      category: "",
      isEmergency: false,
      isApiAccess: false, 
      ipAddresses: "",
      contactPerson: "",
      email: "",
      phone: "",
      location: "",
      reason: "",
      totalIps: 0,
      ipToRemove: [], 
      duration: "",
    },

    validationSchema: Yup.object({
      entityName: Yup.string().required("Entity name required"),
      username: Yup.string().required("Username required"),
      category: Yup.string().required("Category required"),
      ipAddresses: Yup.string().required("At least one IP Address is required"),
      contactPerson: Yup.string().notRequired(),
      phone: Yup.string()
          .required("Phone number is required")
          .matches(/^[0-9]{10}$/, "Enter valid 10-digit phone number"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email required"),
      location: Yup.string().notRequired(),
      ipToRemove: Yup.array().of(Yup.string()).test(
        "remove-or-reason",
        "Select IP(s) to remove OR provide justification.",
        function (value) {
          const { isEmergency, category, totalIps, ipAddresses, reason } =
            this.parent;
          
          if (isEmergency || category === "NEW_USER") {
            return true;
          }
          
          const newCount = ipAddresses
            ? ipAddresses.split(",").filter(Boolean).length
            : 0;
            
          const removedCount = Array.isArray(value) ? value.length : 0;
          
          if (totalIps + newCount - removedCount > 5) {
            return removedCount > 0 || !!reason;
          }
          
          return true;
        }
      ),
      reason: Yup.string().test(
        "reason-or-remove",
        "Proper justification is required if exceeding 5 IPs.",
        function (value) {
          const { isEmergency, category, totalIps, ipAddresses, ipToRemove } =
            this.parent;
            
          if (isEmergency) {
            return !!value;
          }
          
          const newCount = ipAddresses
            ? ipAddresses.split(",").filter(Boolean).length
            : 0;
            
          const removedCount = Array.isArray(ipToRemove) ? ipToRemove.length : 0;

          if (totalIps + newCount - removedCount > 5) {
            if (category === "NEW_USER") {
              return !!value;
            }
            return !!value || removedCount > 0;
          }
          
          return true;
        }
      ),
      duration: Yup.string().when("isEmergency", {
        is: true,
        then: (schema) => schema.required("Expected duration is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
    }),

    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const finalExpandedIps = values.ipAddresses
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean)
          .join(", ");

        const finalPayload = {
          ...values,
          ipAddresses: finalExpandedIps,
          ipToRemove: Array.isArray(values.ipToRemove) ? values.ipToRemove.join(", ") : "",
          userId: myUserId || "mock-user-id",
          organizationId: myOrgId || "mock-org-id", 
          submitterRole: effectiveSubmitterRole,
          initiatorRegion: resolveInitiatorRegion(),
        };

        await createRequest(finalPayload);
        toast.success("Your request was successfully submitted!");
        validation.resetForm();
        setIpInputValue("");
      } catch (error: any) {
        console.error("Submission Error:", error);
        toast.error(error.message || "Something went wrong! Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedCategory = e.target.value;
    validation.setValues({
      ...validation.values,
      category: selectedCategory,
      entityName: "",
      username: "",
      contactPerson: "",
      email: "",
      phone: "",
      location: "",
      totalIps: 0,
      ipToRemove: [],
      ipAddresses: "",
      isApiAccess: false,
    });
    setIpInputValue("");
    setTimeout(() => validation.setTouched({}), 0);
  };

  const getEntityOptions = (): SelectOption[] => {
      let safeEntities = dbEntities;
      if (myRole === "RLDC" && myRegion !== "UNKNOWN") {
        safeEntities = dbEntities.filter(e => (e as any).region === myRegion);
      }
      return safeEntities.map((entity) => ({
        label: entity.name,
        value: entity.name,
      }));
    };

  const getUsernameOptions = (): SelectOption[] => {
    if (!validation.values.entityName) return [];
    return existingUsers
      .filter((u) => u.entityName === validation.values.entityName)
      .map((user) => ({ label: user.username, value: user.username }));
  };

  const getActiveIpsOptions = (): SelectOption[] => {
    if (
      validation.values.category === "EXISTING_USER" &&
      validation.values.entityName &&
      validation.values.username
    ) {
      const userDetails = existingUsers.find(
        (u) =>
          u.entityName === validation.values.entityName &&
          u.username === validation.values.username
      );
      if (userDetails && userDetails.availableIps) {
        return userDetails.availableIps.map((ip: string) => ({
          label: ip,
          value: ip,
        }));
      }
    }
    return [];
  };

  const getIpValuesForSelect = () => {
    if (!validation.values.ipAddresses) return [];
    return validation.values.ipAddresses
      .split(", ")
      .filter(Boolean)
      .map((ip) => ({ label: ip, value: ip }));
  };

  const handleEntitySelect = (selectedOption: any) => {
    validation.setFieldValue(
      "entityName",
      selectedOption ? selectedOption.value : ""
    );
    validation.setFieldValue("username", "");
    validation.setFieldValue("contactPerson", "");
    validation.setFieldValue("email", "");
    validation.setFieldValue("phone", "");
    validation.setFieldValue("location", "");
    validation.setFieldValue("totalIps", 0);
    validation.setFieldValue("ipAddresses", "");
    validation.setFieldValue("ipToRemove", []);
    setIpInputValue("");
  };

  const handleUsernameSelect = (selectedOption: any) => {
    if (selectedOption && validation.values.entityName) {
      const username = selectedOption.value;
      const userDetails = existingUsers.find(
        (u) =>
          u.entityName === validation.values.entityName &&
          u.username === username
      );

      validation.setFieldValue("username", username);

      if (userDetails) {
        validation.setFieldValue("contactPerson", userDetails.contactPerson || "");
        validation.setFieldValue("email", userDetails.email || "");
        validation.setFieldValue("phone", userDetails.phone || "");
        validation.setFieldValue("location", userDetails.location || "");
        validation.setFieldValue("totalIps", userDetails.availableIps?.length || 0);
        validation.setFieldValue("ipAddresses", "");
        validation.setFieldValue("ipToRemove", []);
      }
    } else {
      validation.setFieldValue("username", "");
    }
    setIpInputValue("");
  };

  const handleIpPillsChange = (newValue: MultiValue<SelectOption>) => {
    const rawString = newValue ? newValue.map((v) => v.value).join(", ") : "";
    const expanded = expandIps(rawString);

    let activeIps: string[] = [];
    if (
      validation.values.username &&
      validation.values.category === "EXISTING_USER"
    ) {
      const u = existingUsers.find(
        (x) => x.username === validation.values.username
      );
      if (u) activeIps = u.availableIps || [];
    }

    const uniqueNew: string[] = [];
    const duplicates: string[] = [];

    expanded.forEach((ip) => {
      if (activeIps.includes(ip)) {
        duplicates.push(ip);
      } else {
        uniqueNew.push(ip);
      }
    });

    if (duplicates.length > 0) {
      toast.warning(
        `Ignored active IPs: ${duplicates.slice(0, 3).join(", ")}${duplicates.length > 3 ? "..." : ""}`
      );
    }

    validation.setFieldValue("ipAddresses", uniqueNew.join(", "));
  };

  const handleViewHistory = async () => {
    if (!validation.values.username) return;
    setHistoryModal(true);
    setLoadingHistory(true);
    try {
      const res = await fetch(
        `/api/beneficiary-users/${validation.values.username}`
      );
      const json = await res.json();
      if (json.success) {
        setUserHistory(json.data.slice(0, 10)); 
      }
    } catch (e) {
      toast.error("Failed to load history.");
    } finally {
      setLoadingHistory(false);
    }
  };

  // ✅ FIXED: Just use toast.success without manually injecting bootstrap classes
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

  const isEmergency = validation.values.isEmergency;
  
  const newIpsList = validation.values.ipAddresses
    ? validation.values.ipAddresses.split(",").map(i => i.trim()).filter(Boolean)
    : [];

  const ipConflicts = useMemo(() => {
    const conflicts: { ip: string; users: string[] }[] = [];
    
    const ipsToCheck = [...newIpsList];
    if (ipInputValue.trim()) {
      ipsToCheck.push(...ipInputValue.split(",").map(i => i.trim()).filter(Boolean));
    }

    const uniqueIpsToCheck = Array.from(new Set(ipsToCheck));
    
    const fullyExpandedIps = expandIps(uniqueIpsToCheck.join(", "), true);

    fullyExpandedIps.forEach((ip) => {
      const match = globalIps.find(g => g.ip === ip);
      if (match) {
        const otherUsers = match.users.filter(u => u !== validation.values.username && u !== validation.values.entityName);
        if (otherUsers.length > 0) {
          conflicts.push({ ip, users: otherUsers });
        }
      }
    });
    return conflicts;
  }, [newIpsList, ipInputValue, globalIps, validation.values.username, validation.values.entityName]);

  const newIpsCount = newIpsList.length;
  const removedIpsCount = Array.isArray(validation.values.ipToRemove) ? validation.values.ipToRemove.length : 0;
  const isLimitExceeded = !isEmergency && (validation.values.totalIps + newIpsCount - removedIpsCount > 5);

  return (
    <React.Fragment>
      <UiContent />
      {/* ✅ ADDED: theme="colored" creates the solid green UI across the application */}
      <ToastContainer theme="colored" position="top-right" autoClose={3000} hideProgressBar={true} />

      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Create Request" pageTitle="WBES System" />

          <Row>
            <Col lg={12}>
              <Card>
                <PreviewCardHeader title="IP Whitelisting Request" />
                <CardBody>
                  {!canCreate ? (
                    <div className="text-center py-5">
                       <i className="ri-lock-2-line display-4 text-danger mb-3"></i>
                       <h4 className="text-danger">Access Restricted</h4>
                       <p className="text-muted fs-15 mb-0">Your current role (<strong>{myRole}</strong>) does not have authorization to create new IP Whitelisting Requests.</p>
                       <p className="text-muted fs-15">Only <strong>NLDC</strong> and <strong>RLDC</strong> administrators can initiate these requests.</p>
                    </div>
                  ) : (
                    <>
                      {isEmergency && (
                        <Alert color="danger" className="border-0">
                          <strong>Emergency Requests:</strong> Processed
                          within 60-120 minutes. IPs removed after duration.
                        </Alert>
                      )}

                      {isLimitExceeded && (
                        <Alert color="warning" className="border-0">
                          <strong>IP Limit Exceeded:</strong> Net total will be{" "}
                          {validation.values.totalIps + newIpsCount - removedIpsCount} IPs. As per
                          WBES guidelines (Max 5), you MUST either{" "}
                          <strong>remove more IPs</strong> or provide a{" "}
                          <strong>proper justification reason</strong> below.
                        </Alert>
                      )}

                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                      >
                        <Row>
                          <Col md={12} className="mb-4">
                            <FormGroup
                              check
                              className="form-switch form-switch-lg form-switch-danger"
                              dir="ltr"
                            >
                              <Input
                                type="checkbox"
                                className="form-check-input"
                                id="emergencySwitch"
                                name="isEmergency"
                                checked={validation.values.isEmergency}
                                onChange={validation.handleChange}
                              />
                              <Label
                                className="form-check-label fw-bold text-danger ms-2"
                                htmlFor="emergencySwitch"
                              >
                                This is an Emergency Request
                              </Label>
                            </FormGroup>
                          </Col>

                          <Col md={12}>
                            <FormGroup>
                              <Label>
                                Category <span className="text-danger">*</span>
                              </Label>
                              <Input
                                type="select"
                                name="category"
                                onChange={handleCategoryChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.category}
                                invalid={
                                  !!validation.errors.category &&
                                  validation.touched.category
                                }
                              >
                                <option value="">Select Category</option>
                                <option value="NEW_USER">New User</option>
                                <option value="EXISTING_USER">Existing User</option>
                              </Input>
                              <FormFeedback>
                                {validation.errors.category}
                              </FormFeedback>
                            </FormGroup>
                          </Col>

                          <Col md={6}>
                            <FormGroup>
                              <Label>
                                Entity Name (WBES Beneficiary Name){" "}
                                <span className="text-danger">*</span>
                              </Label>
                              {validation.values.category === "EXISTING_USER" ? (
                                <Select
                                  styles={baseSelectStyles}
                                  options={getEntityOptions()}
                                  placeholder="Search Entity..."
                                  value={
                                    getEntityOptions().find(
                                      (opt) =>
                                        opt.value === validation.values.entityName
                                    ) || null
                                  }
                                  onChange={handleEntitySelect}
                                  onBlur={() =>
                                    validation.setFieldTouched("entityName", true)
                                  }
                                  classNamePrefix="js-example-basic-single"
                                />
                              ) : (
                                <CreatableSelect
                                  styles={baseSelectStyles}
                                  isClearable
                                  options={getEntityOptions()}
                                  placeholder="Search existing or type New Entity Name..."
                                  value={
                                    validation.values.entityName
                                      ? {
                                          label: validation.values.entityName,
                                          value: validation.values.entityName,
                                        }
                                      : null
                                  }
                                  onChange={handleEntitySelect}
                                  onBlur={() =>
                                    validation.setFieldTouched("entityName", true)
                                  }
                                  classNamePrefix="js-example-basic-single"
                                />
                              )}
                              {validation.errors.entityName &&
                                validation.touched.entityName && (
                                  <div
                                    className="text-danger mt-1"
                                    style={{ fontSize: "0.875em" }}
                                  >
                                    {validation.errors.entityName}
                                  </div>
                                )}
                            </FormGroup>
                          </Col>

                          <Col md={6}>
                            <FormGroup>
                              <Label>
                                Username <span className="text-danger">*</span>
                              </Label>

                              {validation.values.category === "EXISTING_USER" ? (
                                <Select
                                  styles={baseSelectStyles}
                                  options={getUsernameOptions()}
                                  placeholder="Search Username..."
                                  value={
                                    getUsernameOptions().find(
                                      (opt) =>
                                        opt.value === validation.values.username
                                    ) || null
                                  }
                                  onChange={handleUsernameSelect}
                                  onBlur={() =>
                                    validation.setFieldTouched("username", true)
                                  }
                                  isDisabled={!validation.values.entityName}
                                  classNamePrefix="js-example-basic-single"
                                />
                              ) : (
                                <Input
                                  name="username"
                                  type="text"
                                  placeholder="Enter Proposed Username"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.username}
                                  invalid={
                                    !!validation.errors.username &&
                                    validation.touched.username
                                  }
                                />
                              )}
                              {validation.errors.username &&
                                validation.touched.username &&
                                validation.values.category === "EXISTING_USER" && (
                                  <div
                                    className="text-danger mt-1"
                                    style={{ fontSize: "0.875em" }}
                                  >
                                    {validation.errors.username}
                                  </div>
                                )}
                              {validation.values.category !== "EXISTING_USER" && (
                                <FormFeedback>
                                  {validation.errors.username}
                                </FormFeedback>
                              )}
                            </FormGroup>
                          </Col>

                          <Col md={12}>
                            <FormGroup className="bg-light p-3 rounded border border-dashed mb-4">
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <Label className="mb-0 fw-bold text-dark">
                                  {isEmergency
                                    ? "Temporary IP Address(es)"
                                    : "New IP Addresses to be Whitelisted"}{" "}
                                  <span className="text-danger">*</span>
                                </Label>

                                <div className="d-flex align-items-center gap-4">
                                  <div className="form-check form-switch form-switch-md mb-0 d-flex align-items-center" dir="ltr">
                                    <Input
                                      type="checkbox"
                                      className="form-check-input"
                                      id="apiAccessSwitch"
                                      name="isApiAccess"
                                      checked={validation.values.isApiAccess}
                                      onChange={validation.handleChange}
                                    />
                                    <Label className="form-check-label fw-semibold ms-2 mb-0" htmlFor="apiAccessSwitch">
                                      For API Access
                                    </Label>
                                  </div>

                                  {validation.values.category === "EXISTING_USER" &&
                                    validation.values.username && (
                                      <>
                                        <span className="text-muted small fw-medium border-start ps-3">
                                          <Badge color="soft-success" className="text-success me-1 px-2 border border-success border-opacity-25">
                                            {validation.values.totalIps}
                                          </Badge>
                                          Currently Whitelisted
                                        </span>

                                        <span
                                          className="text-primary small fw-medium"
                                          style={{ cursor: "pointer", textDecoration: "underline" }}
                                          onClick={handleViewHistory}
                                        >
                                          <i className="ri-history-line align-bottom me-1"></i>
                                          View Recent History
                                        </span>
                                      </>
                                    )}
                                </div>
                              </div>

                              <CreatableSelect
                                styles={matteBlueStyles}
                                isMulti
                                isClearable
                                placeholder="e.g. 192.168.1.1, 10.0.0.0/30 (Paste comma separated lists or Press Enter)"
                                value={getIpValuesForSelect()}
                                onChange={handleIpPillsChange}
                                onInputChange={(val) => setIpInputValue(val)}
                                formatCreateLabel={(val) => {
                                  const expanded = expandIps(val, true);
                                  const hasConflict = expanded.some(ip => {
                                     const match = globalIps.find(g => g.ip === ip);
                                     return match && match.users.filter(u => u !== validation.values.username && u !== validation.values.entityName).length > 0;
                                  });
                                  
                                  if (hasConflict) {
                                     return (
                                       <span className="text-danger fw-bold">
                                         <i className="ri-error-warning-line me-1"></i> Conflict: IP(s) already in use
                                       </span>
                                     );
                                  }
                                  return `Add "${val}"`;
                                }}
                                onBlur={() => validation.setFieldTouched("ipAddresses", true)}
                                classNamePrefix="js-example-basic-multiple mb-0"
                                isDisabled={
                                  validation.values.category === "EXISTING_USER" &&
                                  !validation.values.username
                                }
                              />

                              {ipConflicts.length > 0 && (
                                <Alert color="danger" className="border-0 mt-3 mb-0 px-3 py-2 shadow-sm bg-soft-danger text-danger">
                                  <div className="d-flex">
                                    <i className="ri-error-warning-line fs-16 me-2 mt-1"></i>
                                    <div>
                                      <strong>Warning: Live IP Conflict Detected</strong>
                                      <p className="mb-1 small">The following IPs you entered (or are currently typing) are already active for other users:</p>
                                      <ul className="mb-0 small ps-3">
                                        {ipConflicts.map((c, idx) => (
                                          <li key={idx}>
                                            <strong>{c.ip}</strong> (Used by: <span className="fw-bold text-dark">{c.users.join(", ")}</span>)
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </Alert>
                              )}

                              {validation.errors.ipAddresses &&
                                validation.touched.ipAddresses && (
                                  <div
                                    className="text-danger mt-1"
                                    style={{ fontSize: "0.875em" }}
                                  >
                                    {validation.errors.ipAddresses}
                                  </div>
                                )}
                            </FormGroup>
                          </Col>

                          {validation.values.category === "EXISTING_USER" &&
                            validation.values.username && (
                              <Col md={12} className="mb-3">
                                <FormGroup className="bg-light p-3 rounded border border-dashed">
                                  <Label
                                    className={
                                      isLimitExceeded && !validation.values.reason
                                        ? "text-danger fw-bold"
                                        : "fw-bold text-dark"
                                    }
                                  >
                                    Request IP Removal (Optional){" "}
                                    {isLimitExceeded &&
                                      !validation.values.reason && (
                                        <span className="text-danger">*</span>
                                      )}
                                  </Label>
                                  <Select
                                    isMulti
                                    styles={matteBlueStyles}
                                    options={getActiveIpsOptions()}
                                    placeholder="Select one or more existing IPs to deactivate if needed..."
                                    value={getActiveIpsOptions().filter((opt) => 
                                      Array.isArray(validation.values.ipToRemove) && 
                                      validation.values.ipToRemove.includes(opt.value)
                                    )}
                                    onChange={(opts: any) => {
                                      const selection = opts ? opts.map((opt: any) => opt.value) : [];
                                      validation.setFieldValue("ipToRemove", selection);
                                    }}
                                    onBlur={() =>
                                      validation.setFieldTouched("ipToRemove", true)
                                    }
                                    classNamePrefix="js-example-basic-multiple"
                                  />
                                  <p className="text-muted small mt-2 mb-0">
                                    <i className="ri-information-line me-1"></i> If
                                    you are exceeding the 5 IP limit, you must
                                    select IPs to remove or provide a justification
                                    below.
                                  </p>
                                  {validation.errors.ipToRemove &&
                                    validation.touched.ipToRemove && (
                                      <div
                                        className="text-danger mt-1"
                                        style={{ fontSize: "0.875em" }}
                                      >
                                        {validation.errors.ipToRemove}
                                      </div>
                                    )}
                                </FormGroup>
                              </Col>
                            )}

                          <Col md={4}>
                            <FormGroup>
                              <Label>Contact Person</Label>
                              <Input
                                name="contactPerson"
                                type="text"
                                placeholder="Enter Name"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.contactPerson}
                              />
                            </FormGroup>
                          </Col>

                          <Col md={4}>
                            <FormGroup>
                              <Label>
                                Email <span className="text-danger">*</span>
                              </Label>
                              <Input
                                name="email"
                                type="email"
                                placeholder="Enter Email"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.email}
                                invalid={
                                  !!validation.errors.email &&
                                  validation.touched.email
                                }
                              />
                              <FormFeedback>
                                {validation.errors.email}
                              </FormFeedback>
                            </FormGroup>
                          </Col>

                          <Col md={4}>
                            <FormGroup>
                              <Label>Phone <span className="text-danger">*</span></Label>
                              <Input
                                name="phone"
                                type="text"
                                placeholder="Enter Phone Number"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.phone}
                                invalid={
                                  !!validation.errors.phone &&
                                  validation.touched.phone
                                }
                              />
                              <FormFeedback>
                                {validation.errors.phone}
                              </FormFeedback>
                            </FormGroup>
                          </Col>

                          <Col md={6}>
                            <FormGroup>
                              <Label>Location</Label>
                              <Input
                                name="location"
                                type="text"
                                placeholder="Enter Location"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.location}
                              />
                            </FormGroup>
                          </Col>

                          <Col md={isEmergency ? 6 : 6}>
                            <FormGroup>
                              <Label>
                                Justification Reason{" "}
                                {(isEmergency ||
                                  (isLimitExceeded &&
                                    (!validation.values.ipToRemove || validation.values.ipToRemove.length === 0))) && (
                                  <span className="text-danger">*</span>
                                )}
                              </Label>
                              <Input
                                name="reason"
                                type="text"
                                placeholder={
                                  isEmergency
                                    ? "Enter reason for emergency access"
                                    : "Enter justification if exceeding 5 IPs"
                                }
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.reason}
                                invalid={
                                  !!validation.errors.reason &&
                                  validation.touched.reason
                                }
                              />
                              <FormFeedback>
                                {validation.errors.reason}
                              </FormFeedback>
                            </FormGroup>
                          </Col>

                          {isEmergency && (
                            <Col md={12}>
                              <FormGroup>
                                <Label>
                                  Expected Duration for Access{" "}
                                  <span className="text-danger">*</span>
                                </Label>
                                <Input
                                  name="duration"
                                  type="text"
                                  placeholder="e.g., 24 Hours, 3 Days"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.duration}
                                  invalid={
                                    !!validation.errors.duration &&
                                    validation.touched.duration
                                  }
                                />
                                <FormFeedback>
                                  {validation.errors.duration}
                                </FormFeedback>
                              </FormGroup>
                            </Col>
                          )}
                        </Row>

                        <div className="mt-4">
                          <Button
                            color="primary"
                            type="submit"
                            className="w-100"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <Spinner size="sm" className="me-2" />
                            ) : null}
                            Submit Request
                          </Button>
                        </div>
                      </Form>
                    </>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <Modal
        isOpen={historyModal}
        toggle={() => setHistoryModal(!historyModal)}
        size="lg"
        scrollable
        centered
      >
        <ModalHeader
          toggle={() => setHistoryModal(!historyModal)}
          className="bg-light pb-3"
        >
          Last 10 Actions:{" "}
          <span className="text-primary">{validation.values.username}</span>
        </ModalHeader>
        <ModalBody className="p-4 bg-soft-light">
          {loadingHistory ? (
            <div className="text-center py-5">
              <Spinner color="primary" /> Fetching timeline...
            </div>
          ) : userHistory.length === 0 ? (
            <div className="text-center text-muted py-5">
              <i className="ri-history-line display-5 text-light mb-3"></i>
              <h5>No Recent History</h5>
            </div>
          ) : (
            <div
              className="timeline-container ps-4"
              style={{ borderLeft: "2px solid #ced4da" }}
            >
              {userHistory.map((req, index) => {
                const addedIps = req.ips?.map((i: any) => i.ipAddress) || [];
                const removedIps = req.ipToRemove ? req.ipToRemove.split(",").map((ip: string) => ip.trim()).filter(Boolean) : [];
                const afterIps = req.afterIps || [];

                return (
                  <div className="position-relative mb-4" key={req.id}>
                    <div
                      className="position-absolute"
                      style={{
                        left: "-33px",
                        top: "0px",
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        backgroundColor: "#0ab39c",
                        border: "3px solid white",
                        boxShadow: "0 0 0 1px #ced4da",
                      }}
                    ></div>

                    <Card className="border shadow-none mb-0">
                      <CardHeader className="bg-white border-bottom py-2 d-flex justify-content-between align-items-center">
                        <div className="fw-bold text-dark">{req.ticketNo}</div>
                        <small className="text-muted fw-medium">
                          {new Date(req.createdAt).toLocaleString()}
                        </small>
                      </CardHeader>
                      <CardBody className="py-3">
                        <Row className="mb-2">
                          <Col sm={6}>
                            <div className="d-flex justify-content-between align-items-center mb-1">
                              <span className="text-muted small fw-bold">IPs Added</span>
                              {addedIps.length > 0 && (
                                <button 
                                  type="button" 
                                  className="btn btn-sm btn-link p-0 text-primary shadow-none text-decoration-none" 
                                  onClick={() => handleCopy(addedIps.join(", "), "Added IPs copied!")}
                                >
                                  <i className="ri-file-copy-line"></i> Copy
                                </button>
                              )}
                            </div>
                            <div className="d-flex flex-wrap gap-1">
                              {addedIps.length > 0 ? (
                                addedIps.map((ip: string, i: number) => (
                                  <Badge color="success" className="fw-normal" key={i}>
                                    + {ip}
                                  </Badge>
                                ))
                              ) : (
                                <span className="text-muted small">None</span>
                              )}
                            </div>
                          </Col>

                          <Col sm={6}>
                            <div className="d-flex justify-content-between align-items-center mb-1">
                              <span className="text-muted small fw-bold">IPs Removed</span>
                              {removedIps.length > 0 && (
                                <button 
                                  type="button" 
                                  className="btn btn-sm btn-link p-0 text-danger shadow-none text-decoration-none" 
                                  onClick={() => handleCopy(removedIps.join(", "), "Removed IPs copied!")}
                                >
                                  <i className="ri-file-copy-line"></i> Copy
                                </button>
                              )}
                            </div>
                            <div className="d-flex flex-wrap gap-1">
                              {removedIps.length > 0 ? (
                                removedIps.map((ip: string, i: number) => (
                                  <Badge color="danger" className="fw-normal" key={i}>
                                    - {ip}
                                  </Badge>
                                ))
                              ) : (
                                <span className="text-muted small">None</span>
                              )}
                            </div>
                          </Col>
                        </Row>

                        <div className="bg-light p-2 rounded border border-dashed mt-2">
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <span className="text-muted small fw-bold">Resulting Active IPs</span>
                            {afterIps.length > 0 && (
                              <button 
                                type="button" 
                                className="btn btn-sm btn-link p-0 text-primary shadow-none text-decoration-none" 
                                onClick={() => handleCopy(afterIps.join(", "), "Active IPs copied!")}
                              >
                                <i className="ri-file-copy-line"></i> Copy All
                              </button>
                            )}
                          </div>
                          <div className="d-flex flex-wrap gap-1">
                            {afterIps.length > 0 ? (
                              afterIps.map((ip: string, i: number) => (
                                <Badge color="primary" className="fw-normal" key={i}>
                                  {ip}
                                </Badge>
                              ))
                            ) : (
                              <span className="text-muted small">0 IPs</span>
                            )}
                          </div>
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
};

export default CreateRequestForm;