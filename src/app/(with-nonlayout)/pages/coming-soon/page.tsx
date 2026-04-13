import React from "react";
import Image from "next/image";

const ComingSoonPage = () => {
  return (
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
              <div className="text-center mt-sm-5 pt-4 mb-4">
                <div className="mb-sm-5 pb-sm-4 pb-5">
                  <Image
                    src="/images/comingsoon.png"
                    alt=""
                    height={120}
                    width={120}
                    className="move-animation"
                  />
                </div>
                <div className="mb-5">
                  <h1 className="display-2 coming-soon-text">Coming Soon</h1>
                </div>
                <div>
                  <div className="row justify-content-center mt-5">
                    <div className="col-lg-8">
                      <div id="countdown" className="countdownlist"></div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <h4>Get notified when we launch</h4>
                    <p className="text-muted">
                      Don't worry we will not spam you 😊
                    </p>
                  </div>

                  <div className="input-group countdown-input-group mx-auto my-4">
                    <input
                      type="email"
                      className="form-control border-light shadow"
                      placeholder="Enter your email address"
                      aria-label="search result"
                      aria-describedby="button-email"
                    />
                    <button
                      className="btn btn-success"
                      type="button"
                      id="button-email"
                    >
                      Send
                      <i className="ri-send-plane-2-fill align-bottom ms-2"></i>
                    </button>
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
  );
};

export default ComingSoonPage;
