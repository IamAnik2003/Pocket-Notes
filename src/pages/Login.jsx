import React, { useState } from "react";
import styles from "./Login.module.css";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

export default function Login() {
  // ... (keep all your existing state and functions unchanged)
  const { dark } = useContext(ThemeContext);
  const initialValues = { email: "", password: "" };
  const [formData, setFormData] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const BACK_URL = import.meta.env.VITE_BACK_URL;
  const navigate = useNavigate();

  // ... (keep all your existing functions unchanged)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors(validate({ ...formData, [name]: value }));
  };

  const validate = (values) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Please enter a valid username";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        setIsLoading(true);
        const res = await axios.post(`${BACK_URL}/api/user/auth/login`, formData);
        setIsLoading(false);
        if (res.status === 200 || res.status === 201) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          toast.success("User logged in successfully");
          navigate("/chat",{ state: { user: res.data.user} });
        }
      } catch (err) {
        console.error(err);
        setIsLoading(false);
        if (err.response?.status === 400) {
          toast.error("Invalid username or password");
        } else {
          toast.error("Something went wrong, please try again");
        }
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>User Login</h1>

        <form onSubmit={handleSubmit}>
          <div className={`${styles.inputContainer} ${dark?styles.dark:styles.light}`}>
            <input
              className={dark ? styles.darkInput : styles.lightInput}
              name="email"
              onChange={handleChange}
              placeholder="example@gmail.com"
              type="email"
              value={formData.email}
            />
          </div>
            {formErrors.email && (
              <p className={styles.error}>{formErrors.email}</p>
            )}
          
          <div className={`${styles.passwordContainer} ${dark?styles.dark:styles.light}`}>
            <input
              className={dark ? styles.darkInput : styles.lightInput}
              name="password"
              onChange={handleChange}
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
            />
            <button
              type="button"
              className={styles.toggleButton}
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          {formErrors.password && (
            <p className={styles.error}>{formErrors.password}</p>
          )}
          
          <button
            type="submit"
            className={
              dark ? styles["login-button-dark"] : styles["login-button-light"]
            }
            disabled={isLoading}
          >
            {!isLoading && "Login"}
            {isLoading && (
              <ClipLoader
                color={dark ? "#ffffff" : "#000000"}
                loading={isLoading}
                size={20}
              />
            )}
          </button>
          <p className={styles.redirect}>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}