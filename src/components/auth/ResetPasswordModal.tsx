"use client";
import React, { useState, useEffect } from "react";
import { 
  Modal, ModalHeader, ModalBody, Button, Form, 
  Input, Label, FormFeedback, FormGroup, Spinner, Badge 
} from "reactstrap";
import Select from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { resetPasswordForUser } from "@slices/auth/password/thunk";
import { toast, ToastContainer } from "react-toastify"; //  Added ToastContainer
import "react-toastify/dist/ReactToastify.css"; //  Added CSS import
import FeatherIcon from "feather-icons-react";

interface ResetPasswordModalProps {
  isOpen: boolean;
  toggle: () => void;
  isAdmin: boolean;
  currentUserId: string | null;
  currentUserName: string; 
}

const ResetPasswordModal = ({ isOpen, toggle, isAdmin, currentUserId, currentUserName }: ResetPasswordModalProps) => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const dispatch: any = useDispatch();

  useEffect(() => {
    if (isOpen && isAdmin) {
      fetch("/api/users")
        .then((res) => res.json())
        .then((json) => {
          if (json.success) setUsers(json.data);
        });
    }
  }, [isOpen, isAdmin]);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Minimum 8 characters required")
        .matches(/[a-z]/, "At least one lowercase letter")
        .matches(/[A-Z]/, "At least one uppercase letter")
        .matches(/[0-9]/, "At least one number")
        .required("Password is required"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      const targetId = isAdmin ? selectedUser?.value : currentUserId;

      if (isAdmin && !selectedUser) {
        toast.error("Please select a user to reset.", { position: "top-right" });
        return;
      }

      try {
        await dispatch(resetPasswordForUser({ userId: targetId, password: values.password })).unwrap();
        
        //  Success Notification
        toast.success("Password updated successfully!", {
          position: "top-right",
          autoClose: 3000,
        });

        validation.resetForm();
        setSelectedUser(null);
        setTimeout(() => toggle(), 500); // Close modal after a short delay
      } catch (err: any) {
        //  Failure Notification
        toast.error(err || "Failed to update password. Please try again.", {
          position: "top-right",
          autoClose: 4000,
        });
      }
    },
  });

  return (
    <>
      {/* <ToastContainer closeButton={false} limit={1} />  Toast Container inside component */}
      <Modal isOpen={isOpen} toggle={toggle} centered size="md">
        <ModalHeader toggle={toggle} className="bg-light p-3">
          <div className="d-flex align-items-center">
              <FeatherIcon icon="lock" className="icon-dual-primary icon-sm me-2" />
              <span className="fw-bold">Reset Account Password</span>
          </div>
        </ModalHeader>
        <ModalBody className="p-4">
          <div className="text-center mb-4">
              <div className="mb-3">
                  <FeatherIcon 
                      icon="shield" 
                      style={{ width: "60px", height: "60px", color: "#405189", opacity: 0.8 }} 
                  />
              </div>
              <h5 className="text-primary fw-bold">Update Credentials</h5>
              <p className="text-muted">Ensure you use a strong, unique password.</p>
          </div>

          <Form onSubmit={validation.handleSubmit}>
            <FormGroup className="mb-4">
              <Label className="fw-semibold text-uppercase fs-11 text-muted mb-2">Target Account</Label>
              {isAdmin ? (
                <Select
                  options={users.map((u) => ({ value: u.id, label: `${u.name} (${u.email})` }))}
                  onChange={(opt) => setSelectedUser(opt)}
                  placeholder="Search all users..."
                  classNamePrefix="react-select"
                />
              ) : (
                <div className="p-3 bg-light border rounded d-flex align-items-center shadow-sm">
                  <FeatherIcon icon="user" className="text-primary icon-xs me-3" />
                  <span className="fw-bold text-dark fs-14">
                      {currentUserName && currentUserName !== "Loading..." ? currentUserName : "Active Session User"}
                  </span>
                  <Badge color="soft-info" className="ms-auto text-info border border-info border-opacity-25">Your Account</Badge>
                </div>
              )}
            </FormGroup>

            <FormGroup className="mb-3">
              <Label className="fw-medium">New Password</Label>
              <Input
                name="password"
                type="password"
                placeholder="Enter new password"
                className="form-control-lg"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.password}
                invalid={!!(validation.touched.password && validation.errors.password)}
              />
              <FormFeedback>{validation.errors.password}</FormFeedback>
            </FormGroup>

            <FormGroup className="mb-4">
              <Label className="fw-medium">Confirm Password</Label>
              <Input
                name="confirm_password"
                type="password"
                placeholder="Confirm your password"
                className="form-control-lg"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.confirm_password}
                invalid={!!(validation.touched.confirm_password && validation.errors.confirm_password)}
              />
              <FormFeedback>{validation.errors.confirm_password}</FormFeedback>
            </FormGroup>

            <div className="d-flex gap-2 justify-content-end pt-2">
              <Button color="light" className="px-4" onClick={toggle} type="button">Cancel</Button>
              <Button color="primary" className="px-4" type="submit" disabled={validation.isSubmitting}>
                {validation.isSubmitting ? (
                  <Spinner size="sm" className="me-2" />
                ) : (
                  <FeatherIcon icon="check-circle" className="icon-xs me-2" />
                )}
                Update Password
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ResetPasswordModal;