"use client";
import React from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import PreviewCardHeader from "@common/PreviewCardHeader";
import Image from "next/image";
import Link from "next/link";

// Import Content
import UiContent from "@common/UiContent";
//import Components
import BreadCrumb from "@common/BreadCrumb";

// Import Images
// Users
const avatar2 = "/images/users/avatar-2.jpg";
const avatar3 = "/images/users/avatar-3.jpg";
const avatar4 = "/images/users/avatar-4.jpg";
const avatar5 = "/images/users/avatar-5.jpg";
const avatar8 = "/images/users/avatar-8.jpg";
const avatar10 = "/images/users/avatar-10.jpg";

// Small Images
const img2 = "/images/small/img-2.jpg";
const img3 = "/images/small/img-3.jpg";
const img4 = "/images/small/img-4.jpg";
const img5 = "/images/small/img-5.jpg";

import {
  ImgRoundedCircleExample,
  ImgThumbnailsExample,
  ImgSizesExample,
  AvatarExample,
  AvatarGroupExample,
  FiguresExample,
  ResponsiveExample,
} from "./UiImagesCode";

const UiImages = () => {
  document.title =
    "Images | Velzon - Next.js TypeScript Admin & Dashboard Template";
  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Images" pageTitle="Base UI" />
          <Row>
            <Col xxl={6}>
              <Card>
                <PreviewCardHeader title="Image Rounded & Circle" />
                <CardBody>
                  <p className="text-muted">
                    Use
                    <code> rounded</code> class and <code>rounded-circle</code>{" "}
                    class to show an image with a round border and rounded shape
                    respectively.
                  </p>

                  <div className="live-preview">
                    <Row className="align-items-center">
                      <Col className="col-6">
                        <Image
                          className="rounded material-shadow"
                          alt="200x200"
                          width={200}
                          height={200}
                          src={img4}
                        />
                      </Col>
                      <Col className="col-6">
                        <div className="mt-4 mt-md-0">
                          <Image
                            className="rounded-circle avatar-xl material-shadow"
                            alt="200x200"
                            src={avatar4}
                            width={100}
                            height={100}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <div className="d-none code-view">
                    <pre className="language-markup">
                      <code>
                        <ImgRoundedCircleExample />
                      </code>
                    </pre>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xxl={6}>
              <Card>
                <PreviewCardHeader title="Image Thumbnails" />
                <CardBody>
                  <p className="text-muted">
                    Use <code>img-thumbnail</code> class to give an image
                    rounded 1px border appearance.
                  </p>

                  <div className="live-preview">
                    <Row>
                      <Col className="col-6">
                        <Image
                          className="img-thumbnail"
                          alt="200x200"
                          width={200}
                          height={150}
                          src={img3}
                        />
                      </Col>
                      <Col className="col-6">
                        <div className="mt-4 mt-md-0">
                          <Image
                            className="img-thumbnail rounded-circle avatar-xl"
                            alt="200x200"
                            src={avatar3}
                            width={100}
                            height={100}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="d-none code-view">
                    <pre className="language-markup">
                      <code>
                        <ImgThumbnailsExample />
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
                <PreviewCardHeader title="Image Sizes" />
                <CardBody>
                  <p className="text-muted mb-4">
                    Use <code>avatar-xxs</code>, <code>avatar-xs</code>,{" "}
                    <code>avatar-sm</code>, <code>avatar-md</code>,{" "}
                    <code>avatar-lg</code>, <code>avatar-xl</code> class for
                    different image sizes.
                  </p>

                  <div className="live-preview">
                    <Row>
                      <Col md={12}>
                        <Row className="g-3">
                          <Col xxl={2} md={4} className="col-6">
                            <div>
                              <Image
                                src={avatar2}
                                alt=""
                                className="rounded avatar-xxs material-shadow"
                                width={16}
                                height={16}
                              />
                              <p className="mt-2 mb-lg-0">
                                <code>avatar-xxs</code>
                              </p>
                            </div>
                          </Col>
                          <Col xxl={2} md={4} className="col-6">
                            <div>
                              <Image
                                src={avatar10}
                                alt=""
                                className="rounded avatar-xs material-shadow"
                                width={16}
                                height={16}
                              />
                              <p className="mt-2 mb-lg-0">
                                <code>avatar-xs</code>
                              </p>
                            </div>
                          </Col>
                          <Col xxl={2} md={4} className="col-6">
                            <div>
                              <Image
                                src={avatar3}
                                alt=""
                                className="rounded avatar-sm material-shadow"
                                width={16}
                                height={16}
                              />
                              <p className="mt-2 mb-lg-0">
                                <code>avatar-sm</code>
                              </p>
                            </div>
                          </Col>
                          <Col xxl={2} md={4} className="col-6">
                            <div>
                              <Image
                                src={avatar4}
                                alt=""
                                className="rounded avatar-md material-shadow"
                                width={16}
                                height={16}
                              />
                              <p className="mt-2  mb-lg-0">
                                <code>avatar-md</code>
                              </p>
                            </div>
                          </Col>
                          <Col xxl={2} md={4} className="col-6">
                            <div>
                              <Image
                                src={avatar5}
                                alt=""
                                className="rounded avatar-lg material-shadow"
                                width={16}
                                height={16}
                              />
                              <p className="mt-2 mb-lg-0">
                                <code>avatar-lg</code>
                              </p>
                            </div>
                          </Col>
                          <Col xxl={2} md={4} className="col-6">
                            <div>
                              <Image
                                src={avatar8}
                                alt=""
                                className="rounded avatar-xl material-shadow"
                                width={16}
                                height={16}
                              />
                              <p className="mt-2 mb-lg-0">
                                <code>avatar-xl</code>
                              </p>
                            </div>
                          </Col>
                        </Row>
                      </Col>

                      <Col md={12}>
                        <Row className="g-3 mt-5">
                          <Col xxl={2} md={4} className="col-6">
                            <div>
                              <Image
                                src={avatar2}
                                alt=""
                                className="rounded-circle avatar-xxs material-shadow"
                                width={16}
                                height={16}
                              />
                              <p className="mt-2 mb-lg-0">
                                <code>avatar-xxs</code>
                              </p>
                            </div>
                          </Col>
                          <Col xxl={2} md={4} className="col-6">
                            <div>
                              <Image
                                src={avatar10}
                                alt=""
                                className="rounded-circle avatar-xs material-shadow"
                                width={16}
                                height={16}
                              />
                              <p className="mt-2 mb-lg-0">
                                <code>avatar-xs</code>
                              </p>
                            </div>
                          </Col>
                          <Col xxl={2} md={4} className="col-6">
                            <div>
                              <Image
                                src={avatar3}
                                alt=""
                                className="rounded-circle avatar-sm material-shadow"
                                width={16}
                                height={16}
                              />
                              <p className="mt-2 mb-lg-0">
                                <code>avatar-sm</code>
                              </p>
                            </div>
                          </Col>
                          <Col xxl={2} md={4} className="col-6">
                            <div>
                              <Image
                                src={avatar4}
                                alt=""
                                className="rounded-circle avatar-md material-shadow"
                                width={16}
                                height={16}
                              />
                              <p className="mt-2  mb-lg-0">
                                <code>avatar-md</code>
                              </p>
                            </div>
                          </Col>
                          <Col xxl={2} md={4} className="col-6">
                            <div>
                              <Image
                                src={avatar5}
                                alt=""
                                className="rounded-circle avatar-lg material-shadow"
                                width={16}
                                height={16}
                              />
                              <p className="mt-2 mb-lg-0">
                                <code>avatar-lg</code>
                              </p>
                            </div>
                          </Col>
                          <Col xxl={2} md={4} className="col-6">
                            <div>
                              <Image
                                src={avatar8}
                                alt=""
                                className="rounded-circle avatar-xl material-shadow"
                                width={16}
                                height={16}
                              />
                              <p className="mt-2 mb-lg-0">
                                <code>avatar-xl</code>
                              </p>
                            </div>
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
                        <ImgSizesExample />
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
                <PreviewCardHeader title="Avatar With Content" />

                <CardBody>
                  <p className="text-muted">
                    Use{" "}
                    <code>
                      avatar-xxs,
                      avatar-xs,avatar-sm,avatar-md,avatar-lg,avatar-xl
                    </code>{" "}
                    class to set different avatar content.
                  </p>

                  <div className="live-preview">
                    <Row className="g-3">
                      <Col xxl={2} md={4} className="col-6">
                        <div className="avatar-xxs mt-3">
                          <div className="avatar-title rounded bg-primary-subtle text-primary fs-10 material-shadow">
                            XXS
                          </div>
                        </div>
                      </Col>
                      <Col xxl={2} md={4} className="col-6">
                        <div className="avatar-xs mt-3">
                          <div className="avatar-title rounded bg-secondary-subtle text-secondary material-shadow">
                            XS
                          </div>
                        </div>
                      </Col>
                      <Col xxl={2} md={4} className="col-6">
                        <div className="avatar-sm mt-3">
                          <div className="avatar-title rounded bg-success-subtle text-success fs-14 material-shadow">
                            SM
                          </div>
                        </div>
                      </Col>
                      <Col xxl={2} md={4} className="col-6">
                        <div className="avatar-md mt-3">
                          <div className="avatar-title rounded bg-info-subtle text-info fs-16 material-shadow">
                            MD
                          </div>
                        </div>
                      </Col>
                      <Col xxl={2} md={4} className="col-6">
                        <div className="avatar-lg mt-3">
                          <div className="avatar-title rounded bg-warning-subtle text-warning fs-20 material-shadow">
                            LG
                          </div>
                        </div>
                      </Col>
                      <Col xxl={2} md={4} className="col-6">
                        <div className="avatar-xl mt-3">
                          <div className="avatar-title rounded bg-danger-subtle text-danger fs-22 material-shadow">
                            XL
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <div className="d-none code-view">
                    <pre
                      className="language-markup"
                      style={{ height: "275px" }}
                    >
                      <code>
                        <AvatarExample />
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
                <PreviewCardHeader title="Avatar Group" />

                <CardBody>
                  <div className="live-preview">
                    <Row>
                      <Col lg={6}>
                        <div className="mt-lg-0 mt-3">
                          <p className="text-muted">
                            Use <code>avatar-group</code> class to show avatar
                            images with the group.
                          </p>
                          <div className="avatar-group">
                            <div className="avatar-group-item material-shadow">
                              <Image
                                src={avatar4}
                                alt=""
                                className="rounded-circle avatar-sm"
                                width={32}
                                height={32}
                              />
                            </div>
                            <div className="avatar-group-item material-shadow">
                              <Image
                                src={avatar5}
                                alt=""
                                className="rounded-circle avatar-sm"
                                width={32}
                                height={32}
                              />
                            </div>
                            <div className="avatar-group-item material-shadow">
                              <div className="avatar-sm">
                                <div className="avatar-title rounded-circle bg-light text-primary">
                                  A
                                </div>
                              </div>
                            </div>
                            <div className="avatar-group-item material-shadow">
                              <Image
                                src={avatar2}
                                alt=""
                                className="rounded-circle avatar-sm"
                                width={32}
                                height={32}
                              />
                            </div>
                          </div>
                        </div>
                      </Col>

                      <Col lg={6}>
                        <div className="mt-lg-0 mt-3">
                          <p className="text-muted">
                            Use <code>avatar-group</code> class with{" "}
                            <code>data-bs-toggle=&quot;tooltip&quot;</code> to
                            show avatar group images with tooltip.
                          </p>
                          <div className="avatar-group">
                            <Link
                              href="#"
                              className="avatar-group-item material-shadow"
                              id="img1"
                            >
                              <Image
                                src={avatar4}
                                alt=""
                                className="rounded-circle avatar-sm"
                                width={32}
                                height={32}
                              />
                            </Link>
                            <UncontrolledTooltip placement="top" target="img1">
                              {" "}
                              Christi{" "}
                            </UncontrolledTooltip>
                            <Link
                              href="#"
                              className="avatar-group-item material-shadow"
                              id="img2"
                            >
                              <Image
                                src={avatar3}
                                alt=""
                                className="rounded-circle avatar-sm"
                                width={32}
                                height={32}
                              />
                            </Link>
                            <UncontrolledTooltip placement="top" target="img2">
                              {" "}
                              Frank Hook{" "}
                            </UncontrolledTooltip>
                            <Link
                              href="#"
                              className="avatar-group-item material-shadow"
                              id="img3"
                            >
                              <div className="avatar-sm">
                                <div className="avatar-title rounded-circle bg-light text-primary">
                                  C
                                </div>
                              </div>
                            </Link>
                            <UncontrolledTooltip placement="top" target="img3">
                              {" "}
                              Christi{" "}
                            </UncontrolledTooltip>
                            <Link
                              href="#"
                              className="avatar-group-item material-shadow"
                              id="img4"
                            >
                              <div className="avatar-sm">
                                <div className="avatar-title rounded-circle">
                                  2+
                                </div>
                              </div>
                            </Link>
                            <UncontrolledTooltip placement="top" target="img4">
                              {" "}
                              More{" "}
                            </UncontrolledTooltip>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <div className="d-none code-view">
                    <pre
                      className="language-markup"
                      style={{ height: "275px" }}
                    >
                      <code>
                        <AvatarGroupExample />
                      </code>
                    </pre>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xl={8}>
              <Card>
                <PreviewCardHeader title="Figures" />
                <CardBody>
                  <p className="card-title-desc text-muted">
                    Use the included <code>figure</code>,{" "}
                    <code>figure-img</code> and <code>figure-caption</code>{" "}
                    classes to provide some baseline styles for the HTML5{" "}
                    <code>&lt;figure&gt;</code> and{" "}
                    <code>&lt;figcaption&gt;</code> elements.
                  </p>

                  <div className="live-preview">
                    <Row className="g-3">
                      <Col sm={6}>
                        <figure className="figure mb-0">
                          <Image
                            src={img4}
                            className="figure-img img-fluid rounded"
                            alt="..."
                            width={300}
                            height={200}
                          />
                          <figcaption className="figure-caption">
                            A caption for the above image.
                          </figcaption>
                        </figure>
                      </Col>
                      <Col sm={6}>
                        <figure className="figure mb-0">
                          <Image
                            src={img5}
                            className="figure-img img-fluid rounded"
                            alt="..."
                            width={300}
                            height={200}
                          />
                          <figcaption className="figure-caption text-end">
                            A caption for the above image.
                          </figcaption>
                        </figure>
                      </Col>
                    </Row>
                  </div>

                  <div className="d-none code-view">
                    <pre className="language-markup">
                      <code>
                        <FiguresExample />
                      </code>
                    </pre>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xl={4}>
              <Card>
                <PreviewCardHeader title="Responsive Images" />

                <CardBody>
                  <p className="card-title-desc text-muted">
                    Responsive Images with{" "}
                    <code>img-fluid,max-width: 100%; and height: auto;</code> to
                    the image so that it scales with the parent width.
                  </p>

                  <div className="live-preview">
                    <div>
                      <Image
                        src={img2}
                        className="img-fluid"
                        alt="Responsive"
                        width={400}
                        height={300}
                      />
                    </div>
                  </div>

                  <div className="d-none code-view">
                    <pre className="language-markup">
                      <code>
                        <ResponsiveExample />
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

export default UiImages;
