import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UpdateProfile() {
  const userId = localStorage.getItem('userId');
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/users/profile/${userId}`)
      .then(res => setForm(res.data));
  }, [userId]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/users/profile/${userId}`, form);
    alert('Profile Updated!');
    navigate('/profile');
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleUpdate} style={styles.form}>
        <h2>Update Profile</h2>
        {["name", "gmail", "password", "phone", "country"].map((field) => (
          <input
            key={field}
            name={field}
            type={field === "password" ? "password" : "text"}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field] || ''}
            onChange={handleChange}
            style={styles.input}
          />
        ))}
        <button type="submit" style={styles.submitBtn}>Update</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: '50px',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh'
  },
  form: {
    background: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 0 15px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '400px'
  },
  input: {
    padding: '10px 12px',
    marginBottom: '15px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px'
  },
  submitBtn: {
    backgroundColor: '#1976d2',
    color: 'white',
    padding: '12px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer'
  }
};

export default UpdateProfile;
