"use client";
import React from "react";
import Link from "next/link";
import { Col, Container, Row } from "reactstrap";
import ParticlesAuth from "../../ParticlesAuth";
import Image from "next/image";
// Import Images
const error = "/images/error.svg";

const Basic404 = () => {
  document.title =
    "404 Error Basic | Velzon - Next.js TypeScript Admin & Dashboard Template";
  return (
    <React.Fragment>
      <ParticlesAuth>
        <div className="auth-page-content mt-lg-5">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="text-center pt-4">
                  <div className="">
                    <Image
                      src={error}
                      alt=""
                      className="error-basic-img move-animation"
                      width={400}
                      height={400}
                    />
                  </div>
                  <div className="mt-n4">
                    <h1 className="display-1 fw-medium">404</h1>
                    <h3 className="text-uppercase">Sorry, Page not Found 😭</h3>
                    <p className="text-muted mb-4">
                      The page you are looking for not available!
                    </p>
                    <Link href="/dashboard" className="btn btn-success">
                      <i className="mdi mdi-home me-1"></i>Back to home
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </ParticlesAuth>
    </React.Fragment>
  );
};

export default Basic404;
