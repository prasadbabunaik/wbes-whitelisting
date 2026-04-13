"use client";
import React from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Link from "next/link";

// Import Content
import UiContent from "@common/UiContent";
//import Components
import BreadCrumb from "@common/BreadCrumb";
import PreviewCardHeader from "@common/PreviewCardHeader";

// Small Images
const img1 = "/images/small/img-1.jpg";
const img2 = "/images/small/img-2.jpg";

import {
  DefaultPlaceholderExample,
  WidthExample,
  SizingExample,
  ColorExample,
} from "./UiPlaceholdersCode";

import Image from "next/image";

const UiPlaceholders = () => {
  document.title =
    "Placeholders | Velzon - Next.js TypeScript Admin & Dashboard Template";

  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Placeholders" pageTitle="Base UI" />

          {/* Default Placeholder */}
          <Row>
            <Col lg={12}>
              <Card>
                <PreviewCardHeader title="Default Placeholder" />
                <CardBody>
                  <p className="text-muted">
                    In the example below, we take a typical card component and
                    recreate it with placeholders applied to create a “loading
                    card”.
                  </p>

                  <div className="live-preview">
                    <Row className="justify-content-center">
                      <Col xl={7}>
                        <Row className="justify-content-between">
                          <Col lg={5} sm={6}>
                            <Card>
                              <div
                                style={{
                                  width: "100%",
                                  height: "220px",
                                  position: "relative",
                                }}
                              >
                                <Image
                                  src={img1}
                                  alt="card img"
                                  fill
                                  className="card-img-top rounded"
                                  style={{ objectFit: "cover" }}
                                />
                              </div>
                              <CardBody>
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">
                                  Some quick example text to build on the card
                                  title and make up the bulk of the card&apos;s
                                  content.
                                </p>
                                <Link href="#" className="btn btn-primary">
                                  Go somewhere
                                </Link>
                              </CardBody>
                            </Card>
                          </Col>

                          <Col lg={5} sm={6}>
                            <Card>
                              <div
                                style={{
                                  width: "100%",
                                  height: "220px",
                                  position: "relative",
                                }}
                              >
                                <Image
                                  src={img2}
                                  alt="card dummy img"
                                  fill
                                  className="card-img-top rounded"
                                  style={{ objectFit: "cover" }}
                                />
                              </div>
                              <CardBody>
                                <h5 className="card-title placeholder-glow">
                                  <span className="placeholder col-6"></span>
                                </h5>
                                <p className="card-text placeholder-glow">
                                  <span className="placeholder col-7"></span>
                                  <span className="placeholder col-4"></span>
                                  <span className="placeholder col-4"></span>
                                  <span className="placeholder col-6"></span>
                                </p>
                                <Link
                                  href="#"
                                  tabIndex={1}
                                  className="btn btn-primary disabled placeholder col-6"
                                ></Link>
                              </CardBody>
                            </Card>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>

                  <div className="d-none code-view">
                    <pre
                      className="language-markup"
                      style={{ height: "275px" }}
                    >
                      <code>
                        <DefaultPlaceholderExample />
                      </code>
                    </pre>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Width Example */}
          <Row>
            <Col xxl={6}>
              <Card>
                <PreviewCardHeader title="Width" />
                <CardBody>
                  <p className="text-muted">
                    Use <code>w-25,w-50,w-75</code> or <code>w-100</code> class
                    to placeholder class to set different widths to the
                    placeholder.
                  </p>
                  <div className="live-preview">
                    <span className="placeholder w-50 d-block mb-2"></span>
                    <span className="placeholder w-75 d-block mb-2"></span>
                    <span className="placeholder w-25 d-block mb-2"></span>
                    <span className="placeholder w-100 d-block mb-2"></span>
                  </div>

                  <div className="d-none code-view">
                    <pre className="language-markup">
                      <code>
                        <WidthExample />
                      </code>
                    </pre>
                  </div>
                </CardBody>
              </Card>
            </Col>

            {/* Sizing Example */}
            <Col xxl={6}>
              <Card>
                <PreviewCardHeader title="Sizing" />
                <CardBody>
                  <p className="text-muted">
                    Use <code>placeholder-lg</code>, <code>placeholder-sm</code>
                    , or <code>placeholder-xs</code> class to set different
                    sizes.
                  </p>
                  <div className="live-preview">
                    <Row className="gap-0">
                      <Col className="col-12">
                        <span className="placeholder placeholder-lg w-100 d-block mb-2"></span>
                      </Col>
                      <Col className="col-12">
                        <span className="placeholder w-100 d-block mb-2"></span>
                      </Col>
                      <Col className="col-12">
                        <span className="placeholder placeholder-sm w-100 d-block mb-2"></span>
                      </Col>
                      <Col className="col-12">
                        <span className="placeholder placeholder-xs w-100 d-block mb-2"></span>
                      </Col>
                    </Row>
                  </div>

                  <div className="d-none code-view">
                    <pre className="language-markup">
                      <code>
                        <SizingExample />
                      </code>
                    </pre>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Color Example */}
          <Row>
            <Col lg={12}>
              <Card>
                <PreviewCardHeader title="Color" />
                <CardBody>
                  <p className="text-muted">
                    Use <code>bg-</code> class with color variation to set
                    custom background colors for placeholders.
                  </p>
                  <div className="live-preview">
                    <Row className="g-2">
                      {[
                        "",
                        "primary",
                        "secondary",
                        "success",
                        "danger",
                        "warning",
                        "info",
                        "light",
                        "dark",
                      ].map((color, index) => (
                        <Col className="col-12" key={index}>
                          <span
                            className={`placeholder ${
                              color ? "bg-" + color : ""
                            } w-100 d-block`}
                          ></span>
                        </Col>
                      ))}
                    </Row>
                  </div>

                  <div className="d-none code-view">
                    <pre
                      className="language-markup"
                      style={{ height: "275px" }}
                    >
                      <code>
                        <ColorExample />
                      </code>
                    </pre>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UiPlaceholders;
