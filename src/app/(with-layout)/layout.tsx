// app/(with-layout)/layout.tsx
import React from "react";
import Layout from "@/layouts/Layouts";

export default function WithLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
