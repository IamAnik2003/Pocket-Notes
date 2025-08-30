import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import LogoutConfirmation from "./LogoutConfirmation";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useIsMobile from "./useIsMobile";
import { toast } from "react-hot-toast";


export default function Navbar() {
  const { dark, setDark } = useContext(ThemeContext);
  const navigate = useNavigate();
  const isMobile = useIsMobile(634);
  const [showMenu, setShowMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const token = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  const toggleDarkMode = () => {
    toast.success(`Switching to ${dark?"light":"dark"} mode`);

    setDark(!dark);
    localStorage.setItem('dark',dark)
  };

  const handleMenuOnClick = (e) => {
    e.preventDefault();
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("notes");
    setIsLoggedIn(false);
    setShowLogoutConfirm(false);
    navigate("/");
  };

  return (
    <div className={styles.navbarContainer}>
      <div
        className={`${styles.navbar} ${
          dark ? styles.navbarDark : styles.navbarLight
        }`}
      >
        <div
          onClick={() => navigate("/")}
          className={styles.navbarBrand}
        >
          <span className={styles.logoIcon}>📝</span>
          <span className={styles.logoText}>Pocket Notes</span>
        </div>
        <div className={styles.navbarLinks}>
          {!isMobile && (
            <li className={styles.navbarList}>
              <Link
                className={`${styles.navItems} ${
                  dark ? styles.navbarItemsDark : styles.navbarItemsLight
                }`}
                to={"/"}
              >
                Home
              </Link>
              <Link
                className={`${styles.navItems} ${
                  dark ? styles.navbarItemsDark : styles.navbarItemsLight
                }`}
                to={"/chat"}
              >
                Chat
              </Link>
              <a
                className={`${styles.navItems} ${
                  dark ? styles.navbarItemsDark : styles.navbarItemsLight
                }`}
                href="https://my-portfolio-61zp.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact us
              </a>
            </li>
          )}

          {!isLoggedIn && (
            <>
              <button
                onClick={() => navigate("/login")}
                className={`${styles.loginButton} ${styles.btn}`}
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className={`${styles.registerButton} ${styles.btn}`}
              >
                Register
              </button>
            </>
          )}

          {isLoggedIn && (
            <button 
              onClick={(e) => {
                e.preventDefault();
                setShowLogoutConfirm(true);
              }}
              className={`${styles.registerButton} ${styles.btn}`}
            >
              Logout
            </button>
          )}

          {!isMobile && (
            <DarkModeSwitch
              checked={dark}
              onChange={toggleDarkMode}
              size={40}
            />
          )}

          {isMobile && (
            <button
              className={`${styles.hamburger} ${dark ? styles.dark : ""}`}
              onClick={handleMenuOnClick}
              aria-label="Menu toggle"
            >
              ☰
            </button>
          )}

          {isMobile && showMenu && (
            <div
              className={`${styles.mobileMenu} ${
                dark ? styles.darkMenu : styles.lightMenu
              }`}
            >
              <li className={styles.navbarList}>
                <Link
                  className={`${styles.navItems} ${
                    dark ? styles.navbarItemsDark : styles.navbarItemsLight
                  }`}
                  to={"/"}
                >
                  Home
                </Link>
                <Link
                  className={`${styles.navItems} ${
                    dark ? styles.navbarItemsDark : styles.navbarItemsLight
                  }`}
                  to={"/chirp"}
                >
                  Chat
                </Link>
                <a
                  className={`${styles.navItems} ${
                    dark ? styles.navbarItemsDark : styles.navbarItemsLight
                  }`}
                  href="https://my-portfolio-61zp.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact us
                </a>
                <DarkModeSwitch
                  checked={dark}
                  onChange={toggleDarkMode}
                  size={40}
                />
              </li>
            </div>
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <LogoutConfirmation
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutConfirm(false)}
        />
      )}
    </div>
  );
}