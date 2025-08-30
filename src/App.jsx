import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChirpLanding from './pages/ChirpLanding';
import Navbar from '../src/components/Navbar';
import Register from "./pages/Register";
import { ThemeContext } from "./contexts/ThemeContext";
import './App.css'
import Chats from './pages/Home1';
import Login from "./pages/Login";
import Protected from "../src/components/Protected"

function App() {
  const { dark, setDark } = useContext(ThemeContext);
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    
    // Get user info from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
        
        // Format to PascalCase (capitalize first letter of each word)
        const formattedName = fullName
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
          
        setUserName(formattedName);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  return (
    <div className={dark ? "dark-mode" : "light-mode"}>
      <Navbar />
      
      {/* User info display below navbar */}
      {isLoggedIn && userName && (
        <div className={`user-info-bar ${dark ? 'user-info-dark' : 'user-info-light'}`}>
          <div className="user-info-content">
            <span className="user-icon">👤</span>
            <span className="user-welcome-text">
              Welcome, <span className="user-name">{userName}</span>
            </span>
          </div>
        </div>
      )}
      
      <Routes>
        <Route path='/' element={<ChirpLanding />} />
        <Route path='/chat' element={<Protected Component={Chats} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App