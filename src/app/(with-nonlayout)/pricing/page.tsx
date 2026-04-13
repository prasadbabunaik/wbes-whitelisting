import React from "react";
import { initialPricing } from "@/common/data/index";

const Pricing: React.FC = () => {
  return (
    <div className="main-content mx-auto">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row justify-content-center mt-4">
            <div className="col-lg-5">
              <div className="text-center mb-4">
                <h4 className="fw-semibold fs-22">Plans & Pricing</h4>
                <p className="text-muted mb-4 fs-15">
                  Simple pricing. No hidden fees. Advanced features for you
                  business.
                </p>
                {/* Pills navigation omitted for brevity */}
              </div>
            </div>
          </div>

          <div className="row">
            {initialPricing.map((plan, idx) => (
              <div className="col-xxl-3 col-lg-6" key={idx}>
                <div
                  className={`card pricing-box${
                    plan.ribbon ? " ribbon-box right" : ""
                  }`}
                >
                  <div className="card-body bg-light m-2 p-4">
                    {plan.ribbon && (
                      <div className="ribbon-two ribbon-two-danger">
                        <span>{plan.ribbon}</span>
                      </div>
                    )}
                    <div className="d-flex align-items-center mb-3">
                      <div className="flex-grow-1">
                        <h5 className="mb-0 fw-semibold">{plan.name}</h5>
                      </div>
                      <div className="ms-auto">
                        <h2 className="month mb-0">
                          ${plan.price.month}{" "}
                          <small className="fs-13 text-muted">/Month</small>
                        </h2>
                        <h2 className="annual mb-0">
                          <small className="fs-16">
                            <del>${plan.price.annualOld}</del>
                          </small>{" "}
                          ${plan.price.annual}{" "}
                          <small className="fs-13 text-muted">/Year</small>
                        </h2>
                      </div>
                    </div>
                    <p className="text-muted">{plan.desc}</p>
                    <ul className="list-unstyled vstack gap-3">
                      {plan.features.map((f, i) => (
                        <li key={i}>
                          <div className="d-flex">
                            <div
                              className={`flex-shrink-0 ${
                                f.ok ? "text-success" : "text-danger"
                              } me-1`}
                            >
                              <i
                                className={`ri-${
                                  f.ok
                                    ? "checkbox-circle-fill"
                                    : "close-circle-fill"
                                } fs-15 align-middle`}
                              ></i>
                            </div>
                            <div className="flex-grow-1">{f.text}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 pt-2">
                      <a href="#" className={`btn w-100 ${plan.btn.class}`}>
                        {plan.btn.text}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
