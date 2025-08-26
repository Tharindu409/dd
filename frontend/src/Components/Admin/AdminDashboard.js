import { useEffect, useState } from 'react';
import AdminViewUsers from './AdminViewUsers';
import './AdminDashboard.css';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [showUsers, setShowUsers] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('adminId')) {
      navigate('/admin-login');
    }
  }, [navigate]);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <nav className="sidebar-nav">
          <a href="#" className="active">Dashboard</a>
           <button onClick={() => setShowUsers(true)}>Users</button>
          <a href="#">Exhibitions</a>
          <a href="#">Bidding</a>
          <a href="#">Arts</a>
          <a href="#">Settings</a>
        </nav>
      </aside>

      {/* Main content */}
      <div className="main-content">
        <h1>  Admin Dashboard</h1>

        {/* Overlay */}
        {showUsers && <div className="overlay" onClick={() => setShowUsers(false)}></div>}

        {/* Users Popup */}
        <div className={`users-popup ${showUsers ? 'open' : ''}`}>
          <button className="close-btn" onClick={() => setShowUsers(false)}>✖</button>
          <AdminViewUsers />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
