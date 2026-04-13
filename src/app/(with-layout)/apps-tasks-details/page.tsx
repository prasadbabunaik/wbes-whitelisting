"use client";
import React from "react";
import { Container, Col, Row } from "reactstrap";
import BreadCrumb from "@components/Common/BreadCrumb";
import Comments from "@components/TaskDetails/Comments";
import Summary from "@components/TaskDetails/Summary";
import TimeTracking from "@components/TaskDetails/TimeTracking";

const TaskDetails = () => {
  document.title =
    "Tasks Details | Velzon - Next.js TypeScript Admin & Dashboard Template";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Tasks Details" pageTitle="Tasks" />
          <Row>
            <Col xxl={3}>
              <TimeTracking />
            </Col>
            <Col xxl={9}>
              <Summary />
              <Comments />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default TaskDetails;
