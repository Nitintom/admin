import React, { useState, useEffect, useRef } from "react";
import "../styles/AdminHospitals.css";

function AdminHospitals01() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const newNameRef = useRef(null);
  const newCityRef = useRef(null);
  const newTimingsRef = useRef(null);
  const newContactNumberRef = useRef(null);
  const newAboutRef = useRef(null);
  const newSpecialityRef = useRef(null);
  // const newImagesRef = useRef(null);
  const [newImages, setNewImages] = useState([]); // For storing uploaded image URLs

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = () => {
    setIsLoading(true);

    // Replace this URL with your backend API endpoint
    const apiUrl = "https://askvital.onrender.com/api/healthcare";

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  };

  const handleOpenUpdateModal = (hospital) => {
    setSelectedHospital(hospital);
    setUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
  };

  const handleImageUpload = (e) => {
    const uploadedImages = e.target.files;
    const imageUrls = Array.from(uploadedImages).map((image) =>
      URL.createObjectURL(image)
    );
    setNewImages(imageUrls);
  };

  const handleUpdateHospital = () => {
    const updatedHospital = {
      ...selectedHospital,
      name: newNameRef.current.value,
      city: newCityRef.current.value,
      timings: newTimingsRef.current.value,
      contactnumber: newContactNumberRef.current.value,
      about: newAboutRef.current.value,
      speciality: newSpecialityRef.current.value,
      images: newImages.map((imageUrl) => ({ imageUrl })),
    };

    // Replace 'API_URL' with your actual API endpoint for updating
    const apiUrl = `https://askvital.onrender.com/api/healthcare/${selectedHospital._id}`;

    fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer gtwKU6VDPFc56p2IDJPoLQMdA3gSOlF6kqv+tsCjEdk=",
      },
      body: JSON.stringify(updatedHospital),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((updatedData) => {
        console.log("Hospital updated:", updatedData);
        fetchHospitals();
        setUpdateModalOpen(false);
      })
      .catch((error) => {
        console.error("Error updating hospital:", error);
      });
  };

  const handleOpenDeleteModal = (hospital) => {
    setSelectedHospital(hospital);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleDeleteHospital = () => {
    // Replace 'API_URL' with your actual API endpoint for deletion
    const apiUrl = `https://askvital.onrender.com/api/healthcare/${selectedHospital._id}`;

    fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer gtwKU6VDPFc56p2IDJPoLQMdA3gSOlF6kqv+tsCjEdk=",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        fetchHospitals();
        setDeleteModalOpen(false);
      })
      .catch((error) => {
        console.error("Error deleting hospital:", error);
      });
  };

  return (
    <div className="admin-panel-container mt-5">
      {isLoading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>City</th>
                <th>Timings</th>
                <th>Contact Number</th>
                <th>About</th>
                <th>Speciality</th>
                <th>Email ID</th>
                <th>Images</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {data.map((hospital) => (
                <tr key={hospital._id}>
                  <td>{hospital.name}</td>
                  <td>{hospital.city}</td>
                  <td>{hospital.timings}</td>
                  <td>{hospital.contactnumber}</td>
                  <td>{hospital.about}</td>
                  <td>{hospital.speciality}</td>
                  <td>{hospital.emailId}</td>
                  <td>
                    {Array.isArray(hospital.images) ? (
                      <ul>
                        {hospital.images.map((image, index) => (
                          <li key={index}>
                            {image.imageUrl}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      hospital.images
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-primary mr-2 admin-btn-primary"
                      onClick={() => handleOpenUpdateModal(hospital)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger admin-btn-danger"
                      onClick={() => handleOpenDeleteModal(hospital)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isUpdateModalOpen && (
        <div className="modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Hospital</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={handleCloseUpdateModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="newName">Name</label>
                  <input
                    type="text"
                    className="form-control01"
                    id="newName"
                    ref={newNameRef}
                    defaultValue={selectedHospital.name}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newCity">City</label>
                  <input
                    type="text"
                    className="form-control01"
                    id="newCity"
                    ref={newCityRef}
                    defaultValue={selectedHospital.city}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newTimings">Timings</label>
                  <input
                    type="text"
                    className="form-control01"
                    id="newTimings"
                    ref={newTimingsRef}
                    defaultValue={selectedHospital.timings}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newContactNumber">Contact Number</label>
                  <input
                    type="text"
                    className="form-control01"
                    id="newContactNumber"
                    ref={newContactNumberRef}
                    defaultValue={selectedHospital.contactnumber}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newAbout">About</label>
                  <input
                    type="text"
                    className="form-control01"
                    id="newAbout"
                    ref={newAboutRef}
                    defaultValue={selectedHospital.about}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newSpeciality">Speciality</label>
                  <input
                    type="text"
                    className="form-control01"
                    id="newSpeciality"
                    ref={newSpecialityRef}
                    defaultValue={selectedHospital.speciality}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newImages">Images</label>
                  <input
                    type="file"
                    id="newImages"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                </div>
                <div className="form-group">
                  <label>Uploaded Images:</label>
                  <div className="image-previews">
                    {newImages.map((imageUrl, index) => (
                      <img
                        key={index}
                        src={imageUrl}
                        alt={`hospital ${index}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdateHospital}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseUpdateModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Hospital</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={handleCloseDeleteModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this hospital?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger m-5"
                  onClick={handleDeleteHospital}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseDeleteModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHospitals01;
