import React from "react";
import "../styles/admindashbord.css";
import { BsPersonCircle, BsSearch, BsJustify } from "react-icons/bs";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory

function Header({ OpenSidebar }) {
  const navigate = useNavigate(); // Use useNavigate hook

  const handleLogout = () => {
    // Perform logout actions here (e.g., clearing user session or cookies)
    // Replace this with your actual logout logic

    // After logout, redirect to the "/" page
    navigate("/");
  };

  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      {/* <div className="header-left">
        <BsSearch className="icon" />
      </div> */}
      <div className="header-right">
        <BsPersonCircle className="icon" onClick={handleLogout} text="logout" />
      </div>
    </header>
  );
}

export default Header;
