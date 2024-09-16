import React, { useState } from 'react';
import axios from 'axios';
import {
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Grid,
  Avatar,
  Box,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import { Toaster,toast } from 'react-hot-toast';

const EditEmployeeForm = ({ employee, onClose, onEmployeeUpdated }) => {
  const [formData, setFormData] = useState({
    name: employee.name,
    email: employee.email,
    mobile: employee.mobileNo,
    designation: employee.designation,
    gender: employee.gender,
    course: employee.course,
    imageUrl: employee.image || '', // Ensure this is the correct field name
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value // This should update the correct field
    }));
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadImage = async () => {
    if (!file) return formData.imageUrl;

    const cloudName = 'srinivascloud';
    const uploadPreset = 'employee_preset';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  
  const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);
      setError('');
      
      try {
          let imageUrl = formData.imageUrl;
          if (file) {
              imageUrl = await uploadImage();
            }
            
            const updatedData = { 
                ...formData, 
                imageUrl ,
                mobileNo: formData.mobile // Change this line to use mobileNo
              };
            console.log(updatedData)
      await axios.put(`http://localhost:7000/api/employees/edit/${employee._id}`, updatedData);
      toast.success("Successfully Edited")
      onEmployeeUpdated();
      onClose();
    } catch (error) {
      console.error('Error updating employee:', error);
      toast.error('Failed to update employee. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Edit Employee
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            name="mobile"
            label="Mobile No"
            value={formData.mobile}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Designation</InputLabel>
            <Select
              name="designation"
              value={formData.designation}
              onChange={handleChange}
            >
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Sales">Sales</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <Typography>Gender</Typography>
            <RadioGroup
              row
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel value="Female" control={<Radio />} label="Female" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <Typography>Course</Typography>
            <RadioGroup
              row
              name="course"
              value={formData.course}
              onChange={handleChange}
            >
              <FormControlLabel value="MCA" control={<Radio />} label="MCA" />
              <FormControlLabel value="BCA" control={<Radio />} label="BCA" />
              <FormControlLabel value="BSC" control={<Radio />} label="BSC" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" flexDirection="column" alignItems="center">
            {/* Display the image as a small logo */}
            {formData.imageUrl && (
              <Avatar 
                alt="Employee Image" 
                src={formData.imageUrl} 
                sx={{ width: 56, height: 56, mb: 2 }} 
              />
            )}
            <Button variant="contained" component="label">
              Update Image
              <input type="file" hidden onChange={handleFileChange} accept="image/*" />
            </Button>
            {file && <Typography variant="body2" sx={{ mt: 1 }}>{file.name}</Typography>}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button 
            type="submit"
            fullWidth 
            variant="contained" 
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Update'}
            <Toaster/>
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button fullWidth variant="outlined" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
        message={error}
      />
    </Box>
  );
};

export default EditEmployeeForm;