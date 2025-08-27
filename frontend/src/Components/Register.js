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

  // Validation function
  const validate = () => {
    if (!form.name.trim()) {
      alert("Name is required");
      return false;
    } else if (form.name.length < 3) {
      alert("Name must be at least 3 characters long");
      return false;
    }

    if (!form.gmail) {
      alert("Email is required");
      return false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.gmail)) {
      alert("Invalid email format");
      return false;
    }

    if (!form.password) {
      alert("Password is required");
      return false;
    } else if (form.password.length < 6) {
      alert("Password must be at least 6 characters long");
      return false;
    }

    if (!form.phone) {
      alert("Phone number is required");
      return false;
    } else if (!/^\d{10,15}$/.test(form.phone)) {
      alert("Phone must be 10–15 digits");
      return false;
    }

    if (!form.country.trim()) {
      alert("Country is required");
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Run validation before sending request
    if (!validate()) return;

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
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="email"
          name="gmail"
          placeholder="Email"
          value={form.gmail}
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
          className="form-input"
        />
        <button type="submit" className="form-button">Register</button>
        <p className="form-link-text">
          Already have an account?{" "}
          <Link to="/login" className="form-link">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
