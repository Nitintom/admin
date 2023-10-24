import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Users from './Users';
import BulkUpdate from './BulkUpdate';
import AdminCategories from './NewCategories';
import Notifications from './Notifications';
import ReviewsEdit from './ReviewsEdit';
import AdminHospitals01 from './AdminHospital01';

function HomeLayout() {
  return (
    <div className="main-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customers" element={<Users />} />
        <Route path="/AdminHospitals" element={<AdminHospitals01 />} />
        <Route path="/bulkupdate" element={<BulkUpdate />} />
        <Route path="/AdminCategories" element={<AdminCategories />} />
        <Route path="/notification" element={<Notifications />} />
        <Route path="/reviews-edit" element={<ReviewsEdit />} />
      </Routes>
    </div>
  );
}

export default HomeLayout;
