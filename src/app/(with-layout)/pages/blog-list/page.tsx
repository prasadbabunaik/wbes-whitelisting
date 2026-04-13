import BreadCrumb from "@common/BreadCrumb";
import React from "react";
import { Container, Row } from "reactstrap";
import Sidepanel from "./Sidepanel";
import MainList from "./MainList";

const BlogListView = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="List View" pageTitle="Blogs" />
          <Row>
            <Sidepanel />

            <MainList />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default BlogListView;
