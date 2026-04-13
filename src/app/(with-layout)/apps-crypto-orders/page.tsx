"use client";
import React, { useEffect } from "react";
import { Container, Row } from "reactstrap";
import BreadCrumb from "@components/Common/BreadCrumb";
import AllOrders from "./AllOrders";

import { useSelector, useDispatch } from "react-redux";
import { getOrderList } from "@slices/thunks";
import { createSelector } from "reselect";

const CryproOrder = () => {
  const dispatch: any = useDispatch();

  const cryptoorderData = createSelector(
    state => state.Crypto,
    orderList => orderList.orderList
  );
  // Inside your component
  const orderList = useSelector(cryptoorderData);

  useEffect(() => {
    dispatch(getOrderList());
  }, [dispatch]);

  document.title =
    "Orders | Velzon - Next.js TypeScript Admin & Dashboard Template";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Orders" pageTitle="Crypto" />
          <Row>
            <AllOrders orderList={orderList} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CryproOrder;
