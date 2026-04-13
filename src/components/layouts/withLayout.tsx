import React from "react";
import { NextPage } from "next";
import AuthLayout from "../../layouts/AuthLayout";
import NonAuthLayout from "../../layouts/NonAuthLayout";

type LayoutType = "auth" | "non-auth";

export type PageWithLayoutType = NextPage & {
  layout?: LayoutType;
};

export default function withLayout(
  Page: PageWithLayoutType,
  layout: LayoutType = "auth"
) {
  return function WrappedPage(props: any) {
    if (layout === "non-auth") {
      return (
        <NonAuthLayout>
          <Page {...props} />
        </NonAuthLayout>
      );
    }

    return (
      <AuthLayout>
        <Page {...props} />
      </AuthLayout>
    );
  };
}
