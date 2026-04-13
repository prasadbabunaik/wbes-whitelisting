"use client";
import React from "react";
import { Container, Row } from "reactstrap";
import BreadCrumb from "@common/BreadCrumb";
import Widgets from "./Widgets";
import TicketsData from "./TicketsData";

const ListView = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Tickets List" pageTitle="Tickets" />
          <Row>
            <Widgets />
          </Row>
          <TicketsData />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ListView;
