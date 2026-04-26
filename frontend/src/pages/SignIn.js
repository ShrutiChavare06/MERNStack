import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaBirthdayCake, FaArrowRight } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) errs.email = 'Please enter a valid email';
    if (formData.password.length < 6) errs.password = 'Password must be at least 6 characters';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    try {
      const user = await login(formData.email, formData.password);
      toast.success(`Welcome back, ${user.firstName}! 🎂`);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut', staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-overlay" />
      <div className="floating-cakes">
        {['🎂', '🧁', '🍰', '🎂', '🧁', '🍰', '🎂', '🧁'].map((emoji, i) => (
          <span key={i} className="floating-emoji" style={{ animationDelay: `${i * 0.8}s`, left: `${10 + i * 12}%` }}>{emoji}</span>
        ))}
      </div>

      <motion.div className="auth-card-wrapper" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div className="auth-card signin-card" variants={itemVariants}>
          <div className="auth-card-header">
            <div className="cake-icon-circle">
              <FaBirthdayCake />
            </div>
            <h2 className="auth-title">Welcome Back!</h2>
            <p className="auth-subtitle">Sign in to your Sweet Bakes account</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <motion.div className="form-group" variants={itemVariants}>
              <label className="form-label">Email Address</label>
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="your@email.com"
                  autoComplete="email"
                />
              </div>
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </motion.div>

            <motion.div className="form-group" variants={itemVariants}>
              <label className="form-label">Password</label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="Your password"
                  autoComplete="current-password"
                />
                <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <span className="error-msg">{errors.password}</span>}
            </motion.div>

            <motion.button
              type="submit"
              className="submit-btn"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              variants={itemVariants}
            >
              {loading ? (
                <span className="btn-spinner">
                  <span className="spinner-dot"></span>
                  <span className="spinner-dot"></span>
                  <span className="spinner-dot"></span>
                </span>
              ) : (
                <>
                  Sign In <FaArrowRight className="btn-icon" />
                </>
              )}
            </motion.button>
          </form>
{/*
          <div className="demo-credentials">
            <p className="demo-title">🧪 Demo Credentials</p>
            <div className="demo-grid">
              <div className="demo-item">
                <strong>User:</strong> user@cake.com / 123456
              </div>
              <div className="demo-item">
                <strong>Admin:</strong> admin@cake.com / 123456
              </div>
            </div>
          </div>
          */}

          <p className="auth-footer-text">
            New to Sweet Bakes?{' '}
            <Link to="/signup" className="auth-link">Create Account</Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignIn;
