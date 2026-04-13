import React from "react";
import Link from "next/link";
import { Card, CardBody, CardHeader, Col, Table } from "reactstrap";
import Image from "next/image";

// User avatars
const avatar3 = "/images/users/avatar-3.jpg";
const avatar4 = "/images/users/avatar-4.jpg";
const avatar10 = "/images/users/avatar-10.jpg";

const TicketDetails = () => {
  return (
    <React.Fragment>
      <Col xxl={3}>
        <Card>
          <CardHeader>
            <h5 className="card-title mb-0">Ticket Details</h5>
          </CardHeader>
          <CardBody>
            <div className="table-responsive table-card">
              <Table className="table-borderless align-middle mb-0">
                <tbody>
                  <tr>
                    <td className="fw-medium">Ticket</td>
                    <td>
                      #VLZ<span id="t-no">135</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-medium">Client</td>
                    <td id="t-client">Themesbrand</td>
                  </tr>
                  <tr>
                    <td className="fw-medium">Project</td>
                    <td>Velzon - Admin Dashboard</td>
                  </tr>
                  <tr>
                    <td className="fw-medium">Assigned To:</td>
                    <td>
                      <div className="avatar-group">
                        <Link
                          href="#"
                          className="avatar-group-item material-shadow"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          data-bs-trigger="hover"
                          data-bs-original-title="Erica Kernan"
                        >
                          <Image
                            src={avatar4}
                            alt="Erica Kernan"
                            width={32}
                            height={32}
                            className="rounded-circle avatar-xs"
                          />
                        </Link>
                        <Link
                          href="#"
                          className="avatar-group-item material-shadow"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          data-bs-trigger="hover"
                          data-bs-original-title="Alexis Clarke"
                        >
                          <Image
                            src={avatar10}
                            alt="Alexis Clarke"
                            width={32}
                            height={32}
                            className="rounded-circle avatar-xs"
                          />
                        </Link>
                        <Link
                          href="#"
                          className="avatar-group-item material-shadow"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          data-bs-trigger="hover"
                          data-bs-original-title="James Price"
                        >
                          <Image
                            src={avatar3}
                            alt="James Price"
                            width={32}
                            height={32}
                            className="rounded-circle avatar-xs"
                          />
                        </Link>
                        <Link
                          href="#"
                          className="avatar-group-item material-shadow"
                          data-bs-toggle="tooltip"
                          data-bs-trigger="hover"
                          data-bs-placement="top"
                          data-bs-original-title="Add Members"
                        >
                          <div className="avatar-xs">
                            <div className="avatar-title fs-16 rounded-circle bg-light border-dashed border text-primary">
                              +
                            </div>
                          </div>
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-medium">Status:</td>
                    <td>
                      <select
                        className="form-select"
                        id="t-status"
                        data-choices
                        data-choices-search-false
                        aria-label="Default select example"
                      >
                        <option value="">Status</option>
                        <option defaultValue="New">New</option>
                        <option value="Open">Open</option>
                        <option value="Inprogress">Inprogress</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-medium">Priority</td>
                    <td>
                      <span className="badge bg-danger" id="t-priority">
                        High
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-medium">Create Date</td>
                    <td id="c-date">20 Dec, 2021</td>
                  </tr>
                  <tr>
                    <td className="fw-medium">Due Date</td>
                    <td id="d-date">29 Dec, 2021</td>
                  </tr>
                  <tr>
                    <td className="fw-medium">Last Activity</td>
                    <td>14 min ago</td>
                  </tr>
                  <tr>
                    <td className="fw-medium">Labels</td>
                    <td className="hstack text-wrap gap-1">
                      <span className="badge bg-primary-subtle text-primary">
                        Admin
                      </span>
                      <span className="badge bg-primary-subtle text-primary">
                        UI
                      </span>
                      <span className="badge bg-primary-subtle text-primary">
                        Dashboard
                      </span>
                      <span className="badge bg-primary-subtle text-primary">
                        Design
                      </span>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h6 className="card-title fw-semibold mb-0">Files Attachment</h6>
          </CardHeader>
          <CardBody>
            <div className="d-flex align-items-center border border-dashed p-2 rounded">
              <div className="flex-shrink-0 avatar-sm">
                <div className="avatar-title bg-light rounded">
                  <i className="ri-file-zip-line fs-20 text-primary"></i>
                </div>
              </div>
              <div className="flex-grow-1 ms-3">
                <h6 className="mb-1">
                  <Link href="#">Velzon-admin.zip</Link>
                </h6>
                <small className="text-muted">3.2 MB</small>
              </div>
              <div className="hstack gap-3 fs-16">
                <Link href="#" className="text-muted">
                  <i className="ri-download-2-line"></i>
                </Link>
                <Link href="#" className="text-muted">
                  <i className="ri-delete-bin-line"></i>
                </Link>
              </div>
            </div>

            <div className="d-flex align-items-center border border-dashed p-2 rounded mt-2">
              <div className="flex-shrink-0 avatar-sm">
                <div className="avatar-title bg-light rounded">
                  <i className="ri-file-ppt-2-line fs-20 text-danger"></i>
                </div>
              </div>
              <div className="flex-grow-1 ms-3">
                <h6 className="mb-1">
                  <Link href="#">Velzon-admin.ppt</Link>
                </h6>
                <small className="text-muted">4.5 MB</small>
              </div>
              <div className="hstack gap-3 fs-16">
                <Link href="#" className="text-muted">
                  <i className="ri-download-2-line"></i>
                </Link>
                <Link href="#" className="text-muted">
                  <i className="ri-delete-bin-line"></i>
                </Link>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default TicketDetails;
