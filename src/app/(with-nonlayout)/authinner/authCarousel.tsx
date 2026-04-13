"use client";
import React from "react";
import { Col } from "reactstrap";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Link from "next/link";

// Import Images
const logoLight = "/images/logo-light.png";
import Image from "next/image";

const AuthSlider = () => {
  return (
    <React.Fragment>
      <Col lg={6}>
        <div className="p-lg-5 p-4 auth-one-bg h-100">
          <div className="bg-overlay"></div>
          <div className="position-relative h-100 d-flex flex-column">
            <div className="mb-4">
              <Link href="/dashboard" className="d-block">
                <Image src={logoLight} alt="" height={20} width={20} />
              </Link>
            </div>
            <div className="mt-auto">
              <div className="mb-3">
                <i className="ri-double-quotes-l display-4 text-success"></i>
              </div>

              <Carousel
                showThumbs={false}
                autoPlay={true}
                showArrows={false}
                showStatus={false}
                infiniteLoop={true}
                className="slide"
                // id="qoutescarouselIndicators"
              >
                <div className="carousel-inner text-center text-white-50 pb-5">
                  <div className="item">
                    <p className="fs-15 fst-italic">
                      &quot; Great! Clean code, clean design, easy for
                      customization. Thanks very much! &quot;
                    </p>
                  </div>
                </div>
                <div className="carousel-inner text-center text-white-50 pb-5">
                  <div className="item">
                    <p className="fs-15 fst-italic">
                      &quot; The theme is really great with an amazing customer
                      support. &quot;
                    </p>
                  </div>
                </div>
                <div className="carousel-inner text-center text-white-50 pb-5">
                  <div className="item">
                    <p className="fs-15 fst-italic">
                      &quot; Great! Clean code, clean design, easy for
                      customization. Thanks very much! &quot;
                    </p>
                  </div>
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </Col>
    </React.Fragment>
  );
};

export default AuthSlider;
