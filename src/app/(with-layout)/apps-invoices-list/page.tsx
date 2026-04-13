"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  CardBody,
  Row,
  Col,
  Card,
  Container,
  CardHeader,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Link from "next/link";
import moment from "moment";
import CountUp from "react-countup";
import BreadCrumb from "@components/Common/BreadCrumb";
import TableContainer from "@components/Common/TableContainer";
import DeleteModal from "@components/Common/DeleteModal";
import FeatherIcon from "feather-icons-react";
import { invoiceWidgets } from "@common/data/invoiceList";
import {
  getInvoices as onGetInvoices,
  deleteInvoice as onDeleteInvoice,
} from "@slices/thunks";
import { useSelector, useDispatch } from "react-redux";
import Loader from "@components/Common/Loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createSelector } from "reselect";
import Image from "next/image";

const InvoiceList = () => {
  const dispatch: any = useDispatch();

  const selectLayoutState = (state: any) => state.Invoice;
  const selectInvoiceProperties = createSelector(selectLayoutState, state => ({
    invoices: state.invoices ?? [],
    isInvoiceSuccess: state.isInvoiceSuccess,
    error: state.error,
  }));

  const { invoices, isInvoiceSuccess, error } = useSelector(
    selectInvoiceProperties
  );

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState<any>(null);
  const [selectedCheckBoxDelete, setSelectedCheckBoxDelete] = useState([]);
  const [isMultiDeleteButton, setIsMultiDeleteButton] = useState(false);

  useEffect(() => {
    if (!Array.isArray(invoices) || invoices.length === 0) {
      dispatch(onGetInvoices());
    }
  }, [dispatch]);

  const onClickDelete = (invoice: any) => {
    setInvoiceToDelete(invoice);
    setDeleteModal(true);
  };

  const handleDeleteInvoice = () => {
    if (invoiceToDelete) {
      dispatch(onDeleteInvoice(invoiceToDelete._id));
      setDeleteModal(false);
      setInvoiceToDelete(null);
    }
  };

  const handleValidDate = (date: any) =>
    moment(new Date(date)).format("DD MMM Y");

  const handleValidTime = (time: any) => {
    const time1 = new Date(time);
    const getHour = time1.getUTCHours();
    const getMin = time1.getUTCMinutes();
    const getTime = `${getHour}:${getMin}`;
    const meridiem = getHour >= 12 ? "PM" : "AM";
    return moment(getTime, "hh:mm").format("hh:mm") + " " + meridiem;
  };

  const checkedAll = useCallback(() => {
    const checkall: any = document.getElementById("checkBoxAll");
    const ele = document.querySelectorAll(".invoiceCheckBox");

    ele.forEach((e: any) => {
      e.checked = checkall.checked;
    });

    deleteCheckbox();
  }, []);

  const deleteMultiple = () => {
    const checkall: any = document.getElementById("checkBoxAll");
    selectedCheckBoxDelete.forEach((element: any) => {
      dispatch(onDeleteInvoice(element.value));
    });
    setIsMultiDeleteButton(false);
    checkall.checked = false;
    setDeleteModalMulti(false);
  };

  const deleteCheckbox = () => {
    const ele: any = document.querySelectorAll(".invoiceCheckBox:checked");
    setIsMultiDeleteButton(ele.length > 0);
    setSelectedCheckBoxDelete(Array.from(ele));
  };

  const columns = useMemo(
    () => [
      {
        header: (
          <input
            type="checkbox"
            id="checkBoxAll"
            className="form-check-input"
            onClick={checkedAll}
          />
        ),
        cell: (cell: any) => (
          <input
            type="checkbox"
            className="invoiceCheckBox form-check-input"
            value={cell.getValue()}
            onChange={deleteCheckbox}
          />
        ),
        id: "#",
        accessorKey: "_id",
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        header: "ID",
        accessorKey: "invoice_no",
        enableColumnFilter: false,
        cell: (cell: any) => (
          <Link
            href="/apps-invoices-details"
            className="fw-medium link-primary"
          >
            #VL{cell.getValue()}
          </Link>
        ),
      },
      {
        header: "Customer",
        accessorKey: "customer",
        enableColumnFilter: false,
        cell: (cell: any) => {
          const user = cell.row.original;
          const imageUrl = user?.img ? `/images/users/${user.img}` : null;

          const getInitials = (name: string) => {
            if (!name) return "NA";
            const parts = name.trim().split(" ");
            return parts
              .map(word => word.charAt(0).toUpperCase())
              .join("")
              .substring(0, 2);
          };

          return (
            <div className="d-flex align-items-center">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="User Avatar"
                  width={32}
                  height={32}
                  className="avatar-xs rounded-circle me-2"
                  unoptimized
                />
              ) : (
                <div className="flex-shrink-0 avatar-xs me-2">
                  <div className="avatar-title bg-success-subtle text-success rounded-circle fs-13">
                    {getInitials(user.customer)}
                  </div>
                </div>
              )}
              <span>{user?.customer || "Unnamed"}</span>
            </div>
          );
        },
      },
      { header: "EMAIL", accessorKey: "email", enableColumnFilter: false },
      {
        header: "COUNTRY",
        accessorKey: "billing_address.country",
        enableColumnFilter: false,
      },
      {
        header: "DATE",
        accessorKey: "date",
        enableColumnFilter: false,
        cell: (cell: any) => (
          <>
            {handleValidDate(cell.getValue())},{" "}
            <small className="text-muted">
              {handleValidTime(cell.getValue())}
            </small>
          </>
        ),
      },
      {
        header: "AMOUNT",
        accessorKey: "invoice_amount",
        enableColumnFilter: false,
      },
      {
        header: "PAYMENT STATUS",
        accessorKey: "status",
        enableColumnFilter: false,
        cell: (cell: any) => {
          const status = cell.getValue();
          const statusMap: any = {
            Paid: "success",
            Unpaid: "warning",
            Cancel: "danger",
          };
          const color = statusMap[status] || "primary";
          return (
            <span
              className={`badge text-uppercase bg-${color}-subtle text-${color}`}
            >
              {status}
            </span>
          );
        },
      },
      {
        header: "Action",
        cell: (cellProps: any) => {
          return (
            <UncontrolledDropdown direction="start" inNavbar>
              <DropdownToggle
                href="#"
                className="btn btn-soft-secondary btn-sm"
                tag="button"
              >
                <i className="ri-more-fill align-middle"></i>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem href="/apps-invoices-details">
                  <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                  View
                </DropdownItem>
                <DropdownItem href="/apps-invoices-create">
                  <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                  Edit
                </DropdownItem>
                <DropdownItem href="#">
                  <i className="ri-download-2-line align-bottom me-2 text-muted"></i>{" "}
                  Download
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                  href="#"
                  onClick={() => onClickDelete(cellProps.row.original)}
                >
                  <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          );
        },
      },
    ],
    [checkedAll]
  );

  document.title =
    "Invoice List | Velzon - Next.js TypeScript Admin & Dashboard Template";

  return (
    <React.Fragment>
      <div className="page-content">
        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleDeleteInvoice}
          onCloseClick={() => setDeleteModal(false)}
        />
        <DeleteModal
          show={deleteModalMulti}
          onDeleteClick={deleteMultiple}
          onCloseClick={() => setDeleteModalMulti(false)}
        />
        <Container fluid>
          <BreadCrumb title="Invoice List" pageTitle="Invoices" />
          <Row>
            {invoiceWidgets.map((widget, key) => (
              <Col xl={3} md={6} key={key}>
                <Card className="card-animate">
                  <CardBody>
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1">
                        <p className="text-uppercase fw-medium text-muted mb-0">
                          {widget.label}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <h5
                          className={`fs-14 mb-0 text-${widget.percentageClass}`}
                        >
                          <i className="ri-arrow-right-up-line fs-13 align-middle"></i>{" "}
                          {widget.percentage}
                        </h5>
                      </div>
                    </div>
                    <div className="d-flex align-items-end justify-content-between mt-4">
                      <div>
                        <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                          <CountUp
                            start={0}
                            prefix={widget.prefix}
                            suffix={widget.suffix}
                            end={widget.counter}
                            duration={4}
                            className="counter-value"
                          />
                        </h4>
                        <span className="badge bg-warning me-1">
                          {widget.badge}
                        </span>{" "}
                        <span className="text-muted">{widget.caption}</span>
                      </div>
                      <div className="avatar-sm flex-shrink-0">
                        <span className="avatar-title bg-light rounded fs-3">
                          <FeatherIcon
                            icon={widget.feaIcon}
                            className="text-success icon-dual-success"
                          />
                        </span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>

          <Row>
            <Col lg={12}>
              <Card id="invoiceList">
                <CardHeader className="border-0">
                  <div className="d-flex align-items-center">
                    <h5 className="card-title mb-0 flex-grow-1">Invoices</h5>
                    <div className="flex-shrink-0 d-flex gap-2">
                      {isMultiDeleteButton && (
                        <button
                          className="btn btn-primary me-1"
                          onClick={() => setDeleteModalMulti(true)}
                        >
                          <i className="ri-delete-bin-2-line"></i>
                        </button>
                      )}
                      <Link
                        href="/apps-invoices-create"
                        className="btn btn-danger"
                      >
                        <i className="ri-add-line align-bottom me-1"></i> Create
                        Invoice
                      </Link>
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="pt-0">
                  <div>
                    {isInvoiceSuccess &&
                    Array.isArray(invoices) &&
                    invoices.length > 0 ? (
                      <TableContainer
                        columns={columns}
                        data={invoices}
                        isGlobalFilter
                        customPageSize={10}
                        isInvoiceListFilter
                        theadClass="text-muted text-uppercase"
                        SearchPlaceholder="Search for customer, email, country, status or something..."
                      />
                    ) : (
                      <Loader error={error} />
                    )}
                    <ToastContainer closeButton={false} limit={1} />
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

export default InvoiceList;
