import React from "react";
import { Outlet } from "react-router-dom";
import AdminDashboardNavbar from "./AdminDashboardNavbar";

function AdminDashboardLayout() {
  return (
    <div className="dashboard-layout">
      <AdminDashboardNavbar />
      <div className="main-container">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboardLayout;
