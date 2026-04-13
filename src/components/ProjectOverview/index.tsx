import React from "react";
import { Container } from "reactstrap";
import Section from "./Section";

const ProjectOverview = () => {
  document.title =
    "Project Overview | Velzon - Next.js TypeScript Admin & Dashboard Template";
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
