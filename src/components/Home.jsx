import React, { useState, useEffect } from "react";
import "../styles/admindashbord.css";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
  BsReverseLayoutTextSidebarReverse,
} from "react-icons/bs";

function Home() {
  const [hospitalCount, setHospitalCount] = useState(0);

  useEffect(() => {
    // Replace 'API_URL' with the actual URL of your API
    fetch("https://askvital.onrender.com/api/healthcare") // Assuming this URL fetches hospital data
      .then((response) => response.json())
      .then((data) => {
        // Assuming your API response contains a 'hospitals' array
        const count = data.length; // Use data.length to count the number of hospitals
        setHospitalCount(count);
      })
      .catch((error) => {
        console.error("Error fetching hospital count:", error);
      });
  }, []);

  return (
    <main className="">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <div className="card" id="card01">
          <div className="card-inner">
            <h3>Hospitals</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <h1>{hospitalCount}</h1>
        </div>
        <div className="card" id="card02">
          <div className="card-inner">
            <h3>ALERTS</h3>
            <BsFillBellFill className="card_icon" />
          </div>
          <h1>42</h1>
        </div>
        <div className="card" id="card03">
          <div className="card-inner">
            <h3>CATEGORIES</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>12</h1>
        </div>
        <div className="card" id="card04">
          <div className="card-inner">
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>33</h1>
        </div>
        <div className="card" id="card05">
          <div className="card-inner">
            <h3>Reviews</h3>
            <BsReverseLayoutTextSidebarReverse className="card_icon" />
          </div>
          <h1>42</h1>
        </div>
      </div>
    </main>
  );
}

export default Home;
