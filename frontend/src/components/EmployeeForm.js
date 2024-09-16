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
  Box,
  CircularProgress,
  Avatar,
} from '@mui/material';
import { toast, Toaster } from "react-hot-toast";

const EmployeeForm = ({  onClose, onEmployeeAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNo: '',
    designation: '',
    gender: '',
    course: '',

  });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(''); // State to hold the uploaded image URL

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const uploadImageToCloudinary = async () => {
    if (!imageFile) return null;

    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'employee_preset'); // Replace with your Cloudinary upload preset

    try {
      setUploading(true);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/srinivascloud/image/upload`, // Replace with your Cloudinary cloud name
        formData
      );
      setUploading(false);
      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploading(false);
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUploading(true);

    try {
      const imageUrl = await uploadImageToCloudinary();

      if (imageUrl) {
        // Prepare the data to be sent to the backend
        const employeeData = {
          ...formData,
          image: imageUrl
        };

        // Send the data to your backend
        const response = await axios.post('http://localhost:7000/api/employees/add', employeeData);

        if (response.status === 201) {
          toast.success('Employee added successfully');
          setUploadedImageUrl(imageUrl); // Set the uploaded image URL to display the avatar
          onClose(); // Close the form or navigate away
        } else {
          toast.error('Failed to add employee. Please try again.');
        }
      } else {
        toast.error('Failed to upload image. Please try again.');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred. Please try again.');
      }
      console.error('Error submitting form:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        borderRadius: 2,
        p: 4,
        width: '75%',
        maxWidth: 800,
        mx: 'auto',
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom align="center" color="primary">
        Create Employee
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              variant="outlined"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              variant="outlined"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Mobile No"
              name="mobileNo"
              variant="outlined"
              required
              value={formData.mobileNo}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel id="designation-label">Designation</InputLabel>
              <Select
                labelId="designation-label"
                label="Designation"
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
            <FormControl component="fieldset" required>
              <Typography variant="subtitle1" gutterBottom>Gender</Typography>
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
            <FormControl component="fieldset" required>
              <Typography variant="subtitle1" gutterBottom>Course</Typography>
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
            <Button variant="contained" component="label" fullWidth>
              Upload Image
              <input type="file" hidden onChange={handleImageChange} accept="image/*" />
            </Button>
            {imageFile && <Typography variant="body2">{imageFile.name}</Typography>}
          </Grid>
          <Grid item xs={12}>
            {/* Display the uploaded image as an Avatar */}
            {uploadedImageUrl && (
              <Avatar 
                alt="Uploaded Image" 
                src={uploadedImageUrl} 
                sx={{ width: 56, height: 56, mx: 'auto', mt: 2 }} 
              />
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={uploading}
            >
              {uploading ? <CircularProgress size={24} /> : 'Submit'}
              <Toaster/>
              <Toaster position="top-center" reverseOrder={false} />
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={onClose}
              disabled={uploading}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default EmployeeForm;