import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Navbar.css';
import {
   faUser,
  faSignInAlt,
  faSignOutAlt,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import logo from '../../src/image/Artora.png';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('userId'));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('userId'));
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav style={styles.navbar} className='navnav'>
      {/* Logo Section */}
      <div className="logo-container">
        <img src={logo} alt="Gallery Logo" className="logo-img" />
        <div className="logo-text">
          <span className="logo-black">ARTORA</span>
          <span className="logo-divider">|</span>
          <span className="logo-blue">GALLERY</span>
        </div>
      </div>
      {/* Links Section */}
      <div style={styles.links}>
        <Link to="/home" style={styles.link} className="nav-link">HOME</Link>
        <Link to="/artists" style={styles.link} className="nav-link">ARTISTS & ARTWORK</Link>
        <Link to="/about" style={styles.link} className="nav-link">ABOUT</Link>
        <Link to="/exhibitions" style={styles.link} className="nav-link">EXHIBITIONS</Link>
        <Link to="/news" style={styles.link} className="nav-link">NEWS</Link>
        <Link to="/contact" style={styles.link} className="nav-link">CONTACT / LOCATIONS</Link>
        <FontAwesomeIcon icon={faSearch} style={styles.searchIcon} className="search-icon" />
      </div>

      {/* Auth Buttons */}
      <div style={styles.authSection}>
        {!isLoggedIn ? (
          <Link to="/login" style={styles.authBtn}>
            <FontAwesomeIcon icon={faSignInAlt} style={styles.icon} /> Login
          </Link>
        ) : (
          <>
            <Link to="/profile" style={styles.authBtn}>
              <FontAwesomeIcon icon={faUser} style={styles.icon} /> Profile
            </Link>
            <button style={styles.logoutBtn} onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} style={styles.icon} /> Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 30px',
    background: '#ffffff',
    borderBottom: '2px solid #b3d9ff',
    fontFamily: 'Segoe UI, sans-serif',
    height: '60px',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '18px',
  },
  logoBlack: {
    color: '#000',
    marginRight: '6px',
  },
  logoDivider: {
    color: '#000',
    margin: '0 6px',
  },
  logoBlue: {
    color: '#007acc',
  },
  links: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    color: '#007acc',
    fontWeight: '500',
    fontSize: '14px',
    textTransform: 'uppercase',
    transition: 'color 0.3s',
  },
  searchIcon: {
    color: '#007acc',
    cursor: 'pointer',
    transition: 'color 0.3s',
  },
  authSection: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  authBtn: {
    backgroundColor: '#007acc',
    color: '#fff',
    borderRadius: '6px',
    padding: '6px 12px',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'background-color 0.3s',
  },
  logoutBtn: {
    backgroundColor: '#d84315',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'background-color 0.3s',
  },
  icon: {
    marginRight: '6px',
  }
};

export default Navbar;
