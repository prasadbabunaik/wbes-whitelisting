"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Maintenance = () => {
  document.title =
    "Maintenance | Velzon - Next.js TypeScript Admin & Dashboard Template";
  return (
    <React.Fragment>
      <div className="auth-page-wrapper pt-5">
        {/* auth page bg */}
        <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
          <div className="bg-overlay"></div>

          <div className="shape">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 1440 120"
            >
              <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
            </svg>
          </div>
        </div>

        {/* auth page content */}
        <div className="auth-page-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center mt-sm-5 pt-4">
                  <div className="mb-5 text-white-50">
                    <h1 className="display-5 coming-soon-text">
                      Site is Under Maintenance
                    </h1>
                    <p className="fs-14">Please check back in sometime</p>
                    <div className="mt-4 pt-2">
                      <Link href="/" className="btn btn-success">
                        <i className="mdi mdi-home me-1"></i> Back to Home
                      </Link>
                    </div>
                  </div>
                  <div className="row justify-content-center mb-5">
                    <div className="col-xl-4 col-lg-8">
                      <div>
                        <Image
                          src="/images/maintenance.png"
                          alt=""
                          className="img-fluid"
                          width={500}
                          height={500}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end row */}
          </div>
          {/* end container */}
        </div>
        {/* end auth page content */}

        {/* footer */}
        <footer className="footer">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center">
                  <p className="mb-0 text-muted">
                    &copy; {new Date().getFullYear()} Velzon. Crafted with{" "}
                    <i className="mdi mdi-heart text-danger"></i> by Themesbrand
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
        {/* end Footer */}
      </div>
    </React.Fragment>
  );
};

export default Maintenance;
