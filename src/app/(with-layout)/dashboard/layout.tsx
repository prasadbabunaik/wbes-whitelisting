"use client";

import React from "react";
import { Container } from "reactstrap";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="page-content">
      <Container fluid>{children}</Container>
    </div>
  );
}
