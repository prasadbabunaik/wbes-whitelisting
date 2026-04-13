"use client";
import React from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import Link from "next/link";
import Image from "next/image";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/effect-flip";
import {
  Pagination,
  Navigation,
  Scrollbar,
  EffectFade,
  EffectCreative,
  Mousewheel,
  EffectFlip,
  EffectCoverflow,
  Autoplay,
} from "swiper/modules";

//import Components
import BreadCrumb from "@common/BreadCrumb";

// Import Images
const img1 = "/images/small/img-1.jpg";
const img2 = "/images/small/img-2.jpg";
const img3 = "/images/small/img-3.jpg";
const img4 = "/images/small/img-4.jpg";
const img5 = "/images/small/img-5.jpg";
const img6 = "/images/small/img-6.jpg";
const img7 = "/images/small/img-7.jpg";
const img8 = "/images/small/img-8.jpg";
const img9 = "/images/small/img-9.jpg";
const img10 = "/images/small/img-10.jpg";
const img11 = "/images/small/img-11.jpg";
const img12 = "/images/small/img-12.jpg";

const UiSwiperSlider = () => {
  document.title =
    "Swiper Slider | Velzon - Next.js TypeScript Admin & Dashboard Template";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Swiper Slider" pageTitle="Advance UI" />
          <Row>
            <Col xl={4} lg={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Default Swiper</h4>
                </CardHeader>
                <CardBody>
                  <p className="text-muted">
                    Use <code>default-swiper</code> class to set a default
                    swiper.
                  </p>

                  <Swiper
                    className="mySwiper swiper default-swiper rounded"
                    modules={[Autoplay]}
                    loop={true}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                  >
                    <div className="swiper-wrapper">
                      <SwiperSlide>
                        <Image
                          src={img1}
                          alt=""
                          className="img-fluid"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <Image
                          src={img2}
                          alt=""
                          className="img-fluid"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <Image
                          src={img3}
                          alt=""
                          className="img-fluid"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </SwiperSlide>
                    </div>
                  </Swiper>
                </CardBody>
              </Card>
            </Col>

            <Col xl={4} lg={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">
                    Navigation & Pagination Swiper
                  </h4>
                </CardHeader>
                <CardBody>
                  <p className="text-muted">
                    Use <code>navigation-swiper</code> class to set a swiper
                    with navigation and pagination.
                  </p>

                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    pagination={{ clickable: true }}
                    navigation={true}
                    loop={true}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    className="mySwiper swiper navigation-swiper rounded"
                  >
                    <div className="swiper-wrapper">
                      <SwiperSlide>
                        <Image
                          src={img4}
                          alt=""
                          className="img-fluid"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <Image
                          src={img5}
                          alt=""
                          className="img-fluid"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <Image
                          src={img6}
                          alt=""
                          className="img-fluid"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </SwiperSlide>
                    </div>
                  </Swiper>
                </CardBody>
              </Card>
            </Col>

            <Col xl={4} lg={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Pagination Dynamic Swiper</h4>
                </CardHeader>
                <CardBody>
                  <p className="text-muted">
                    Use <code>pagination-dynamic-swiper</code> class to set a
                    dynamic swiper with pagination.
                  </p>

                  <Swiper
                    pagination={{ clickable: true, dynamicBullets: true }}
                    modules={[Pagination, Autoplay]}
                    loop={true}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    className="mySwiper swiper pagination-dynamic-swiper rounded"
                  >
                    <div className="swiper-wrapper">
                      <SwiperSlide>
                        <Image
                          src={img7}
                          alt=""
                          className="img-fluid"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <Image
                          src={img8}
                          alt=""
                          className="img-fluid"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <Image
                          src={img9}
                          alt=""
                          className="img-fluid"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </SwiperSlide>
                    </div>
                  </Swiper>
                </CardBody>
              </Card>
            </Col>
            <Col xl={4} lg={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">
                    Pagination Fraction Swiper
                  </h4>
                </CardHeader>
                <CardBody>
                  <p className="text-muted">
                    Use <code>pagination-fraction-swiper</code> class to set a
                    fraction swiper with pagination.
                  </p>

                  <Swiper
                    pagination={{ type: "fraction", clickable: true }}
                    navigation={true}
                    modules={[Pagination, Navigation, Autoplay]}
                    loop={true}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    className="mySwiper swiper pagination-fraction-swiper rounded"
                  >
                    <div className="swiper-wrapper">
                      <SwiperSlide>
                        <Image
                          src={img10}
                          alt=""
                          className="img-fluid"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <Image
                          src={img11}
                          alt=""
                          className="img-fluid"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <Image
                          src={img12}
                          alt=""
                          className="img-fluid"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </SwiperSlide>
                    </div>
                  </Swiper>
                </CardBody>
              </Card>
            </Col>
            <Col xl={4} lg={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Pagination Custom Swiper</h4>
                </CardHeader>
                <CardBody>
                  <p className="text-muted">
                    Use <code>pagination-custom-swiper</code> class to set a
                    swiper with custom pagination.
                  </p>

                  <Swiper
                    pagination={{ el: ".swiper-pagination" }}
                    modules={[Pagination, Autoplay]}
                    loop={true}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    className="mySwiper swiper pagination-custom-swiper rounded"
                  >
                    <div className="swiper-wrapper">
                      <SwiperSlide>
                        <Image
                          src={img2}
                          alt=""
                          className="img-fluid"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <Image
                          src={img3}
                          alt=""
                          className="img-fluid"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <Image
                          src={img4}
                          alt=""
                          className="img-fluid"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </SwiperSlide>
                    </div>
                    <div className="swiper-pagination pagination-custom"></div>
                  </Swiper>
                </CardBody>
              </Card>
            </Col>
            <Col xl={4} lg={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">
                    Pagination Progress Swiper
                  </h4>
                </CardHeader>
                <CardBody>
                  <p className="text-muted">
                    Use <code>pagination-progress-swiper</code> class to set a
                    swiper with progress pagination.
                  </p>

                  <Swiper
                    pagination={{ type: "progressbar" }}
                    navigation={true}
                    modules={[Pagination, Navigation, Autoplay]}
                    loop={true}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    className="mySwiper swiper pagination-progress-swiper rounded"
                  >
                    <div className="swiper-wrapper">
                      <SwiperSlide>
                        <Image
                          src={img5}
                          alt=""
                          className="img-fluid"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <Image
                          src={img6}
                          alt=""
                          className="img-fluid"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <Image
                          src={img7}
                          alt=""
                          className="img-fluid"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </SwiperSlide>
                    </div>
                  </Swiper>
                </CardBody>
              </Card>
            </Col>
            <Col xl={4} lg={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Scrollbar Swiper</h4>
                </CardHeader>
                <CardBody>
                  <p className="text-muted">
                    Use <code>pagination-scrollbar-swiper</code> class to set a
                    swiper with scrollbar pagination.
                  </p>

                  <Swiper
                    scrollbar={{ hide: true }}
                    modules={[Scrollbar, Autoplay]}
                    loop={true}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    className="mySwiper swiper pagination-scrollbar-swiper rounded"
                  >
                    <div className="swiper-wrapper">
                      <SwiperSlide>
                        <Image
                          src={img8}
                          alt=""
                          className="img-fluid"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <Image
                          src={img9}
                          alt=""
                          className="img-fluid"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <Image
                          src={img10}
                          alt=""
                          className="img-fluid"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </SwiperSlide>
                    </div>
                  </Swiper>
                </CardBody>
              </Card>
            </Col>

            <Col xl={4} lg={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Vertical Swiper</h4>
                </CardHeader>
                <CardBody>
                  <p className="text-muted">
                    Use <code>vertical-swiper</code> class to set a vertical
                    swiper.
                  </p>

                  <Swiper
                    direction={"vertical"}
                    pagination={{ clickable: true }}
                    modules={[Pagination, Autoplay]}
                    loop={true}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    className="mySwiper swiper vertical-swiper rounded"
                    style={{ height: "324px" }}
                  >
                    <div className="swiper-wrapper">
                      <SwiperSlide>
                        <Image
                          src={img11}
                          alt=""
                          className="img-fluid"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <Image
                          src={img12}
                          alt=""
                          className="img-fluid"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <Image
                          src={img1}
                          alt=""
                          className="img-fluid"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </SwiperSlide>
                    </div>
                  </Swiper>
                </CardBody>
              </Card>
            </Col>

            <Col xl={4} lg={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Mousewheel Control Swiper</h4>
                </CardHeader>
                <CardBody>
                  <p className="text-muted">
                    Use <code>mousewheel-control-swiper</code> class to set a
                    swiper with mousewheel scroll.
                  </p>

                  <Swiper
                    direction={"vertical"}
                    slidesPerView={1}
                    spaceBetween={30}
                    mousewheel={true}
                    pagination={{
                      clickable: true,
                    }}
                    modules={[Mousewheel, Pagination, Autoplay]}
                    loop={true}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    className="mySwiper mousewheel-control-swiper rounded"
                    style={{ height: "324px" }}
                  >
                    <div className="swiper-wrapper">
                      <SwiperSlide>
                        <Image
                          src={img3}
                          alt=""
                          className="img-fluid"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <Image
                          src={img4}
                          alt=""
                          className="img-fluid"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <Image
                          src={img5}
                          alt=""
                          className="img-fluid"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </SwiperSlide>
                    </div>
                  </Swiper>
                </CardBody>
              </Card>
            </Col>

            <Col xl={4} lg={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Effect Fade Swiper</h4>
                </CardHeader>
                <CardBody>
                  <p className="text-muted">
                    Use <code>effect-fade-swiper</code> class to set a swiper
                    with fade effect.
                  </p>

                  <Swiper
                    spaceBetween={30}
                    effect={"fade"}
                    pagination={{ clickable: true }}
                    modules={[EffectFade, Pagination, Autoplay]}
                    loop={true}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    className="mySwiper swiper effect-fade-swiper rounded"
                  >
                    <SwiperSlide>
                      {" "}
                      <Image
                        src={img6}
                        alt=""
                        className="img-fluid"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "100%", height: "auto" }}
                      />{" "}
                    </SwiperSlide>
                    <SwiperSlide>
                      {" "}
                      <Image
                        src={img7}
                        alt=""
                        className="img-fluid"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "100%", height: "auto" }}
                      />{" "}
                    </SwiperSlide>
                    <SwiperSlide>
                      {" "}
                      <Image
                        src={img8}
                        alt=""
                        className="img-fluid"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "100%", height: "auto" }}
                      />{" "}
                    </SwiperSlide>
                  </Swiper>
                </CardBody>
              </Card>
            </Col>
            <Col xl={4} lg={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Effect Creative Swiper</h4>
                </CardHeader>
                <CardBody>
                  <p className="text-muted">
                    Use <code>effect-creative-swiper</code> class to set a
                    swiper with creative custom effect.
                  </p>

                  <Swiper
                    grabCursor={true}
                    effect={"creative"}
                    pagination={{ clickable: true }}
                    creativeEffect={{
                      prev: { shadow: true, translate: [0, 0, -400] },
                      next: { translate: ["100%", 0, 0] },
                    }}
                    modules={[EffectCreative, Pagination, Autoplay]}
                    loop={true}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    className="mySwiper swiper effect-creative-swiper rounded"
                  >
                    <div className="swiper-wrapper">
                      <SwiperSlide>
                        <Image
                          src={img9}
                          alt=""
                          className="img-fluid"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <Image
                          src={img10}
                          alt=""
                          className="img-fluid"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <Image
                          src={img11}
                          alt=""
                          className="img-fluid"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </SwiperSlide>
                    </div>
                  </Swiper>
                </CardBody>
              </Card>
            </Col>
            <Col xl={4} lg={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Effect Flip Swiper</h4>
                </CardHeader>
                <CardBody>
                  <p className="text-muted">
                    Use <code>effect-flip-swiper</code> class to set a swiper
                    with flip effect.
                  </p>

                  <Swiper
                    effect={"flip"}
                    grabCursor={true}
                    pagination={{ clickable: true }}
                    navigation={true}
                    modules={[EffectFlip, Pagination, Navigation, Autoplay]}
                    loop={true}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    className="mySwiper effect-flip-swiper rounded"
                  >
                    <div className="swiper-wrapper">
                      <SwiperSlide>
                        {" "}
                        <Image
                          src={img12}
                          alt=""
                          className="img-fluid"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />{" "}
                      </SwiperSlide>
                      <SwiperSlide>
                        {" "}
                        <Image
                          src={img1}
                          alt=""
                          className="img-fluid"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />{" "}
                      </SwiperSlide>
                      <SwiperSlide>
                        {" "}
                        <Image
                          src={img2}
                          alt=""
                          className="img-fluid"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />{" "}
                      </SwiperSlide>
                    </div>
                  </Swiper>
                </CardBody>
              </Card>
            </Col>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Effect Coverflow Swiper</h4>
                </CardHeader>
                <CardBody>
                  <p className="text-muted">
                    Use <code>effect-coverflow-swiper</code> class to set a
                    swiper with coverflow effect.
                  </p>

                  <Swiper
                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={4}
                    loop={true}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    coverflowEffect={{
                      rotate: 50,
                      stretch: 0,
                      depth: 100,
                      modifier: 1,
                      slideShadows: true,
                    }}
                    pagination={{
                      el: ".swiper-pagination",
                      clickable: true,
                      dynamicBullets: true,
                    }}
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                    className="mySwiper swiper effect-coverflow-swiper rounded pb-5"
                  >
                    <div className="swiper-wrapper">
                      <SwiperSlide>
                        {" "}
                        <Image
                          src={img4}
                          alt=""
                          className="img-fluid"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />{" "}
                      </SwiperSlide>
                      <SwiperSlide>
                        {" "}
                        <Image
                          src={img5}
                          alt=""
                          className="img-fluid"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />{" "}
                      </SwiperSlide>
                      <SwiperSlide>
                        {" "}
                        <Image
                          src={img6}
                          alt=""
                          className="img-fluid"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />{" "}
                      </SwiperSlide>
                      <SwiperSlide>
                        {" "}
                        <Image
                          src={img7}
                          alt=""
                          className="img-fluid"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />{" "}
                      </SwiperSlide>
                      <SwiperSlide>
                        {" "}
                        <Image
                          src={img8}
                          alt=""
                          className="img-fluid"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />{" "}
                      </SwiperSlide>
                      <SwiperSlide>
                        {" "}
                        <Image
                          src={img9}
                          alt=""
                          className="img-fluid"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />{" "}
                      </SwiperSlide>
                    </div>
                    <div className="swiper-pagination swiper-pagination-dark"></div>
                  </Swiper>
                </CardBody>
              </Card>
            </Col>

            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">
                    Responsive Breakpoints Swiper
                  </h4>
                </CardHeader>
                <CardBody>
                  <p className="text-muted">
                    Use <code>responsive-swiper</code> class to set a responsive
                    swiper.
                  </p>

                  <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{
                      el: ".swiper-pagination",
                      clickable: true,
                    }}
                    breakpoints={{
                      640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                      },
                      768: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                      },
                      1024: {
                        slidesPerView: 4,
                        spaceBetween: 50,
                      },
                    }}
                    loop={true}
                    modules={[Pagination]}
                    className="mySwiper swiper responsive-swiper rounded gallery-light pb-4"
                  >
                    <div className="swiper-wrapper">
                      <SwiperSlide>
                        <div className="gallery-box card">
                          <div className="gallery-container">
                            <Link className="image-popup" href={img1} title="">
                              <Image
                                className="gallery-img img-fluid mx-auto"
                                src={img1}
                                alt=""
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: "100%", height: "auto" }}
                              />
                              <div className="gallery-overlay">
                                <h5 className="overlay-caption">
                                  Glasses and laptop from above
                                </h5>
                              </div>
                            </Link>
                          </div>
                          <div className="box-content">
                            <div className="d-flex align-items-center mt-1">
                              <div className="flex-grow-1 text-muted">
                                by{" "}
                                <Link
                                  href=""
                                  className="text-body text-truncate"
                                >
                                  Ron Mackie
                                </Link>
                              </div>
                              <div className="flex-shrink-0">
                                <div className="d-flex gap-3">
                                  <button
                                    type="button"
                                    className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0"
                                  >
                                    <i className="ri-thumb-up-fill text-muted align-bottom me-1"></i>{" "}
                                    2.2K
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0"
                                  >
                                    <i className="ri-question-answer-fill text-muted align-bottom me-1"></i>{" "}
                                    1.3K
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div className="gallery-box card">
                          <div className="gallery-container">
                            <Link className="image-popup" href={img2} title="">
                              <Image
                                className="gallery-img img-fluid mx-auto"
                                src={img2}
                                alt=""
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: "100%", height: "auto" }}
                              />
                              <div className="gallery-overlay">
                                <h5 className="overlay-caption">
                                  Working at a coffee shop
                                </h5>
                              </div>
                            </Link>
                          </div>
                          <div className="box-content">
                            <div className="d-flex align-items-center mt-1">
                              <div className="flex-grow-1 text-muted">
                                by{" "}
                                <Link
                                  href=""
                                  className="text-body text-truncate"
                                >
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
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div className="gallery-box card mb-0">
                          <div className="gallery-container">
                            <Link className="image-popup" href={img10} title="">
                              <Image
                                className="gallery-img img-fluid mx-auto"
                                src={img10}
                                alt=""
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: "100%", height: "auto" }}
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
                                <Link
                                  href=""
                                  className="text-body text-truncate"
                                >
                                  Henry Baird
                                </Link>
                              </div>
                              <div className="flex-shrink-0">
                                <div className="d-flex gap-3">
                                  <button
                                    type="button"
                                    className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0"
                                  >
                                    <i className="ri-thumb-up-fill text-muted align-bottom me-1"></i>{" "}
                                    632
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0"
                                  >
                                    <i className="ri-question-answer-fill text-muted align-bottom me-1"></i>{" "}
                                    95
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div className="gallery-box card">
                          <div className="gallery-container">
                            <Link className="image-popup" href={img4} title="">
                              <Image
                                className="gallery-img img-fluid mx-auto"
                                src={img4}
                                alt=""
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: "100%", height: "auto" }}
                              />
                              <div className="gallery-overlay">
                                <h5 className="overlay-caption">
                                  Drawing a sketch
                                </h5>
                              </div>
                            </Link>
                          </div>
                          <div className="box-content">
                            <div className="d-flex align-items-center mt-1">
                              <div className="flex-grow-1 text-muted">
                                by{" "}
                                <Link
                                  href=""
                                  className="text-body text-truncate"
                                >
                                  Jason McQuaid
                                </Link>
                              </div>
                              <div className="flex-shrink-0">
                                <div className="d-flex gap-3">
                                  <button
                                    type="button"
                                    className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0"
                                  >
                                    <i className="ri-thumb-up-fill text-muted align-bottom me-1"></i>{" "}
                                    825
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0"
                                  >
                                    <i className="ri-question-answer-fill text-muted align-bottom me-1"></i>{" "}
                                    101
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div className="gallery-box card">
                          <div className="gallery-container">
                            <Link className="image-popup" href={img6} title="">
                              <Image
                                className="gallery-img img-fluid mx-auto"
                                src={img6}
                                alt=""
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: "100%", height: "auto" }}
                              />
                              <div className="gallery-overlay">
                                <h5 className="overlay-caption">
                                  Project discussion with team
                                </h5>
                              </div>
                            </Link>
                          </div>
                          <div className="box-content">
                            <div className="d-flex align-items-center mt-1">
                              <div className="flex-grow-1 text-muted">
                                by{" "}
                                <Link
                                  href=""
                                  className="text-body text-truncate"
                                >
                                  Erica Kernan
                                </Link>
                              </div>
                              <div className="flex-shrink-0">
                                <div className="d-flex gap-3">
                                  <button
                                    type="button"
                                    className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0"
                                  >
                                    <i className="ri-thumb-up-fill text-muted align-bottom me-1"></i>{" "}
                                    3.4K
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0"
                                  >
                                    <i className="ri-question-answer-fill text-muted align-bottom me-1"></i>{" "}
                                    1.3k
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    </div>
                    <div className="swiper-pagination swiper-pagination-dark"></div>
                  </Swiper>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UiSwiperSlider;
