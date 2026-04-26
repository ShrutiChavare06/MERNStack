import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

import {
 FaBirthdayCake,
 FaSignOutAlt,
 FaUser,
 FaBars,
 FaTimes
} from 'react-icons/fa';

import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {

 const { user, logout } = useAuth();
 const navigate = useNavigate();
 const location = useLocation();

 const [menuOpen, setMenuOpen] = useState(false);

 const handleLogout = () => {
   logout();
   toast.success('Goodbye! See you soon 🎂');
   navigate('/login');
 };

 return (
  <motion.nav
   className="navbar-custom"
   initial={{ y: -80, opacity: 0 }}
   animate={{ y: 0, opacity: 1 }}
   transition={{
     duration: 0.5,
     ease: 'easeOut'
   }}
  >

   <div className="navbar-container">

    <Link
      to={user ? '/dashboard' : '/login'}
      className="navbar-brand-custom"
    >
      <FaBirthdayCake className="brand-icon" />
      <span className="brand-text">
        Sweet Bakes
      </span>
    </Link>

    <button
      className="menu-toggle"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      {menuOpen ? <FaTimes /> : <FaBars />}
    </button>

    <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>

      {user ? (

        <div className="nav-user-section">

          <div className="nav-user-info">
            <FaUser className="user-nav-icon" />

            <span className="nav-username">
              {user.firstName}
            </span>

            <span className={`nav-role-badge ${user.role}`}>
              {user.role}
            </span>
          </div>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>

        </div>

      ) : (

        <div className="nav-auth-links">

          <Link
            to="/login"
            className={`nav-link-btn ${
              location.pathname === '/login'
                ? 'active'
                : ''
            }`}
          >
            Sign In
          </Link>

          <Link
            to="/signup"
            className="nav-link-btn signup-btn"
          >
            Sign Up
          </Link>

        </div>

      )}

    </div>

   </div>

  </motion.nav>
 );
};

export default Navbar;