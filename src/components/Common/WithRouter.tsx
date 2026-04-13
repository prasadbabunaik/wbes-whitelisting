"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ComponentType } from "react";

// Define router interface
interface RouterProps {
  pathname: string;
  push: (url: string) => void;
  replace: (url: string) => void;
  back: () => void;
  searchParams: ReturnType<typeof useSearchParams>;
}

function withRouter<P>(Component: ComponentType<P & { router: RouterProps }>) {
  return function ComponentWithRouterProp(props: P) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    return (
      <Component
        {...props}
        router={{
          pathname,
          push: router.push,
          replace: router.replace,
          back: router.back,
          searchParams,
        }}
      />
    );
  };
}

export default withRouter;
