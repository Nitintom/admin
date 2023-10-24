import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { setAdminStatus } from '../redux/user/adminSlice'; // Replace with the correct path to your adminSlice file
import "../styles/AdminLogin.css";

function AdminLogin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdminLogin = async () => {
    try {
      const response = await fetch("https://askvital.onrender.com/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        const data = await response.json();

        if (data.message === "Admin authenticated successfully") {
          // Authentication successful
          console.log(data.message);
          dispatch(setAdminStatus(true)); // Set isAdmin to true in the Redux store
          window.location.href = "/dashboard";
        } else {
          // Authentication failed
          setError("Authentication failed. Please check your credentials.");
        }
      } else if (response.status === 401) {
        // Unauthorized
        setError("Invalid credentials or not authorized as an admin.");
      } else {
        // Handle other response status codes
        setError(`Unexpected status code: ${response.status}`);
      }
    } catch (error) {
      // Handle network errors or server errors
      console.error("An error occurred:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container020">
      <img
              src="https://i.ibb.co/5c5X9f1/oie-Zhohzh-ISr2s-H.png"
              className="Logo m-5"
              alt="Logo"
            />
      <form className="Adminform" onSubmit={handleAdminLogin}>
        <div>
          <label className="labelAdmin" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="AdminInputText"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="labelAdmin" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="AdminInputpassword"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button className="AdminLoginbtn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
