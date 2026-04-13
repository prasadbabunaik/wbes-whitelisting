import React from "react";
import { Container } from "reactstrap";
import BreadCrumb from "@/components/Common/BreadCrumb";
import BasicAction from "@/components/BasicAction/BasicAction";
import SubscribeAction from "@/components/BasicAction/SubscribeAction";
import EmailVerifyAction from "@/components/BasicAction/EmailVerifyAction";
import PasswordChangeAction from "@/components/BasicAction/PasswordChangeAction";

const index = () => {
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
