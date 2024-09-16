import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import logo from './logo.jpg'; // Make sure to import your logo image

const Home = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90vh', // Full height of the viewport
        backgroundColor: '#e0f7fa', // Light cyan background color
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff', // White background for the content box
          padding: 5, // Add padding for spacing
          borderRadius: 2, // Add rounded corners
          boxShadow: '0 3px 4px rgba(0, 0, 0, 0.2)', // Add a subtle box shadow
        }}
      >
        <Box>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome Admin Panel
          </Typography>
          <Box>
            <Typography variant="body1" gutterBottom>
              This is your admin panel where you can manage all employee records.
            </Typography>
            <Typography variant="body1" gutterBottom>
              Please navigate through the dashboard to view and edit employee details.
            </Typography>
            <Typography variant="body1">
              If you have any questions, feel free to reach out for support.
            </Typography>
          </Box>
        </Box>
<img src={logo} alt="Logo" height="100" style={{ marginRight: '20px' }} /> {/* Adjust height as needed */}
      </Box>
    </Box>
  );
};

export default Home;