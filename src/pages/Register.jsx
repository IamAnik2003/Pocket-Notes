import React from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";
import styles from "./Register.module.css";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Register() {
  const { dark } = useContext(ThemeContext);
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const BACK_URL = import.meta.env.VITE_BACK_URL;
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setFormErrors(validate({ ...formData, [name]: value }));
  };
  const validate = (values) => {
    const errors = {};
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexPassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/;

    // First Name validation
    if (!values.firstName.trim()) {
      errors.firstName = "First Name is required";
    } else if (/\d/.test(values.firstName)) {
      errors.firstName = "First Name should not contain numbers";
    }
    // No else clause - valid fields don't get added to errors

    // Last Name validation
    if (!values.lastName.trim()) {
      errors.lastName = "Last Name is required";
    } else if (/\d/.test(values.lastName)) {
      errors.lastName = "Last Name should not contain numbers";
    }

    // Email validation
    if (!values.email.trim()) {
      errors.email = "Email is required";
    } else if (!regexEmail.test(values.email)) {
      errors.email = "Email is not valid";
    }

    // Password validation
    if (!values.password.trim()) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (!regexPassword.test(values.password)) {
      errors.password =
        "Password must contain at least one uppercase, one lowercase, one number, and one special character";
    }

    // Only validate confirmPassword if password is valid and exists
    if (!errors.password && values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  // Add this at the top with other hooks

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        setIsLoading(true);
        const res = await axios.post(`${BACK_URL}/api/user/auth/register`, formData);
        setIsLoading(false);

        if (res.status === 201 || res.status === 200) {
          console.log("User registered successfully:", res.data);
          toast.success("User registered successfully");
          setFormData(initialValues);
          setFormErrors({});
          navigate("/login"); // Redirect to login page
        } else {
          throw new Error("Unexpected response status");
        }
      } catch (error) {
        console.error("Registration error:", error);
        if (error.response) {
          // Backend returned an error response
          toast.error(error.response.data.message || "Registration failed");
        } else {
          // Network or other errors
          toast.error("Could not connect to server. Please try again.");
        }
      }
    }
  };

  return (
    <div className="register-container">
      <div className={styles["form-container"]}>
        <h1 className={styles["register-title"]}>
   ✍️Sign Up & Start Scribbling
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            className={`${dark ? styles.inDark : styles.inLight}`}
            onChange={handleChange}
            value={formData.firstName}
            placeholder="First Name"
            type="text"
            name="firstName"
          />
          {formErrors.firstName && (
            <span className={styles.error}>{formErrors.firstName}</span>
          )}
          <input
            className={`${dark ? styles.inDark : styles.inLight}`}
            onChange={handleChange}
            value={formData.lastName}
            placeholder="Last Name"
            type="text"
            name="lastName"
          />
          {formErrors.lastName && (
            <span className={styles.error}>{formErrors.lastName}</span>
          )}
          <input
            className={`${dark ? styles.inDark : styles.inLight}`}
            onChange={handleChange}
            value={formData.email}
            placeholder="Email"
            type="email"
            name="email"
          />
          {formErrors.email && (
            <span className={styles.error}>{formErrors.email}</span>
          )}
          <input
            className={`${dark ? styles.inDark : styles.inLight}`}
            onChange={handleChange}
            value={formData.password}
            placeholder="Enter Password"
            type="password"
            name="password"
            id="password"
          />
          {formErrors.password && (
            <span className={styles.error}>{formErrors.password}</span>
          )}
          <input
            className={`${dark ? styles.inDark : styles.inLight}`}
            onChange={handleChange}
            value={formData.confirmPassword}
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
          />
          {formErrors.confirmPassword && (
            <span className={styles.error}>{formErrors.confirmPassword}</span>
          )}
          <button
            type="submit"
            className={
              dark
                ? styles["register-button-dark"]
                : styles["register-button-light"]
            }
          >
            {!isLoading && "Register Now"}
           
          </button>
          <p className={styles["register-redirect"]}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
