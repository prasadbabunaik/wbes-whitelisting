import React from "react";

const TwoColumnLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="twocolumnlayout-layout">
      <h2>TwoColumnLayout Layout</h2>
      <main>{children}</main>
    </div>
  );
};

export default TwoColumnLayout;
