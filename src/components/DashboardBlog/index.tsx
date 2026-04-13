import BreadCrumb from "../Common/BreadCrumb";
import React from "react";
import { Container, Row } from "reactstrap";
import Widget from "./Widget";
import RecentComment from "./RecentComment";
import Device from "./Device";
import RecentArticleTable from "./RecentArticleTable";

const DashboardBlog = () => {
  document.title =
    "Blog | Velzon - Next.js TypeScript Admin & Dashboard Template";

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
