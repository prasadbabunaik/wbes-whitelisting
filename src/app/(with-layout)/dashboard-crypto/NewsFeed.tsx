import React from "react";
import Link from "next/link";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import { newsFeed } from "@common/data";
import Image from "next/image";

const NewsFeed = () => {
  return (
    <React.Fragment>
      <Col xxl={4}>
        <Card>
          <CardHeader className="align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">News Feed</h4>
            <div>
              <button
                type="button"
                className="btn btn-soft-primary btn-sm material-shadow-none"
              >
                View all
              </button>
            </div>
          </CardHeader>

          <CardBody>
            {(newsFeed || []).map((item, key) => (
              <div
                className={
                  item.id === 1 ? "d-flex align-middle" : "d-flex mt-4"
                }
                key={key}
              >
                <div className="flex-shrink-0">
                  <Image
                    src={item.img}
                    className="rounded img-fluid material-shadow"
                    width={90}
                    height={60}
                    style={{ width: "90px", height: "60px" }}
                    alt=""
                  />
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="mb-1 lh-base">
                    <Link href="#" className="text-reset">
                      {item.caption}
                    </Link>
                  </h6>
                  <p className="text-muted fs-12 mb-0">
                    {item.date}{" "}
                    <i className="mdi mdi-circle-medium align-middle mx-1"></i>
                    {item.time}
                  </p>
                </div>
              </div>
            ))}
            <div className="mt-3 text-center">
              <Link href="#" className="text-muted text-decoration-underline">
                View all News
              </Link>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default NewsFeed;
