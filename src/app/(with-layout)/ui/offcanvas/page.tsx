"use client";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import Link from "next/link";
import Image from "next/image";

// Import Content
import UiContent from "@components/Common/UiContent";
//import Components
import BreadCrumb from "@components/Common/BreadCrumb";
import PreviewCardHeader from "@components/Common/PreviewCardHeader";
import SimpleBar from "simplebar-react";
import {
  DefaultOffcanvasExample,
  PlacementOffcanvasExample,
  BackdropOffcanvasExample,
} from "./UiOffcanvasCode";

// User Avatars
const avatar1 = "/images/users/avatar-1.jpg";
const avatar2 = "/images/users/avatar-2.jpg";
const avatar3 = "/images/users/avatar-3.jpg";
const avatar4 = "/images/users/avatar-4.jpg";
const avatar6 = "/images/users/avatar-6.jpg";
const avatar7 = "/images/users/avatar-7.jpg";
const avatar8 = "/images/users/avatar-8.jpg";

// Small Images
const img2 = "/images/small/img-2.jpg";
const img3 = "/images/small/img-3.jpg";
const img4 = "/images/small/img-4.jpg";
const img9 = "/images/small/img-9.jpg";
const img10 = "/images/small/img-10.jpg";
const img11 = "/images/small/img-11.jpg";
const img12 = "/images/small/img-12.jpg";

const UiOffcanvas = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [isTop, setIsTop] = useState<boolean>(false);
  const [isRight, setIsRight] = useState<boolean>(false);
  const [isBottom, setIsBottom] = useState<boolean>(false);
  const [isLeft, setIsLeft] = useState<boolean>(false);
  const [isEnableScroll, setIsEnableScroll] = useState<boolean>(false);
  const [isBackdrop, setIsBackdrop] = useState<boolean>(false);
  const [isScrollBackDrop, setIsScrollBackDrop] = useState<boolean>(false);

  const toggleDefultCanvas = () => {
    setOpen(!open);
  };

  const toggleTopCanvas = () => {
    setIsTop(!isTop);
  };
  const toggleRightCanvas = () => {
    setIsRight(!isRight);
  };
  const toggleBottomCanvas = () => {
    setIsBottom(!isBottom);
  };
  const toggleLeftCanvas = () => {
    setIsLeft(!isLeft);
  };
  const toggleEnableScroll = () => {
    setIsEnableScroll(!isEnableScroll);
  };
  const toggleBackdrop = () => {
    setIsBackdrop(!isBackdrop);
  };
  const toggleScrollBackDrop = () => {
    setIsScrollBackDrop(!isScrollBackDrop);
  };

  document.title =
    "Offcanvas | Velzon - Next.js TypeScript Admin & Dashboard Template";

  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Offcanvas" pageTitle="Base UI" />
          <Row>
            <Col lg={12}>
              <Card>
                <PreviewCardHeader title="Default Offcanvas" />
                <CardBody>
                  <p className="text-muted">
                    Use the <code>offcanvas</code> class to set a default
                    offcanvas.
                  </p>
                  <div className="live-preview">
                    <div className="hstack flex-wrap gap-2">
                      <Link
                        href="#"
                        className="btn btn-secondary"
                        onClick={toggleDefultCanvas}
                      >
                        Link with href
                      </Link>
                      <Button color="secondary" onClick={toggleDefultCanvas}>
                        Button with data-bs-target
                      </Button>
                    </div>
                  </div>
                  <div className="d-none code-view">
                    <pre
                      className="language-markup"
                      style={{ height: "275px" }}
                    >
                      <code>
                        <DefaultOffcanvasExample />
                      </code>
                    </pre>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <Card>
                <PreviewCardHeader title="Placement Offcanvas" />
                <CardBody>
                  <p className="text-muted">
                    Use the <code>offcanvas</code> class to set a default
                    offcanvas.
                  </p>
                  <div className="live-preview">
                    <div className="d-flex flex-wrap gap-2">
                      <Button color="primary" onClick={toggleTopCanvas}>
                        Toggle Top Offcanvas
                      </Button>
                      <Button color="secondary" onClick={toggleRightCanvas}>
                        Toggle Right Offcanvas
                      </Button>
                      <Button color="success" onClick={toggleBottomCanvas}>
                        Toggle Bottom Offcanvas
                      </Button>
                      <Button color="danger" onClick={toggleLeftCanvas}>
                        Toggle Left Offcanvas
                      </Button>
                    </div>
                  </div>
                  <div className="d-none code-view">
                    <pre
                      className="language-markup"
                      style={{ height: "275px" }}
                    >
                      <code>
                        <PlacementOffcanvasExample />
                      </code>
                    </pre>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <Card>
                <PreviewCardHeader title="Backdrop Offcanvas" />
                <CardBody>
                  <p className="text-muted">
                    Here are the example of offcanvas with scrolling active and
                    backdrop visible.
                  </p>
                  <div className="live-preview">
                    <div className="d-flex flex-wrap gap-2">
                      <Button
                        className="btn btn-light"
                        onClick={toggleEnableScroll}
                      >
                        Enable Body Scrolling
                      </Button>
                      <Button
                        className="btn btn-light"
                        onClick={toggleBackdrop}
                      >
                        Enable Backdrop (Default)
                      </Button>
                      <Button
                        className="btn btn-light"
                        onClick={toggleScrollBackDrop}
                      >
                        Enable Both Scrolling & Backdrop
                      </Button>
                    </div>
                  </div>
                  <div className="d-none code-view">
                    <pre
                      className="language-markup"
                      style={{ height: "275px" }}
                    >
                      <code>
                        <BackdropOffcanvasExample />
                      </code>
                    </pre>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Default Offcanvas */}
      <Offcanvas
        isOpen={open}
        toggle={toggleDefultCanvas}
        id="offcanvasExample"
      >
        <OffcanvasHeader
          toggle={toggleDefultCanvas}
          id="offcanvasExampleLabel"
          className="border-bottom"
        >
          Recent Activity
        </OffcanvasHeader>
        <OffcanvasBody className="p-0 overflow-hidden">
          <SimpleBar style={{ height: "100vh" }}>
            <div className="acitivity-timeline p-4">
              <div className="acitivity-item d-flex">
                <div className="flex-shrink-0">
                  <Image
                    src={avatar1}
                    alt=""
                    className="avatar-xs rounded-circle acitivity-avatar material-shadow"
                    width={40}
                    height={40}
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
                <div className="flex-shrink-0 avatar-xs acitivity-avatar material-shadow">
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
                    <i className="ri-file-text-line align-middle ms-2"></i>{" "}
                    Create new project Building product
                  </p>
                  <div className="avatar-group mb-2">
                    <Link
                      href="#"
                      className="avatar-group-item material-shadow"
                      id="Christi"
                    >
                      <Image
                        src={avatar4}
                        alt=""
                        className="rounded-circle avatar-xs"
                        width={40}
                        height={40}
                      />
                    </Link>
                    <UncontrolledTooltip placement="top" target="Christi">
                      {" "}
                      Christi{" "}
                    </UncontrolledTooltip>
                    <Link
                      href="#"
                      className="avatar-group-item material-shadow"
                      id="Frank"
                    >
                      <Image
                        src={avatar3}
                        alt=""
                        className="rounded-circle avatar-xs"
                        width={40}
                        height={40}
                      />
                    </Link>
                    <UncontrolledTooltip placement="top" target="Frank">
                      {" "}
                      Frank Hook{" "}
                    </UncontrolledTooltip>
                    <Link
                      href="#"
                      className="avatar-group-item material-shadow"
                      id="Ruby"
                    >
                      <div className="avatar-xs">
                        <div className="avatar-title rounded-circle bg-light text-primary">
                          R
                        </div>
                      </div>
                    </Link>
                    <UncontrolledTooltip placement="top" target="Ruby">
                      {" "}
                      Ruby{" "}
                    </UncontrolledTooltip>
                    <Link
                      href="#"
                      className="avatar-group-item material-shadow"
                      id="more"
                    >
                      <div className="avatar-xs">
                        <div className="avatar-title rounded-circle">2+</div>
                      </div>
                    </Link>
                    <UncontrolledTooltip placement="top" target="more">
                      {" "}
                      more{" "}
                    </UncontrolledTooltip>
                  </div>
                  <small className="mb-0 text-muted">Yesterday</small>
                </div>
              </div>
              <div className="acitivity-item py-3 d-flex">
                <div className="flex-shrink-0">
                  <Image
                    src={avatar2}
                    alt=""
                    className="avatar-xs rounded-circle acitivity-avatar"
                    width={40}
                    height={40}
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
                  <Row className="border border-dashed gx-2 p-2 mb-2">
                    <Col className="col-4">
                      <Image
                        src={img2}
                        alt=""
                        className="img-fluid rounded"
                        width={100}
                        height={75}
                      />
                    </Col>
                    <Col className="col-4">
                      <Image
                        src={img3}
                        alt=""
                        className="img-fluid rounded"
                        width={100}
                        height={75}
                      />
                    </Col>
                    <Col className="col-4">
                      <Image
                        src={img4}
                        alt=""
                        className="img-fluid rounded"
                        width={100}
                        height={75}
                      />
                    </Col>
                  </Row>
                  <small className="mb-0 text-muted">25 Nov</small>
                </div>
              </div>
              <div className="acitivity-item py-3 d-flex">
                <div className="flex-shrink-0">
                  <Image
                    src={avatar6}
                    alt=""
                    className="avatar-xs rounded-circle acitivity-avatar material-shadow"
                    width={40}
                    height={40}
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
                    <div className="avatar-title rounded-circle bg-danger-subtle text-danger material-shadow">
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
                    These customers can rest assured their order has been
                    placed.
                  </p>
                  <small className="mb-0 text-muted">16 Nov</small>
                </div>
              </div>
              <div className="acitivity-item py-3 d-flex">
                <div className="flex-shrink-0">
                  <Image
                    src={avatar7}
                    alt=""
                    className="avatar-xs rounded-circle acitivity-avatar material-shadow"
                    width={40}
                    height={40}
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
                    <div className="avatar-title rounded-circle bg-info-subtle text-info material-shadow">
                      <i className="ri-line-chart-line"></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="mb-1">Monthly sales report</h6>
                  <p className="text-muted mb-2">
                    <span className="text-danger">2 days left</span>{" "}
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
                    alt=""
                    className="avatar-xs rounded-circle acitivity-avatar material-shadow"
                    width={40}
                    height={40}
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
          </SimpleBar>
        </OffcanvasBody>
        <div className="offcanvas-foorter border-top p-3 text-center">
          <Link href="#" className="link-success">
            View All Activity{" "}
            <i className="ri-arrow-right-s-line align-middle ms-1"></i>
          </Link>
        </div>
      </Offcanvas>

      {/* Top offcanvas */}
      <Offcanvas
        isOpen={isTop}
        direction="top"
        toggle={toggleTopCanvas}
        id="offcanvasTop"
        style={{ minHeight: "46vh" }}
      >
        <OffcanvasHeader
          toggle={toggleTopCanvas}
          id="offcanvasTopLabel"
          className="border-bottom"
        >
          Gallery
        </OffcanvasHeader>
        <OffcanvasBody>
          <Row className="gallery-light">
            <Col xl={3} lg={4} sm={6}>
              <Card className="gallery-box light mb-0">
                <div className="gallery-container">
                  <Link href="#" title="">
                    <Image
                      className="gallery-img img-fluid mx-auto"
                      src={img12}
                      alt=""
                      width={300}
                      height={225}
                    />
                    <div className="gallery-overlay">
                      <h5 className="overlay-caption">
                        A mix of friends and strangers heading off to find an
                        adventure.
                      </h5>
                    </div>
                  </Link>
                </div>
                <div className="box-content">
                  <div className="d-flex align-items-center mt-1">
                    <div className="flex-grow-1 text-muted">
                      by{" "}
                      <Link href="#" className="text-body text-truncate">
                        Erica Kernan
                      </Link>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="d-flex gap-3">
                        <button
                          type="button"
                          className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0 material-shadow-none"
                        >
                          <i className="ri-thumb-up-fill text-muted align-bottom me-1"></i>{" "}
                          3.4K
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0 material-shadow-none"
                        >
                          <i className="ri-question-answer-fill text-muted align-bottom me-1"></i>{" "}
                          1.3K
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xl={3} lg={4} sm={6}>
              <Card className="gallery-box light mb-0">
                <div className="gallery-container">
                  <Link href="#" title="">
                    <Image
                      className="gallery-img img-fluid mx-auto"
                      src={img9}
                      alt=""
                      width={300}
                      height={225}
                    />
                    <div className="gallery-overlay">
                      <h5 className="overlay-caption">
                        Dramatic clouds at the Golden Gate Bridge
                      </h5>
                    </div>
                  </Link>
                </div>
                <div className="box-content">
                  <div className="d-flex align-items-center mt-1">
                    <div className="flex-grow-1 text-muted">
                      by{" "}
                      <Link href="#" className="text-body text-truncate">
                        Ron Mackie
                      </Link>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="d-flex gap-3">
                        <button
                          type="button"
                          className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0 material-shadow-none"
                        >
                          <i className="ri-thumb-up-fill text-muted align-bottom me-1"></i>{" "}
                          5.1K
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0 material-shadow-none"
                        >
                          <i className="ri-question-answer-fill text-muted align-bottom me-1"></i>{" "}
                          4.7K
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xl={3} lg={4} sm={6}>
              <Card className="gallery-box mb-0">
                <div className="gallery-container">
                  <Link href="#" title="">
                    <Image
                      className="gallery-img img-fluid mx-auto"
                      src={img11}
                      alt=""
                      width={300}
                      height={225}
                    />
                    <div className="gallery-overlay">
                      <h5 className="overlay-caption">
                        Cycling in the countryside
                      </h5>
                    </div>
                  </Link>
                </div>
                <div className="box-content">
                  <div className="d-flex align-items-center mt-1">
                    <div className="flex-grow-1 text-muted">
                      by{" "}
                      <Link href="#" className="text-body text-truncate">
                        Nancy Martino
                      </Link>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="d-flex gap-3">
                        <button
                          type="button"
                          className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0"
                        >
                          <i className="ri-thumb-up-fill text-muted align-bottom me-1"></i>{" "}
                          3.2K
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0"
                        >
                          <i className="ri-question-answer-fill text-muted align-bottom me-1"></i>{" "}
                          1.1K
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xl={3} lg={4} sm={6} className="d-md-none d-xl-block">
              <Card className="gallery-box mb-0">
                <div className="gallery-container">
                  <Link href="#" title="">
                    <Image
                      className="gallery-img img-fluid mx-auto"
                      src={img10}
                      alt=""
                      width={300}
                      height={225}
                    />
                    <div className="gallery-overlay">
                      <h5 className="overlay-caption">
                        Fun day at the Hill Station
                      </h5>
                    </div>
                  </Link>
                </div>
                <div className="box-content">
                  <div className="d-flex align-items-center mt-1">
                    <div className="flex-grow-1 text-muted">
                      by{" "}
                      <Link href="#" className="text-body text-truncate">
                        Henry Baird
                      </Link>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="d-flex gap-3">
                        <button
                          type="button"
                          className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0 material-shadow-none"
                        >
                          <i className="ri-thumb-up-fill text-muted align-bottom me-1"></i>{" "}
                          632
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0 material-shadow-none"
                        >
                          <i className="ri-question-answer-fill text-muted align-bottom me-1"></i>{" "}
                          95
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </OffcanvasBody>
      </Offcanvas>

      {/* Right offcanvas */}
      <Offcanvas
        isOpen={isRight}
        direction="end"
        toggle={toggleRightCanvas}
        id="offcanvasRight"
        className="border-bottom"
      >
        <OffcanvasHeader toggle={toggleRightCanvas} id="offcanvasRightLabel">
          Recent Activity
        </OffcanvasHeader>
        <OffcanvasBody className="p-0 overflow-hidden">
          <SimpleBar style={{ height: "100vh" }}>
            <div className="acitivity-timeline p-4">
              <div className="acitivity-item d-flex">
                <div className="flex-shrink-0">
                  <Image
                    src={avatar1}
                    alt=""
                    className="avatar-xs rounded-circle acitivity-avatar material-shadow"
                    width={40}
                    height={40}
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
                    <i className="ri-file-text-line align-middle ms-2"></i>{" "}
                    Create new project Building product
                  </p>
                  <div className="avatar-group mb-2">
                    <Link
                      href="#"
                      className="avatar-group-item material-shadow"
                      id="Christi"
                    >
                      <Image
                        src={avatar4}
                        alt=""
                        className="rounded-circle avatar-xs"
                        width={40}
                        height={40}
                      />
                    </Link>
                    <UncontrolledTooltip placement="top" target="Christi">
                      {" "}
                      Christi{" "}
                    </UncontrolledTooltip>
                    <Link
                      href="#"
                      className="avatar-group-item material-shadow"
                      id="Frank"
                    >
                      <Image
                        src={avatar3}
                        alt=""
                        className="rounded-circle avatar-xs"
                        width={40}
                        height={40}
                      />
                    </Link>
                    <UncontrolledTooltip placement="top" target="Frank">
                      {" "}
                      Frank Hook{" "}
                    </UncontrolledTooltip>
                    <Link
                      href="#"
                      className="avatar-group-item material-shadow"
                      id="Ruby"
                    >
                      <div className="avatar-xs">
                        <div className="avatar-title rounded-circle bg-light text-primary">
                          R
                        </div>
                      </div>
                    </Link>
                    <UncontrolledTooltip placement="top" target="Ruby">
                      {" "}
                      Ruby{" "}
                    </UncontrolledTooltip>
                    <Link
                      href="#"
                      className="avatar-group-item material-shadow"
                      id="more"
                    >
                      <div className="avatar-xs">
                        <div className="avatar-title rounded-circle">2+</div>
                      </div>
                    </Link>
                    <UncontrolledTooltip placement="top" target="more">
                      {" "}
                      more{" "}
                    </UncontrolledTooltip>
                  </div>
                  <small className="mb-0 text-muted">Yesterday</small>
                </div>
              </div>
              <div className="acitivity-item py-3 d-flex">
                <div className="flex-shrink-0">
                  <Image
                    src={avatar2}
                    alt=""
                    className="avatar-xs rounded-circle acitivity-avatar material-shadow"
                    width={40}
                    height={40}
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
                  <div className="row border border-dashed gx-2 p-2 mb-2">
                    <Col className="col-4">
                      <Image
                        src={img2}
                        alt=""
                        className="img-fluid rounded"
                        width={100}
                        height={75}
                      />
                    </Col>
                    <Col className="col-4">
                      <Image
                        src={img3}
                        alt=""
                        className="img-fluid rounded"
                        width={100}
                        height={75}
                      />
                    </Col>
                    <Col className="col-4">
                      <Image
                        src={img4}
                        alt=""
                        className="img-fluid rounded"
                        width={100}
                        height={75}
                      />
                    </Col>
                  </div>
                  <small className="mb-0 text-muted">25 Nov</small>
                </div>
              </div>
              <div className="acitivity-item py-3 d-flex">
                <div className="flex-shrink-0">
                  <Image
                    src={avatar6}
                    alt=""
                    className="avatar-xs rounded-circle acitivity-avatar material-shadow"
                    width={40}
                    height={40}
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
                    <div className="avatar-title rounded-circle bg-danger-subtle text-danger material-shadow">
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
                    These customers can rest assured their order has been
                    placed.
                  </p>
                  <small className="mb-0 text-muted">16 Nov</small>
                </div>
              </div>
              <div className="acitivity-item py-3 d-flex">
                <div className="flex-shrink-0">
                  <Image
                    src={avatar7}
                    alt=""
                    className="avatar-xs rounded-circle acitivity-avatar material-shadow"
                    width={40}
                    height={40}
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
                    <div className="avatar-title rounded-circle bg-info-subtle text-info material-shadow">
                      <i className="ri-line-chart-line"></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="mb-1">Monthly sales report</h6>
                  <p className="text-muted mb-2">
                    <span className="text-danger">2 days left</span>{" "}
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
                    alt=""
                    className="avatar-xs rounded-circle acitivity-avatar material-shadow"
                    width={40}
                    height={40}
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
          </SimpleBar>
        </OffcanvasBody>
        <div className="offcanvas-foorter border p-3 text-center">
          <Link href="#" className="link-success">
            View All Activity{" "}
            <i className="ri-arrow-right-s-line align-middle ms-1"></i>
          </Link>
        </div>
      </Offcanvas>

      {/* Bottom offcanvas */}
      <Offcanvas
        isOpen={isBottom}
        direction="bottom"
        toggle={toggleBottomCanvas}
        id="offcanvasBottom"
        style={{ minHeight: "46vh" }}
      >
        <OffcanvasHeader
          toggle={toggleBottomCanvas}
          id="offcanvasBottomLabel"
          className="border-bottom"
        >
          Gallery
        </OffcanvasHeader>
        <OffcanvasBody>
          <Row className="gallery-light">
            <Col xl={3} lg={4} sm={6}>
              <Card className="gallery-box light mb-0">
                <div className="gallery-container">
                  <Link href="#" title="">
                    <Image
                      className="gallery-img img-fluid mx-auto"
                      src={img12}
                      alt=""
                      width={300}
                      height={225}
                    />
                    <div className="gallery-overlay">
                      <h5 className="overlay-caption">
                        A mix of friends and strangers heading off to find an
                        adventure.
                      </h5>
                    </div>
                  </Link>
                </div>
                <div className="box-content">
                  <div className="d-flex align-items-center mt-1">
                    <div className="flex-grow-1 text-muted">
                      by{" "}
                      <Link href="#" className="text-body text-truncate">
                        Erica Kernan
                      </Link>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="d-flex gap-3">
                        <button
                          type="button"
                          className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0 material-shadow-none"
                        >
                          <i className="ri-thumb-up-fill text-muted align-bottom me-1"></i>{" "}
                          3.4K
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0 material-shadow-none"
                        >
                          <i className="ri-question-answer-fill text-muted align-bottom me-1"></i>{" "}
                          1.3K
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xl={3} lg={4} sm={6}>
              <Card className="gallery-box light mb-0">
                <div className="gallery-container">
                  <Link href="#" title="">
                    <Image
                      className="gallery-img img-fluid mx-auto"
                      src={img9}
                      alt=""
                      width={300}
                      height={225}
                    />
                    <div className="gallery-overlay">
                      <h5 className="overlay-caption">
                        Dramatic clouds at the Golden Gate Bridge
                      </h5>
                    </div>
                  </Link>
                </div>
                <div className="box-content">
                  <div className="d-flex align-items-center mt-1">
                    <div className="flex-grow-1 text-muted">
                      by{" "}
                      <Link href="#" className="text-body text-truncate">
                        Ron Mackie
                      </Link>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="d-flex gap-3">
                        <button
                          type="button"
                          className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0 material-shadow-none"
                        >
                          <i className="ri-thumb-up-fill text-muted align-bottom me-1"></i>{" "}
                          5.1K
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0 material-shadow-none"
                        >
                          <i className="ri-question-answer-fill text-muted align-bottom me-1"></i>{" "}
                          4.7K
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xl={3} lg={4} sm={6}>
              <Card className="gallery-box mb-0">
                <div className="gallery-container">
                  <Link href="#" title="">
                    <Image
                      className="gallery-img img-fluid mx-auto"
                      src={img11}
                      alt=""
                      width={300}
                      height={225}
                    />
                    <div className="gallery-overlay">
                      <h5 className="overlay-caption">
                        Cycling in the countryside
                      </h5>
                    </div>
                  </Link>
                </div>
                <div className="box-content">
                  <div className="d-flex align-items-center mt-1">
                    <div className="flex-grow-1 text-muted">
                      by{" "}
                      <Link href="#" className="text-body text-truncate">
                        Nancy Martino
                      </Link>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="d-flex gap-3">
                        <button
                          type="button"
                          className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0"
                        >
                          <i className="ri-thumb-up-fill text-muted align-bottom me-1"></i>{" "}
                          3.2K
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0"
                        >
                          <i className="ri-question-answer-fill text-muted align-bottom me-1"></i>{" "}
                          1.1K
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xl={3} lg={4} sm={6} className="d-md-none d-xl-block">
              <Card className="gallery-box mb-0">
                <div className="gallery-container">
                  <Link href="#" title="">
                    <Image
                      className="gallery-img img-fluid mx-auto"
                      src={img10}
                      alt=""
                      width={300}
                      height={225}
                    />
                    <div className="gallery-overlay">
                      <h5 className="overlay-caption">
                        Fun day at the Hill Station
                      </h5>
                    </div>
                  </Link>
                </div>
                <div className="box-content">
                  <div className="d-flex align-items-center mt-1">
                    <div className="flex-grow-1 text-muted">
                      by{" "}
                      <Link href="#" className="text-body text-truncate">
                        Henry Baird
                      </Link>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="d-flex gap-3">
                        <button
                          type="button"
                          className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0 material-shadow-none"
                        >
                          <i className="ri-thumb-up-fill text-muted align-bottom me-1"></i>{" "}
                          632
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0 material-shadow-none"
                        >
                          <i className="ri-question-answer-fill text-muted align-bottom me-1"></i>{" "}
                          95
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </OffcanvasBody>
      </Offcanvas>

      {/* Left offcanvas */}
      <Offcanvas
        isOpen={isLeft}
        direction="start"
        toggle={toggleLeftCanvas}
        id="offcanvasLeft"
      >
        <OffcanvasHeader
          toggle={toggleLeftCanvas}
          id="offcanvasLeftLabel"
          className="border-bottom"
        >
          Recent Activity
        </OffcanvasHeader>
        <OffcanvasBody>
          <SimpleBar style={{ height: "100vh" }}>
            <div className="acitivity-timeline p-4">
              <div className="acitivity-item d-flex">
                <div className="flex-shrink-0">
                  <Image
                    src={avatar1}
                    alt=""
                    className="avatar-xs rounded-circle acitivity-avatar material-shadow"
                    width={40}
                    height={40}
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
                  <div className="avatar-title bg-success-subtle text-success rounded-circle material-shadow">
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
                    <i className="ri-file-text-line align-middle ms-2"></i>{" "}
                    Create new project Building product
                  </p>
                  <div className="avatar-group mb-2">
                    <Link
                      href="#"
                      className="avatar-group-item material-shadow"
                      id="Christi"
                    >
                      <Image
                        src={avatar4}
                        alt=""
                        className="rounded-circle avatar-xs"
                        width={40}
                        height={40}
                      />
                    </Link>
                    <UncontrolledTooltip placement="top" target="Christi">
                      {" "}
                      Christi{" "}
                    </UncontrolledTooltip>
                    <Link
                      href="#"
                      className="avatar-group-item material-shadow"
                      id="Frank"
                    >
                      <Image
                        src={avatar3}
                        alt=""
                        className="rounded-circle avatar-xs"
                        width={40}
                        height={40}
                      />
                    </Link>
                    <UncontrolledTooltip placement="top" target="Frank">
                      {" "}
                      Frank Hook{" "}
                    </UncontrolledTooltip>
                    <Link
                      href="#"
                      className="avatar-group-item material-shadow"
                      id="Ruby"
                    >
                      <div className="avatar-xs">
                        <div className="avatar-title rounded-circle bg-light text-primary">
                          R
                        </div>
                      </div>
                    </Link>
                    <UncontrolledTooltip placement="top" target="Ruby">
                      {" "}
                      Ruby{" "}
                    </UncontrolledTooltip>
                    <Link
                      href="#"
                      className="avatar-group-item material-shadow"
                      id="more"
                    >
                      <div className="avatar-xs">
                        <div className="avatar-title rounded-circle">2+</div>
                      </div>
                    </Link>
                    <UncontrolledTooltip placement="top" target="more">
                      {" "}
                      more{" "}
                    </UncontrolledTooltip>
                  </div>
                  <small className="mb-0 text-muted">Yesterday</small>
                </div>
              </div>
              <div className="acitivity-item py-3 d-flex">
                <div className="flex-shrink-0">
                  <Image
                    src={avatar2}
                    alt=""
                    className="avatar-xs rounded-circle acitivity-avatar material-shadow"
                    width={40}
                    height={40}
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
                  <div className="row border border-dashed gx-2 p-2 mb-2">
                    <Col className="col-4">
                      <Image
                        src={img2}
                        alt=""
                        className="img-fluid rounded"
                        width={100}
                        height={75}
                      />
                    </Col>
                    <Col className="col-4">
                      <Image
                        src={img3}
                        alt=""
                        className="img-fluid rounded"
                        width={100}
                        height={75}
                      />
                    </Col>
                    <Col className="col-4">
                      <Image
                        src={img4}
                        alt=""
                        className="img-fluid rounded"
                        width={100}
                        height={75}
                      />
                    </Col>
                  </div>
                  <small className="mb-0 text-muted">25 Nov</small>
                </div>
              </div>
              <div className="acitivity-item py-3 d-flex">
                <div className="flex-shrink-0">
                  <Image
                    src={avatar6}
                    alt=""
                    className="avatar-xs rounded-circle acitivity-avatar material-shadow"
                    width={40}
                    height={40}
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
                    <div className="avatar-title rounded-circle bg-danger-subtle text-danger material-shadow">
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
                    These customers can rest assured their order has been
                    placed.
                  </p>
                  <small className="mb-0 text-muted">16 Nov</small>
                </div>
              </div>
              <div className="acitivity-item py-3 d-flex">
                <div className="flex-shrink-0">
                  <Image
                    src={avatar7}
                    alt=""
                    className="avatar-xs rounded-circle acitivity-avatar material-shadow"
                    width={40}
                    height={40}
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
                    <div className="avatar-title rounded-circle bg-info-subtle text-info material-shadow">
                      <i className="ri-line-chart-line"></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="mb-1">Monthly sales report</h6>
                  <p className="text-muted mb-2">
                    <span className="text-danger">2 days left</span>{" "}
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
                    alt=""
                    className="avatar-xs rounded-circle acitivity-avatar material-shadow"
                    width={40}
                    height={40}
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
          </SimpleBar>
        </OffcanvasBody>
        <div className="offcanvas-foorter border-top p-3 text-center">
          <Link href="#" className="link-success">
            View All Activity{" "}
            <i className="ri-arrow-right-s-line align-middle ms-1"></i>
          </Link>
        </div>
      </Offcanvas>

      {/* Enable body scrolling */}
      <Offcanvas
        isOpen={isEnableScroll}
        scrollable
        backdrop={false}
        toggle={toggleEnableScroll}
        id="offcanvasScrolling"
      >
        <OffcanvasHeader
          toggle={toggleEnableScroll}
          id="offcanvasScrollingLabel"
          className="border-bottom"
        >
          Customer Activity
        </OffcanvasHeader>
        <OffcanvasBody className="p-0 overflow-hidden">
          <div>
            <SimpleBar style={{ height: "100vh" }}>
              <div className="acitivity-timeline p-4">
                <div className="acitivity-item d-flex">
                  <div className="flex-shrink-0">
                    <Image
                      src={avatar1}
                      alt=""
                      className="avatar-xs rounded-circle acitivity-avatar material-shadow"
                      width={40}
                      height={40}
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
                    <div className="avatar-title bg-success-subtle text-success rounded-circle material-shadow">
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
                      <i className="ri-file-text-line align-middle ms-2"></i>{" "}
                      Create new project Building product
                    </p>
                    <div className="avatar-group mb-2">
                      <Link
                        href="#"
                        className="avatar-group-item material-shadow"
                        id="Christi"
                      >
                        <Image
                          src={avatar4}
                          alt=""
                          className="rounded-circle avatar-xs"
                          width={40}
                          height={40}
                        />
                      </Link>
                      <UncontrolledTooltip placement="top" target="Christi">
                        {" "}
                        Christi{" "}
                      </UncontrolledTooltip>
                      <Link
                        href="#"
                        className="avatar-group-item material-shadow"
                        id="Frank"
                      >
                        <Image
                          src={avatar3}
                          alt=""
                          className="rounded-circle avatar-xs"
                          width={40}
                          height={40}
                        />
                      </Link>
                      <UncontrolledTooltip placement="top" target="Frank">
                        {" "}
                        Frank Hook{" "}
                      </UncontrolledTooltip>
                      <Link
                        href="#"
                        className="avatar-group-item material-shadow"
                        id="Ruby"
                      >
                        <div className="avatar-xs">
                          <div className="avatar-title rounded-circle bg-light text-primary">
                            R
                          </div>
                        </div>
                      </Link>
                      <UncontrolledTooltip placement="top" target="Ruby">
                        {" "}
                        Ruby{" "}
                      </UncontrolledTooltip>
                      <Link
                        href="#"
                        className="avatar-group-item material-shadow"
                        id="more"
                      >
                        <div className="avatar-xs">
                          <div className="avatar-title rounded-circle">2+</div>
                        </div>
                      </Link>
                      <UncontrolledTooltip placement="top" target="more">
                        {" "}
                        more{" "}
                      </UncontrolledTooltip>
                    </div>
                    <small className="mb-0 text-muted">Yesterday</small>
                  </div>
                </div>
                <div className="acitivity-item py-3 d-flex">
                  <div className="flex-shrink-0">
                    <Image
                      src={avatar2}
                      alt=""
                      className="avatar-xs rounded-circle acitivity-avatar material-shadow"
                      width={40}
                      height={40}
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
                    <div className="row border border-dashed gx-2 p-2 mb-2">
                      <Col className="col-4">
                        <Image
                          src={img2}
                          alt=""
                          className="img-fluid rounded"
                          width={100}
                          height={75}
                        />
                      </Col>
                      <Col className="col-4">
                        <Image
                          src={img3}
                          alt=""
                          className="img-fluid rounded"
                          width={100}
                          height={75}
                        />
                      </Col>
                      <Col className="col-4">
                        <Image
                          src={img4}
                          alt=""
                          className="img-fluid rounded"
                          width={100}
                          height={75}
                        />
                      </Col>
                    </div>
                    <small className="mb-0 text-muted">25 Nov</small>
                  </div>
                </div>
                <div className="acitivity-item py-3 d-flex">
                  <div className="flex-shrink-0">
                    <Image
                      src={avatar6}
                      alt=""
                      className="avatar-xs rounded-circle acitivity-avatar material-shadow"
                      width={40}
                      height={40}
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
                      <div className="avatar-title rounded-circle bg-danger-subtle text-danger material-shadow">
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
                      These customers can rest assured their order has been
                      placed.
                    </p>
                    <small className="mb-0 text-muted">16 Nov</small>
                  </div>
                </div>
                <div className="acitivity-item py-3 d-flex">
                  <div className="flex-shrink-0">
                    <Image
                      src={avatar7}
                      alt=""
                      className="avatar-xs rounded-circle acitivity-avatar material-shadow"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="mb-1">Lewis Pratt</h6>
                    <p className="text-muted mb-2">
                      They all have something to say beyond the words on the
                      page. They can come across as casual or neutral, exotic or
                      graphic.{" "}
                    </p>
                    <small className="mb-0 text-muted">22 Oct</small>
                  </div>
                </div>
                <div className="acitivity-item py-3 d-flex">
                  <div className="flex-shrink-0">
                    <div className="avatar-xs acitivity-avatar">
                      <div className="avatar-title rounded-circle bg-info-subtle text-info material-shadow">
                        <i className="ri-line-chart-line"></i>
                      </div>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="mb-1">Monthly sales report</h6>
                    <p className="text-muted mb-2">
                      <span className="text-danger">2 days left</span>{" "}
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
                      alt=""
                      className="avatar-xs rounded-circle acitivity-avatar material-shadow"
                      width={40}
                      height={40}
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
            </SimpleBar>
          </div>
        </OffcanvasBody>
        <div className="offcanvas-foorter border-top p-3 text-center">
          <Link href="#" className="link-success">
            View All Activity{" "}
            <i className="ri-arrow-right-s-line align-middle ms-1"></i>
          </Link>
        </div>
      </Offcanvas>

      {/* Enable backdrop (default) */}
      <Offcanvas
        isOpen={isBackdrop}
        toggle={toggleBackdrop}
        id="offcanvasWithBackdrop"
        className="border-bottom"
      >
        <OffcanvasHeader
          toggle={toggleBackdrop}
          id="offcanvasWithBackdropLabel"
          className="border-bottom"
        >
          Customer Activity
        </OffcanvasHeader>
        <OffcanvasBody className="p-0 overflow-hidden">
          <div>
            <SimpleBar style={{ height: "100vh" }}>
              <div className="acitivity-timeline p-4">
                <div className="acitivity-item d-flex">
                  <div className="flex-shrink-0">
                    <Image
                      src={avatar1}
                      alt=""
                      className="avatar-xs rounded-circle acitivity-avatar material-shadow"
                      width={40}
                      height={40}
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
                      <i className="ri-file-text-line align-middle ms-2"></i>{" "}
                      Create new project Building product
                    </p>
                    <div className="avatar-group mb-2">
                      <Link
                        href="#"
                        className="avatar-group-item material-shadow"
                        title=""
                        id="Christi"
                      >
                        <Image
                          src={avatar4}
                          alt=""
                          className="rounded-circle avatar-xs"
                          width={40}
                          height={40}
                        />
                      </Link>
                      <UncontrolledTooltip placement="top" target="Christi">
                        {" "}
                        Christi{" "}
                      </UncontrolledTooltip>
                      <Link
                        href="#"
                        className="avatar-group-item material-shadow"
                        title=""
                        id="Frank"
                      >
                        <Image
                          src={avatar3}
                          alt=""
                          className="rounded-circle avatar-xs"
                          width={40}
                          height={40}
                        />
                      </Link>
                      <UncontrolledTooltip placement="top" target="Frank">
                        {" "}
                        Frank Hook{" "}
                      </UncontrolledTooltip>
                      <Link
                        href="#"
                        className="avatar-group-item material-shadow"
                        title=""
                        id="Ruby"
                      >
                        <div className="avatar-xs">
                          <div className="avatar-title rounded-circle bg-light text-primary">
                            R
                          </div>
                        </div>
                      </Link>
                      <UncontrolledTooltip placement="top" target="Ruby">
                        {" "}
                        Ruby{" "}
                      </UncontrolledTooltip>
                      <Link
                        href="#"
                        className="avatar-group-item material-shadow"
                        title=""
                        id="more"
                      >
                        <div className="avatar-xs">
                          <div className="avatar-title rounded-circle">2+</div>
                        </div>
                      </Link>
                      <UncontrolledTooltip placement="top" target="more">
                        {" "}
                        more{" "}
                      </UncontrolledTooltip>
                    </div>
                    <small className="mb-0 text-muted">Yesterday</small>
                  </div>
                </div>
                <div className="acitivity-item py-3 d-flex">
                  <div className="flex-shrink-0">
                    <Image
                      src={avatar2}
                      alt=""
                      className="avatar-xs rounded-circle acitivity-avatar material-shadow"
                      width={40}
                      height={40}
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
                    <div className="row border border-dashed gx-2 p-2 mb-2">
                      <Col className="col-4">
                        <Image
                          src={img2}
                          alt=""
                          className="img-fluid rounded"
                          width={100}
                          height={75}
                        />
                      </Col>
                      <Col className="col-4">
                        <Image
                          src={img3}
                          alt=""
                          className="img-fluid rounded"
                          width={100}
                          height={75}
                        />
                      </Col>
                      <Col className="col-4">
                        <Image
                          src={img4}
                          alt=""
                          className="img-fluid rounded"
                          width={100}
                          height={75}
                        />
                      </Col>
                    </div>
                    <small className="mb-0 text-muted">25 Nov</small>
                  </div>
                </div>
                <div className="acitivity-item py-3 d-flex">
                  <div className="flex-shrink-0">
                    <Image
                      src={avatar6}
                      alt=""
                      className="avatar-xs rounded-circle acitivity-avatar material-shadow"
                      width={40}
                      height={40}
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
                      <div className="avatar-title rounded-circle bg-danger-subtle text-danger material-shadow">
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
                      These customers can rest assured their order has been
                      placed.
                    </p>
                    <small className="mb-0 text-muted">16 Nov</small>
                  </div>
                </div>
                <div className="acitivity-item py-3 d-flex">
                  <div className="flex-shrink-0">
                    <Image
                      src={avatar7}
                      alt=""
                      className="avatar-xs rounded-circle acitivity-avatar material-shadow"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="mb-1">Lewis Pratt</h6>
                    <p className="text-muted mb-2">
                      They all have something to say beyond the words on the
                      page. They can come across as casual or neutral, exotic or
                      graphic.{" "}
                    </p>
                    <small className="mb-0 text-muted">22 Oct</small>
                  </div>
                </div>
                <div className="acitivity-item py-3 d-flex">
                  <div className="flex-shrink-0">
                    <div className="avatar-xs acitivity-avatar">
                      <div className="avatar-title rounded-circle bg-info-subtle text-info material-shadow">
                        <i className="ri-line-chart-line"></i>
                      </div>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="mb-1">Monthly sales report</h6>
                    <p className="text-muted mb-2">
                      <span className="text-danger">2 days left</span>{" "}
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
                      alt=""
                      className="avatar-xs rounded-circle acitivity-avatar material-shadow"
                      width={40}
                      height={40}
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
            </SimpleBar>
          </div>
        </OffcanvasBody>
        <div className="offcanvas-foorter border-top p-3 text-center">
          <Link href="#" className="link-success">
            View All Activity{" "}
            <i className="ri-arrow-right-s-line align-middle ms-1"></i>
          </Link>
        </div>
      </Offcanvas>

      {/* Enable both scrolling & backdrop */}
      <Offcanvas
        isOpen={isScrollBackDrop}
        scrollable
        toggle={toggleScrollBackDrop}
        id="offcanvasWithBothOptions"
      >
        <OffcanvasHeader
          toggle={toggleScrollBackDrop}
          id="offcanvasWithBothOptionsLabel"
          className="border-bottom"
        >
          Customer Activity
        </OffcanvasHeader>
        <OffcanvasBody className="p-0 overflow-hidden">
          <SimpleBar style={{ height: "100vh" }}>
            <div className="acitivity-timeline p-4">
              <div className="acitivity-item d-flex">
                <div className="flex-shrink-0">
                  <Image
                    src={avatar1}
                    width={40}
                    height={40}
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
                    <i className="ri-file-text-line align-middle ms-2"></i>{" "}
                    Create new project Buildng product
                  </p>
                  <div className="avatar-group mb-2">
                    <Link href="#" className="avatar-group-item" id="Christi">
                      <Image
                        src={avatar4}
                        alt=""
                        width={40}
                        height={40}
                        className="rounded-circle avatar-xs"
                      />
                    </Link>
                    <UncontrolledTooltip placement="top" target="Christi">
                      {" "}
                      Christi{" "}
                    </UncontrolledTooltip>
                    <Link href="#" className="avatar-group-item" id="Frank">
                      <Image
                        src={avatar3}
                        alt=""
                        className="rounded-circle avatar-xs"
                      />
                    </Link>
                    <UncontrolledTooltip placement="top" target="Frank">
                      {" "}
                      Frank Hook{" "}
                    </UncontrolledTooltip>

                    <Link href="#" className="avatar-group-item" id="Ruby">
                      <div className="avatar-xs">
                        <div className="avatar-title rounded-circle bg-light text-primary">
                          R
                        </div>
                      </div>
                    </Link>
                    <UncontrolledTooltip placement="top" target="Ruby">
                      {" "}
                      Ruby{" "}
                    </UncontrolledTooltip>

                    <Link href="#" className="avatar-group-item" id="more">
                      <div className="avatar-xs">
                        <div className="avatar-title rounded-circle">2+</div>
                      </div>
                    </Link>
                    <UncontrolledTooltip placement="top" target="more">
                      {" "}
                      more{" "}
                    </UncontrolledTooltip>
                  </div>
                  <small className="mb-0 text-muted">Yesterday</small>
                </div>
              </div>
              <div className="acitivity-item py-3 d-flex">
                <div className="flex-shrink-0">
                  <Image
                    src={avatar2}
                    alt=""
                    className="avatar-xs rounded-circle acitivity-avatar material-shadow"
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
                  <div className="row border border-dashed gx-2 p-2 mb-2">
                    <Col className="col-4">
                      <Image
                        src={img2}
                        alt=""
                        className="img-fluid rounded"
                        width={100}
                        height={75}
                      />
                    </Col>
                    <Col className="col-4">
                      <Image
                        src={img3}
                        alt=""
                        className="img-fluid rounded"
                        width={100}
                        height={75}
                      />
                    </Col>
                    <Col className="col-4">
                      <Image
                        src={img4}
                        alt=""
                        width={100}
                        height={75}
                        className="img-fluid rounded"
                      />
                    </Col>
                  </div>
                  <small className="mb-0 text-muted">25 Nov</small>
                </div>
              </div>
              <div className="acitivity-item py-3 d-flex">
                <div className="flex-shrink-0">
                  <Image
                    src={avatar6}
                    alt=""
                    className="avatar-xs rounded-circle acitivity-avatar material-shadow"
                    width={40}
                    height={40}
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
                    <div className="avatar-title rounded-circle bg-danger-subtle text-danger material-shadow">
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
                    These customers can rest assured their order has been
                    placed.
                  </p>
                  <small className="mb-0 text-muted">16 Nov</small>
                </div>
              </div>
              <div className="acitivity-item py-3 d-flex">
                <div className="flex-shrink-0">
                  <Image
                    src={avatar7}
                    alt=""
                    className="avatar-xs rounded-circle acitivity-avatar material-shadow"
                    width={40}
                    height={40}
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
                    <span className="text-danger">2 days left</span>{" "}
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
                    alt=""
                    className="avatar-xs rounded-circle acitivity-avatar material-shadow"
                    width={40}
                    height={40}
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
          </SimpleBar>
        </OffcanvasBody>
        <div className="offcanvas-foorter border-top p-3 text-center">
          <Link href="#" className="link-success">
            View All Acitivity{" "}
            <i className="ri-arrow-right-s-line align-middle ms-1"></i>
          </Link>
        </div>
      </Offcanvas>
    </React.Fragment>
  );
};

export default UiOffcanvas;
