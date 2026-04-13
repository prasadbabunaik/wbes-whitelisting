"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const LandingPage = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [isNavbarShrunk, setIsNavbarShrunk] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState("genques-collapseOne");
  const [activePrivacyAccordion, setActivePrivacyAccordion] = useState(
    "privacy-collapseTwo"
  );

  const handleAccordionClick = (accordionId: string) => {
    setActiveAccordion(accordionId === activeAccordion ? "" : accordionId);
  };

  const handlePrivacyAccordionClick = (accordionId: string) => {
    setActivePrivacyAccordion(
      accordionId === activePrivacyAccordion ? "" : accordionId
    );
  };

  const handlePlanSwitch = () => {
    setIsAnnual(!isAnnual);
  };

  useEffect(() => {
    const scrollNavigation = () => {
      if (
        document.body.scrollTop >= 50 ||
        document.documentElement.scrollTop >= 50
      ) {
        setIsNavbarShrunk(true);
      } else {
        setIsNavbarShrunk(false);
      }
    };

    window.addEventListener("scroll", scrollNavigation);

    return () => {
      window.removeEventListener("scroll", scrollNavigation);
    };
  }, []);

  return (
    <div className="layout-wrapper landing">
      <nav
        className={`navbar navbar-expand-lg navbar-landing fixed-top ${
          isNavbarShrunk ? "is-sticky" : ""
        }`}
        id="navbar"
      >
        <div className="container">
          <Link href="/">
            <Image
              src="/images/logo-dark.png"
              alt="Velzon dark logo"
              height="17"
              width="85"
            />
            {/* <Image
              src="/images/logo-light.png"
              alt="Velzon light logo"
              height="17"
              width="85"
            /> */}
          </Link>
          <button
            className="navbar-toggler py-0 fs-20 text-body"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="mdi mdi-menu"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mt-2 mt-lg-0" id="navbar-example">
              <li className="nav-item">
                <Link href="#hero" className="nav-link active">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link href="#services" className="nav-link">
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link href="#features" className="nav-link">
                  Features
                </Link>
              </li>
              <li className="nav-item">
                <Link href="#plans" className="nav-link">
                  Plans
                </Link>
              </li>
              <li className="nav-item">
                <Link href="#reviews" className="nav-link">
                  Reviews
                </Link>
              </li>
              <li className="nav-item">
                <Link href="#team" className="nav-link">
                  Team
                </Link>
              </li>
              <li className="nav-item">
                <Link href="#contact" className="nav-link">
                  Contact
                </Link>
              </li>
            </ul>

            <div className="">
              <Link
                href="/authinner/signin/basic"
                className="btn btn-link fw-medium text-decoration-none text-body"
              >
                Sign in
              </Link>
              <Link href="/authinner/signup/basic" className="btn btn-primary">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {/* end navbar */}
      <div
        className="vertical-overlay"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent.show"
      ></div>

      {/* start hero section */}
      <section className="section pb-0 hero-section" id="hero">
        <div className="bg-overlay bg-overlay-pattern"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-sm-10">
              <div className="text-center mt-lg-5 pt-5">
                <h1 className="display-6 fw-semibold mb-3 lh-base">
                  The better way to manage your website with{" "}
                  <span className="text-success">Velzon </span>
                </h1>
                <p className="lead text-muted lh-base">
                  Velzon is a fully responsive, multipurpose and premium
                  Bootstrap 5 Admin & Dashboard Template built in multiple
                  frameworks.
                </p>

                <div className="d-flex gap-2 justify-content-center mt-4">
                  <Link href="/auth/signup" className="btn btn-primary">
                    Get Started{" "}
                    <i className="ri-arrow-right-line align-middle ms-1"></i>
                  </Link>
                  <Link href="/pricing" className="btn btn-danger">
                    View Plans <i className="ri-eye-line align-middle ms-1"></i>
                  </Link>
                </div>
              </div>

              <div className="mt-4 mt-sm-5 pt-sm-5 mb-sm-n5 demo-carousel">
                <div className="demo-img-patten-top d-none d-sm-block">
                  <Image
                    src="/images/landing/img-pattern.png"
                    alt="Image Pattern"
                    height="100"
                    width="100"
                  />
                </div>
                <div className="demo-img-patten-bottom d-none d-sm-block">
                  <Image
                    src="/images/landing/img-pattern.png"
                    alt="Image Pattern"
                    height="100"
                    width="100"
                  />
                </div>
                <Swiper
                  modules={[Autoplay]}
                  autoplay={{ delay: 2000, disableOnInteraction: false }}
                  loop={true}
                  className="carousel slide carousel-fade"
                >
                  <div className="carousel-inner shadow-lg p-2 bg-white rounded">
                    <SwiperSlide>
                      <Image
                        src="/images/demos/default.png"
                        alt="Default Demo"
                        height="500"
                        width="800"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        src="/images/demos/saas.png"
                        alt="SaaS Demo"
                        height="500"
                        width="800"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        src="/images/demos/material.png"
                        alt="Material Demo"
                        height="500"
                        width="800"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        src="/images/demos/minimal.png"
                        alt="Minimal Demo"
                        height="500"
                        width="800"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        src="/images/demos/creative.png"
                        alt="Creative Demo"
                        height="500"
                        width="800"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        src="/images/demos/modern.png"
                        alt="Modern Demo"
                        height="500"
                        width="800"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        src="/images/demos/interactive.png"
                        alt="Interactive Demo"
                        height="500"
                        width="800"
                      />
                    </SwiperSlide>
                  </div>
                </Swiper>
              </div>
            </div>
          </div>
          {/* end row */}
        </div>
        {/* end container */}
        <div className="position-absolute start-0 end-0 bottom-0 hero-shape-svg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 1440 120"
          >
            <g mask='url("#SvgjsMask1003")' fill="none">
              <path d="M 0,118 C 288,98.6 1152,40.4 1440,21L1440 140L0 140z"></path>
            </g>
          </svg>
        </div>
        {/* end shape */}
      </section>
      {/* end hero section */}

      {/* start client section */}
      <div className="pt-5 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center mt-5">
                <h5 className="fs-20">
                  Trusted{" "}
                  <span className="text-primary text-decoration-underline">
                    by
                  </span>{" "}
                  the world's best
                </h5>

                {/* Swiper */}
                <Swiper
                  modules={[Autoplay]}
                  autoplay={{ delay: 2000, disableOnInteraction: false }}
                  loop={true}
                  slidesPerView={5}
                  spaceBetween={20}
                  className="trusted-client-slider mt-sm-5 mt-4 mb-sm-5 mb-4"
                  dir="ltr"
                >
                  <SwiperSlide>
                    <div className="client-images">
                      <Image
                        src="/images/clients/amazon.svg"
                        alt="Amazon"
                        height="50"
                        width="100"
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="client-images">
                      <Image
                        src="/images/clients/walmart.svg"
                        alt="Walmart"
                        height="50"
                        width="100"
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="client-images">
                      <Image
                        src="/images/clients/lenovo.svg"
                        alt="Lenovo"
                        height="50"
                        width="100"
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="client-images">
                      <Image
                        src="/images/clients/paypal.svg"
                        alt="Paypal"
                        height="50"
                        width="100"
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="client-images">
                      <Image
                        src="/images/clients/shopify.svg"
                        alt="Shopify"
                        height="50"
                        width="100"
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="client-images">
                      <Image
                        src="/images/clients/verizon.svg"
                        alt="Verizon"
                        height="50"
                        width="100"
                      />
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
          {/* end row */}
        </div>
        {/* end container */}
      </div>
      {/* end client section */}

      {/* start services */}
      <section className="section" id="services">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center mb-5">
                <h1 className="mb-3 ff-secondary fw-semibold lh-base">
                  A Digital web design studio creating modern & engaging online
                  experiences
                </h1>
                <p className="text-muted">
                  To achieve this, it would be necessary to have uniform
                  grammar, pronunciation and more common words. If several
                  languages coalesce the grammar
                </p>
              </div>
            </div>
            {/* end col */}
          </div>
          {/* end row */}

          <div className="row g-3">
            <div className="col-lg-4">
              <div className="d-flex p-3">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar-sm icon-effect">
                    <div className="avatar-title bg-transparent text-success rounded-circle">
                      <i className="ri-pencil-ruler-2-line fs-36"></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h5 className="fs-18">Creative Design</h5>
                  <p className="text-muted my-3 ff-secondary">
                    The creative design includes designs that are unique,
                    effective and memorable.
                  </p>
                  <div>
                    <a href="#" className="fs-13 fw-medium">
                      Learn More{" "}
                      <i className="ri-arrow-right-s-line align-bottom"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* end col */}
            <div className="col-lg-4">
              <div className="d-flex p-3">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar-sm icon-effect">
                    <div className="avatar-title bg-transparent text-success rounded-circle">
                      <i className="ri-palette-line fs-36"></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h5 className="fs-18">Unlimited Colors</h5>
                  <p className="text-muted my-3 ff-secondary">
                    The collection of rules and guidelines which designers use
                    to communicate with users through appealing.
                  </p>
                  <div>
                    <a href="#" className="fs-13 fw-medium">
                      Learn More{" "}
                      <i className="ri-arrow-right-s-line align-bottom"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* end col */}
            <div className="col-lg-4">
              <div className="d-flex p-3">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar-sm icon-effect">
                    <div className="avatar-title bg-transparent text-success rounded-circle">
                      <i className="ri-lightbulb-flash-line fs-36"></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h5 className="fs-18">Strategy Solutions</h5>
                  <p className="text-muted my-3 ff-secondary">
                    Business development firm that provides strategic planning,
                    market research services and project.
                  </p>
                  <div>
                    <a href="#" className="fs-13 fw-medium">
                      Learn More{" "}
                      <i className="ri-arrow-right-s-line align-bottom"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* end col */}
            <div className="col-lg-4">
              <div className="d-flex p-3">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar-sm icon-effect">
                    <div className="avatar-title bg-transparent text-success rounded-circle">
                      <i className="ri-customer-service-line fs-36"></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h5 className="fs-18">Awesome Support</h5>
                  <p className="text-muted my-3 ff-secondary">
                    Awesome Support is the most versatile and feature-rich
                    support plugin for all version.
                  </p>
                  <div>
                    <a href="#" className="fs-13 fw-medium">
                      Learn More{" "}
                      <i className="ri-arrow-right-s-line align-bottom"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* end col */}
            <div className="col-lg-4">
              <div className="d-flex p-3">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar-sm icon-effect">
                    <div className="avatar-title bg-transparent text-success rounded-circle">
                      <i className="ri-stack-line fs-36"></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h5 className="fs-18">Truly Multipurpose</h5>
                  <p className="text-muted my-3 ff-secondary">
                    You usually get a broad range of options to play with. This
                    enables you to use a single theme across multiple.
                  </p>
                  <div>
                    <a href="#" className="fs-13 fw-medium">
                      Learn More{" "}
                      <i className="ri-arrow-right-s-line align-bottom"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* end col */}
            <div className="col-lg-4">
              <div className="d-flex p-3">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar-sm icon-effect">
                    <div className="avatar-title bg-transparent text-success rounded-circle">
                      <i className="ri-settings-2-line fs-36"></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h5 className="fs-18">Easy to customize</h5>
                  <p className="text-muted my-3 ff-secondary">
                    Personalise your own website, no matter what theme and what
                    customization options.
                  </p>
                  <div>
                    <a href="#" className="fs-13 fw-medium">
                      Learn More{" "}
                      <i className="ri-arrow-right-s-line align-bottom"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* end col */}

            <div className="col-lg-4">
              <div className="d-flex p-3">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar-sm icon-effect">
                    <div className="avatar-title bg-transparent text-success rounded-circle">
                      <i className="ri-slideshow-line fs-36"></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h5 className="fs-18">Responsive & Clean Design</h5>
                  <p className="text-muted my-3 ff-secondary">
                    Responsive design is a graphic user interface (GUI) design
                    approach used to create content.
                  </p>
                  <div>
                    <a href="#" className="fs-13 fw-medium">
                      Learn More{" "}
                      <i className="ri-arrow-right-s-line align-bottom"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* end col */}
            <div className="col-lg-4">
              <div className="d-flex p-3">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar-sm icon-effect">
                    <div className="avatar-title bg-transparent text-success rounded-circle">
                      <i className="ri-google-fill fs-36"></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h5 className="fs-18">Google Font Collection</h5>
                  <p className="text-muted my-3 ff-secondary">
                    Google Fonts is a collection of 915 fonts, all available to
                    use for free on your website.
                  </p>
                  <div>
                    <a href="#" className="fs-13 fw-medium">
                      Learn More{" "}
                      <i className="ri-arrow-right-s-line align-bottom"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* end col */}
            <div className="col-lg-4">
              <div className="d-flex p-3">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar-sm icon-effect">
                    <div className="avatar-title bg-transparent text-success rounded-circle">
                      <i className="ri-briefcase-5-line fs-36"></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h5 className="fs-18">Top Industry Specialists</h5>
                  <p className="text-muted my-3 ff-secondary">
                    An industrial specialist works with industrial operations to
                    ensure that manufacturing facilities work.
                  </p>
                  <div>
                    <a href="#" className="fs-13 fw-medium">
                      Learn More{" "}
                      <i className="ri-arrow-right-s-line align-bottom"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* end col */}
          </div>
          {/* end row */}
        </div>
        {/* end container */}
      </section>
      {/* end services */}

      {/* start features */}
      <section className="section bg-light py-5" id="features">
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-lg-6 col-sm-7 mx-auto">
              <div>
                <Image
                  src="/images/landing/features/img-1.png"
                  alt="Huge collection of widgets"
                  height="300"
                  width="500"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-muted">
                <div className="avatar-sm icon-effect mb-4">
                  <div className="avatar-title bg-transparent rounded-circle text-success h1">
                    <i className="ri-collage-line fs-36"></i>
                  </div>
                </div>
                <h3 className="mb-3 fs-20">Huge collection of widgets</h3>
                <p className="mb-4 ff-secondary fs-16">
                  Collection widgets specialize in displaying many elements of
                  the same type, such as a collection of pictures from a
                  collection of articles from a news app or a collection of
                  messages from a communication app.
                </p>

                <div className="row pt-3">
                  <div className="col-3">
                    <div className="text-center">
                      <h4>5</h4>
                      <p>Dashboards</p>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="text-center">
                      <h4>150+</h4>
                      <p>Pages</p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="text-center">
                      <h4>7+</h4>
                      <p>Functional Apps</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end col */}
          </div>
          {/* end row */}
        </div>
        {/* end container */}
      </section>
      {/* end features */}

      {/* start cta */}
      <section className="py-5 bg-primary position-relative">
        <div className="bg-overlay bg-overlay-pattern opacity-50"></div>
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-sm">
              <div>
                <h4 className="text-white mb-0 fw-semibold">
                  Build your web App/SaaS with Velzon dashboard
                </h4>
              </div>
            </div>
            {/* end col */}
            <div className="col-sm-auto">
              <div>
                <a
                  href="https://1.envato.market/velzon-admin"
                  target="_blank"
                  className="btn bg-gradient btn-danger"
                >
                  <i className="ri-shopping-cart-2-line align-middle me-1"></i>{" "}
                  Buy Now
                </a>
              </div>
            </div>
            {/* end col */}
          </div>
          {/* end row */}
        </div>
        {/* end container */}
      </section>
      {/* end cta */}

      {/* start features */}
      <section className="section">
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-lg-6 order-2 order-lg-1">
              <div className="text-muted">
                <h5 className="fs-12 text-uppercase text-success">Design</h5>
                <h4 className="mb-3">Well Designed Dashboards</h4>
                <p className="mb-4 ff-secondary">
                  Quality Dashboards (QD) is a condition-specific, actionable
                  web-based application for quality reporting and population
                  management that is integrated into the Electronic Health
                  Record (EHR).
                </p>

                <div className="row">
                  <div className="col-sm-5">
                    <div className="vstack gap-2">
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0 me-2">
                          <div className="avatar-xs icon-effect">
                            <div className="avatar-title bg-transparent text-success rounded-circle h2">
                              <i className="ri-check-fill"></i>
                            </div>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="fs-14 mb-0">Ecommerce</h5>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0 me-2">
                          <div className="avatar-xs icon-effect">
                            <div className="avatar-title bg-transparent text-success rounded-circle h2">
                              <i className="ri-check-fill"></i>
                            </div>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="fs-14 mb-0">Analytics</h5>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0 me-2">
                          <div className="avatar-xs icon-effect">
                            <div className="avatar-title bg-transparent text-success rounded-circle h2">
                              <i className="ri-check-fill"></i>
                            </div>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="fs-14 mb-0">CRM</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-5">
                    <div className="vstack gap-2">
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0 me-2">
                          <div className="avatar-xs icon-effect">
                            <div className="avatar-title bg-transparent text-success rounded-circle h2">
                              <i className="ri-check-fill"></i>
                            </div>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="fs-14 mb-0">Crypto</h5>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0 me-2">
                          <div className="avatar-xs icon-effect">
                            <div className="avatar-title bg-transparent text-success rounded-circle h2">
                              <i className="ri-check-fill"></i>
                            </div>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="fs-14 mb-0">Projects</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <a href="#" className="btn btn-primary">
                    Learn More{" "}
                    <i className="ri-arrow-right-line align-middle ms-1"></i>
                  </a>
                </div>
              </div>
            </div>
            {/* end col */}
            <div className="col-lg-6 col-sm-7 col-10 ms-auto order-1 order-lg-2">
              <div>
                <Image
                  src="/images/landing/features/img-2.png"
                  alt="Well Designed Dashboards"
                  height="300"
                  width="500"
                />
              </div>
            </div>
          </div>
          {/* end row */}

          <div className="row align-items-center mt-5 pt-lg-5 gy-4">
            <div className="col-lg-6 col-sm-7 col-10 mx-auto">
              <div>
                <Image
                  src="/images/landing/features/img-3.png"
                  alt="Well Documented"
                  height="300"
                  width="500"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-muted ps-lg-5">
                <h5 className="fs-12 text-uppercase text-success">structure</h5>
                <h4 className="mb-3">Well Documented</h4>
                <p className="mb-4">
                  used to describe something that is known about or known to be
                  true because there are many documents that describe it, prove
                  it, etc.
                </p>

                <div className="vstack gap-2">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 me-2">
                      <div className="avatar-xs icon-effect">
                        <div className="avatar-title bg-transparent text-success rounded-circle h2">
                          <i className="ri-check-fill"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <p className="mb-0">Dynamic Conetnt</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 me-2">
                      <div className="avatar-xs icon-effect">
                        <div className="avatar-title bg-transparent text-success rounded-circle h2">
                          <i className="ri-check-fill"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <p className="mb-0">Setup plugin's information.</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 me-2">
                      <div className="avatar-xs icon-effect">
                        <div className="avatar-title bg-transparent text-success rounded-circle h2">
                          <i className="ri-check-fill"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <p className="mb-0">Themes customization information</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end col */}
          </div>
          {/* end row */}
        </div>
        {/* end container */}
      </section>
      {/* end features */}

      {/* start plan */}
      <section className="section bg-light" id="plans">
        <div className="bg-overlay bg-overlay-pattern"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center mb-5">
                <h3 className="mb-3 fw-semibold">
                  Choose the plan that's right for you
                </h3>
                <p className="text-muted mb-4">
                  Simple pricing. No hidden fees. Advanced features for you
                  business.
                </p>

                <div className="d-flex justify-content-center align-items-center">
                  <div>
                    <h5 className="fs-14 mb-0">Month</h5>
                  </div>
                  <div
                    className="form-check form-switch fs-20 ms-3 "
                    onClick={handlePlanSwitch}
                  >
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="plan-switch"
                      checked={isAnnual}
                      onChange={() => {}}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="plan-switch"
                    ></label>
                  </div>
                  <div>
                    <h5 className="fs-14 mb-0">
                      Annual{" "}
                      <span className="badge bg-success-subtle text-success">
                        Save 20%
                      </span>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            {/* end col */}
          </div>
          {/* end row */}

          <div className="row gy-4">
            <div className="col-lg-4">
              <div className="card plan-box mb-0">
                <div className="card-body p-4 m-2">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <h5 className="mb-1 fw-semibold">Basic Plan</h5>
                      <p className="text-muted mb-0">For Startup</p>
                    </div>
                    <div className="avatar-sm">
                      <div className="avatar-title bg-light rounded-circle text-primary">
                        <i className="ri-book-mark-line fs-20"></i>
                      </div>
                    </div>
                  </div>
                  <div className="py-4 text-center">
                    {isAnnual ? (
                      <h1 className="annual">
                        <sup>
                          <small>$</small>
                        </sup>
                        <span className="ff-secondary fw-bold">171</span>{" "}
                        <span className="fs-13 text-muted">/Year</span>
                      </h1>
                    ) : (
                      <h1 className="month">
                        <sup>
                          <small>$</small>
                        </sup>
                        <span className="ff-secondary fw-bold">19</span>{" "}
                        <span className="fs-13 text-muted">/Month</span>
                      </h1>
                    )}
                  </div>

                  <div>
                    <ul className="list-unstyled text-muted vstack gap-3 ff-secondary">
                      <li>
                        <div className="d-flex">
                          <div className="flex-shrink-0 text-success me-1">
                            <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                          </div>
                          <div className="flex-grow-1">
                            Upto <b>3</b> Projects
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex">
                          <div className="flex-shrink-0 text-success me-1">
                            <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                          </div>
                          <div className="flex-grow-1">
                            Upto <b>299</b> Customers
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex">
                          <div className="flex-shrink-0 text-success me-1">
                            <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                          </div>
                          <div className="flex-grow-1">Scalable Bandwidth</div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex">
                          <div className="flex-shrink-0 text-success me-1">
                            <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                          </div>
                          <div className="flex-grow-1">
                            <b>5</b> FTP Login
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex">
                          <div className="flex-shrink-0 text-danger me-1">
                            <i className="ri-close-circle-fill fs-15 align-middle"></i>
                          </div>
                          <div className="flex-grow-1">
                            <b>24/7</b> Support
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex">
                          <div className="flex-shrink-0 text-danger me-1">
                            <i className="ri-close-circle-fill fs-15 align-middle"></i>
                          </div>
                          <div className="flex-grow-1">
                            <b>Unlimited</b> Storage
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex">
                          <div className="flex-shrink-0 text-danger me-1">
                            <i className="ri-close-circle-fill fs-15 align-middle"></i>
                          </div>
                          <div className="flex-grow-1">Domain</div>
                        </div>
                      </li>
                    </ul>
                    <div className="mt-4">
                      <a
                        href="javascript:void(0);"
                        className="btn btn-soft-success w-100"
                      >
                        Get Started
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*end col*/}
            <div className="col-lg-4">
              <div className="card plan-box mb-0 ribbon-box right">
                <div className="card-body p-4 m-2">
                  <div className="ribbon-two ribbon-two-danger">
                    <span>Popular</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <h5 className="mb-1 fw-semibold">Pro Business</h5>
                      <p className="text-muted mb-0">Professional plans</p>
                    </div>
                    <div className="avatar-sm">
                      <div className="avatar-title bg-light rounded-circle text-primary">
                        <i className="ri-medal-fill fs-20"></i>
                      </div>
                    </div>
                  </div>
                  <div className="py-4 text-center">
                    {isAnnual ? (
                      <h1 className="annual">
                        <sup>
                          <small>$</small>
                        </sup>
                        <span className="ff-secondary fw-bold">261</span>{" "}
                        <span className="fs-13 text-muted">/Year</span>
                      </h1>
                    ) : (
                      <h1 className="month">
                        <sup>
                          <small>$</small>
                        </sup>
                        <span className="ff-secondary fw-bold">29</span>{" "}
                        <span className="fs-13 text-muted">/Month</span>
                      </h1>
                    )}
                  </div>

                  <div>
                    <ul className="list-unstyled text-muted vstack gap-3 ff-secondary">
                      <li>
                        <div className="d-flex">
                          <div className="flex-shrink-0 text-success me-1">
                            <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                          </div>
                          <div className="flex-grow-1">
                            Upto <b>15</b> Projects
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex">
                          <div className="flex-shrink-0 text-success me-1">
                            <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                          </div>
                          <div className="flex-grow-1">
                            <b>Unlimited</b> Customers
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex">
                          <div className="flex-shrink-0 text-success me-1">
                            <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                          </div>
                          <div className="flex-grow-1">Scalable Bandwidth</div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex">
                          <div className="flex-shrink-0 text-success me-1">
                            <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                          </div>
                          <div className="flex-grow-1">
                            <b>12</b> FTP Login
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex">
                          <div className="flex-shrink-0 text-success me-1">
                            <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                          </div>
                          <div className="flex-grow-1">
                            <b>24/7</b> Support
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex">
                          <div className="flex-shrink-0 text-danger me-1">
                            <i className="ri-close-circle-fill fs-15 align-middle"></i>
                          </div>
                          <div className="flex-grow-1">
                            <b>Unlimited</b> Storage
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex">
                          <div className="flex-shrink-0 text-danger me-1">
                            <i className="ri-close-circle-fill fs-15 align-middle"></i>
                          </div>
                          <div className="flex-grow-1">Domain</div>
                        </div>
                      </li>
                    </ul>
                    <div className="mt-4">
                      <a
                        href="javascript:void(0);"
                        className="btn btn-soft-success w-100"
                      >
                        Get Started
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*end col*/}
            <div className="col-lg-4">
              <div className="card plan-box mb-0">
                <div className="card-body p-4 m-2">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <h5 className="mb-1 fw-semibold">Platinum Plan</h5>
                      <p className="text-muted mb-0">Enterprise Businesses</p>
                    </div>
                    <div className="avatar-sm">
                      <div className="avatar-title bg-light rounded-circle text-primary">
                        <i className="ri-stack-fill fs-20"></i>
                      </div>
                    </div>
                  </div>
                  <div className="py-4 text-center">
                    {isAnnual ? (
                      <h1 className="annual">
                        <sup>
                          <small>$</small>
                        </sup>
                        <span className="ff-secondary fw-bold">351</span>{" "}
                        <span className="fs-13 text-muted">/Year</span>
                      </h1>
                    ) : (
                      <h1 className="month">
                        <sup>
                          <small>$</small>
                        </sup>
                        <span className="ff-secondary fw-bold">39</span>{" "}
                        <span className="fs-13 text-muted">/Month</span>
                      </h1>
                    )}
                  </div>

                  <div>
                    <ul className="list-unstyled text-muted vstack gap-3 ff-secondary">
                      <li>
                        <div className="d-flex">
                          <div className="flex-shrink-0 text-success me-1">
                            <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                          </div>
                          <div className="flex-grow-1">
                            <b>Unlimited</b> Projects
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex">
                          <div className="flex-shrink-0 text-success me-1">
                            <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                          </div>
                          <div className="flex-grow-1">
                            <b>Unlimited</b> Customers
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex">
                          <div className="flex-shrink-0 text-success me-1">
                            <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                          </div>
                          <div className="flex-grow-1">Scalable Bandwidth</div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex">
                          <div className="flex-shrink-0 text-success me-1">
                            <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                          </div>
                          <div className="flex-grow-1">
                            <b>Unlimited</b> FTP Login
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex">
                          <div className="flex-shrink-0 text-success me-1">
                            <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                          </div>
                          <div className="flex-grow-1">
                            <b>24/7</b> Support
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex">
                          <div className="flex-shrink-0 text-success me-1">
                            <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                          </div>
                          <div className="flex-grow-1">
                            <b>Unlimited</b> Storage
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex">
                          <div className="flex-shrink-0 text-success me-1">
                            <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                          </div>
                          <div className="flex-grow-1">Domain</div>
                        </div>
                      </li>
                    </ul>
                    <div className="mt-4">
                      <a
                        href="javascript:void(0);"
                        className="btn btn-soft-success w-100"
                      >
                        Get Started
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}
        </div>
        {/* end container */}
      </section>
      {/* end plan */}

      {/* start faqs */}
      <section className="section" id="faqs">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center mb-5">
                <h3 className="mb-3 fw-semibold">Frequently Asked Questions</h3>
                <p className="text-muted mb-4 ff-secondary">
                  If you can not find answer to your question in our FAQ, you
                  can always contact us or email us. We will answer you shortly!
                </p>

                <div className="hstack gap-2 justify-content-center">
                  <button
                    type="button"
                    className="btn btn-primary btn-label rounded-pill"
                  >
                    <i className="ri-mail-line label-icon align-middle rounded-pill fs-16 me-2"></i>{" "}
                    Email Us
                  </button>
                  <button
                    type="button"
                    className="btn btn-info btn-label rounded-pill"
                  >
                    <i className="ri-twitter-line label-icon align-middle rounded-pill fs-16 me-2"></i>{" "}
                    Send Us Tweet
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* end row */}

          <div className="row g-lg-5 g-4">
            <div className="col-lg-6">
              <div className="d-flex align-items-center mb-2">
                <div className="flex-shrink-0 me-1">
                  <i className="ri-question-line fs-24 align-middle text-success me-1"></i>
                </div>
                <div className="flex-grow-1">
                  <h5 className="mb-0 fw-semibold">General Questions</h5>
                </div>
              </div>
              <div
                className="accordion custom-accordionwithicon custom-accordion-border accordion-border-box"
                id="genques-accordion"
              >
                <div className="accordion-item">
                  <h2 className="accordion-header" id="genques-headingOne">
                    <button
                      className={`accordion-button ${
                        activeAccordion === "genques-collapseOne"
                          ? ""
                          : "collapsed"
                      }`}
                      type="button"
                      onClick={() =>
                        handleAccordionClick("genques-collapseOne")
                      }
                    >
                      What is the purpose of using themes ?
                    </button>
                  </h2>
                  <div
                    id="genques-collapseOne"
                    className={`accordion-collapse collapse ${
                      activeAccordion === "genques-collapseOne" ? "show" : ""
                    }`}
                    aria-labelledby="genques-headingOne"
                    data-bs-parent="#genques-accordion"
                  >
                    <div className="accordion-body ff-secondary">
                      A theme is a set of colors, fonts, effects, and more that
                      can be applied to your entire presentation to give it a
                      consistent, professional look. You've already been using a
                      theme, even if you didn't know it: the default Office
                      theme, which consists.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="genques-headingTwo">
                    <button
                      className={`accordion-button ${
                        activeAccordion === "genques-collapseTwo"
                          ? ""
                          : "collapsed"
                      }`}
                      type="button"
                      onClick={() =>
                        handleAccordionClick("genques-collapseTwo")
                      }
                    >
                      Can a theme have more than one theme?
                    </button>
                  </h2>
                  <div
                    id="genques-collapseTwo"
                    className={`accordion-collapse collapse ${
                      activeAccordion === "genques-collapseTwo" ? "show" : ""
                    }`}
                    aria-labelledby="genques-headingTwo"
                    data-bs-parent="#genques-accordion"
                  >
                    <div className="accordion-body ff-secondary">
                      A story can have as many themes as the reader can identify
                      based on recurring patterns and parallels within the story
                      itself. In looking at ways to separate themes into a
                      hierarchy, we might find it useful to follow the example
                      of a single book.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="genques-headingThree">
                    <button
                      className={`accordion-button ${
                        activeAccordion === "genques-collapseThree"
                          ? ""
                          : "collapsed"
                      }`}
                      type="button"
                      onClick={() =>
                        handleAccordionClick("genques-collapseThree")
                      }
                    >
                      What are theme features?
                    </button>
                  </h2>
                  <div
                    id="genques-collapseThree"
                    className={`accordion-collapse collapse ${
                      activeAccordion === "genques-collapseThree" ? "show" : ""
                    }`}
                    aria-labelledby="genques-headingThree"
                    data-bs-parent="#genques-accordion"
                  >
                    <div className="accordion-body ff-secondary">
                      Theme features is a set of specific functionality that may
                      be enabled by theme authors. Themes must register each
                      individual Theme Feature that the author wishes to
                      support. Theme support functions should be called in the
                      theme's functions.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="genques-headingFour">
                    <button
                      className={`accordion-button ${
                        activeAccordion === "genques-collapseFour"
                          ? ""
                          : "collapsed"
                      }`}
                      type="button"
                      onClick={() =>
                        handleAccordionClick("genques-collapseFour")
                      }
                    >
                      What is simple theme?
                    </button>
                  </h2>
                  <div
                    id="genques-collapseFour"
                    className={`accordion-collapse collapse ${
                      activeAccordion === "genques-collapseFour" ? "show" : ""
                    }`}
                    aria-labelledby="genques-headingFour"
                    data-bs-parent="#genques-accordion"
                  >
                    <div className="accordion-body ff-secondary">
                      Simple is a free WordPress theme, by Themify, built
                      exactly what it is named for: simplicity. Immediately
                      upgrade the quality of your WordPress site with the simple
                      theme To use the built-in Chrome theme editor.
                    </div>
                  </div>
                </div>
              </div>
              {/*end accordion*/}
            </div>
            {/* end col */}
            <div className="col-lg-6">
              <div className="d-flex align-items-center mb-2">
                <div className="flex-shrink-0 me-1">
                  <i className="ri-shield-keyhole-line fs-24 align-middle text-success me-1"></i>
                </div>
                <div className="flex-grow-1">
                  <h5 className="mb-0 fw-semibold">Privacy &amp; Security</h5>
                </div>
              </div>

              <div
                className="accordion custom-accordionwithicon custom-accordion-border accordion-border-box"
                id="privacy-accordion"
              >
                <div className="accordion-item">
                  <h2 className="accordion-header" id="privacy-headingOne">
                    <button
                      className={`accordion-button ${
                        activePrivacyAccordion === "privacy-collapseOne"
                          ? ""
                          : "collapsed"
                      }`}
                      type="button"
                      onClick={() =>
                        handlePrivacyAccordionClick("privacy-collapseOne")
                      }
                    >
                      Does Word have night mode?
                    </button>
                  </h2>
                  <div
                    id="privacy-collapseOne"
                    className={`accordion-collapse collapse ${
                      activePrivacyAccordion === "privacy-collapseOne"
                        ? "show"
                        : ""
                    }`}
                    aria-labelledby="privacy-headingOne"
                    data-bs-parent="#privacy-accordion"
                  >
                    <div className="accordion-body ff-secondary">
                      You can run Microsoft Word in dark mode, which uses a dark
                      color palette to help reduce eye strain in low light
                      settings. You can choose to make the document white or
                      black using the Switch Modes button in the ribbon's View
                      tab.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="privacy-headingTwo">
                    <button
                      className={`accordion-button ${
                        activePrivacyAccordion === "privacy-collapseTwo"
                          ? ""
                          : "collapsed"
                      }`}
                      type="button"
                      onClick={() =>
                        handlePrivacyAccordionClick("privacy-collapseTwo")
                      }
                    >
                      Is theme an opinion?
                    </button>
                  </h2>
                  <div
                    id="privacy-collapseTwo"
                    className={`accordion-collapse collapse ${
                      activePrivacyAccordion === "privacy-collapseTwo"
                        ? "show"
                        : ""
                    }`}
                    aria-labelledby="privacy-headingTwo"
                    data-bs-parent="#privacy-accordion"
                  >
                    <div className="accordion-body ff-secondary">
                      A theme is an opinion the author expresses on the subject,
                      for instance, the author's dissatisfaction with the narrow
                      confines of French bourgeois marriage during that period
                      theme is an idea that a writer repeats.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="privacy-headingThree">
                    <button
                      className={`accordion-button ${
                        activePrivacyAccordion === "privacy-collapseThree"
                          ? ""
                          : "collapsed"
                      }`}
                      type="button"
                      onClick={() =>
                        handlePrivacyAccordionClick("privacy-collapseThree")
                      }
                    >
                      How do you develop a theme?
                    </button>
                  </h2>
                  <div
                    id="privacy-collapseThree"
                    className={`accordion-collapse collapse ${
                      activePrivacyAccordion === "privacy-collapseThree"
                        ? "show"
                        : ""
                    }`}
                    aria-labelledby="privacy-headingThree"
                    data-bs-parent="#privacy-accordion"
                  >
                    <div className="accordion-body ff-secondary">
                      A short story, novella, or novel presents a narrative to
                      its reader. Perhaps that narrative involves mystery,
                      terror, romance, comedy, or all of the above. These works
                      of fiction may also contain memorable characters, vivid
                      world-building, literary devices.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="privacy-headingFour">
                    <button
                      className={`accordion-button ${
                        activePrivacyAccordion === "privacy-collapseFour"
                          ? ""
                          : "collapsed"
                      }`}
                      type="button"
                      onClick={() =>
                        handlePrivacyAccordionClick("privacy-collapseFour")
                      }
                    >
                      Do stories need themes?
                    </button>
                  </h2>
                  <div
                    id="privacy-collapseFour"
                    className={`accordion-collapse collapse ${
                      activePrivacyAccordion === "privacy-collapseFour"
                        ? "show"
                        : ""
                    }`}
                    aria-labelledby="privacy-headingFour"
                    data-bs-parent="#privacy-accordion"
                  >
                    <div className="accordion-body ff-secondary">
                      A story can have as many themes as the reader can identify
                      based on recurring patterns and parallels within the story
                      itself. In looking at ways to separate themes into a
                      hierarchy, we might find it useful to follow the example
                      of a single book.
                    </div>
                  </div>
                </div>
              </div>
              {/*end accordion*/}
            </div>
            {/* end col */}
          </div>
          {/* end row */}
        </div>
        {/* end container */}
      </section>
      {/* end faqs */}

      {/* start review */}
      <section className="section bg-primary" id="reviews">
        <div className="bg-overlay bg-overlay-pattern"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="text-center">
                <div>
                  <i className="ri-double-quotes-l text-success display-3"></i>
                </div>
                <h4 className="text-white mb-5">
                  <span className="text-success">19k</span>+ Satisfied clients
                </h4>

                {/* Swiper */}
                <div className="position-relative">
                  <Swiper
                    modules={[Pagination, Autoplay]}
                    pagination={{ clickable: true }}
                    loop={true}
                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                    className="client-review-swiper rounded"
                    dir="ltr"
                  >
                    <SwiperSlide>
                      <div className="row justify-content-center">
                        <div className="col-10">
                          <div className="text-white-50 p-4">
                            <p className="fs-20 ff-secondary mb-4">
                              " I am giving 5 stars. Theme is great and everyone
                              one stuff everything in theme. Future request
                              should not affect current state of theme. "
                            </p>

                            <div>
                              <h5 className="text-white">gregoriusus</h5>
                              <p>- Skote User</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    {/* end slide */}
                    <SwiperSlide>
                      <div className="row justify-content-center">
                        <div className="col-10">
                          <div className="text-white-50 p-4">
                            <p className="fs-20 ff-secondary mb-4">
                              " Awesome support. Had few issues while setting up
                              because of my device, the support team helped me
                              fix them up in a day. Everything looks clean and
                              good. Highly recommended! "
                            </p>

                            <div>
                              <h5 className="text-white">GeekyGreenOwl</h5>
                              <p>- Skote User</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    {/* end slide */}
                    <SwiperSlide>
                      <div className="row justify-content-center">
                        <div className="col-10">
                          <div className="text-white-50 p-4">
                            <p className="fs-20 ff-secondary mb-4">
                              " Amazing template, Redux store and components is
                              nicely designed. It's a great start point for an
                              admin-based project. Clean Code and good
                              documentation. Template is completely in React and
                              absolutely no usage of jQuery "
                            </p>

                            <div>
                              <h5 className="text-white">sreeks456</h5>
                              <p>- Veltrix User</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    {/* end slide */}
                  </Swiper>
                  <div className="swiper-pagination"></div>
                </div>
              </div>
            </div>
            {/* end col */}
          </div>
          {/* end row */}
        </div>
        {/* end container */}
      </section>
      {/* end review */}

      {/* start counter */}
      <section className="py-5 position-relative bg-light">
        <div className="container">
          <div className="row text-center gy-4">
            <div className="col-lg-3 col-6">
              <div>
                <h2 className="mb-2">
                  <span className="counter-value" data-target="100">
                    100
                  </span>
                  +
                </h2>
                <div className="text-muted">Projects Completed</div>
              </div>
            </div>
            {/* end col */}

            <div className="col-lg-3 col-6">
              <div>
                <h2 className="mb-2">
                  <span className="counter-value" data-target="24">
                    24
                  </span>
                </h2>
                <div className="text-muted">Win Awards</div>
              </div>
            </div>
            {/* end col */}

            <div className="col-lg-3 col-6">
              <div>
                <h2 className="mb-2">
                  <span className="counter-value" data-target="20.3">
                    20.3
                  </span>
                  k
                </h2>
                <div className="text-muted">Satisfied Clients</div>
              </div>
            </div>
            {/* end col */}
            <div className="col-lg-3 col-6">
              <div>
                <h2 className="mb-2">
                  <span className="counter-value" data-target="50">
                    50
                  </span>
                </h2>
                <div className="text-muted">Employees</div>
              </div>
            </div>
            {/* end col */}
          </div>
          {/* end row */}
        </div>
        {/* end container */}
      </section>
      {/* end counter */}

      {/* start Work Process */}
      <section className="section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center mb-5">
                <h3 className="mb-3 fw-semibold">Our Work Process</h3>
                <p className="text-muted mb-4 ff-secondary">
                  In an ideal world this website wouldn’t exist, a client would
                  acknowledge the importance of having web copy before the Proin
                  vitae ipsum vel ex finibus semper design starts.
                </p>
              </div>
            </div>
          </div>
          {/* end row */}

          <div className="row text-center">
            <div className="col-lg-4">
              <div className="process-card mt-4">
                <div className="process-arrow-img d-none d-lg-block">
                  <Image
                    src="/images/landing/process-arrow-img.png"
                    alt="Process Arrow"
                    height="50"
                    width="100"
                  />
                </div>
                <div className="avatar-sm icon-effect mx-auto mb-4">
                  <div className="avatar-title bg-transparent text-success rounded-circle h1">
                    <i className="ri-quill-pen-line"></i>
                  </div>
                </div>

                <h5>Tell us what you need</h5>
                <p className="text-muted ff-secondary">
                  The profession and the employer and your desire to make your
                  mark.
                </p>
              </div>
            </div>
            {/* end col */}
            <div className="col-lg-4">
              <div className="process-card mt-4">
                <div className="process-arrow-img d-none d-lg-block">
                  <Image
                    src="/images/landing/process-arrow-img.png"
                    alt="Process Arrow"
                    height="50"
                    width="100"
                  />
                </div>
                <div className="avatar-sm icon-effect mx-auto mb-4">
                  <div className="avatar-title bg-transparent text-success rounded-circle h1">
                    <i className="ri-user-follow-line"></i>
                  </div>
                </div>

                <h5>Get free quotes</h5>
                <p className="text-muted ff-secondary">
                  The most important aspect of beauty was, therefore, an
                  inherent part.
                </p>
              </div>
            </div>
            {/* end col */}
            <div className="col-lg-4">
              <div className="process-card mt-4">
                <div className="avatar-sm icon-effect mx-auto mb-4">
                  <div className="avatar-title bg-transparent text-success rounded-circle h1">
                    <i className="ri-book-mark-line"></i>
                  </div>
                </div>

                <h5>Deliver high quality product</h5>
                <p className="text-muted ff-secondary">
                  We quickly learn to fear and thus automatically avoid
                  potentially.
                </p>
              </div>
            </div>
            {/* end col */}
          </div>
          {/* end row */}
        </div>
        {/* end container */}
      </section>
      {/* end Work Process */}

      {/* start team */}
      <section className="section bg-light" id="team">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center mb-5">
                <h3 className="mb-3 fw-semibold">
                  Our <span className="text-danger">Team</span>
                </h3>
                <p className="text-muted mb-4 ff-secondary">
                  To achieve this, it would be necessary to have uniform
                  grammar, pronunciation and more common words. If several
                  languages coalesce the grammar.
                </p>
              </div>
            </div>
          </div>
          {/* end row */}
          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <div className="card">
                <div className="card-body text-center p-4">
                  <div className="avatar-xl mx-auto mb-4 position-relative">
                    <Image
                      src="/images/users/avatar-2.jpg"
                      alt="Nancy Martino"
                      height="120"
                      width="120"
                    />
                    <a
                      href="apps-mailbox.html"
                      className="btn btn-success btn-sm position-absolute bottom-0 end-0 rounded-circle avatar-xs"
                    >
                      <div className="avatar-title bg-transparent">
                        <i className="ri-mail-fill align-bottom"></i>
                      </div>
                    </a>
                  </div>
                  {/* end card body */}
                  <h5 className="mb-1">
                    <a href="/pages/profile" className="text-body">
                      Nancy Martino
                    </a>
                  </h5>
                  <p className="text-muted mb-0 ff-secondary">Team Leader</p>
                </div>
              </div>
              {/* end card */}
            </div>
            {/* end col */}
            <div className="col-lg-3 col-sm-6">
              <div className="card">
                <div className="card-body text-center p-4">
                  <div className="avatar-xl mx-auto mb-4 position-relative">
                    <Image
                      src="/images/users/avatar-10.jpg"
                      alt="Henry Baird"
                      height="120"
                      width="120"
                    />
                    <a
                      href="apps-mailbox.html"
                      className="btn btn-success btn-sm position-absolute bottom-0 end-0 rounded-circle avatar-xs"
                    >
                      <div className="avatar-title bg-transparent">
                        <i className="ri-mail-fill align-bottom"></i>
                      </div>
                    </a>
                  </div>
                  {/* end card body */}
                  <h5 className="mb-1">
                    <a href="/pages/profile" className="text-body">
                      Henry Baird
                    </a>
                  </h5>
                  <p className="text-muted mb-0 ff-secondary">
                    Full Stack Developer
                  </p>
                </div>
              </div>
              {/* end card */}
            </div>
            {/* end col */}
            <div className="col-lg-3 col-sm-6">
              <div className="card">
                <div className="card-body text-center p-4">
                  <div className="avatar-xl mx-auto mb-4 position-relative">
                    <Image
                      src="/images/users/avatar-3.jpg"
                      alt="Frank Hook"
                      height="120"
                      width="120"
                    />
                    <a
                      href="apps-mailbox.html"
                      className="btn btn-success btn-sm position-absolute bottom-0 end-0 rounded-circle avatar-xs"
                    >
                      <div className="avatar-title bg-transparent">
                        <i className="ri-mail-fill align-bottom"></i>
                      </div>
                    </a>
                  </div>
                  {/* end card body */}
                  <h5 className="mb-1">
                    <a href="/pages/profile" className="text-body">
                      Frank Hook
                    </a>
                  </h5>
                  <p className="text-muted mb-0 ff-secondary">
                    Project Manager
                  </p>
                </div>
              </div>
              {/* end card */}
            </div>
            {/* end col */}
            <div className="col-lg-3 col-sm-6">
              <div className="card">
                <div className="card-body text-center p-4">
                  <div className="avatar-xl mx-auto mb-4 position-relative">
                    <Image
                      src="/images/users/avatar-8.jpg"
                      alt="Donald Palmer"
                      height="120"
                      width="120"
                    />
                    <a
                      href="apps-mailbox.html"
                      className="btn btn-success btn-sm position-absolute bottom-0 end-0 rounded-circle avatar-xs"
                    >
                      <div className="avatar-title bg-transparent">
                        <i className="ri-mail-fill align-bottom"></i>
                      </div>
                    </a>
                  </div>
                  {/* end card body */}
                  <h5 className="mb-1">
                    <a href="/pages/profile" className="text-body">
                      Donald Palmer
                    </a>
                  </h5>
                  <p className="text-muted mb-0 ff-secondary">UI/UX Designer</p>
                </div>
              </div>
              {/* end card */}
            </div>
            {/* end col */}
          </div>
          {/* end row */}
          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <div className="card">
                <div className="card-body text-center p-4">
                  <div className="avatar-xl mx-auto mb-4 position-relative">
                    <Image
                      src="/images/users/avatar-5.jpg"
                      alt="Erica Kernan"
                      height="120"
                      width="120"
                    />
                    <a
                      href="apps-mailbox.html"
                      className="btn btn-success btn-sm position-absolute bottom-0 end-0 rounded-circle avatar-xs"
                    >
                      <div className="avatar-title bg-transparent">
                        <i className="ri-mail-fill align-bottom"></i>
                      </div>
                    </a>
                  </div>
                  {/* end card body */}
                  <h5 className="mb-1">
                    <a href="/pages/profile" className="text-body">
                      Erica Kernan
                    </a>
                  </h5>
                  <p className="text-muted mb-0 ff-secondary">Web Designer</p>
                </div>
              </div>
              {/* end card */}
            </div>
            {/* end col */}
            <div className="col-lg-3 col-sm-6">
              <div className="card">
                <div className="card-body text-center p-4">
                  <div className="avatar-xl mx-auto mb-4 position-relative">
                    <Image
                      src="/images/users/avatar-4.jpg"
                      alt="Alexis Clarke"
                      height="120"
                      width="120"
                    />
                    <a
                      href="apps-mailbox.html"
                      className="btn btn-success btn-sm position-absolute bottom-0 end-0 rounded-circle avatar-xs"
                    >
                      <div className="avatar-title bg-transparent">
                        <i className="ri-mail-fill align-bottom"></i>
                      </div>
                    </a>
                  </div>
                  {/* end card body */}
                  <h5 className="mb-1">
                    <a href="/pages/profile" className="text-body">
                      Alexis Clarke
                    </a>
                  </h5>
                  <p className="text-muted mb-0 ff-secondary">
                    Backend Developer
                  </p>
                </div>
              </div>
              {/* end card */}
            </div>
            {/* end col */}
            <div className="col-lg-3 col-sm-6">
              <div className="card">
                <div className="card-body text-center p-4">
                  <div className="avatar-xl mx-auto mb-4 position-relative">
                    <Image
                      src="/images/users/avatar-6.jpg"
                      alt="Marie Ward"
                      height="120"
                      width="120"
                    />
                    <a
                      href="apps-mailbox.html"
                      className="btn btn-success btn-sm position-absolute bottom-0 end-0 rounded-circle avatar-xs"
                    >
                      <div className="avatar-title bg-transparent">
                        <i className="ri-mail-fill align-bottom"></i>
                      </div>
                    </a>
                  </div>
                  {/* end card body */}
                  <h5 className="mb-1">
                    <a href="/pages/profile" className="text-body">
                      Marie Ward
                    </a>
                  </h5>
                  <p className="text-muted mb-0 ff-secondary">
                    Full Stack Developer
                  </p>
                </div>
              </div>
              {/* end card */}
            </div>
            {/* end col */}
            <div className="col-lg-3 col-sm-6">
              <div className="card">
                <div className="card-body text-center p-4">
                  <div className="avatar-xl mx-auto mb-4 position-relative">
                    <Image
                      src="/images/users/avatar-2.jpg"
                      alt="Jack Gough"
                      height="120"
                      width="120"
                    />
                    <a
                      href="apps-mailbox.html"
                      className="btn btn-success btn-sm position-absolute bottom-0 end-0 rounded-circle avatar-xs"
                    >
                      <div className="avatar-title bg-transparent">
                        <i className="ri-mail-fill align-bottom"></i>
                      </div>
                    </a>
                  </div>
                  {/* end card body */}
                  <h5 className="mb-1">
                    <a href="/pages/profile" className="text-body">
                      Jack Gough
                    </a>
                  </h5>
                  <p className="text-muted mb-0 ff-secondary">
                    React App Developer
                  </p>
                </div>
              </div>
              {/* end card */}
            </div>
            {/* end col */}
          </div>
          {/* end row */}
        </div>
        {/* end container */}
      </section>
      {/* end team */}

      {/* start contact */}
      <section className="section" id="contact">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center mb-5">
                <h3 className="mb-3 fw-semibold">Get In Touch</h3>
                <p className="text-muted mb-4 ff-secondary">
                  We thrive when coming up with innovative ideas but also
                  understand that a smart concept should be supported with
                  measurable results.
                </p>
              </div>
            </div>
          </div>
          {/* end row */}

          <div className="row gy-4">
            <div className="col-lg-4">
              <div>
                <div className="mt-4">
                  <h5 className="fs-13 text-muted text-uppercase">
                    Office Address 1:
                  </h5>
                  <div className="ff-secondary fw-semibold">
                    4461 Cedar Street Moro, AR 72368
                  </div>
                </div>
                <div className="mt-4">
                  <h5 className="fs-13 text-muted text-uppercase">
                    Office Address 2:
                  </h5>
                  <div className="ff-secondary fw-semibold">
                    2824 Rogers Street Cincinnati, OH 45202
                  </div>
                </div>
                <div className="mt-4">
                  <h5 className="fs-13 text-muted text-uppercase">
                    Working Hours:
                  </h5>
                  <div className="ff-secondary fw-semibold">
                    9:00am to 6:00pm
                  </div>
                </div>
              </div>
            </div>
            {/* end col */}
            <div className="col-lg-8">
              <div>
                <form>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="mb-4">
                        <label htmlFor="name" className="form-label fs-13">
                          Name
                        </label>
                        <input
                          name="name"
                          id="name"
                          type="text"
                          className="form-control bg-light border-light"
                          placeholder="Your name*"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="mb-4">
                        <label htmlFor="email" className="form-label fs-13">
                          Email
                        </label>
                        <input
                          name="email"
                          id="email"
                          type="email"
                          className="form-control bg-light border-light"
                          placeholder="Your email*"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="mb-4">
                        <label htmlFor="subject" className="form-label fs-13">
                          Subject
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-light"
                          id="subject"
                          name="subject"
                          placeholder="Your Subject.."
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="mb-3">
                        <label htmlFor="comments" className="form-label fs-13">
                          Message
                        </label>
                        <textarea
                          name="comments"
                          id="comments"
                          rows={3}
                          className="form-control bg-light border-light"
                          placeholder="Your message..."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 text-end">
                      <input
                        type="submit"
                        id="submit"
                        name="send"
                        className="submitBnt btn btn-primary"
                        value="Send Message"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* end row */}
        </div>
        {/* end container */}
      </section>
      {/* end contact */}
      {/* start cta */}
      <section className="py-5 bg-primary position-relative">
        <div className="bg-overlay bg-overlay-pattern opacity-50"></div>
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-sm">
              <div>
                <h4 className="text-white mb-0 fw-semibold">
                  Build your web App/SaaS with Velzon dashboard
                </h4>
              </div>
            </div>
            {/* end col */}
            <div className="col-sm-auto">
              <div>
                <a
                  href="https://1.envato.market/velzon-admin"
                  target="_blank"
                  className="btn bg-gradient btn-danger"
                >
                  <i className="ri-shopping-cart-2-line align-middle me-1"></i>{" "}
                  Buy Now
                </a>
              </div>
            </div>
            {/* end col */}
          </div>
          {/* end row */}
        </div>
        {/* end container */}
      </section>
      {/* end cta */}
      {/* start footer */}
      <footer className="custom-footer bg-dark py-5 position-relative">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mt-4">
              <div>
                <div>
                  <Image
                    src="/images/logo-light.png"
                    alt="logo light"
                    height="17"
                    width="85"
                  />
                </div>
                <div className="mt-4 fs-13">
                  <p>Premium Admin & Dashboard Template</p>
                  <p className="ff-secondary">
                    You can build any type of web application like eCommerce,
                    CRM, CMS, Project management apps, Admin Panels, etc using
                    Velzon.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-7 ms-lg-auto">
              <div className="row">
                <div className="col-sm-4 mt-4">
                  <h5 className="text-white mb-0">Company</h5>
                  <div className="text-muted mt-3">
                    <ul className="list-unstyled ff-secondary footer-list">
                      <li>
                        <Link href="/profile">About Us</Link>
                      </li>
                      <li>
                        <Link href="/gallery">Gallery</Link>
                      </li>
                      <li>
                        <Link href="/apps-projects-overview">Projects</Link>
                      </li>
                      <li>
                        <Link href="/timeline">Timeline</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-sm-4 mt-4">
                  <h5 className="text-white mb-0">Apps Pages</h5>
                  <div className="text-muted mt-3">
                    <ul className="list-unstyled ff-secondary footer-list">
                      <li>
                        <Link href="/apps-calendar">Calendar</Link>
                      </li>
                      <li>
                        <Link href="/apps-mailbox">Mailbox</Link>
                      </li>
                      <li>
                        <Link href="/apps-chat">Chat</Link>
                      </li>
                      <li>
                        <Link href="/apps-crm-deals">Deals</Link>
                      </li>
                      <li>
                        <Link href="/apps-tasks-list-view">Tasks</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-sm-4 mt-4">
                  <h5 className="text-white mb-0">Support</h5>
                  <div className="text-muted mt-3">
                    <ul className="list-unstyled ff-secondary footer-list">
                      <li>
                        <Link href="/faqs">FAQ</Link>
                      </li>
                      <li>
                        <Link href="#contact">Contact</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row text-center text-sm-start align-items-center mt-5">
            <div className="col-sm-6">
              <div>
                <p className="copy-rights mb-0">
                  {new Date().getFullYear()} © Velzon - Themesbrand
                </p>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="text-sm-end mt-3 mt-sm-0">
                <ul className="list-inline mb-0 footer-social-link">
                  <li className="list-inline-item">
                    <a
                      href="javascript: void(0);"
                      className="avatar-xs d-block"
                    >
                      <div className="avatar-title rounded-circle">
                        <i className="ri-facebook-fill"></i>
                      </div>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href="javascript: void(0);"
                      className="avatar-xs d-block"
                    >
                      <div className="avatar-title rounded-circle">
                        <i className="ri-github-fill"></i>
                      </div>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href="javascript: void(0);"
                      className="avatar-xs d-block"
                    >
                      <div className="avatar-title rounded-circle">
                        <i className="ri-linkedin-fill"></i>
                      </div>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href="javascript: void(0);"
                      className="avatar-xs d-block"
                    >
                      <div className="avatar-title rounded-circle">
                        <i className="ri-google-fill"></i>
                      </div>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href="javascript: void(0);"
                      className="avatar-xs d-block"
                    >
                      <div className="avatar-title rounded-circle">
                        <i className="ri-dribbble-line"></i>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* end footer */}
    </div>
  );
};

export default LandingPage;
