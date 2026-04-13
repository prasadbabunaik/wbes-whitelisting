"use client";
import React from "react";
import { Container, Row } from "reactstrap";
import BreadCrumb from "@common/BreadCrumb";
import BalanceOverview from "@components/DashboardCrm/BalanceOverview";
import ClosingDeals from "@components/DashboardCrm/ClosingDeals";
import DealsStatus from "@components/DashboardCrm/DealsStatus";
import DealType from "@components/DashboardCrm/DealType";
import MyTasks from "@components/DashboardCrm/MyTasks";
import SalesForecast from "@components/DashboardCrm/SalesForecast";
import UpcomingActivities from "@components/DashboardCrm/UpcomingActivities";
import Widgets from "@components/DashboardCrm/Widgets";

const DashboardCrm = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="CRM" pageTitle="Dashboards" />
          <Row>
            <Widgets />
          </Row>
          <Row>
            <SalesForecast />
            <DealType />
            <BalanceOverview />
          </Row>
          <Row>
            <DealsStatus />
            <MyTasks />
          </Row>
          <Row>
            <UpcomingActivities />
            <ClosingDeals />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardCrm;
