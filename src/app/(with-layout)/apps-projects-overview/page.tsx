import React from "react";
import { Container } from "reactstrap";
import Section from "@components/ProjectOverview/Section";

const ProjectOverview = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Section />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ProjectOverview;
