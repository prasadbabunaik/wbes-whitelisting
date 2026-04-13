"use client";
import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Label,
  Row,
} from "reactstrap";

const CheckboxesRadios = () => {
  document.title =
    "Checkboxes & Radios | Velzon - Next.js TypeScript Admin & Dashboard Template";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Checkboxes & Radios</h4>
                </CardHeader>
                <CardBody>
                  <p className="text-muted">
                    Use <code>type="checkbox"</code> and{" "}
                    <code>type="radio"</code> for custom checkboxes and radios.
                  </p>
                  <div>
                    <h5 className="fs-14 mb-3">Checkboxes</h5>
                    <div className="form-check mb-2">
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id="formCheck1"
                      />
                      <Label className="form-check-label" htmlFor="formCheck1">
                        Default checkbox
                      </Label>
                    </div>
                    <div className="form-check mb-2">
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id="formCheck2"
                        defaultChecked
                      />
                      <Label className="form-check-label" htmlFor="formCheck2">
                        Checked checkbox
                      </Label>
                    </div>
                    <div className="form-check mb-2">
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id="formCheck3"
                        disabled
                      />
                      <Label className="form-check-label" htmlFor="formCheck3">
                        Disabled checkbox
                      </Label>
                    </div>
                    <div className="form-check mb-2">
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id="formCheck4"
                        defaultChecked
                        disabled
                      />
                      <Label className="form-check-label" htmlFor="formCheck4">
                        Disabled checked checkbox
                      </Label>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h5 className="fs-14 mb-3">Radios</h5>
                    <div className="form-check mb-2">
                      <Input
                        className="form-check-input"
                        type="radio"
                        name="formradios"
                        id="formradio1"
                      />
                      <Label className="form-check-label" htmlFor="formradio1">
                        Default radio
                      </Label>
                    </div>
                    <div className="form-check mb-2">
                      <Input
                        className="form-check-input"
                        type="radio"
                        name="formradios"
                        id="formradio2"
                        defaultChecked
                      />
                      <Label className="form-check-label" htmlFor="formradio2">
                        Checked radio
                      </Label>
                    </div>
                    <div className="form-check mb-2">
                      <Input
                        className="form-check-input"
                        type="radio"
                        name="formradios"
                        id="formradio3"
                        disabled
                      />
                      <Label className="form-check-label" htmlFor="formradio3">
                        Disabled radio
                      </Label>
                    </div>
                    <div className="form-check mb-2">
                      <Input
                        className="form-check-input"
                        type="radio"
                        name="formradios"
                        id="formradio4"
                        defaultChecked
                        disabled
                      />
                      <Label className="form-check-label" htmlFor="formradio4">
                        Disabled checked radio
                      </Label>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CheckboxesRadios;
