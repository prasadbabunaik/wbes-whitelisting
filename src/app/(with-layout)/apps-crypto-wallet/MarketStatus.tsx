import React, { useMemo } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import TableContainer from "@components/Common/TableContainer";
import { marketStatus } from "@common/data";
import Link from "next/link";
import Image from "next/image";

import { Quantity, AvgPrice, CurrentValue, Returns } from "./MarketStatusCol";

const MarketStatus = () => {
  const columns = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "coinName",
        enableColumnFilter: false,
        cell: (cell: any) => (
          <div className="d-flex align-items-center fw-medium">
            <Image
              src={cell.row.original.img}
              alt={cell.getValue()}
              width={24}
              height={24}
              className="me-2 rounded-circle avatar-xxs material-shadow"
            />
            <Link href="#" className="currency_name">
              {cell.getValue()}
            </Link>
          </div>
        ),
      },
      {
        header: "Quantity",
        accessorKey: "quantity",
        enableColumnFilter: false,
        cell: (cell: any) => <Quantity {...cell} />,
      },
      {
        header: "Avg Price",
        accessorKey: "avgPrice",
        enableColumnFilter: false,
        cell: (cell: any) => <AvgPrice {...cell} />,
      },
      {
        header: "Current Value",
        accessorKey: "value",
        enableColumnFilter: false,
        cell: (cell: any) => <CurrentValue {...cell} />,
      },
      {
        header: "Returns",
        accessorKey: "returns",
        enableColumnFilter: false,
        cell: (cell: any) => <Returns {...cell} />,
      },
      {
        header: "Returns %x",
        accessorKey: "percentage",
        enableColumnFilter: false,
        cell: (cell: any) => (
          <h6
            className={
              "text-" + cell.row.original.percentageClass + " fs-13 mb-0"
            }
          >
            <i className={cell.row.original.icon + " align-middle me-1"}></i>
            {cell.getValue()}
          </h6>
        ),
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <Card>
        <CardHeader className="border-bottom-dashed d-flex align-items-center">
          <h4 className="card-title mb-0 flex-grow-1">Market Status</h4>
          <div className="flex-shrink-0">
            <div className="btn-group" role="group" aria-label="Basic example">
              <button type="button" className="btn btn-primary btn-sm">
                Today
              </button>
              <button type="button" className="btn btn-outline-primary btn-sm">
                Overall
              </button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <TableContainer
            columns={columns}
            data={marketStatus || []}
            customPageSize={6}
            divClass="table-responsive table-card mb-3"
            tableClass="align-middle table-nowrap"
            theadClass="table-light text-muted"
          />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default MarketStatus;
