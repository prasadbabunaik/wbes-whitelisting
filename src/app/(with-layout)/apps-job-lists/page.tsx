"use client";
import React from "react";
import Link from "next/link";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { jobList } from "@common/data/appsJobs";
import BreadCrumb from "@common/BreadCrumb";
import dynamic from "next/dynamic";
const AppSummaryChart = dynamic(() => import("./AppSummary"), { ssr: false });
import Image from "next/image";

const img10 = "/images/small/img-10.jpg";
const img7 = "/images/companies/img-7.png";

const JobList = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <BreadCrumb title="Job Lists" pageTitle="Jobs" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody className="bg-light-subtle">
                  <div className="d-flex align-items-center">
                    <h6 className="card-title mb-0 flex-grow-1 fw-bold">
                      Search Jobs
                    </h6>
                    <div className="flex-shrink-0">
                      <button
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#CreateJobModal"
                      >
                        <i className="ri-add-line align-bottom me-1"></i>
                        Create New Job
                      </button>
                    </div>
                  </div>

                  <Row className="mt-3 gy-3">
                    <Col xxl={10} md={6}>
                      <div className="search-box">
                        <input
                          type="text"
                          className="form-control search bg-light border-light"
                          id="searchJob"
                          autoComplete="off"
                          placeholder="Search for jobs or companies..."
                        />
                        <i className="ri-search-line search-icon"></i>
                      </div>
                    </Col>
                    <Col xxl={2} ms={6}>
                      <div className="input-light">
                        <select
                          className="form-control"
                          data-choices
                          data-choices-search-false
                          name="choices-single-default"
                          id="idStatus"
                          defaultValue="Newest"
                        >
                          <option value="All">All Selected</option>
                          <option value="Newest">Newest</option>
                          <option value="Popluar">Popular</option>
                          <option value="Oldest">Oldest</option>
                        </select>
                      </div>
                    </Col>
                    <Col className="col-xl-12 d-none" id="found-job-alert">
                      <div
                        className="alert alert-success mb-0 text-center"
                        role="alert"
                      >
                        <strong id="total-result">253</strong> jobs found
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xxl={9}>
              <div id="job-list">
                {jobList.map((item: any, key: number) => (
                  <Card className="joblist-card" key={key}>
                    <CardBody>
                      <div className="d-flex mb-4">
                        <div className="avatar-sm">
                          <div className="avatar-title bg-light rounded">
                            <Image
                              src={item.companyLogo}
                              alt="Company Logo"
                              className="avatar-xxs companyLogo-img"
                              width={24}
                              height={24}
                            />
                          </div>
                        </div>
                        <div className="ms-3 flex-grow-1">
                          {/* Hidden cover image (previously img) */}
                          <div style={{ display: "none" }}>
                            <Image
                              src={item.coverImg}
                              alt="Cover"
                              width={1}
                              height={1}
                            />
                          </div>
                          <Link href="#">
                            <h5 className="job-title">{item.jobTitle}</h5>
                          </Link>
                          <p className="company-name text-muted mb-0">
                            {item.companyName}
                          </p>
                        </div>
                        <div>
                          <button
                            type="button"
                            className="btn btn-ghost-primary btn-icon custom-toggle"
                            data-bs-toggle="button"
                          >
                            <span className="icon-on">
                              <i className="ri-bookmark-line"></i>
                            </span>
                            <span className="icon-off">
                              <i className="ri-bookmark-fill"></i>
                            </span>
                          </button>
                        </div>
                      </div>

                      <p className="text-muted job-description">
                        {item.description}
                      </p>

                      <div>
                        {(item.tags || []).map((tag: string, idx: number) => (
                          <span
                            key={idx}
                            className="badge bg-primary-subtle text-primary me-1"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardBody>

                    <CardHeader className="card-footer border-top-dashed">
                      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                        <div>
                          <i className="ri-briefcase-2-line align-bottom me-1"></i>{" "}
                          <span className="job-type">{item.type}</span>
                        </div>
                        <div className="d-none">
                          <span className="job-experience">
                            {item.experience}
                          </span>
                        </div>
                        <div>
                          <i className="ri-map-pin-2-line align-bottom me-1"></i>{" "}
                          <span className="job-location">{item.location}</span>
                        </div>
                        <div>
                          <i className="ri-user-3-line align-bottom me-1"></i>{" "}
                          {item.applied}
                        </div>
                        <div>
                          <i className="ri-time-line align-bottom me-1"></i>{" "}
                          <span className="job-postdate">{item.postDate}</span>
                        </div>
                        <div>
                          <Link
                            href="#"
                            className="btn btn-primary viewjob-list"
                          >
                            View More{" "}
                            <i className="ri-arrow-right-line align-bottom ms-1"></i>
                          </Link>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              <Row
                className="g-0 justify-content-end mb-4"
                id="pagination-element"
              >
                <Col sm={6}>
                  <div className="pagination-block pagination pagination-separated justify-content-center justify-content-sm-end mb-sm-0">
                    <div className="page-item">
                      <Link href="" className="page-link" id="page-prev">
                        Previous
                      </Link>
                    </div>
                    <span id="page-num" className="pagination"></span>
                    <div className="page-item">
                      <Link href="" className="page-link" id="page-next">
                        Next
                      </Link>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>

            <Col xxl={3}>
              <Card
                className="job-list-view-card overflow-hidden"
                id="job-overview"
              >
                <Image
                  src={img10}
                  alt="Cover"
                  id="cover-img"
                  className="img-fluid background object-fit-cover"
                  width={800}
                  height={200}
                />
                <CardBody className="card-body">
                  <div className="avatar-md mt-n5">
                    <div className="avatar-title bg-light rounded-circle">
                      <Image
                        src={img7}
                        alt="Company Icon"
                        className="avatar-xs view-companylogo"
                        width={24}
                        height={24}
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <h5 className="view-title">Product Designer</h5>
                    <div className="hstack gap-3 mb-3">
                      <span className="text-muted">
                        <i className="ri-building-line me-1 align-bottom"></i>{" "}
                        <span className="view-companyname">Themesbrand</span>
                      </span>
                      <span className="text-muted">
                        <i className="ri-map-pin-2-line me-1 align-bottom"></i>{" "}
                        <span className="view-location">United Kingdom</span>
                      </span>
                    </div>
                    <p className="text-muted view-desc">
                      A UI/UX designer's job is to create user-friendly
                      interfaces that enable users to understand how to use
                      complex technical products. If you're passionate about the
                      latest technology trends and devices, you'll find great
                      fulfillment in being involved in the design process for
                      the next hot gadget.
                    </p>
                    <div className="py-3 border border-dashed border-start-0 border-end-0 mt-4">
                      <Row>
                        <Col lg={4} sm={6}>
                          <div>
                            <p className="mb-2 text-uppercase fw-semibold fs-12 text-muted">
                              Job Type
                            </p>
                            <h5 className="fs-14 mb-0 view-type">Full Time</h5>
                          </div>
                        </Col>
                        <Col lg={4} sm={6}>
                          <div>
                            <p className="mb-2 text-uppercase fw-semibold fs-12 text-muted">
                              Post Date
                            </p>
                            <h5 className="fs-14 mb-0 view-postdate">
                              15 Sep, 2022
                            </h5>
                          </div>
                        </Col>
                        <Col lg={4} sm={6}>
                          <div>
                            <p className="mb-2 text-uppercase fw-semibold fs-12 text-muted">
                              Experience
                            </p>
                            <h5 className="fs-14 mb-0 view-experience">
                              0 - 5 Year
                            </h5>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h5 className="mb-3">Application Summary</h5>
                    <AppSummaryChart dataColors='["--vz-info", "--vz-primary", "--vz-danger", "--vz-danger"]' />
                  </div>

                  <div className="mt-4">
                    <button type="button" className="btn btn-success w-100">
                      Apply Now
                    </button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
};

export default JobList;
