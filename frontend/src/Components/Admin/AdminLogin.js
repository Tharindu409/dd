import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminLog.css'

function AdminLogin() {
  const [form, setForm] = useState({ gmail: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/admin/admin-login', form);

      // Save admin ID in localStorage
      localStorage.setItem('adminId', res.data.admin._id);

      // Navigate to admin dashboard
      navigate('/admin-dashboard');
    } catch (err) {
      alert(err.response?.data?.error || 'Admin login failed');
    }
  };

  return (
    <div className='Adminlog'>
    <form onSubmit={handleSubmit} style={styles.form} >
      <h2>Admin Login</h2>
      <input
        name="gmail"
        type="email"
        placeholder="Admin Gmail"
        value={form.gmail}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <button type="submit" style={styles.button}>Login</button>
    </form>
    </div>
  );
}

const styles = {
  form: {
    maxWidth: '400px',
    margin: '60px auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    padding: '25px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
     
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer'
  }
};

export default AdminLogin;
