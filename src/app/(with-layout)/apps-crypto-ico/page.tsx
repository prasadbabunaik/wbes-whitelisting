"use client";
import React from "react";
import { Container, Row } from "reactstrap";
import BreadCrumb from "@components/Common/BreadCrumb";
import Widgets from "./Widgets";
import ICO from "./ICO";

const ICOList = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="ICO LIST" pageTitle="Crypto" />
          <Row>
            <Widgets />
          </Row>
          <ICO />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ICOList;
