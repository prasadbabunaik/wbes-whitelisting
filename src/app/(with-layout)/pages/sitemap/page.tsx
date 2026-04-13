import React from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BreadCrumb from "@common/BreadCrumb";
import Link from "next/link";

const SiteMap = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="SiteMap" pageTitle="Pages" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Responsive Sitemap</h4>
                </CardHeader>
                <CardBody>
                  <div className="sitemap-content">
                    <figure className="sitemap-horizontal">
                      <ul className="administration">
                        <li>
                          <ul className="director">
                            <li>
                              <Link href="#" className="fw-semibold">
                                <span>Velzon Admin</span>
                              </Link>
                              <ul className="subdirector">
                                <li>
                                  <Link href="#" className="fw-semibold">
                                    <span>Contact Us</span>
                                  </Link>
                                </li>
                              </ul>
                              <ul className="departments">
                                <li>
                                  <Link href="#" className="fw-semibold">
                                    <span>Main Pages</span>
                                  </Link>
                                </li>

                                <li className="department">
                                  <Link href="#" className="fw-semibold">
                                    <span>Account Management</span>
                                  </Link>
                                  <ul>
                                    <li>
                                      <Link href="#">
                                        <span>Sign Up</span>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="#">
                                        <span>Login</span>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="#">
                                        <span>Profile Settings</span>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="#">
                                        <span>Modify Reservation</span>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="#">
                                        <span>Cancel Reservation</span>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="#">
                                        <span>Write Reviews</span>
                                      </Link>
                                    </li>
                                  </ul>
                                </li>
                                <li className="department">
                                  <Link href="#" className="fw-semibold">
                                    <span>About Us</span>
                                  </Link>
                                  <ul>
                                    <li>
                                      <Link href="#">
                                        <span>Overview</span>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="#">
                                        <span>Connect Via Social Media</span>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="#">
                                        <span>Careers</span>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="#">
                                        <span>Team Members</span>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="#">
                                        <span>Policies</span>
                                      </Link>
                                    </li>
                                  </ul>
                                </li>
                                <li className="department">
                                  <Link href="#" className="fw-semibold">
                                    <span>Book a Trip</span>
                                  </Link>
                                  <ul>
                                    <li>
                                      <Link href="#">
                                        <span>Travel Details</span>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="#">
                                        <span>Reservation Process</span>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="#">
                                        <span>Payment Option</span>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="#">
                                        <span>Comfirmation</span>
                                      </Link>
                                    </li>
                                  </ul>
                                </li>
                                <li className="department">
                                  <Link href="#" className="fw-semibold">
                                    <span>Destination</span>
                                  </Link>
                                  <ul>
                                    <li>
                                      <Link href="#">
                                        <span>Architecture</span>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="#">
                                        <span>Art</span>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="#">
                                        <span>Entertainment</span>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="#">
                                        <span>History</span>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="#">
                                        <span>Science</span>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="#">
                                        <span>Sports</span>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="#">
                                        <span>Music</span>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="#">
                                        <span>Tracking Camp</span>
                                      </Link>
                                    </li>
                                  </ul>
                                </li>
                                <li className="department">
                                  <Link href="#" className="fw-semibold">
                                    <span>Travel Tips</span>
                                  </Link>
                                  <ul>
                                    <li>
                                      <Link href="#">
                                        <span>General Travel</span>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="#">
                                        <span>Helpth Concerns</span>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="#">
                                        <span>Safety Measures</span>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="#">
                                        <span>FAQ's</span>
                                      </Link>
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </figure>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Horizontal</h4>
                </CardHeader>
                <CardBody>
                  <div className="hori-sitemap">
                    <ul className="list-unstyled mb-0">
                      <li className="p-0 parent-title">
                        <Link href="#" className="fw-semibold fs-14">
                          My Account
                        </Link>
                      </li>
                      <ul className="list-unstyled row g-0">
                        <li className="col-sm-3">
                          <Link href="#" className="fw-semibold sub-title">
                            About Us
                          </Link>
                          <ul className="list-unstyled row g-0 second-list">
                            <li className="col-sm-6">
                              <Link href="#">Overview</Link>
                            </li>
                            <li className="col-sm-6">
                              <Link href="#">History</Link>
                            </li>
                          </ul>
                        </li>
                        <li className="col-sm-3">
                          <Link href="#" className="fw-semibold">
                            My self-care Plan
                          </Link>
                          <ul className="list-unstyled second-list pt-0">
                            <li>
                              <div>
                                <Link href="#">Basic</Link>
                                <Link href="#">Early Physiotherapy</Link>
                                <Link href="#">Intermediate Physiotherapy</Link>
                                <Link href="#">Return to Normal Activity</Link>
                              </div>
                            </li>
                          </ul>
                        </li>
                        <li className="col-sm-3">
                          <Link href="#" className="fw-semibold sub-title">
                            Support Us
                          </Link>
                          <ul className="list-unstyled row g-0 sub-list">
                            <li className="col-sm-6">
                              <Link href="#">Contact Us</Link>
                            </li>
                            <li className="col-sm-6">
                              <Link href="#">Customer Services</Link>
                              <ul className="list-unstyled second-list">
                                <li>
                                  <div>
                                    <Link href="#">Chat With Us</Link>
                                    <Link href="#">Connect Information</Link>
                                    <Link href="#">FAQ'S</Link>
                                  </div>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                        <li className="col-sm-3">
                          <Link href="#" className="fw-semibold">
                            Terms & Conditions
                          </Link>
                        </li>
                      </ul>
                    </ul>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Vertical</h4>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col sm={6}>
                      <div className="verti-sitemap">
                        <ul className="list-unstyled mb-0">
                          <li className="p-0 parent-title">
                            <Link href="#" className="fw-medium fs-14">
                              Nancy Martino - Project Director
                            </Link>
                          </li>
                          <li>
                            <div className="first-list">
                              <div className="list-wrap">
                                <Link
                                  href="#"
                                  className="fw-medium text-primary"
                                >
                                  Erica Kernan - Team Leader
                                </Link>
                              </div>
                              <ul className="second-list list-unstyled">
                                <li>
                                  <Link href="#">Jason McQuaid - Member</Link>
                                </li>
                                <li>
                                  <Link href="#">Elwood Arter - Member</Link>
                                </li>
                              </ul>
                            </div>
                            <div className="first-list">
                              <div className="list-wrap">
                                <Link
                                  href="#"
                                  className="fw-medium text-primary"
                                >
                                  Mary Jones - Project Manager
                                </Link>
                              </div>
                              <ul className="second-list list-unstyled">
                                <li>
                                  <Link href="#">Jordyn Jones - Designer</Link>
                                </li>
                                <li>
                                  <Link href="#">Ashlee Haney - Developer</Link>
                                </li>
                                <li>
                                  <Link href="#">
                                    Rashad Charles - BackEnd Developer
                                  </Link>
                                </li>
                                <li>
                                  <Link href="#">
                                    Walter Newman - Frontend Developer
                                  </Link>
                                </li>
                                <li>
                                  <Link href="#">Adam Moss - Designer</Link>
                                </li>
                              </ul>
                            </div>
                            <div className="first-list">
                              <div className="list-wrap">
                                <Link
                                  href="#"
                                  className="fw-medium text-primary"
                                >
                                  Tilly Kent - Executive Manager
                                </Link>
                              </div>
                              <ul className="second-list list-unstyled">
                                <li>
                                  <Link href="#">
                                    Tyler Porter - Account Executive
                                  </Link>
                                </li>
                                <li>
                                  <Link href="#">
                                    Alicia Thompson - Sales Executive
                                  </Link>
                                  <ul className="third-list list-unstyled">
                                    <li>
                                      <Link href="#">Jack Coates - Member</Link>
                                    </li>
                                    <li>
                                      <Link href="#">Owen Jarvis - Member</Link>
                                    </li>
                                    <li>
                                      <Link href="#">
                                        Ashlee Haney - Member
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="#">Archie Cook - Member</Link>
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </div>
                            <div className="first-list">
                              <div className="list-wrap">
                                <Link
                                  href="#"
                                  className="fw-medium text-primary"
                                >
                                  Rachel Rose - HR
                                </Link>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </Col>

                    <Col sm={6}>
                      <div className="verti-sitemap">
                        <ul className="mb-0 list-unstyled">
                          <li className="p-0 parent-title">
                            <Link href="#" className="fw-medium fs-14">
                              Velzon
                            </Link>
                          </li>
                          <li>
                            <div className="first-list">
                              <div className="list-wrap">
                                <Link
                                  href="#"
                                  className="fw-medium text-primary"
                                >
                                  <i className="ri-airplay-line me-1 align-bottom"></i>{" "}
                                  Dashboards
                                </Link>
                              </div>
                              <ul className="second-list list-unstyled">
                                <li>
                                  <Link href="#">Analytics</Link>
                                </li>
                                <li>
                                  <Link href="#">CRM</Link>
                                </li>
                              </ul>
                            </div>
                            <div className="first-list">
                              <div className="list-wrap">
                                <Link
                                  href="#"
                                  className="fw-medium text-primary"
                                >
                                  <i className="ri-pencil-ruler-2-line me-1 align-bottom"></i>{" "}
                                  App Pages
                                </Link>
                              </div>
                              <ul className="second-list list-unstyled">
                                <li>
                                  <Link href="#">Calender</Link>
                                </li>
                                <li>
                                  <Link href="#">Chat</Link>
                                </li>
                                <li>
                                  <Link href="#">Email</Link>
                                </li>
                                <li>
                                  <Link href="#">Ecommerce</Link>
                                </li>
                                <li>
                                  <Link href="#">Projects</Link>
                                </li>
                                <li>
                                  <Link href="#">Tasks</Link>
                                </li>
                              </ul>
                            </div>
                            <div className="first-list">
                              <div className="list-wrap">
                                <Link
                                  href="#"
                                  className="fw-medium text-primary"
                                >
                                  <i className="ri-file-list-3-line me-1 align-bottom"></i>{" "}
                                  Pages
                                </Link>
                              </div>
                            </div>
                            <div className="first-list">
                              <div className="list-wrap">
                                <Link
                                  href="#"
                                  className="fw-medium text-primary"
                                >
                                  <i className="ri-stack-line me-1 align-bottom"></i>{" "}
                                  Components
                                </Link>
                              </div>
                              <ul className="second-list list-unstyled">
                                <li>
                                  <Link href="#">Base UI</Link>
                                </li>
                                <li>
                                  <Link href="#">Advance UI</Link>
                                  <ul className="third-list list-unstyled">
                                    <li>
                                      <Link href="#">Sweet Alerts</Link>
                                    </li>
                                    <li>
                                      <Link href="#">Range Slider</Link>
                                    </li>
                                    <li>
                                      <Link href="#">Nestable List</Link>
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default SiteMap;
