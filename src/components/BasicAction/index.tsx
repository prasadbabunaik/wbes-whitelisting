import React from "react";
import { Container } from "reactstrap";
import BreadCrumb from "@common/BreadCrumb";
import BasicAction from "./BasicAction";
import SubscribeAction from "./SubscribeAction";
import EmailVerifyAction from "./EmailVerifyAction";
import PasswordChangeAction from "./PasswordChangeAction";

const index = () => {
  document.title =
    "Basic Action | Velzon - Next.js TypeScript Admin & Dashboard Template";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Basic Action" pageTitle="Basic Action" />
          <BasicAction />
          <SubscribeAction />
          <EmailVerifyAction />
          <PasswordChangeAction />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default index;
