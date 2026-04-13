import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import Link from "next/link";

//import images
const avatar1 = "/images/users/avatar-1.jpg";
const avatar2 = "/images/users/avatar-2.jpg";
const avatar3 = "/images/users/avatar-3.jpg";
const avatar4 = "/images/users/avatar-4.jpg";
const avatar6 = "/images/users/avatar-6.jpg";
const avatar7 = "/images/users/avatar-7.jpg";
const avatar8 = "/images/users/avatar-8.jpg";

// Small Images
const image2 = "/images/small/img-2.jpg";
const image3 = "/images/small/img-3.jpg";
const image4 = "/images/small/img-4.jpg";
import Image from "next/image";

const ActivitiesTab = () => {
  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <h5 className="card-title">Activities</h5>
          <div className="acitivity-timeline py-3">
            <div className="acitivity-item d-flex">
              <div className="flex-shrink-0">
                <Image
                  src={avatar1}
                  width={32}
                  height={32}
                  alt=""
                  className="avatar-xs rounded-circle acitivity-avatar"
                />
              </div>
              <div className="flex-grow-1 ms-3">
                <h6 className="mb-1">
                  Oliver Phillips{" "}
                  <span className="badge bg-primary-subtle text-primary align-middle">
                    New
                  </span>
                </h6>
                <p className="text-muted mb-2">
                  We talked about a project on linkedin.
                </p>
                <small className="mb-0 text-muted">Today</small>
              </div>
            </div>
            <div className="acitivity-item py-3 d-flex">
              <div className="flex-shrink-0 avatar-xs acitivity-avatar">
                <div className="avatar-title bg-success-subtle text-success rounded-circle">
                  N
                </div>
              </div>
              <div className="flex-grow-1 ms-3">
                <h6 className="mb-1">
                  Nancy Martino{" "}
                  <span className="badge bg-secondary-subtle text-secondary align-middle">
                    In Progress
                  </span>
                </h6>
                <p className="text-muted mb-2">
                  <i className="ri-file-text-line align-middle ms-2"></i> Create
                  new project Buildng product
                </p>
                <div className="avatar-group mb-2">
                  <Link
                    href="#"
                    className="avatar-group-item"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Christi"
                  >
                    <Image
                      src={avatar4}
                      width={32}
                      height={32}
                      alt=""
                      className="rounded-circle avatar-xs"
                    />
                  </Link>
                  <Link
                    href="#"
                    className="avatar-group-item"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Frank Hook"
                  >
                    <Image
                      src={avatar3}
                      width={32}
                      height={32}
                      alt=""
                      className="rounded-circle avatar-xs"
                    />
                  </Link>
                  <Link
                    href="#"
                    className="avatar-group-item"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title=" Ruby"
                  >
                    <div className="avatar-xs">
                      <div className="avatar-title rounded-circle bg-light text-primary">
                        R
                      </div>
                    </div>
                  </Link>
                  <Link
                    href="#"
                    className="avatar-group-item"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="more"
                  >
                    <div className="avatar-xs">
                      <div className="avatar-title rounded-circle">2+</div>
                    </div>
                  </Link>
                </div>
                <small className="mb-0 text-muted">Yesterday</small>
              </div>
            </div>
            <div className="acitivity-item py-3 d-flex">
              <div className="flex-shrink-0">
                <Image
                  src={avatar2}
                  width={32}
                  height={32}
                  alt=""
                  className="avatar-xs rounded-circle acitivity-avatar"
                />
              </div>
              <div className="flex-grow-1 ms-3">
                <h6 className="mb-1">
                  Natasha Carey{" "}
                  <span className="badge bg-success-subtle text-success align-middle">
                    Completed
                  </span>
                </h6>
                <p className="text-muted mb-2">
                  Adding a new event with attachments
                </p>
                <Row>
                  <Col xxl={4}>
                    <Row className="border border-dashed gx-2 p-2 mb-2">
                      <Col xs={4}>
                        <Image
                          src={image2}
                          width={100}
                          height={100}
                          alt=""
                          className="img-fluid rounded"
                        />
                      </Col>
                      <Col xs={4}>
                        <Image
                          src={image3}
                          width={100}
                          height={100}
                          alt=""
                          className="img-fluid rounded"
                        />
                      </Col>
                      <Col xs={4}>
                        <Image
                          src={image4}
                          width={100}
                          height={100}
                          alt=""
                          className="img-fluid rounded"
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <small className="mb-0 text-muted">25 Nov</small>
              </div>
            </div>
            <div className="acitivity-item py-3 d-flex">
              <div className="flex-shrink-0">
                <Image
                  src={avatar6}
                  width={32}
                  height={32}
                  alt=""
                  className="avatar-xs rounded-circle acitivity-avatar"
                />
              </div>
              <div className="flex-grow-1 ms-3">
                <h6 className="mb-1">Bethany Johnson</h6>
                <p className="text-muted mb-2">
                  added a new member to velzon dashboard
                </p>
                <small className="mb-0 text-muted">19 Nov</small>
              </div>
            </div>
            <div className="acitivity-item py-3 d-flex">
              <div className="flex-shrink-0">
                <div className="avatar-xs acitivity-avatar">
                  <div className="avatar-title rounded-circle bg-danger-subtle text-danger">
                    <i className="ri-shopping-bag-line"></i>
                  </div>
                </div>
              </div>
              <div className="flex-grow-1 ms-3">
                <h6 className="mb-1">
                  Your order is placed{" "}
                  <span className="badge bg-danger-subtle text-danger align-middle ms-1">
                    Out of Delivery
                  </span>
                </h6>
                <p className="text-muted mb-2">
                  These customers can rest assured their order has been placed.
                </p>
                <small className="mb-0 text-muted">16 Nov</small>
              </div>
            </div>
            <div className="acitivity-item py-3 d-flex">
              <div className="flex-shrink-0">
                <Image
                  src={avatar7}
                  width={32}
                  height={32}
                  alt=""
                  className="avatar-xs rounded-circle acitivity-avatar"
                />
              </div>
              <div className="flex-grow-1 ms-3">
                <h6 className="mb-1">Lewis Pratt</h6>
                <p className="text-muted mb-2">
                  They all have something to say beyond the words on the page.
                  They can come across as casual or neutral, exotic or
                  graphic.{" "}
                </p>
                <small className="mb-0 text-muted">22 Oct</small>
              </div>
            </div>
            <div className="acitivity-item py-3 d-flex">
              <div className="flex-shrink-0">
                <div className="avatar-xs acitivity-avatar">
                  <div className="avatar-title rounded-circle bg-info-subtle text-info">
                    <i className="ri-line-chart-line"></i>
                  </div>
                </div>
              </div>
              <div className="flex-grow-1 ms-3">
                <h6 className="mb-1">Monthly sales report</h6>
                <p className="text-muted mb-2">
                  <span className="text-danger">2 days left</span>
                  notification to submit the monthly sales report.{" "}
                  <Link
                    href="#"
                    className="link-warning text-decoration-underline"
                  >
                    Reports Builder
                  </Link>
                </p>
                <small className="mb-0 text-muted">15 Oct</small>
              </div>
            </div>
            <div className="acitivity-item d-flex">
              <div className="flex-shrink-0">
                <Image
                  src={avatar8}
                  width={32}
                  height={32}
                  alt=""
                  className="avatar-xs rounded-circle acitivity-avatar"
                />
              </div>
              <div className="flex-grow-1 ms-3">
                <h6 className="mb-1">
                  New ticket received{" "}
                  <span className="badge bg-success-subtle text-success align-middle">
                    Completed
                  </span>
                </h6>
                <p className="text-muted mb-2">
                  User <span className="text-secondary">Erica245</span>{" "}
                  submitted a ticket.
                </p>
                <small className="mb-0 text-muted">26 Aug</small>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default ActivitiesTab;
