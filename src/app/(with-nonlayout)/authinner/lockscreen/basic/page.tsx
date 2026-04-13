"use client";
import React from "react";
import Link from "next/link";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Row,
} from "reactstrap";

//formik
import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";

import ParticlesAuth from "../../ParticlesAuth";

//import images
const logoLight = "/images/logo-light.png";
const avatar1 = "/images/users/avatar-1.jpg";

import Image from "next/image";
// Define form values interface
interface PassChangeFormValues {
  password: string;
}

const BasicLockScreen = () => {
  document.title =
    "Lock Screen | Velzon - Next.js TypeScript Admin & Dashboard Template";

  const validation: FormikProps<PassChangeFormValues> =
    useFormik<PassChangeFormValues>({
      enableReinitialize: true,

      initialValues: {
        password: "",
      },
      validationSchema: Yup.object({
        password: Yup.string().required("Please Enter Password"),
      }),
      onSubmit: values => {
        console.log("values", values);
      },
    });

  return (
    <React.Fragment>
      <ParticlesAuth>
        <div className="auth-page-content mt-lg-5">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                  <div>
                    <Link
                      href="/dashboard"
                      className="d-inline-block auth-logo"
                    >
                      <Image src={logoLight} alt="" height={20} width={20} />
                    </Link>
                  </div>
                  <p className="mt-3 fs-15 fw-medium">
                    Premium Admin & Dashboard Template
                  </p>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="mt-4 card-bg-fill">
                  <CardBody className="p-4">
                    <div className="text-center mt-2">
                      <h5 className="text-primary">Lock Screen</h5>
                      <p className="text-muted">
                        Enter your password to unlock the screen!
                      </p>
                    </div>
                    <div className="user-thumb text-center">
                      <Image
                        src={avatar1}
                        className="rounded-circle img-thumbnail avatar-lg material-shadow"
                        alt="thumbnail"
                        width={30}
                        height={30}
                      />
                      <h5 className="font-size-15 mt-3">Anna Adame</h5>
                    </div>
                    <div className="p-2 mt-4">
                      <Form
                        onSubmit={e => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                        action="#"
                      >
                        <div className="mb-3">
                          <label className="form-label" htmlFor="userpassword">
                            Password
                          </label>
                          <Input
                            type="password"
                            className="form-control"
                            id="userpassword"
                            placeholder="Enter password"
                            name="password"
                            value={validation.values.password}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.password &&
                              validation.touched.password
                                ? true
                                : false
                            }
                          />
                          {validation.errors.password &&
                          validation.touched.password ? (
                            <FormFeedback type="invalid">
                              {validation.errors.password}
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div className="mb-2 mt-4">
                          <Button
                            color="success"
                            className="w-100"
                            type="submit"
                          >
                            Unlock
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-4 text-center">
                  <p className="mb-0">
                    Not you ? return{" "}
                    <Link
                      href="/authinner/signin/basic"
                      className="fw-semibold text-primary text-decoration-underline"
                    >
                      {" "}
                      Signin{" "}
                    </Link>{" "}
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </ParticlesAuth>
    </React.Fragment>
  );
};

export default BasicLockScreen;
