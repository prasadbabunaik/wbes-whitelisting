"use client";
import React from "react";
import Link from "next/link";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import ParticlesAuth from "../../ParticlesAuth";

//import images
const logoLight = "/images/logo-light.png";

import Image from "next/image";

const BasicLogout = () => {
  document.title =
    "Log Out | Velzon - Next.js TypeScript Admin & Dashboard Template";
  return (
    <React.Fragment>
      <ParticlesAuth>
        <div className="auth-page-content mt-lg-5">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                  <div>
                    <Link
                      href="/dashboard"
                      className="d-inline-block auth-logo"
                    >
                      <Image src={logoLight} alt="" width={32} height={32} />
                    </Link>
                  </div>
                  <p className="mt-3 fs-15 fw-medium">
                    Premium Admin & Dashboard Template
                  </p>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="mt-4 card-bg-fill">
                  <CardBody className="p-4 text-center">
                    <i className="ri-cup-line display-5 text-success"></i>

                    <div className="mt-4 pt-2">
                      <h5>You are Logged Out</h5>
                      <p className="text-muted">
                        Thank you for using{" "}
                        <span className="fw-semibold">velzon</span> admin
                        template
                      </p>
                      <div className="mt-4">
                        <Link
                          href="/authinner/signin/basic"
                          className="btn btn-success w-100"
                        >
                          Sign In
                        </Link>
                      </div>
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

export default BasicLogout;
