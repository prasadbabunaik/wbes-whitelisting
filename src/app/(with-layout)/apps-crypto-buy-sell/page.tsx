"use client";
import React from "react";
import { Container, Row } from "reactstrap";
import BreadCrumb from "@components/Common/BreadCrumb";
import dynamic from "next/dynamic";

const MarketGraph = dynamic(() => import("@components/BuySell/MarketGraph"), {
  ssr: false,
});
const Widgets = dynamic(() => import("@components/BuySell/Widgets"), {
  ssr: false,
});
const BuySellCoin = dynamic(() => import("@components/BuySell/BuySellCoin"), {
  ssr: false,
});
const Market = dynamic(() => import("@components/BuySell/Market"), {
  ssr: false,
});

const BuySell = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Buy & Sell" pageTitle="Crypto" />
          <Row>
            <Widgets />
          </Row>
          <Row>
            <MarketGraph dataColors='["--vz-success", "--vz-danger"]' />
            <BuySellCoin />
          </Row>
          <Market />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default BuySell;
