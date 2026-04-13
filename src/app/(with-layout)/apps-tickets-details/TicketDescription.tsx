import React from "react";
import { Card, CardBody, Col, Label, Row } from "reactstrap";

//SimpleBar
import SimpleBar from "simplebar-react";

//import images
const avatar8 = "/images/users/avatar-8.jpg";
const avatar10 = "/images/users/avatar-10.jpg";
const avatar6 = "/images/users/avatar-6.jpg";
const image4 = "/images/small/img-4.jpg";
const image5 = "/images/small/img-5.jpg";

import Link from "next/link";
import TicketCodeExample from "./TicketsDetailsCode";
import Image from "next/image";

const TicketDescription = () => {
  return (
    <React.Fragment>
      <Col xxl={9}>
        <Card>
          <CardBody className="p-4">
            <h6 className="fw-semibold text-uppercase mb-3">
              Ticket Discripation
            </h6>
            <p className="text-muted">
              It would also help to know what the errors are...
              <Link
                href="#"
                className="link-secondary text-decoration-underline"
              >
                Example
              </Link>
            </p>
            <h6 className="fw-semibold text-uppercase mb-3">
              Create an Excellent UI for a Dashboard
            </h6>
            <ul className="text-muted vstack gap-2 mb-4">
              <li>Pick a Dashboard Type</li>
              <li>Categorize information when needed</li>
              <li>Provide Context</li>
              <li>On using colors</li>
              <li>On using the right graphs</li>
            </ul>

            <div className="mt-4">
              <h6 className="fw-semibold text-uppercase mb-3">
                Here is the code you've requsted
              </h6>
              <div>
                <pre className="language-markup rounded-2">
                  <code>
                    <TicketCodeExample />
                  </code>
                </pre>
              </div>
            </div>
          </CardBody>

          <CardBody className="p-4">
            <h5 className="card-title mb-4">Comments</h5>

            <SimpleBar style={{ height: "300px" }} className="px-3 mx-n3">
              {/* Comment 1 */}
              <div className="d-flex mb-4">
                <div className="flex-shrink-0">
                  <Image
                    src={avatar8}
                    alt="Joseph Parker"
                    width={32}
                    height={32}
                    className="avatar-xs rounded-circle material-shadow"
                  />
                </div>
                <div className="flex-grow-1 ms-3">
                  <h5 className="fs-13">
                    Joseph Parker{" "}
                    <small className="text-muted">20 Dec 2021 - 05:47AM</small>
                  </h5>
                  <p className="text-muted">
                    I am getting message from customers...
                  </p>
                  <Link href="#" className="badge text-muted bg-light">
                    <i className="mdi mdi-reply"></i> Reply
                  </Link>

                  {/* Reply to Comment 1 */}
                  <div className="d-flex mt-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={avatar10}
                        alt="Alexis Clarke"
                        width={32}
                        height={32}
                        className="avatar-xs rounded-circle material-shadow"
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h5 className="fs-13">
                        Alexis Clarke{" "}
                        <small className="text-muted">
                          22 Dec 2021 - 02:32PM
                        </small>
                      </h5>
                      <p className="text-muted">
                        Please check your Spam mailbox...
                      </p>
                      <Link href="#" className="badge text-muted bg-light">
                        <i className="mdi mdi-reply"></i> Reply
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comment 2 */}
              <div className="d-flex mb-4">
                <div className="flex-shrink-0">
                  <Image
                    src={avatar6}
                    alt="Donald Palmer"
                    width={32}
                    height={32}
                    className="avatar-xs rounded-circle material-shadow"
                  />
                </div>
                <div className="flex-grow-1 ms-3">
                  <h5 className="fs-13">
                    Donald Palmer{" "}
                    <small className="text-muted">24 Dec 2021 - 05:20PM</small>
                  </h5>
                  <p className="text-muted">
                    Please contact{" "}
                    <Link href="#" className="text-decoration-underline">
                      Online Order Support
                    </Link>
                    .
                  </p>
                  <Link href="#" className="badge text-muted bg-light">
                    <i className="mdi mdi-reply"></i> Reply
                  </Link>
                </div>
              </div>

              {/* Comment 3 with attachments */}
              <div className="d-flex">
                <div className="flex-shrink-0">
                  <Image
                    src={avatar10}
                    alt="Alexis Clarke"
                    width={32}
                    height={32}
                    className="avatar-xs rounded-circle material-shadow"
                  />
                </div>
                <div className="flex-grow-1 ms-3">
                  <h5 className="fs-13">
                    Alexis Clarke{" "}
                    <small className="text-muted">26 min ago</small>
                  </h5>
                  <p className="text-muted">
                    Your{" "}
                    <Link href="#" className="text-decoration-underline">
                      Online Order Support
                    </Link>{" "}
                    provides status updates...
                  </p>

                  <Row className="g-2 mb-3">
                    <Col lg={1} sm={2} xs={6}>
                      <Image
                        src={image4}
                        alt="Attachment 1"
                        width={60}
                        height={60}
                        className="img-fluid rounded"
                      />
                    </Col>
                    <Col lg={1} sm={2} xs={6}>
                      <Image
                        src={image5}
                        alt="Attachment 2"
                        width={60}
                        height={60}
                        className="img-fluid rounded"
                      />
                    </Col>
                  </Row>

                  <Link href="#" className="badge text-muted bg-light">
                    <i className="mdi mdi-reply"></i> Reply
                  </Link>

                  {/* Reply to Comment 3 */}
                  <div className="d-flex mt-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={avatar6}
                        alt="Donald Palmer"
                        width={32}
                        height={32}
                        className="avatar-xs rounded-circle material-shadow"
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h5 className="fs-13">
                        Donald Palmer{" "}
                        <small className="text-muted">8 sec ago</small>
                      </h5>
                      <p className="text-muted">
                        Other shipping methods are available...
                      </p>
                      <Link href="#" className="badge text-muted bg-light">
                        <i className="mdi mdi-reply"></i> Reply
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SimpleBar>

            <form action="#" className="mt-3">
              <Row className="g-3">
                <Col lg={12}>
                  <Label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Leave a Comment
                  </Label>
                  <textarea
                    className="form-control bg-light border-light"
                    id="exampleFormControlTextarea1"
                    rows={3}
                    placeholder="Enter comments"
                  ></textarea>
                </Col>
                <Col lg={12} className="text-end">
                  <Link href="#" className="btn btn-success">
                    Post Comment
                  </Link>
                </Col>
              </Row>
            </form>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default TicketDescription;
