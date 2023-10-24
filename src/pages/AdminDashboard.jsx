import React, { useState } from 'react';
import "../styles/admindashbord.css";
import { Routes, Route } from 'react-router-dom';
import AdminHeader from "../components/AdminHeader";
import Sidebar from "../components/AdminDashboardNavbar";
import HomeLayout from "../components/HomeLayout";

function AdminDashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      <AdminHeader OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
       <Routes>
        <Route path="/*" element={<HomeLayout />} />
        </Routes>
    </div>
  );
}

export default AdminDashboard;
