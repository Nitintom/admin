import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios.config';

function Notifications() {
  const [adminNotifications, setAdminNotifications] = useState([]);

  useEffect(() => {
    const fetchAdminNotifications = async () => {
      try {
        const response = await axiosInstance.get('/api/business/admin/pending-submissions');
        if (response.data && response.data.length > 0) {
          setAdminNotifications(response.data);
        }
      } catch (error) {
        console.error('Error fetching admin notifications:', error);
      }
    };

    fetchAdminNotifications();
  }, []);

  const handleApproveSubmission = async (submissionId, notification) => {
    try {
      // Add the console.log statement here to check notification.images
      console.log('Notification Images:', notification.images);
  
      // Make a POST request to create a new healthcare entity
      const response = await axiosInstance.post('/api/healthcare', {
        name: notification.name,
        categories: notification.categories,
        city: notification.city,
        fulladdress: notification.fulladdress,
        timings: notification.timings,
        contactnumber: notification.contactnumber,
        about: notification.about,
        speciality: notification.speciality,
        ratings: notification.ratings,
        review: notification.review,
        // {
        //   imageUrl: {
        //     type: String,
        //   },
        // },
        // images:[{imageUrl:'https://i.ibb.co/tcdK8qk/Health-ID-91-2760-3314-3831.png'}]
        images: notification.images, // Include the image URL in an array
      });
  
      // ... rest of your code ...
    } catch (error) {
      console.error('Error approving submission:', error);
      // Handle the error (e.g., display an error message)
    }
  };
      
  

  const handleDenySubmission = async (submissionId) => {
    try {
      // First, update the submission status to 'Denied'
      await axiosInstance.post('/api/business/admin/update-submission-status', {
        submissionId,
        status: 'Denied',
      });
  
      // If the status update was successful, proceed to delete the submission
      const response = await axiosInstance.delete('/api/business/admin/delete-submission', {
        data: { submissionId } // Send the submissionId as data in the DELETE request
      });
  
      if (response.status === 200) {
        // Remove the denied submission from the list
        setAdminNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification._id !== submissionId)
        );
        // Provide feedback to the user (e.g., display a success message)
      } else {
        // Handle the error (e.g., display an error message)
      }
    } catch (error) {
      console.error('Error denying submission:', error);
      // Handle the error (e.g., display an error message)
    }
  };
  

  return (
    <div>
      <h2>Notification Section</h2>
      {adminNotifications.length === 0 ? (
        <p>No pending submissions</p>
      ) : (
        <ul>
        {adminNotifications.map((notification) => (
          <li key={notification._id}>
            <p>Submission ID: {notification._id}</p>
            <p>Business Name: {notification.name}</p>
            <p>Categories: {notification.categories}</p>
            <p>City: {notification.city}</p>
            <p>Full Address: {notification.fulladdress}</p>
            <p>Timings: {notification.timings}</p>
            <p>Contact Number: {notification.contactnumber}</p>
            <p>About: {notification.about}</p>
            <p>Speciality: {notification.speciality}</p>
            {notification.images && notification.images[0] && (
              <p>Image URL: {notification.images[0].imageUrl}</p>
            )}
            <button onClick={() => handleApproveSubmission(notification._id, notification, notification.images[0]?.imageUrl)}>
  Approve
</button>

            <button onClick={() => handleDenySubmission(notification._id)}>Deny</button>
          </li>
        ))}
      </ul>
     
      )}
    </div>
  );
}

export default Notifications;
