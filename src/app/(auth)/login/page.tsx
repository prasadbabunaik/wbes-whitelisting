"use client";

import React from "react";
import { Container } from "reactstrap";
import Login from "@/components/auth/Login";

export default function LoginPage() {
  return (
    <div className="auth-page-wrapper">
      <Container>
        <Login />
      </Container>
    </div>
  );
}
