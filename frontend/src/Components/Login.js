import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Form.css'; // Reuse shared styles

function Login() {
  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!gmail || !password) {
      alert("Please fill in both email and password.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/users/login", { gmail, password });
      localStorage.setItem("userId", res.data._id);
      navigate("/home");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed.");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleLogin} className="form-card">
        <h2 className="form-title">Login to Artora</h2>
        <input
          type="email"
          placeholder="Email"
          value={gmail}
          onChange={(e) => setGmail(e.target.value)}
          className="form-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        />
        <button type="submit" className="form-button">Login</button>
        <p className="form-link-text">Don't have an account? <Link to="/register" className="form-link">Register</Link></p>
      </form>
    </div>
  );
}

export default Login;
