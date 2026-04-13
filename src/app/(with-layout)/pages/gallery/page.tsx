"use client";
import React, { useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import BreadCrumb from "@common/BreadCrumb";
import Link from "next/link";
import Masonry from "react-masonry-css";

import { gallery } from "@/components/Common/data/pagesData";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";

const Gallery = () => {
  document.title =
    "Gallery | Velzon - Next.js TypeScript Admin & Dashboard Template";

  const [displayCategory, setCategory] = useState<string>("All");
  const [index, setIndex] = useState<any>(-1);
  const [itemsToShow, setItemsToShow] = useState(8); // Initial number of items to show

  const filterGallery = ({ category }: any) => {
    return displayCategory === category || displayCategory === "All";
  };

  const filteredGallery = gallery.filter(({ category }: any) =>
    filterGallery({ category })
  );

  const slideGallery = filteredGallery.map(item => ({ src: item.img }));

  const breakpointColumnsObj = {
    default: 4,
    900: 3,
    750: 2,
    500: 1,
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Gallery" pageTitle="Pages" />
          <Row>
            <Col lg={12}>
              <div className="">
                <CardBody className="px-1">
                  <Row>
                    <Col lg={12}>
                      <div className="text-center">
                        <ul
                          className="list-inline categories-filter animation-nav"
                          id="filter"
                        >
                          <li className="list-inline-item me-1">
                            <Link
                              href="#"
                              onClick={() => setCategory("All")}
                              className={
                                displayCategory === "All"
                                  ? "categories active"
                                  : "categories"
                              }
                              data-filter="*"
                            >
                              All
                            </Link>
                          </li>
                          <li className="list-inline-item me-1">
                            <Link
                              href="#"
                              onClick={() => setCategory("Project")}
                              className={
                                displayCategory === "Project"
                                  ? "categories active"
                                  : "categories"
                              }
                              data-filter=".project"
                            >
                              Project
                            </Link>
                          </li>
                          <li className="list-inline-item me-1">
                            <Link
                              href="#"
                              onClick={() => setCategory("Designing")}
                              className={
                                displayCategory === "Designing"
                                  ? "categories active"
                                  : "categories"
                              }
                              data-filter=".designing"
                            >
                              Designing
                            </Link>
                          </li>
                          <li className="list-inline-item me-1">
                            <Link
                              href="#"
                              onClick={() => setCategory("Photography")}
                              className={
                                displayCategory === "Photography"
                                  ? "categories active"
                                  : "categories"
                              }
                              data-filter=".photography"
                            >
                              Photography
                            </Link>
                          </li>
                          <li className="list-inline-item me-1">
                            <Link
                              href="#"
                              onClick={() => setCategory("Development")}
                              className={
                                displayCategory === "Development"
                                  ? "categories active"
                                  : "categories"
                              }
                              data-filter=".development"
                            >
                              Development
                            </Link>
                          </li>
                        </ul>
                      </div>

                      <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="row gallery-wrapper"
                        columnClassName="my-masonry-grid_column ps-0"
                      >
                        {filteredGallery.map(
                          ({ img, title, auther, likes, comments }, key) => (
                            <div
                              className="element-item project designing development"
                              key={key}
                            >
                              <Card className="gallery-box">
                                <div className="gallery-container">
                                  <Link
                                    className="image-popup"
                                    href="#"
                                    title={title}
                                    onClick={() => setIndex(key)}
                                  >
                                    <Image
                                      className="gallery-img img-fluid mx-auto"
                                      src={img}
                                      alt=""
                                      width={200}
                                      height={200}
                                      style={{
                                        width: "100%",
                                        height: "auto",
                                      }}
                                    />
                                    <div className="gallery-overlay">
                                      <h5 className="overlay-caption">
                                        {title}
                                      </h5>
                                    </div>
                                  </Link>
                                </div>

                                <div className="box-content">
                                  <div className="d-flex align-items-center mt-1">
                                    <div className="flex-grow-1 text-muted">
                                      by{" "}
                                      <Link
                                        href="#"
                                        className="text-body text-truncate"
                                      >
                                        {auther}
                                      </Link>
                                    </div>
                                    <div className="flex-shrink-0">
                                      <div className="d-flex gap-3">
                                        <button
                                          type="button"
                                          className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0 material-shadow-none"
                                        >
                                          <i className="ri-thumb-up-fill text-muted align-bottom me-1"></i>{" "}
                                          {likes}
                                        </button>
                                        <button
                                          type="button"
                                          className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0 material-shadow-none"
                                        >
                                          <i className="ri-question-answer-fill text-muted align-bottom me-1"></i>{" "}
                                          {comments}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Card>
                            </div>
                          )
                        )}
                      </Masonry>
                      {itemsToShow < gallery.length && (
                        <div className="text-center mt-2 mb-4">
                          <Link
                            href="#"
                            onClick={() => setItemsToShow(itemsToShow + 4)}
                            className="text-success  material-shadow-none"
                          >
                            <i className="mdi mdi-arrow-right-s-line fs-20 align-middle me-2"></i>{" "}
                            Load More{" "}
                          </Link>
                        </div>
                      )}
                    </Col>
                  </Row>
                </CardBody>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* LightBox */}
      <Lightbox
        index={index}
        slides={slideGallery}
        open={index >= 0}
        close={() => setIndex(-1)}
      />
    </React.Fragment>
  );
};

export default Gallery;
