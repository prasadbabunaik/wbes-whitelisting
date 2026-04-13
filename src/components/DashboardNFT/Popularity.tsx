"use client";
import React from "react";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import { popularityData } from "@common/data/dashboardNFT";

// Import Chart
import { PopularityChart } from "./DashboardNFTCharts";

//SimpleBar
import SimpleBar from "simplebar-react";
import Link from "next/link";
import Image from "next/image";

const Popularity = () => {
  return (
    <React.Fragment>
      <Col xxl={3}>
        <Card>
          <CardHeader className="border-0 pb-0">
            <h6 className="card-title mb-0">Popularity</h6>
          </CardHeader>
          <CardBody className="p-0">
            <div dir="ltr">
              <PopularityChart chartId="popularity-chart" />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="d-flex align-items-center">
            <h6 className="card-title mb-0 flex-grow-1">History of Bids</h6>
            <Link className="text-muted" href="/apps-nft-item-details">
              See All <i className="ri-arrow-right-line align-bottom"></i>
            </Link>
          </CardHeader>
          <CardBody>
            <div className="table-responsive table-card">
              <SimpleBar style={{ maxHeight: "365px" }}>
                <ul className="list-group list-group-flush">
                  {popularityData.map((item, key) => (
                    <li
                      key={key}
                      className="list-group-item list-group-item-action"
                    >
                      <div className="d-flex align-items-center">
                        <Image
                          src={item.img}
                          alt=""
                          className="avatar-xs object-fit-cover rounded-circle"
                          width={30}
                          height={30}
                        />
                        <div className="ms-3 flex-grow-1">
                          <Link href="#" className="stretched-link">
                            <h6 className="fs-14 mb-1">{item.author}</h6>
                          </Link>
                          <p className="mb-0 text-muted">{item.username}</p>
                        </div>
                        <div>
                          <h6>{item.price}</h6>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </SimpleBar>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default Popularity;
