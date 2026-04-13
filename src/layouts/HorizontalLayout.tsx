import React from "react";

const HorizontalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="horizontallayout-layout">
      <h2>HorizontalLayout Layout</h2>
      <main>{children}</main>
    </div>
  );
};

export default HorizontalLayout;
