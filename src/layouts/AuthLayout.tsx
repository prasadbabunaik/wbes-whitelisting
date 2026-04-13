import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  const navigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Users", href: "/dashboard/users" },
    { name: "Settings", href: "/dashboard/settings" },
  ];

  const handleLogout = () => {
    // TODO: Implement logout logic
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b">
            <Link href="/dashboard" className="text-xl font-bold text-blue-600">
              Your App
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navigation.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-4 py-2 rounded-md ${
                  router.pathname === item.href ||
                  router.pathname.startsWith(`${item.href}/`)
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Menu */}
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-gray-600 hover:bg-gray-50 rounded-md"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`${isSidebarOpen ? "ml-64" : "ml-0"} min-h-screen transition-margin duration-300`}
      >
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="text-gray-600">Welcome, User!</div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default AuthLayout;
