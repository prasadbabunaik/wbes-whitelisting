import React from "react";
import {
  Col,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  Row,
} from "reactstrap";
import Image from "next/image";

//import images
const github = "/images/brands/github.png";
const bitbucket = "/images/brands/bitbucket.png";
const dribbble = "/images/brands/dribbble.png";
const dropbox = "/images/brands/dropbox.png";
const mail_chimp = "/images/brands/mail_chimp.png";
const slack = "/images/brands/slack.png";
import Link from "next/link";

const WebAppsDropdown = () => {
  return (
    <React.Fragment>
      <UncontrolledDropdown
        nav
        inNavbar
        className="topbar-head-dropdown ms-1 header-item"
      >
        <DropdownToggle
          tag="button"
          type="button"
          className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
        >
          <i className="bx bx-category-alt fs-22"></i>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-lg p-0">
          <div className="p-3 border-top-0 border-start-0 border-end-0 border-dashed border">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0 fw-semibold fs-15"> Web Apps </h6>
              </Col>
              <div className="col-auto">
                <Link href="#" className="btn btn-sm btn-soft-info">
                  {" "}
                  View All Apps
                  <i className="ri-arrow-right-s-line align-middle"></i>
                </Link>
              </div>
            </Row>
          </div>

          <div className="p-2">
            <div className="row g-0">
              <Col>
                <Link className="dropdown-icon-item" href="#">
                  <Image src={github} alt="Github" height={20} width={20} />
                  <span>GitHub</span>
                </Link>
              </Col>
              <Col>
                <Link className="dropdown-icon-item" href="#">
                  <Image
                    src={bitbucket}
                    alt="bitbucket"
                    height={20}
                    width={20}
                  />
                  <span>Bitbucket</span>
                </Link>
              </Col>
              <Col>
                <Link className="dropdown-icon-item" href="#">
                  <Image src={dribbble} alt="dribbble" height={20} width={20} />
                  <span>Dribbble</span>
                </Link>
              </Col>
            </div>

            <div className="row g-0">
              <Col>
                <Link className="dropdown-icon-item" href="#">
                  <Image src={dropbox} alt="dropbox" height={20} width={20} />
                  <span>Dropbox</span>
                </Link>
              </Col>
              <Col>
                <Link className="dropdown-icon-item" href="#">
                  <Image
                    src={mail_chimp}
                    alt="mail_chimp"
                    height={20}
                    width={20}
                  />
                  <span>Mail Chimp</span>
                </Link>
              </Col>
              <Col>
                <Link className="dropdown-icon-item" href="#">
                  <Image src={slack} alt="slack" height={20} width={20} />
                  <span>Slack</span>
                </Link>
              </Col>
            </div>
          </div>
        </DropdownMenu>
      </UncontrolledDropdown>
    </React.Fragment>
  );
};

export default WebAppsDropdown;
