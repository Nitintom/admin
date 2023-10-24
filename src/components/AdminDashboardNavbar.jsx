import React from "react";
import {
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillClipboard2DataFill,
  BsBellFill,
  BsReverseLayoutTextSidebarReverse,
} from "react-icons/bs";
import { Link, useLocation } from "react-router-dom"; // Import Link and useLocation from React Router

function AdminDashboardNavbar({ openSidebarToggle, OpenSidebar }) {
  // Use useLocation to get the current location
  const location = useLocation();

  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <img
            src="https://i.ibb.co/5c5X9f1/oie-Zhohzh-ISr2s-H.png"
            className="Logo"
            alt="askvital-logo-img"
          />
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          {/* Add "to" attribute to Link, use exact for the dashboard link to match exactly */}
          <Link to="/dashboard" className={`nav-link ${location.pathname === "/dashboard" ? "active" : ""}`}>
            <BsGrid1X2Fill className="icon" /> Dashboard
          </Link>
        </li>
        <li className="sidebar-list-item">
          {/* Add "to" attribute to Link, use exact to match exactly */}
          <Link to="/dashboard/AdminHospitals" className={`nav-link ${location.pathname === "/dashboard/AdminHospitals" ? "active" : ""}`}>
            <BsFillArchiveFill className="icon" /> Hospitals
          </Link>
        </li>
        <li className="sidebar-list-item">
          {/* Add "to" attribute to Link, use exact to match exactly */}
          <Link to="/dashboard/notification" className={`nav-link ${location.pathname === "/dashboard/notification" ? "active" : ""}`}>
            <BsBellFill className="icon" /> Notification
          </Link>
        </li>
        <li className="sidebar-list-item">
          {/* Add "to" attribute to Link, use exact to match exactly */}
          <Link to="/dashboard/AdminCategories" className={`nav-link ${location.pathname === "/dashboard/AdminCategories" ? "active" : ""}`}>
            <BsFillGrid3X3GapFill className="icon" /> Categories
          </Link>
        </li>
        <li className="sidebar-list-item">
          {/* Add "to" attribute to Link, use exact to match exactly */}
          <Link to="/dashboard/customers" className={`nav-link ${location.pathname === "/dashboard/customers" ? "active" : ""}`}>
            <BsPeopleFill className="icon" /> Customers
          </Link>
        </li>
        <li className="sidebar-list-item">
          {/* Add "to" attribute to Link, use exact to match exactly */}
          <Link to="/dashboard/reviews-edit" className={`nav-link ${location.pathname === "/dashboard/reviews-edit" ? "active" : ""}`}>
            <BsReverseLayoutTextSidebarReverse className="icon" /> Reviews
          </Link>
        </li>

        <li className="sidebar-list-item">
          {/* Add "to" attribute to Link, use exact to match exactly */}
          <Link to="/dashboard/bulkupdate" className={`nav-link ${location.pathname === "/dashboard/bulkupdate" ? "active" : ""}`}>
            <BsFillClipboard2DataFill className="icon" /> Bulk Update
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default AdminDashboardNavbar;
