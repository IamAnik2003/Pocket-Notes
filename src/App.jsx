import React, { useState, useContext } from "react";
import { BrowserRouter,Routes,Route } from 'react-router-dom';

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
  return (
    <div className={dark ? "dark-mode" : "light-mode"}>
    
    <Navbar/>
    <Routes>
      <Route path='/' element={<ChirpLanding/>}/>
      <Route path='/chat' element={<Protected Component={Chats}/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    
    </div>
  )
}

export default App
