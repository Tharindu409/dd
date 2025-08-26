import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Form.css'; // Reuse shared styles

function Register() {
  const [form, setForm] = useState({
    name: '',
    gmail: '',
    password: '',
    phone: '',
    country: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/users/register', form);
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed.');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleRegister} className="form-card">
        <h2 className="form-title">Register for Artora</h2>
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} className="form-input" />
        <input type="email" name="gmail" placeholder="Email" value={form.gmail} onChange={handleChange} className="form-input" />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="form-input" />
        <input type="text" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="form-input" />
        <input type="text" name="country" placeholder="Country" value={form.country} onChange={handleChange} className="form-input" />
        <button type="submit" className="form-button">Register</button>
        <p className="form-link-text">Already have an account? <Link to="/login" className="form-link">Login</Link></p>
      </form>
    </div>
  );
}

export default Register;
