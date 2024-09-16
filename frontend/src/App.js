import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Loginpage.js";
import Signup from "./components/Signup.js";
import Dashboard from "./components/Dashboard.js";
import Home from "./components/Home.js";
import Navbar from "./components/Navbar.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const navigate = useNavigate();

  // Effect to check if user is logged in
  useEffect(() => {
    const storedUsername = localStorage.getItem('username'); // Check for username in local storage
    if (storedUsername) {
      setIsLoggedIn(true); // User is logged in
    }
  }, []); // Empty dependency array means this runs once on mount

  return (
    <>
      {isLoggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} />} {/* Render Navbar only if logged in */}
      <Routes>
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;