import React from "react";
import { Container, Row } from "reactstrap";
import BreadCrumb from "@components/Common/BreadCrumb";
import SalesByLocations from "@components/DashboardEcommerce/SalesByLocations";
import ApplicationsStatistic from "@components/DashboardJob/ApplicationsStatistic";
import Candidates from "@components/DashboardJob/Candidates";
import FeaturedCompanies from "@components/DashboardJob/FeaturedCompanies";
import RecentApplicants from "@components/DashboardJob/RecentApplicants";
import RecomendedJobs from "@components/DashboardJob/RecomendedJobs";
import Widgets from "@components/DashboardJob/Widgets";

const DashboardJobs = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Job Dashboard" pageTitle="Dashboards" />

          <Row>
            <Widgets />
            <FeaturedCompanies />
          </Row>

          <Row>
            <ApplicationsStatistic chartId="line_chart_dashed" />
            <Candidates />
          </Row>

          <Row>
            <RecomendedJobs />
          </Row>

          <Row>
            <RecentApplicants />
            <SalesByLocations />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardJobs;
