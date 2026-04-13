"use client";
import React from "react";
import { Alert, Card, CardBody, Col, Row } from "reactstrap";
import Link from "next/link";

//Import Icons
import FeatherIcon from "feather-icons-react";

import { otherWidgets2 } from "@common/data/index";

// Import Images
const illustarator1 = "/images/user-illustarator-1.png";
const illustarator2 = "/images/user-illustarator-2.png";
import Image from "next/image";

// Define interfaces
interface SubItem {
  id: number;
  icon: string;
  iconClass: string;
  label: string;
}

interface ProgressBar {
  id: number;
  bgColor?: string;
  width: string;
}

interface OtherWidget {
  id: number;
  title: string;
  subTitle: string;
  subItem: SubItem[];
  progressBar: ProgressBar[];
}

const OtherWidgets = () => {
  return (
    <React.Fragment>
      <Row>
        <Col className="col-12">
          <h5 className="text-decoration-underline mb-3 mt-2 pb-3">
            Other Widgets
          </h5>
        </Col>
      </Row>

      <Row>
        <Col xl={4}>
          <Card>
            <CardBody className="p-0">
              <Alert
                color="warning"
                className="border-0 rounded-top rounded-0 m-0 d-flex align-items-center"
              >
                <FeatherIcon
                  icon="alert-triangle"
                  className="text-warning me-2 icon-sm"
                />
                <div className="flex-grow-1 text-truncate">
                  Your free trial expired in <b>17</b> days.
                </div>
                <div className="flex-shrink-0">
                  <Link
                    href="/pages-pricing"
                    className="text-reset text-decoration-underline"
                  >
                    <b>Upgrade</b>
                  </Link>
                </div>
              </Alert>

              <Row className="align-items-end">
                <Col sm={8}>
                  <div className="p-3">
                    <p className="fs-16 lh-base">
                      Upgrade your plan from a{" "}
                      <span className="fw-semibold">Free trial</span>, to
                      &apos;Premium Plan&apos;{" "}
                      <i className="mdi mdi-arrow-right"></i>
                    </p>
                    <div className="mt-3">
                      <Link href="/pages-pricing" className="btn btn-success">
                        Upgrade Account!
                      </Link>
                    </div>
                  </div>
                </Col>
                <Col sm={4}>
                  <div className="px-3">
                    <Image
                      width={800}
                      src={illustarator2}
                      height={600}
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col xl={4}>
          <Card className="bg-primary">
            <CardBody className="p-0">
              <Alert
                color="danger"
                className="rounded-top alert-solid alert-label-icon border-0 rounded-0 m-0 d-flex align-items-center"
              >
                <i className="ri-error-warning-line label-icon"></i>
                <div className="flex-grow-1 text-truncate">
                  Your free trial expired in <b>17</b> days.
                </div>
                <div className="flex-shrink-0">
                  <Link
                    href="/pages-pricing"
                    className="text-reset text-decoration-underline"
                  >
                    <b>Upgrade</b>
                  </Link>
                </div>
              </Alert>

              <Row className="align-items-end">
                <Col sm={8}>
                  <div className="p-3">
                    <p className="fs-16 lh-base text-white">
                      Upgrade your plan from a{" "}
                      <span className="fw-semibold">Free trial</span>, to
                      &apos;Premium Plan&apos;{" "}
                      <i className="mdi mdi-arrow-right"></i>
                    </p>
                    <div className="mt-3">
                      <Link href="/pages-pricing" className="btn btn-info">
                        Upgrade Account!
                      </Link>
                    </div>
                  </div>
                </Col>
                <Col sm={4}>
                  <div className="px-3">
                    <Image
                      height={600}
                      width={800}
                      src={illustarator1}
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>

        <Col xl={4}>
          <Card>
            <CardBody className="p-0">
              <Alert
                color="warning"
                className="border-0 rounded-top rounded-0 m-0 d-flex align-items-center"
              >
                <div className="flex-grow-1 text-truncate">
                  We will choose a gift for you in <b>5</b> days.
                </div>
                <div className="flex-shrink-0">
                  <Link
                    href="/pages-pricing"
                    className="text-reset text-decoration-underline"
                  >
                    <b>Get Free Gift</b>
                  </Link>
                </div>
              </Alert>
              <div className="d-flex p-3">
                <div className="flex-shrink-0">
                  <div className="avatar-md me-3">
                    <span className="avatar-title bg-danger-subtle rounded-circle fs-1">
                      <i className="ri-gift-2-line text-danger"></i>
                    </span>
                  </div>
                </div>
                <div>
                  <p className="fs-16 lh-base">
                    Personalized <span className="fw-semibold">Gift Boxes</span>
                    , with attitude, Let&apos;s collect your Xmas box{" "}
                    <i className="mdi mdi-arrow-right"></i>
                  </p>
                  <div className="mt-3">
                    <Link href="/pages-pricing" className="btn btn-secondary">
                      Get a Free Gift
                    </Link>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        {(otherWidgets2 || []).map((item: OtherWidget, index: number) => (
          <Col lg={4} key={index}>
            <Card>
              <CardBody>
                <h5 className="fs-15 fw-semibold">{item.title}</h5>
                <p className="text-muted">{item.subTitle}</p>
                <div className="d-flex flex-wrap justify-content-evenly">
                  {item.subItem.map((subItem: SubItem, subIndex: number) => (
                    <p className="text-muted mb-0" key={subIndex}>
                      <i
                        className={`fs-18 align-middle me-2 ${subItem.icon} text-${subItem.iconClass}`}
                      ></i>
                      {subItem.label}
                    </p>
                  ))}
                </div>
              </CardBody>
              <div
                className="progress animated-progess rounded-bottom rounded-0"
                style={{ height: "6px" }}
              >
                {item.progressBar.map(
                  (progress: ProgressBar, progressIndex: number) => (
                    <div
                      className={`progress-bar rounded-0 ${
                        progress.bgColor || ""
                      }`}
                      role="progressbar"
                      style={{ width: progress.width }}
                      key={progressIndex}
                    ></div>
                  )
                )}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </React.Fragment>
  );
};

export default OtherWidgets;
