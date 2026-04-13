import React from "react";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "@components/Common/BreadCrumb";

import Widgets from "@components/DashboardNFT/Widgets";
import Marketplace from "@components/DashboardNFT/Marketplace";
import Popularity from "@components/DashboardNFT/Popularity";
import FeaturedNFT from "@components/DashboardNFT/FeaturedNFT";
import RecentNFTs from "@components/DashboardNFT/RecentNFTs";

const DashboardNFT = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="NFT Dashboard" pageTitle="Dashboard" />
          <Row className="dash-nft">
            <Col xxl={9}>
              <Widgets />
              <Marketplace />
            </Col>
            <Popularity />
          </Row>
          <FeaturedNFT />
          <RecentNFTs />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardNFT;
