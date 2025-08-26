import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) return;
    axios.get(`http://localhost:5000/users/profile/${userId}`)
      .then(res => setUser(res.data))
      .catch(err => console.error(err));
  }, [userId]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      try {
        await axios.delete(`http://localhost:5000/users/profile/${userId}`);
        alert("Profile deleted successfully.");
        localStorage.clear();
        navigate("/register");
      } catch (error) {
        console.error("Delete failed", error);
        alert("Something went wrong while deleting the profile.");
      }
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <FontAwesomeIcon icon={faUserCircle} className="user-icon" />
        <h2 className="profile-title">My Profile</h2>

        <div className="profile-info">
          <div className="info-item">
            <strong>Name:</strong> <span>{user.name || 'N/A'}</span>
          </div>
          <div className="info-item">
            <strong>Email:</strong> <span>{user.gmail || 'N/A'}</span>
          </div>
          <div className="info-item">
            <strong>Phone:</strong> <span>{user.phone || 'N/A'}</span>
          </div>
          <div className="info-item">
            <strong>Country:</strong> <span>{user.country || 'N/A'}</span>
          </div>
        </div>

        <div className="profile-buttons">
          <button className="update-btn" onClick={() => navigate('/update')}>
            <FontAwesomeIcon icon={faEdit} /> Update
          </button>
          <button className="delete-btn" onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrash} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
