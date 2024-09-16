import React from 'react';
import { Avatar, Button, CssBaseline, TextField, Link, Paper, Box, Grid, Typography, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const defaultTheme = createTheme();

const Signup = () => {
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userData = {
      fullName: data.get('fullname'),
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
      confirmPassword: data.get('confirmPassword'),
      gender: data.get('gender'),
    };

    try {
      const response = await axios.post('http://localhost:7000/api/auth/signup', userData);
      // Display the message from the backend response
      toast.success(response.data.message || 'Sign up successful!');
      navigate('/');
    } catch (error) {
      // Check if the error response has a message
      const errorMessage = error.response.data.message || 'Sign up failed. Please try again.';
      toast.error(errorMessage);
      console.error('There was an error!', error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
        <CssBaseline />
       
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 4,
              mx: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <VpnKeyIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="fullname"
                label="Full Name"
                name="fullname"
                autoComplete="firstname"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="cpassword"
                autoComplete="confirm-password"
              />
              <FormControl component="fieldset" margin="normal" fullWidth>
                <FormLabel component="legend">Select Gender</FormLabel>
                <RadioGroup row aria-label="gender" name="gender" defaultValue="Male">
                  <FormControlLabel value="Male" control={<Radio />} label="Male" />
                  <FormControlLabel value="Female" control={<Radio />} label="Female" />
                </RadioGroup>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={RouterLink} to="/" variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </ThemeProvider>
  );
}

export default Signup;