"use client";
import React from "react";
import { Container, Row } from "reactstrap";
import BreadCrumb from "@components/Common/BreadCrumb";
import AllTransactions from "@components/Transactions/AllTransactions";
import Widgets from "@components/Transactions/Widgets";

const Transactions = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Transactions" pageTitle="Crypto" />
          <Row>
            <Widgets />
          </Row>
          <AllTransactions />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Transactions;
