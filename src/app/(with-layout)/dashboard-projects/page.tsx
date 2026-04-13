"use client";
import React from "react";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "@common/BreadCrumb";
import ActiveProjects from "@components/DashboardProject/ActiveProjects";
import Chat from "@components/DashboardProject/Chat";
import MyTasks from "@components/DashboardProject/MyTasks";
import ProjectsOverview from "@components/DashboardProject/ProjectsOverview";
import ProjectsStatus from "@components/DashboardProject/ProjectsStatus";
import TeamMembers from "@components/DashboardProject/TeamMembers";
import UpcomingSchedules from "@components/DashboardProject/UpcomingSchedules";
import Widgets from "@components/DashboardProject/Widgets";

const DashboardProject = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Projects" pageTitle="Dashboards" />
          <Row className="project-wrapper">
            <Col xxl={8}>
              <Widgets />
              <ProjectsOverview />
            </Col>
            <UpcomingSchedules />
          </Row>
          <Row>
            <ActiveProjects />
            <MyTasks />
          </Row>
          <Row>
            <TeamMembers />
            <Chat />
            <ProjectsStatus />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardProject;
