"use client";
import React from "react";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "@components/Common/BreadCrumb";
import dynamic from "next/dynamic";

const Watchlist = dynamic(() => import("./Watchlist"), { ssr: false });
const PortfolioStatistics = dynamic(() => import("./PortfolioStatistics"), {
  ssr: false,
});
const MarketStatus = dynamic(() => import("./MarketStatus"), { ssr: false });
const Widgets = dynamic(() => import("./Widgets"), { ssr: false });
const RecentTransaction = dynamic(() => import("./RecentTransaction"), {
  ssr: false,
});

const MyWallet = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="My Wallet" pageTitle="Crypto" />
          <Row>
            <Col xxl={9}>
              <PortfolioStatistics dataColors='["--vz-info"]' />
              <Watchlist />
              <MarketStatus />
            </Col>
            <Col xxl={3}>
              <Widgets />
              <RecentTransaction />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default MyWallet;
