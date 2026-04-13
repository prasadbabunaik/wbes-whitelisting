"use client";
import BreadCrumb from "@components/Common/BreadCrumb";
import React from "react";
import { Container, Row } from "reactstrap";
import Widget from "@components/DashboardBlog/Widget";
import RecentComment from "@components/DashboardBlog/RecentComment";
import Device from "@components/DashboardBlog/Device";
import RecentArticleTable from "@components/DashboardBlog/RecentArticleTable";

const DashboardBlog = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Blog" pageTitle="Dashboards" />
          <Row>
            <Widget />

            <RecentComment />

            <RecentArticleTable />

            <Device />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardBlog;
