"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const JobLandingPage = () => {
  const [isNavbarShrunk, setIsNavbarShrunk] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsNavbarShrunk(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
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
        <div className="container-fluid custom-container">
          <Link href="/" className="navbar-brand">
            <Image
              src="/images/logo-dark.png"
              alt="logo dark"
              height={17}
              width={100}
              className="card-logo card-logo-dark"
            />
            <Image
              src="/images/logo-light.png"
              alt="logo light"
              height={17}
              width={100}
              className="card-logo card-logo-light"
            />
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
                <Link className="nav-link active" href="#hero">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#process">
                  Process
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#categories">
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#findJob">
                  Find Jobs
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#candidates">
                  Candidates
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#blog">
                  Blog
                </Link>
              </li>
            </ul>

            <div className="">
              <Link href="/auth/signin/basic" className="btn btn-soft-primary">
                <i className="ri-user-3-line align-bottom me-1"></i> Login &
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {/* end navbar */}

      {/* start hero section */}
      <section className="section job-hero-section bg-light pb-0" id="hero">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-lg-6">
              <div>
                <h1 className="display-6 fw-semibold text-capitalize mb-3 lh-base">
                  Find your next job and build your dream here
                </h1>
                <p className="lead text-muted lh-base mb-4">
                  Find jobs, create trackable resumes and enrich your
                  applications. Carefully crafted after analyzing the needs of
                  different industries.
                </p>
                <form action="#" className="job-panel-filter">
                  <div className="row g-md-0 g-2">
                    <div className="col-md-4">
                      <div>
                        <input
                          type="search"
                          id="job-title"
                          className="form-control filter-input-box"
                          placeholder="Job, Company name..."
                        />
                      </div>
                    </div>
                    {/*end col*/}
                    <div className="col-md-4">
                      <div>
                        <select className="form-control" data-choices>
                          <option value="">Select job type</option>
                          <option value="Full Time">Full Time</option>
                          <option value="Part Time">Part Time</option>
                          <option value="Freelance">Freelance</option>
                          <option value="Internship">Internship</option>
                        </select>
                      </div>
                    </div>
                    {/*end col*/}
                    <div className="col-md-4">
                      <div className="h-100">
                        <button
                          className="btn btn-primary submit-btn w-100 h-100"
                          type="submit"
                        >
                          <i className="ri-search-2-line align-bottom me-1"></i>{" "}
                          Find Job
                        </button>
                      </div>
                    </div>
                    {/*end col*/}
                  </div>
                  {/*end row*/}
                </form>

                <ul className="treding-keywords list-inline mb-0 mt-3 fs-13">
                  <li className="list-inline-item text-danger fw-semibold">
                    <i className="mdi mdi-tag-multiple-outline align-middle"></i>{" "}
                    Trending Keywords:
                  </li>
                  <li className="list-inline-item">
                    <Link href="#!">Design,</Link>
                  </li>
                  <li className="list-inline-item">
                    <Link href="#!">Development,</Link>
                  </li>
                  <li className="list-inline-item">
                    <Link href="#!">Manager,</Link>
                  </li>
                  <li className="list-inline-item">
                    <Link href="#!">Senior</Link>
                  </li>
                </ul>
              </div>
            </div>
            {/*end col*/}
            <div className="col-lg-4">
              <div className="position-relative home-img text-center mt-5 mt-lg-0">
                <div className="card p-3 rounded shadow-lg inquiry-box">
                  <div className="d-flex align-items-center">
                    <div className="avatar-sm flex-shrink-0 me-3">
                      <div className="avatar-title bg-warning-subtle text-warning rounded fs-18">
                        <i className="ri-mail-send-line"></i>
                      </div>
                    </div>
                    <h5 className="fs-15 lh-base mb-0">
                      Work Inquiry from velzon
                    </h5>
                  </div>
                </div>

                <div className="card p-3 rounded shadow-lg application-box">
                  <h5 className="fs-15 lh-base mb-3">Applications</h5>
                  <div className="avatar-group">
                    <a
                      href="javascript: void(0);"
                      className="avatar-group-item"
                      data-bs-toggle="tooltip"
                      data-bs-trigger="hover"
                      data-bs-placement="top"
                      title="Brent Gonzalez"
                    >
                      <div className="avatar-xs">
                        <Image
                          src="/images/users/avatar-3.jpg"
                          alt="User Avatar"
                          className="rounded-circle img-fluid"
                          height={32}
                          width={32}
                        />
                      </div>
                    </a>
                    <a
                      href="javascript: void(0);"
                      className="avatar-group-item"
                      data-bs-toggle="tooltip"
                      data-bs-trigger="hover"
                      data-bs-placement="top"
                      title="Ellen Smith"
                    >
                      <div className="avatar-xs">
                        <div className="avatar-title rounded-circle bg-danger">
                          S
                        </div>
                      </div>
                    </a>
                    <a
                      href="javascript: void(0);"
                      className="avatar-group-item"
                      data-bs-toggle="tooltip"
                      data-bs-trigger="hover"
                      data-bs-placement="top"
                      title="Ellen Smith"
                    >
                      <div className="avatar-xs">
                        <Image
                          src="/images/users/avatar-10.jpg"
                          alt="User Avatar"
                          className="rounded-circle img-fluid"
                          height={32}
                          width={32}
                        />
                      </div>
                    </a>
                    <a
                      href="javascript: void(0);"
                      className="avatar-group-item"
                      data-bs-toggle="tooltip"
                      data-bs-trigger="hover"
                      data-bs-placement="top"
                    >
                      <div className="avatar-xs">
                        <div className="avatar-title rounded-circle bg-success">
                          Z
                        </div>
                      </div>
                    </a>
                    <a
                      href="javascript: void(0);"
                      className="avatar-group-item"
                      data-bs-toggle="tooltip"
                      data-bs-trigger="hover"
                      data-bs-placement="top"
                      title="Brent Gonzalez"
                    >
                      <div className="avatar-xs">
                        <Image
                          src="/images/users/avatar-9.jpg"
                          alt="User Avatar"
                          className="rounded-circle img-fluid"
                          height={32}
                          width={32}
                        />
                      </div>
                    </a>
                    <a
                      href="javascript: void(0);"
                      className="avatar-group-item"
                      data-bs-toggle="tooltip"
                      data-bs-trigger="hover"
                      data-bs-placement="top"
                      title="More Appliances"
                    >
                      <div className="avatar-xs">
                        <div className="avatar-title fs-13 rounded-circle bg-light border-dashed border text-primary">
                          2k+
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
                <Image
                  src="/images/job-profile2.png"
                  alt="Job Profile Image"
                  className="user-img"
                  height={500}
                  width={500}
                />

                <div className="circle-effect">
                  <div className="circle"></div>
                  <div className="circle2"></div>
                  <div className="circle3"></div>
                  <div className="circle4"></div>
                </div>
              </div>
            </div>
          </div>
          {/* end row */}
        </div>
        {/* end container */}
      </section>
      {/* end hero section */}

      <section className="section" id="process">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center mb-5">
                <h1 className="mb-3 ff-secondary fw-semibold lh-base">
                  How <span className="text-primary">it's work</span> creative
                  jobs & quickly features
                </h1>
                <p className="text-muted">
                  A creative person has the ability to invent and develop
                  original ideas, especially in the arts. Like so many creative
                  people, he was never satisfied.
                </p>
              </div>
            </div>
            {/* end col */}
          </div>
          {/*end row*/}
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="card shadow-lg">
                <div className="card-body p-4">
                  <h1 className="fw-bold display-5 ff-secondary mb-4 text-success position-relative">
                    <div className="job-icon-effect"></div>
                    <span>1</span>
                  </h1>
                  <h6 className="fs-17 mb-2">Register Account</h6>
                  <p className="text-muted mb-0 fs-15">
                    First, You need to make a account.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card shadow-none">
                <div className="card-body p-4">
                  <h1 className="fw-bold display-5 ff-secondary mb-4 text-success position-relative">
                    <div className="job-icon-effect"></div>
                    <span>2</span>
                  </h1>
                  <h6 className="fs-17 mb-2">Create Resume</h6>
                  <p className="text-muted mb-0 fs-15">
                    Create a resume for your job.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card shadow-none">
                <div className="card-body p-4">
                  <h1 className="fw-bold display-5 ff-secondary mb-4 text-success position-relative">
                    <div className="job-icon-effect"></div>
                    <span>3</span>
                  </h1>

                  <h6 className="fs-17 mb-2">Find Job</h6>
                  <p className="text-muted mb-0 fs-15">
                    Search for your dream jobs from velzon.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card shadow-none">
                <div className="card-body p-4">
                  <h1 className="fw-bold display-5 ff-secondary mb-4 text-success position-relative">
                    <div className="job-icon-effect"></div>
                    <span>4</span>
                  </h1>
                  <h6 className="fs-17 mb-2">Apply Job</h6>
                  <p className="text-muted mb-0 fs-15">
                    Apply to the company and wait for interview.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*end container*/}
      </section>

      {/* start features */}
      <section className="section">
        <div className="container">
          <div className="row align-items-center justify-content-lg-between justify-content-center gy-4">
            <div className="col-lg-5 col-sm-7">
              <div className="about-img-section mb-5 mb-lg-0 text-center">
                <div className="card rounded shadow-lg inquiry-box d-none d-lg-block">
                  <div className="card-body d-flex align-items-center">
                    <div className="avatar-sm flex-shrink-0 me-3">
                      <div className="avatar-title bg-secondary-subtle text-secondary rounded-circle fs-18">
                        <i className="ri-briefcase-2-line"></i>
                      </div>
                    </div>
                    <h5 className="fs-15 lh-base mb-0">
                      Search Over{" "}
                      <span className="text-secondary fw-semibold">
                        1,00,000+
                      </span>{" "}
                      Jobs
                    </h5>
                  </div>
                </div>

                <div className="card feedback-box">
                  <div className="card-body d-flex shadow-lg">
                    <div className="flex-shrink-0 me-3">
                      <Image
                        src="/images/users/avatar-10.jpg"
                        alt="User Avatar"
                        className="avatar-sm rounded-circle"
                        height={32}
                        width={32}
                      />
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="fs-14 lh-base mb-0">Tonya Noble</h5>
                      <p className="text-muted fs-11 mb-1">UI/UX Designer</p>

                      <div className="text-warning">
                        <i className="ri-star-s-fill"></i>
                        <i className="ri-star-s-fill"></i>
                        <i className="ri-star-s-fill"></i>
                        <i className="ri-star-s-fill"></i>
                        <i className="ri-star-s-line"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <Image
                  src="/images/about.jpg"
                  alt="About Us Image"
                  className="img-fluid mx-auto rounded-3"
                  height={500}
                  width={500}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-muted">
                <h1 className="mb-3 lh-base">
                  Find Your <span className="text-primary">Dream Job</span> in
                  One Place
                </h1>
                <p className="ff-secondary fs-16 mb-2">
                  The first step in finding your <b>dream job </b> is deciding
                  where to look for first-hand insight. Contact professionals
                  who are already working in industries or positions that
                  interest you.
                </p>
                <p className="ff-secondary fs-16">
                  Schedule informational interviews and phone calls or ask for
                  the opportunity to shadow them on the job.
                </p>

                <div className="vstack gap-2 mb-4 pb-1">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 me-2">
                      <div className="avatar-xs icon-effect">
                        <div className="avatar-title bg-transparent text-success rounded-circle h2">
                          <i className="ri-check-fill"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <p className="mb-0">Dynamic Content</p>
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

                <div>
                  <a href="#!" className="btn btn-primary">
                    Find Your Jobs{" "}
                    <i className="ri-arrow-right-line align-bottom ms-1"></i>
                  </a>
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

      {/* start services */}
      <section className="section bg-light" id="categories">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className="text-center mb-5">
                <h1 className="mb-3 ff-secondary fw-semibold text-capitalize lh-base">
                  High demand jobs{" "}
                  <span className="text-primary">Categories</span> featured
                </h1>
                <p className="text-muted">
                  Post a job to tell us about your project. We'll quickly match
                  you with the right freelancers.
                </p>
              </div>
            </div>
            {/* end col */}
          </div>
          {/* end row */}

          <div className="row justify-content-center">
            <div className="col-lg-3 col-md-6">
              <div className="card shadow-none text-center py-3">
                <div className="card-body py-4">
                  <div className="avatar-sm position-relative mb-4 mx-auto">
                    <div className="job-icon-effect"></div>
                    <div className="avatar-title bg-transparent text-success rounded-circle">
                      <i className="ri-pencil-ruler-2-line fs-1"></i>
                    </div>
                  </div>
                  <a href="#!" className="stretched-link">
                    <h5 className="fs-17 pt-1">IT & Software</h5>
                  </a>
                  <p className="mb-0 text-muted">1543 Jobs</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card shadow-none text-center py-3">
                <div className="card-body py-4">
                  <div className="avatar-sm position-relative mb-4 mx-auto">
                    <div className="job-icon-effect"></div>
                    <div className="avatar-title bg-transparent text-success rounded-circle">
                      <i className="ri-airplay-line fs-1"></i>
                    </div>
                  </div>
                  <a href="#!" className="stretched-link">
                    <h5 className="fs-17 pt-1">Construction / Facilities</h5>
                  </a>
                  <p className="mb-0 text-muted">3241 Jobs</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card shadow-none text-center py-3">
                <div className="card-body py-4">
                  <div className="avatar-sm mb-4 mx-auto position-relative">
                    <div className="job-icon-effect"></div>
                    <div className="avatar-title bg-transparent text-success rounded-circle">
                      <i className="ri-bank-line fs-1"></i>
                    </div>
                  </div>
                  <a href="#!" className="stretched-link">
                    <h5 className="fs-17 pt-1">Government</h5>
                  </a>
                  <p className="mb-0 text-muted">876 Jobs</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card shadow-none text-center py-3">
                <div className="card-body py-4">
                  <div className="avatar-sm position-relative mb-4 mx-auto">
                    <div className="job-icon-effect"></div>
                    <div className="avatar-title bg-transparent text-success rounded-circle">
                      <i className="ri-focus-2-line fs-1"></i>
                    </div>
                  </div>
                  <a href="#!" className="stretched-link">
                    <h5 className="fs-17 pt-1">Marketing & Advertising</h5>
                  </a>
                  <p className="mb-0 text-muted">465 Jobs</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card shadow-none text-center py-3">
                <div className="card-body py-4">
                  <div className="avatar-sm position-relative mb-4 mx-auto">
                    <div className="job-icon-effect"></div>
                    <div className="avatar-title bg-transparent text-success rounded-circle">
                      <i className="ri-pencil-ruler-line fs-1"></i>
                    </div>
                  </div>
                  <a href="#!" className="stretched-link">
                    <h5 className="fs-17 pt-1">Education & training</h5>
                  </a>
                  <p className="mb-0 text-muted">105 Jobs</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card shadow-none text-center py-3">
                <div className="card-body py-4">
                  <div className="avatar-sm position-relative mb-4 mx-auto">
                    <div className="job-icon-effect"></div>
                    <div className="avatar-title bg-transparent text-success rounded-circle">
                      <i className="ri-line-chart-line fs-1"></i>
                    </div>
                  </div>
                  <a href="#!" className="stretched-link">
                    <h5 className="fs-17 pt-1">Digital Marketing</h5>
                  </a>
                  <p className="mb-0 text-muted">377 Jobs</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card shadow-none text-center py-3">
                <div className="card-body py-4">
                  <div className="avatar-sm position-relative mb-4 mx-auto">
                    <div className="job-icon-effect"></div>
                    <div className="avatar-title bg-transparent text-success rounded-circle">
                      <i className="ri-briefcase-2-line fs-1"></i>
                    </div>
                  </div>
                  <a href="#!" className="stretched-link">
                    <h5 className="fs-17 pt-1">Catering & Tourism</h5>
                  </a>
                  <p className="mb-0 text-muted">85 Jobs</p>
                </div>
              </div>
            </div>
          </div>
          {/* end row */}
        </div>
        {/* end container */}
      </section>
      {/* end services */}

      {/* start cta */}
      <section className="py-5 bg-primary position-relative">
        <div className="bg-overlay bg-overlay-pattern opacity-50"></div>
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-sm">
              <div>
                <h4 className="text-white mb-2">Ready to Started?</h4>
                <p className="text-white-50 mb-0">
                  Create new account and refer your friend
                </p>
              </div>
            </div>
            {/* end col */}
            <div className="col-sm-auto">
              <div>
                <a href="#!" className="btn bg-gradient btn-danger">
                  Create Free Account
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

      <section className="section" id="findJob">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className="text-center mb-5">
                <h1 className="mb-3 ff-secondary fw-semibold text-capitalize lh-base">
                  Find Your <span className="text-primary">Career</span> You
                  Deserve it
                </h1>
                <p className="text-muted">
                  Post a job to tell us about your project. We'll quickly match
                  you with the right freelancers.
                </p>
              </div>
            </div>
            {/* end col */}
          </div>
          {/* end row */}

          <div className="row">
            <div className="col-lg-6">
              <div className="card shadow-lg">
                <div className="card-body">
                  <div className="d-flex">
                    <div className="avatar-sm">
                      <div className="avatar-title bg-warning-subtle rounded">
                        <Image
                          src="/images/companies/img-3.png"
                          alt="Company Logo"
                          className="avatar-xxs"
                          height={24}
                          width={24}
                        />
                      </div>
                    </div>
                    <div className="ms-3 flex-grow-1">
                      <a href="#!">
                        <h5>UI/UX designer</h5>
                      </a>
                      <ul className="list-inline text-muted mb-3">
                        <li className="list-inline-item">
                          <i className="ri-building-line align-bottom me-1"></i>{" "}
                          Nesta Technologies
                        </li>
                        <li className="list-inline-item">
                          <i className="ri-map-pin-2-line align-bottom me-1"></i>{" "}
                          USA
                        </li>
                        <li className="list-inline-item">
                          <i className="ri-money-dollar-circle-line align-bottom me-1"></i>{" "}
                          $23k - 35k
                        </li>
                      </ul>
                      <div className="hstack gap-2">
                        <span className="badge bg-success-subtle text-success">
                          Design
                        </span>
                        <span className="badge bg-danger-subtle text-danger">
                          UI/UX
                        </span>
                        <span className="badge bg-primary-subtle text-primary">
                          Adobe XD
                        </span>
                      </div>
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
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card shadow-lg">
                <div className="card-body">
                  <div className="d-flex">
                    <div className="avatar-sm">
                      <div className="avatar-title bg-primary-subtle rounded">
                        <Image
                          src="/images/companies/img-2.png"
                          alt="Company Logo"
                          className="avatar-xxs"
                          height={24}
                          width={24}
                        />
                      </div>
                    </div>
                    <div className="ms-3 flex-grow-1">
                      <a href="#!">
                        <h5>Product Sales Specialist</h5>
                      </a>
                      <ul className="list-inline text-muted mb-3">
                        <li className="list-inline-item">
                          <i className="ri-building-line align-bottom me-1"></i>{" "}
                          Digitech Galaxy
                        </li>
                        <li className="list-inline-item">
                          <i className="ri-map-pin-2-line align-bottom me-1"></i>{" "}
                          Spain
                        </li>
                        <li className="list-inline-item">
                          <i className="ri-money-dollar-circle-line align-bottom me-1"></i>{" "}
                          $10k - 15k
                        </li>
                      </ul>
                      <div className="hstack gap-2">
                        <span className="badge bg-primary-subtle text-primary">
                          Sales
                        </span>
                        <span className="badge bg-secondary-subtle text-secondary">
                          Product
                        </span>
                        <span className="badge bg-info-subtle text-info">
                          Business
                        </span>
                      </div>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="btn btn-ghost-primary btn-icon custom-toggle active"
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
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card shadow-lg">
                <div className="card-body">
                  <div className="d-flex">
                    <div className="avatar-sm">
                      <div className="avatar-title bg-danger-subtle rounded">
                        <Image
                          src="/images/companies/img-4.png"
                          alt="Company Logo"
                          className="avatar-xxs"
                          height={24}
                          width={24}
                        />
                      </div>
                    </div>
                    <div className="ms-3 flex-grow-1">
                      <a href="#!">
                        <h5>Marketing Director</h5>
                      </a>
                      <ul className="list-inline text-muted mb-3">
                        <li className="list-inline-item">
                          <i className="ri-building-line align-bottom me-1"></i>{" "}
                          Meta4Systems
                        </li>
                        <li className="list-inline-item">
                          <i className="ri-map-pin-2-line align-bottom me-1"></i>{" "}
                          Sweden
                        </li>
                        <li className="list-inline-item">
                          <i className="ri-money-dollar-circle-line align-bottom me-1"></i>{" "}
                          $20k - 25k
                        </li>
                      </ul>
                      <div className="hstack gap-2">
                        <span className="badge bg-warning-subtle text-warning">
                          Marketing
                        </span>
                        <span className="badge bg-info-subtle text-info">
                          Bussiness
                        </span>
                      </div>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="btn btn-ghost-primary btn-icon custom-toggle active"
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
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card shadow-lg">
                <div className="card-body">
                  <div className="d-flex">
                    <div className="avatar-sm">
                      <div className="avatar-title bg-success-subtle rounded">
                        <Image
                          src="/images/companies/img-9.png"
                          alt="Company Logo"
                          className="avatar-xxs"
                          height={24}
                          width={24}
                        />
                      </div>
                    </div>
                    <div className="ms-3 flex-grow-1">
                      <a href="#!">
                        <h5>Product Designer</h5>
                      </a>
                      <ul className="list-inline text-muted mb-3">
                        <li className="list-inline-item">
                          <i className="ri-building-line align-bottom me-1"></i>{" "}
                          Themesbrand
                        </li>
                        <li className="list-inline-item">
                          <i className="ri-map-pin-2-line align-bottom me-1"></i>{" "}
                          USA
                        </li>
                        <li className="list-inline-item">
                          <i className="ri-money-dollar-circle-line align-bottom me-1"></i>{" "}
                          $40k+
                        </li>
                      </ul>
                      <div className="hstack gap-2">
                        <span className="badge bg-success-subtle text-success">
                          Design
                        </span>
                        <span className="badge bg-danger-subtle text-danger">
                          UI/UX
                        </span>
                        <span className="badge bg-primary-subtle text-primary">
                          Adobe XD
                        </span>
                      </div>
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
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card shadow-lg">
                <div className="card-body">
                  <div className="d-flex">
                    <div className="avatar-sm">
                      <div className="avatar-title bg-info-subtle rounded">
                        <Image
                          src="/images/companies/img-1.png"
                          alt="Company Logo"
                          className="avatar-xxs"
                          height={24}
                          width={24}
                        />
                      </div>
                    </div>
                    <div className="ms-3 flex-grow-1">
                      <a href="#!">
                        <h5>Project Manager</h5>
                      </a>
                      <ul className="list-inline text-muted mb-3">
                        <li className="list-inline-item">
                          <i className="ri-building-line align-bottom me-1"></i>{" "}
                          Syntyce Solutions
                        </li>
                        <li className="list-inline-item">
                          <i className="ri-map-pin-2-line align-bottom me-1"></i>{" "}
                          Germany
                        </li>
                        <li className="list-inline-item">
                          <i className="ri-money-dollar-circle-line align-bottom me-1"></i>{" "}
                          $18k - 26k
                        </li>
                      </ul>
                      <div className="hstack gap-2">
                        <span className="badge bg-danger-subtle text-danger">
                          HR
                        </span>
                        <span className="badge bg-success-subtle text-success">
                          Manager
                        </span>
                      </div>
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
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card shadow-lg">
                <div className="card-body">
                  <div className="d-flex">
                    <div className="avatar-sm">
                      <div className="avatar-title bg-success-subtle rounded">
                        <Image
                          src="/images/companies/img-7.png"
                          alt="Company Logo"
                          className="avatar-xxs"
                          height={24}
                          width={24}
                        />
                      </div>
                    </div>
                    <div className="ms-3 flex-grow-1">
                      <a href="#!">
                        <h5>Business Associate</h5>
                      </a>
                      <ul className="list-inline text-muted mb-3">
                        <li className="list-inline-item">
                          <i className="ri-building-line align-bottom me-1"></i>{" "}
                          Nesta Technologies
                        </li>
                        <li className="list-inline-item">
                          <i className="ri-map-pin-2-line align-bottom me-1"></i>{" "}
                          USA
                        </li>
                        <li className="list-inline-item">
                          <i className="ri-money-dollar-circle-line align-bottom me-1"></i>{" "}
                          $23k - 35k
                        </li>
                      </ul>
                      <div className="hstack gap-2">
                        <span className="badge bg-success-subtle text-success">
                          Design
                        </span>
                        <span className="badge bg-danger-subtle text-danger">
                          UI/UX
                        </span>
                        <span className="badge bg-primary-subtle text-primary">
                          Adobe XD
                        </span>
                      </div>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="btn btn-ghost-primary btn-icon custom-toggle active"
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
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card shadow-lg">
                <div className="card-body">
                  <div className="d-flex">
                    <div className="avatar-sm">
                      <div className="avatar-title bg-info-subtle rounded">
                        <Image
                          src="/images/companies/img-8.png"
                          alt="Company Logo"
                          className="avatar-xxs"
                          height={24}
                          width={24}
                        />
                      </div>
                    </div>
                    <div className="ms-3 flex-grow-1">
                      <a href="#!">
                        <h5>Recruiting Coordinator</h5>
                      </a>
                      <ul className="list-inline text-muted mb-3">
                        <li className="list-inline-item">
                          <i className="ri-building-line align-bottom me-1"></i>{" "}
                          Zoetic Fashion
                        </li>
                        <li className="list-inline-item">
                          <i className="ri-map-pin-2-line align-bottom me-1"></i>{" "}
                          Namibia
                        </li>
                        <li className="list-inline-item">
                          <i className="ri-money-dollar-circle-line align-bottom me-1"></i>{" "}
                          $12k - 15k
                        </li>
                      </ul>
                      <div className="hstack gap-2">
                        <span className="badge bg-success-subtle text-success">
                          Full Time
                        </span>
                        <span className="badge bg-info-subtle text-info">
                          Remote
                        </span>
                        <span className="badge bg-primary-subtle text-primary">
                          Fashion
                        </span>
                      </div>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="btn btn-ghost-primary btn-icon custom-toggle active"
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
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card shadow-lg">
                <div className="card-body">
                  <div className="d-flex">
                    <div className="avatar-sm">
                      <div className="avatar-title bg-warning-subtle rounded">
                        <Image
                          src="/images/companies/img-5.png"
                          alt="Company Logo"
                          className="avatar-xxs"
                          height={24}
                          width={24}
                        />
                      </div>
                    </div>
                    <div className="ms-3 flex-grow-1">
                      <a href="#!">
                        <h5>Customs officer</h5>
                      </a>
                      <ul className="list-inline text-muted mb-3">
                        <li className="list-inline-item">
                          <i className="ri-building-line align-bottom me-1"></i>{" "}
                          Nesta Technologies
                        </li>
                        <li className="list-inline-item">
                          <i className="ri-map-pin-2-line align-bottom me-1"></i>{" "}
                          USA
                        </li>
                        <li className="list-inline-item">
                          <i className="ri-money-dollar-circle-line align-bottom me-1"></i>{" "}
                          $41k - 45k
                        </li>
                      </ul>
                      <div className="hstack gap-2">
                        <span className="badge bg-success-subtle text-success">
                          Design
                        </span>
                        <span className="badge bg-danger-subtle text-danger">
                          UI/UX
                        </span>
                        <span className="badge bg-primary-subtle text-primary">
                          Adobe XD
                        </span>
                      </div>
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
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="text-center mt-4">
                <a href="#!" className="btn btn-ghost-primary">
                  View More Jobs{" "}
                  <i className="ri-arrow-right-line align-bottom"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* start find jobs */}
      <section className="section">
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-lg-6 order-2 order-lg-1">
              <div className="text-muted mt-5 mt-lg-0">
                <h5 className="fs-12 text-uppercase text-success">
                  Hot Featured Company
                </h5>
                <h1 className="mb-3 ff-secondary fw-semibold text-capitalize lh-base">
                  Get <span className="text-primary">10,000+</span> Featured
                  Companies
                </h1>
                <p className="ff-secondary mb-2">
                  The demand for content writing services is growing. This is
                  because content is required in almost every industry.{" "}
                  <b>
                    Many companies have discovered how effective content
                    marketing is.
                  </b>{" "}
                  This is a major reason for this increase in demand.
                </p>
                <p className="mb-4 ff-secondary">
                  A Content Writer is a professional who writes informative and
                  engaging articles to help brands showcase their products.
                </p>

                <div className="mt-4">
                  <Link
                    href="/apps-job-companies-lists"
                    className="btn btn-primary"
                  >
                    View More Companies{" "}
                    <i className="ri-arrow-right-line align-middle ms-1"></i>
                  </Link>
                </div>
              </div>
            </div>
            {/* end col */}
            <div className="col-lg-4 col-sm-7 col-10 ms-lg-auto mx-auto order-1 order-lg-2">
              <div>
                <div className="card shadow-lg">
                  <div className="card-body">
                    <button
                      type="button"
                      className="btn btn-icon btn-soft-primary float-end"
                      data-bs-toggle="button"
                      aria-pressed="true"
                    >
                      <i className="mdi mdi-cards-heart fs-16"></i>
                    </button>
                    <div className="avatar-sm mb-4">
                      <div className="avatar-title bg-secondary-subtle rounded">
                        <Image
                          src="/images/companies/img-1.png"
                          alt="Company Logo"
                          className="avatar-xxs"
                          height={24}
                          width={24}
                        />
                      </div>
                    </div>
                    <a href="#!">
                      <h5>New Web designer</h5>
                    </a>
                    <p className="text-muted">Themesbrand</p>

                    <div className="d-flex gap-4 mb-3">
                      <div>
                        <i className="ri-map-pin-2-line text-primary me-1 align-bottom"></i>{" "}
                        Escondido,California
                      </div>

                      <div>
                        <i className="ri-time-line text-primary me-1 align-bottom"></i>{" "}
                        3 min ago
                      </div>
                    </div>

                    <p className="text-muted">
                      As a Product Designer, you will work within a Product
                      Delivery Team fused with UX, engineering, product and data
                      talent.
                    </p>

                    <div className="hstack gap-2">
                      <span className="badge bg-success-subtle text-success">
                        Full Time
                      </span>
                      <span className="badge bg-primary-subtle text-primary">
                        Freelance
                      </span>
                      <span className="badge bg-danger-subtle text-danger">
                        Urgent
                      </span>
                    </div>

                    <div className="mt-4 hstack gap-2">
                      <a href="#!" className="btn btn-soft-primary w-100">
                        Apply Job
                      </a>
                      <a href="#!" className="btn btn-soft-success w-100">
                        Overview
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card shadow-lg bg-info mb-0 features-company-widgets rounded-3">
                  <div className="card-body">
                    <h5 className="text-white fs-16 mb-4">
                      10,000+ Featured Companies
                    </h5>

                    <div className="d-flex gap-1">
                      <a
                        href="javascript: void(0);"
                        data-bs-toggle="tooltip"
                        data-bs-trigger="hover"
                        data-bs-placement="top"
                        title="Brent Gonzalez"
                      >
                        <div className="avatar-xs">
                          <div className="avatar-title bg-light bg-opacity-25 rounded-circle">
                            <Image
                              src="/images/companies/img-5.png"
                              alt="Company Logo"
                              height={15}
                              width={15}
                            />
                          </div>
                        </div>
                      </a>
                      <a
                        href="javascript: void(0);"
                        data-bs-toggle="tooltip"
                        data-bs-trigger="hover"
                        data-bs-placement="top"
                        title="Brent Gonzalez"
                      >
                        <div className="avatar-xs">
                          <div className="avatar-title bg-light bg-opacity-25 rounded-circle">
                            <Image
                              src="/images/companies/img-2.png"
                              alt="Company Logo"
                              height={15}
                              width={15}
                            />
                          </div>
                        </div>
                      </a>
                      <a
                        href="javascript: void(0);"
                        data-bs-toggle="tooltip"
                        data-bs-trigger="hover"
                        data-bs-placement="top"
                        title="Brent Gonzalez"
                      >
                        <div className="avatar-xs">
                          <div className="avatar-title bg-light bg-opacity-25 rounded-circle">
                            <Image
                              src="/images/companies/img-8.png"
                              alt="Company Logo"
                              height={15}
                              width={15}
                            />
                          </div>
                        </div>
                      </a>
                      <a
                        href="javascript: void(0);"
                        data-bs-toggle="tooltip"
                        data-bs-trigger="hover"
                        data-bs-placement="top"
                        title="Brent Gonzalez"
                      >
                        <div className="avatar-xs">
                          <div className="avatar-title bg-light bg-opacity-25 rounded-circle">
                            <Image
                              src="/images/companies/img-7.png"
                              alt="Company Logo"
                              height={15}
                              width={15}
                            />
                          </div>
                        </div>
                      </a>
                      <a
                        href="javascript: void(0);"
                        data-bs-toggle="tooltip"
                        data-bs-trigger="hover"
                        data-bs-placement="top"
                        title="More Companies"
                      >
                        <div className="avatar-xs">
                          <div className="avatar-title fs-11 rounded-circle bg-light bg-opacity-25 text-white">
                            1k+
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end row */}
        </div>
        {/* end container */}
      </section>
      {/* end find jobs */}

      {/* start candidates */}
      <section className="section bg-light" id="candidates">
        <div className="bg-overlay bg-overlay-pattern"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center mb-5">
                <h1 className="mb-3 ff-secondary fw-semibold text-capitalize lh-base">
                  Hire Experts <span className="text-primary">Team</span>
                </h1>
                <p className="text-muted mb-4">
                  Hiring experts costs more per hour than hiring entry- or
                  mid-level freelancers, but they can usually get the work done
                  faster—and better.
                </p>
              </div>
            </div>
            {/* end col */}
          </div>
          {/* end row */}
          <div className="row">
            <div className="col-lg-12">
              <div className="swiper candidate-swiper">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className="card text-center">
                      <div className="card-body p-4">
                        <Image
                          src="/images/users/avatar-2.jpg"
                          alt="Company Logo"
                          className="rounded-circle avatar-md mx-auto d-block"
                          height={64}
                          width={64}
                        />
                        <h5 className="fs-17 mt-3 mb-2">Nancy Martino</h5>
                        <p className="text-muted fs-13 mb-3">
                          Creative Designer
                        </p>

                        <p className="text-muted mb-4 fs-14">
                          <i className="ri-map-pin-2-line text-primary me-1 align-bottom"></i>{" "}
                          Escondido, California
                        </p>

                        <a href="#!" className="btn btn-primary w-100">
                          View Profile
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="card text-center">
                      <div className="card-body p-4">
                        <Image
                          src="/images/users/avatar-3.jpg"
                          alt="Company Logo"
                          className="rounded-circle avatar-md mx-auto d-block"
                          height={64}
                          width={64}
                        />
                        <h5 className="fs-17 mt-3 mb-2">Glen Matney</h5>
                        <p className="text-muted fs-13 mb-3">
                          Marketing Director
                        </p>

                        <p className="text-muted mb-4 fs-14">
                          <i className="ri-map-pin-2-line text-primary me-1 align-bottom"></i>{" "}
                          Escondido, California
                        </p>

                        <a href="#!" className="btn btn-primary w-100">
                          View Profile
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="card text-center">
                      <div className="card-body p-4">
                        <Image
                          src="/images/users/avatar-10.jpg"
                          alt="Company Logo"
                          className="rounded-circle avatar-md mx-auto d-block"
                          height={64}
                          width={64}
                        />
                        <h5 className="fs-17 mt-3 mb-2">Alexis Clarke</h5>
                        <p className="text-muted fs-13 mb-3">Product Manager</p>

                        <p className="text-muted mb-4 fs-14">
                          <i className="ri-map-pin-2-line text-primary me-1 align-bottom"></i>{" "}
                          Escondido, California
                        </p>

                        <a href="#!" className="btn btn-primary w-100">
                          View Profile
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="card text-center">
                      <div className="card-body p-4">
                        <Image
                          src="/images/users/avatar-8.jpg"
                          alt="Company Logo"
                          className="rounded-circle avatar-md mx-auto d-block"
                          height={64}
                          width={64}
                        />
                        <h5 className="fs-17 mt-3 mb-2">James Price</h5>
                        <p className="text-muted fs-13 mb-3">
                          Product Designer
                        </p>

                        <p className="text-muted mb-4 fs-14">
                          <i className="ri-map-pin-2-line text-primary me-1 align-bottom"></i>{" "}
                          Escondido, California
                        </p>

                        <a href="#!" className="btn btn-primary w-100">
                          View Profile
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="card text-center">
                      <div className="card-body p-4">
                        <Image
                          src="/images/users/avatar-5.jpg"
                          alt="Company Logo"
                          className="rounded-circle avatar-md mx-auto d-block"
                          height={64}
                          width={64}
                        />
                        <h5 className="fs-17 mt-3 mb-2">Michael Morris</h5>
                        <p className="text-muted fs-13 mb-3">
                          Full Stack Developer
                        </p>

                        <p className="text-muted mb-4 fs-14">
                          <i className="ri-map-pin-2-line text-primary me-1 align-bottom"></i>{" "}
                          Escondido, California
                        </p>

                        <a href="#!" className="btn btn-primary w-100">
                          View Profile
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end container */}
      </section>
      {/* end candidates */}

      {/* start blog */}
      <section className="section" id="blog">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center mb-5">
                <h1 className="mb-3 ff-secondary fw-semibold text-capitalize lh-base">
                  Our Latest <span className="text-primary">News</span>
                </h1>
                <p className="text-muted mb-4">
                  We thrive when coming up with innovative ideas but also
                  understand that a smart concept should be supported with
                  faucibus sapien odio measurable results.
                </p>
              </div>
            </div>
          </div>
          {/* end row */}

          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="card">
                <div className="card-body">
                  <Image
                    src="/images/small/img-8.jpg"
                    alt="Blog Image"
                    className="img-fluid rounded"
                    height={500}
                    width={500}
                  />
                </div>
                <div className="card-body">
                  <ul className="list-inline fs-14 text-muted">
                    <li className="list-inline-item">
                      <i className="ri-calendar-line align-bottom me-1"></i> 30
                      Oct, 2021
                    </li>
                    <li className="list-inline-item">
                      <i className="ri-message-2-line align-bottom me-1"></i>{" "}
                      364 Comment
                    </li>
                  </ul>
                  <a href="javascript:void(0);">
                    <h5>Design your apps in your own way ?</h5>
                  </a>
                  <p className="text-muted fs-14">
                    One disadvantage of Lorum Ipsum is that in Latin certain
                    letters appear more frequently than others.
                  </p>

                  <div>
                    <a href="#!" className="link-success">
                      Learn More{" "}
                      <i className="ri-arrow-right-line align-bottom ms-1"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card">
                <div className="card-body">
                  <Image
                    src="/images/small/img-6.jpg"
                    alt="Blog Image"
                    className="img-fluid rounded"
                    height={500}
                    width={500}
                  />
                </div>
                <div className="card-body">
                  <ul className="list-inline fs-14 text-muted">
                    <li className="list-inline-item">
                      <i className="ri-calendar-line align-bottom me-1"></i> 02
                      Oct, 2021
                    </li>
                    <li className="list-inline-item">
                      <i className="ri-message-2-line align-bottom me-1"></i>{" "}
                      245 Comment
                    </li>
                  </ul>
                  <a href="javascript:void(0);">
                    <h5>Smartest Applications for Business ?</h5>
                  </a>
                  <p className="text-muted fs-14">
                    Due to its widespread use as filler text for layouts,
                    non-readability is of great importance: human perception.
                  </p>

                  <div>
                    <a href="#!" className="link-success">
                      Learn More{" "}
                      <i className="ri-arrow-right-line align-bottom ms-1"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card">
                <div className="card-body">
                  <Image
                    src="/images/small/img-9.jpg"
                    alt="Blog Image"
                    className="img-fluid rounded"
                    height={500}
                    width={500}
                  />
                </div>
                <div className="card-body">
                  <ul className="list-inline fs-14 text-muted">
                    <li className="list-inline-item">
                      <i className="ri-calendar-line align-bottom me-1"></i> 23
                      Sept, 2021
                    </li>
                    <li className="list-inline-item">
                      <i className="ri-message-2-line align-bottom me-1"></i>{" "}
                      354 Comment
                    </li>
                  </ul>
                  <a href="javascript:void(0);">
                    <h5>How apps is changing the IT world</h5>
                  </a>
                  <p className="text-muted fs-14">
                    Intrinsically incubate intuitive opportunities and real-time
                    potentialities Appropriately communicate one-to-one
                    technology.
                  </p>

                  <div>
                    <a href="#!" className="link-success">
                      Learn More{" "}
                      <i className="ri-arrow-right-line align-bottom ms-1"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end container */}
      </section>
      {/* end blog */}

      {/* start cta */}
      <section className="py-5 bg-primary position-relative">
        <div className="bg-overlay bg-overlay-pattern opacity-50"></div>
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-sm">
              <div>
                <h4 className="text-white fw-semibold">
                  Get New Jobs Notification!
                </h4>
                <p className="text-white text-opacity-75 mb-0">
                  Subscribe & get all related jobs notification.
                </p>
              </div>
            </div>
            {/* end col */}
            <div className="col-sm-auto">
              <button className="btn btn-danger" type="button">
                Subscribe Now{" "}
                <i className="ri-arrow-right-line align-bottom"></i>
              </button>
            </div>
            {/* end col */}
          </div>
          {/* end row */}
        </div>
        {/* end container */}
      </section>
      {/* end cta */}

      {/* Start footer */}
      <footer className="custom-footer bg-dark py-5 position-relative">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mt-4">
              <div>
                <div>
                  <Image
                    src="/images/logo-light.png"
                    alt="logo light"
                    height={17}
                    width={100}
                  />
                </div>
                <div className="mt-4 fs-13">
                  <p>Premium Multipurpose Admin & Dashboard Template</p>
                  <p>
                    You can build any type of web application like eCommerce,
                    CRM, CMS, Project management apps, Admin Panels, etc using
                    Velzon.
                  </p>
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
                        <Link href="/team">Team</Link>
                      </li>
                      <li>
                        <Link href="/pricing">Pricing</Link>
                      </li>
                      <li>
                        <Link href="/timeline">Timeline</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-sm-4 mt-4">
                  <h5 className="text-white mb-0">For Jobs</h5>
                  <div className="text-muted mt-3">
                    <ul className="list-unstyled ff-secondary footer-list">
                      <li>
                        <Link href="/apps-job-lists">Job List</Link>
                      </li>
                      <li>
                        <Link href="/apps-job-application">application</Link>
                      </li>
                      <li>
                        <Link href="/apps-job-new">New Job</Link>
                      </li>
                      <li>
                        <Link href="/apps-job-companies-lists">
                          Company List
                        </Link>
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
                  <script>document.write(new Date().getFullYear())</script> ©
                  Velzon - Themesbrand
                </p>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="text-sm-end mt-3 mt-sm-0">
                <ul className="list-inline mb-0 footer-list gap-4 fs-13">
                  <li className="list-inline-item">
                    <Link href="/pages-privacy-policy">Privacy Policy</Link>
                  </li>
                  <li className="list-inline-item">
                    <Link href="/pages/term-conditions">
                      Terms & Conditions
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link href="/pages/privacy-policy">Security</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* end footer */}

      {/*start back-to-top*/}
      <button
        onClick={() => {
          // Add topFunction logic here
        }}
        className="btn btn-info btn-icon landing-back-top"
        id="back-to-top"
      >
        <i className="ri-arrow-up-line"></i>
      </button>
      {/*end back-to-top*/}
    </div>
  );
};

export default JobLandingPage;
