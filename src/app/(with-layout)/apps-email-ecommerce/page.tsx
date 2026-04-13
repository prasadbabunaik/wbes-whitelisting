import React from "react";
import { Container } from "reactstrap";
import BreadCrumb from "@components/Common/BreadCrumb";
import InvoiceAction from "@components/EcommerceAction/InvoiceAction";
import FeedbackAction from "@components/EcommerceAction/FeedbackAction";
import RatingTemplate from "@components/EcommerceAction/RatingTemplate";

const index = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Ecommerce Action" pageTitle="Email" />
          <InvoiceAction />
          <FeedbackAction />
          <RatingTemplate />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default index;
