"use client";
import React from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BreadCrumb from "@common/BreadCrumb";
import { FunnelChartCode, PyramidChartCode } from "./Funnellchart";

const FunnelChart = () => {
  document.title =
    "Apex Funnel Charts | Velzon - Next.js TypeScript Admin & Dashboard Template";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Funnel Charts" pageTitle="Apexcharts" />
          <Row>
            <Col lg={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Funnel Chart</h4>
                </CardHeader>
                <CardBody>
                  <FunnelChartCode dataColors='["--vz-success"]' />
                </CardBody>
              </Card>
            </Col>

            <Col lg={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Pyramid</h4>
                </CardHeader>
                <CardBody>
                  <PyramidChartCode dataColors='["--vz-info", "--vz-danger", "--vz-primary", "--vz-secondary", "--vz-success", "--vz-dark", "--vz-warning"]' />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default FunnelChart;
