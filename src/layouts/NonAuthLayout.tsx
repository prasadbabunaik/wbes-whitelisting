import React from "react";

const NonAuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col min-h-screen">
        {/* You can add a simple header here if needed */}
        <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
        {/* You can add a simple footer here if needed */}
      </div>
    </div>
  );
};

export default NonAuthLayout;
