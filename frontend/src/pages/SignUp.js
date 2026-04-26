import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserShield,
  FaBirthdayCake,
  FaArrowRight
} from 'react-icons/fa';

import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};

    if (!formData.firstName.trim() || formData.firstName.length < 2) {
      errs.firstName = 'First name must be at least 2 characters';
    }

    if (!formData.lastName.trim() || formData.lastName.length < 2) {
      errs.lastName = 'Last name must be at least 2 characters';
    }

    if (!formData.email.match(/^\S+@\S+\.\S+$/)) {
      errs.email = 'Please enter a valid email';
    }

    if (formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate();

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...data } = formData;

      await register(data);

      toast.success('🎂 Welcome to Sweet Bakes! Account created!');
      navigate('/dashboard');

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        'Registration failed. Try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-bg-overlay"></div>

      <div className="floating-cakes">
        {['🎂','🧁','🍰','🎂','🧁','🍰','🎂','🧁'].map((emoji,i)=>(
          <span
            key={i}
            className="floating-emoji"
            style={{
              animationDelay:`${i*0.8}s`,
              left:`${10+i*12}%`
            }}
          >
            {emoji}
          </span>
        ))}
      </div>

      <motion.div
        className="auth-card-wrapper"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        <motion.div
          className="auth-card"
          variants={itemVariants}
        >

          <div className="auth-card-header">
            <div className="cake-icon-circle">
              <FaBirthdayCake />
            </div>

            <h2 className="auth-title">
              Join Sweet Bakes
            </h2>

            <p className="auth-subtitle">
              Create your account today
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="auth-form"
            noValidate
          >

            <div className="form-row-two">

              <motion.div
                className="form-group"
                variants={itemVariants}
              >
                <label className="form-label">
                  First Name
                </label>

                <div className="input-wrapper">
                  <FaUser className="input-icon"/>

                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    className={`form-input ${
                      errors.firstName ? 'error' : ''
                    }`}
                  />
                </div>

                {errors.firstName &&
                  <span className="error-msg">
                    {errors.firstName}
                  </span>
                }
              </motion.div>

              <motion.div
                className="form-group"
                variants={itemVariants}
              >
                <label className="form-label">
                  Last Name
                </label>

                <div className="input-wrapper">
                  <FaUser className="input-icon"/>

                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    className={`form-input ${
                      errors.lastName ? 'error' : ''
                    }`}
                  />
                </div>

                {errors.lastName &&
                  <span className="error-msg">
                    {errors.lastName}
                  </span>
                }
              </motion.div>

            </div>

            <motion.div
              className="form-group"
              variants={itemVariants}
            >
              <label className="form-label">
                Email Address
              </label>

              <div className="input-wrapper">
                <FaEnvelope className="input-icon"/>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={`form-input ${
                    errors.email ? 'error' : ''
                  }`}
                />
              </div>

              {errors.email &&
                <span className="error-msg">
                  {errors.email}
                </span>
              }
            </motion.div>

            <motion.div
              className="form-group"
              variants={itemVariants}
            >
              <label className="form-label">
                Password
              </label>

              <div className="input-wrapper">
                <FaLock className="input-icon"/>

                <input
                  type={showPassword ? 'text':'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min 6 characters"
                  className={`form-input ${
                    errors.password ? 'error':''
                  }`}
                />

                <button
                  type="button"
                  className="toggle-password"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? <FaEyeSlash/> : <FaEye/>}
                </button>
              </div>

              {errors.password &&
                <span className="error-msg">
                  {errors.password}
                </span>
              }
            </motion.div>

            <motion.div
              className="form-group"
              variants={itemVariants}
            >
              <label className="form-label">
                Confirm Password
              </label>

              <div className="input-wrapper">
                <FaLock className="input-icon"/>

                <input
                  type={showConfirm ? 'text':'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat password"
                  className={`form-input ${
                    errors.confirmPassword ? 'error':''
                  }`}
                />

                <button
                  type="button"
                  className="toggle-password"
                  onClick={() =>
                    setShowConfirm(!showConfirm)
                  }
                >
                  {showConfirm ? <FaEyeSlash/> : <FaEye/>}
                </button>
              </div>

              {errors.confirmPassword &&
                <span className="error-msg">
                  {errors.confirmPassword}
                </span>
              }
            </motion.div>

            <motion.div
              className="form-group"
              variants={itemVariants}
            >
              <label className="form-label">
                Account Role
              </label>

              <div className="input-wrapper">
                <FaUserShield className="input-icon"/>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="form-input form-select-custom"
                >
                  <option value="user">
                    🧁 Customer (User)
                  </option>

                  <option value="admin">
                    👑 Baker (Admin)
                  </option>

                </select>
              </div>
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading}
              className="submit-btn"
              whileHover={{scale:1.02}}
              whileTap={{scale:0.98}}
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
                  Create Account
                  <FaArrowRight className="btn-icon"/>
                </>
              )}
            </motion.button>

          </form>

          <p className="auth-footer-text">
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Sign In
            </Link>
          </p>

        </motion.div>
      </motion.div>

    </div>
  );
};

export default SignUp;