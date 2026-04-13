"use client";
import React from "react";
import { Container, Row } from "reactstrap";
import BreadCrumb from "@common/BreadCrumb";
import UsersByDevice from "@components/Dashboard/UsersByDevice";
import JobSummary from "./JobSummary";
import NatworkSummary from "./NatworkSummary";
import VisitorGraph from "./VisitorGraph";
import Widgets from "./Widgets";

const Statistics = () => {
  document.title = "Statistics | Velzon -  Admin & Dashboard Template";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="STATISTICS" pageTitle="Jobs" />

          <Row className="row">
            <Widgets
            // dataColors='["--vz-success", "--vz-danger"]'
            />
          </Row>

          <Row className="row">
            <VisitorGraph chartId="distributed_treemap" />
            <UsersByDevice />
          </Row>

          <Row className="row">
            <NatworkSummary chartId="deal-type-charts" />
            <JobSummary chartId="revenue-expenses-charts" />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Statistics;
