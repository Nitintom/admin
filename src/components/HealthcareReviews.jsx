import React, { useState, useEffect } from 'react';

function HealthcareReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch the reviews for a healthcare entity from your API
    fetch('https://askvital.onrender.com/api/healthcare')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setReviews(data);
        } else {
          console.error('Received non-array data for reviews:', data);
        }
      })
      .catch((error) => console.error('Failed to fetch reviews', error));
  }, []);

  return (
    <div>
      <h2>Healthcare Reviews</h2>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p>Review Content: {review.content}</p>
              {/* Add any other information you want to display */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
}

export default HealthcareReviews;
