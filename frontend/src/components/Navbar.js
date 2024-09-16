import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Avatar, Box, Button } from '@mui/material';
import { Toaster, toast } from 'react-hot-toast';
import logo from './logo.jpg';

const Navbar = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  


  useEffect(() => {
    // Retrieve username from local storage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    // Clear username and password from local storage
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    setIsLoggedIn(false)
    toast.success("Logged out successfully");
    navigate('/'); // Redirect to the login page
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <img src={logo} alt="Logo" height="50" />
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Typography variant="h6" component="div" sx={{ mr: 2 , ml:3 }}>
            Employee Dashboard
          </Typography>
          {/* Navigation Links */}
          <Button color="inherit" component={Link} to="/home">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/dashboard">
            Dashboard
          </Button>
        </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', padding: '15px 23px' }}>
            <Avatar sx={{ width: 40, height: 40, mr: 1 }} alt={username} src="/path/to/avatar.jpg" /> {/* Replace with actual avatar image */}
            <Typography variant="body1" sx={{ color: 'white' }}>
              {username}
            </Typography>
          </Box>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
          <Toaster />
        </Toolbar>
      </AppBar>
      
    </div>
  );
};

export default Navbar;