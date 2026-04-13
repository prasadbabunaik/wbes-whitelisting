"use client";
import React from "react";
import { Container, Row } from "reactstrap";
import BreadCrumb from "@components/Common/BreadCrumb";
import AllTasks from "@components/TaskList/AllTasks";
import Widgets from "@components/TaskList/Widgets";

const TaskList = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Tasks List" pageTitle="Tasks" />
          <Row>
            <Widgets />
          </Row>
          <AllTasks />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default TaskList;
