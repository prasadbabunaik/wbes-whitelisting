"use client";

import React, { useState, useRef } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  Form,
  Spinner,
} from "reactstrap";
import ParticlesAuth from "../ParticlesAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";

const logoLight = "/images/grid/complete_logo_gi.png";

const Login = () => {
  const router = useRouter();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [passwordShow, setPasswordShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
    if (token) setError(""); 
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!captchaToken) {
      setError("Please complete the CAPTCHA to proceed.");
      return;
    }

    setLoader(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...formData, captchaToken }) 
      });

      const data = await response.json();

      // ✅ VAPT: Use data.success because the new API route doesn't return a JWT token anymore
      if (response.ok && data.success) {
        const extractedRole = data.user?.role;
        
        if (!extractedRole) {
          setError("Login succeeded, but your account has no assigned role!");
          setLoader(false);
          return;
        }

        // 🛡️ VAPT: Save CSRF Token to SessionStorage (memory specific to this browser tab)
        if (data.csrfToken) {
           sessionStorage.setItem("csrfToken", data.csrfToken);
        } else {
           console.error("Missing CSRF Token in Backend Response!");
        }

        // 📝 Save Non-Sensitive Metadata for instant UI rendering
        localStorage.setItem("userRole", extractedRole); 
        localStorage.setItem("role", extractedRole); 
        localStorage.setItem("userName", data.user?.name || ""); 
        localStorage.setItem("organizationId", data.user?.organizationId || ""); 
        
        // 🧹 CRITICAL VAPT FIX: Explicitly wipe out the old vulnerable JWT token!
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");

        router.push("/dashboard");
      } else {
        setError(data.error || "Invalid credentials");
        recaptchaRef.current?.reset();
        setCaptchaToken(null);
      }
    } catch (err) {
      console.error(err);
      setError("Login failed. Please try again.");
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    }

    setLoader(false);
  };

  return (
    <React.Fragment>
      <ParticlesAuth>
        <div className="auth-page-content mt-lg-5">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                  <Link href="/" className="d-inline-block auth-logo">
                    <Image src={logoLight} alt="" height={40} width={120} />
                  </Link>
                  <p className="mt-3 fs-15 fw-medium">
                    WBES IP Whitelisting System
                  </p>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="mt-4 card-bg-fill">
                  <CardBody className="p-4">
                    <div className="text-center mt-2">
                      <p className="text-muted">Sign in to continue</p>
                    </div>

                    {error && (
                      <div className="alert alert-danger">{error}</div>
                    )}

                    <div className="p-2 mt-4">
                      <Form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <Label>Email</Label>
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <div className="float-end">
                            <Link href="#" className="text-muted">
                              Forgot password?
                            </Link>
                          </div>
                          <Label>Password</Label>
                          <div className="position-relative">
                            <Input
                              type={passwordShow ? "text" : "password"}
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                              placeholder="Enter password"
                              required
                            />
                            <button
                              type="button"
                              className="btn btn-link position-absolute end-0 top-0"
                              onClick={() => setPasswordShow(!passwordShow)}
                            >
                              <i className="ri-eye-fill align-middle"></i>
                            </button>
                          </div>
                        </div>

                        {/* Read Site Key from Environment Variable */}
                        <div className="mb-3 d-flex justify-content-center">
                          <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                            onChange={onCaptchaChange}
                          />
                        </div>

                        <div className="mt-4">
                          <Button color="success" className="w-100" type="submit" disabled={loader}>
                            {loader && <Spinner size="sm" className="me-2" />}
                            Sign In
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </ParticlesAuth>
    </React.Fragment>
  );
};

export default Login;