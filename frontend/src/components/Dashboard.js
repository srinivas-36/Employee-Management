import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {toast , Toaster} from "react-hot-toast"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Avatar,
  AppBar, 
  Toolbar, 
  Typography, 
  Container,
  Button,
  IconButton,
  Box,
  Fab,
  Modal,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import EmployeeForm from './EmployeeForm';
import EditEmployeeForm from './EditEmployeeForm';
import { useNavigate } from 'react-router-dom';
import logo from './logo.jpg'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#2196f3',
    },
  },
});

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetchEmployees();
        // Retrieve username from local storage
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
        }
    
  }, [employees]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:7000/api/employees');
      
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  
  const handleEmployeeAdded = () => {
    fetchEmployees();
  };
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpenEdit = (employee) => {
    setSelectedEmployee(employee);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setSelectedEmployee(null);
    setOpenEdit(false);
  };


  const handleDelete = async (id) => {
    console.log('Deleting employee with ID:', id); 
    try {
      await axios.delete(`http://localhost:7000/api/employees/${id}`);
      toast.success("deleted suceessfully")
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };
const navigate = useNavigate()
  const handleLogout=()=>{
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    toast.success("Loggout successfully")
    navigate('/')
  }

  return ( 
    <ThemeProvider theme={theme} >
      {/* <AppBar position="static">
  <Toolbar>
    <img src={logo} alt="Logo" height="50" />
    <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
      Employee Dashboard
    </Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', padding:'15px 23px' }}>
            <Avatar sx={{ width: 40, height: 40, mr: 1 }} alt={username} src="/path/to/avatar.jpg" /> {/* Replace with actual avatar image */}
            {/* <Typography variant="body1" sx={{ color: 'white' }}>
              {username}
            </Typography>
          </Box> */} 
    {/* <Button color="inherit" onClick={handleLogout}>
      Logout
    </Button>
    <Toaster />
  </Toolbar>
</AppBar> */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, position: 'relative', minHeight: 'calc(100vh - 64px)' }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Employee List
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="employee table">
              <TableHead>
                <TableRow>
                <TableCell>S.No</TableCell> 
                <TableCell>Image</TableCell> 
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Mobile No</TableCell>
                  <TableCell>Designation</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Course</TableCell>
                  <TableCell>Create Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((employee,index) => (
                  <TableRow key={employee._id}>
                    <TableCell>{index + 1}</TableCell>
                     <TableCell>
        {employee.image ? (
          <Avatar alt={employee.name} src={employee.image} sx={{ width: 40, height: 40, mr: 2 }} />
        ) : (
          <Avatar sx={{ width: 40, height: 40, mr: 2 }}>
            {employee.name.charAt(0).toUpperCase()}
          </Avatar>
        )}
       
      </TableCell>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.mobileNo}</TableCell>
                    <TableCell>{employee.designation}</TableCell>
                    <TableCell>{employee.gender}</TableCell>
                    <TableCell>{employee.course}</TableCell>
                    <TableCell>{new Date(employee.createDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <IconButton aria-label="edit" size="small"  sx={{ color: 'green' }} onClick={() => handleOpenEdit(employee)}>
                        <Edit fontSize="inherit" />
                        <Toaster/>

                      </IconButton>
                      <IconButton aria-label="delete" size="small"  sx={{ color: 'red' }} onClick={() => handleDelete(employee._id)}>
                        <Delete fontSize="inherit" />
                        <Toaster/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
          <Fab 
            color="secondary" 
            aria-label="add" 
            onClick={handleOpenAdd}
            sx={{ 
              width: 80, 
              height: 80, 
              boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', 
              '&:hover': { 
                boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
                transform: 'scale(1.05)'
              },
              transition: 'all 0.3s ease-in-out'
            }}
          >
            <Add sx={{ fontSize: 40 }} />
          </Fab>
        </Box>
        <Modal
          open={openAdd}
          onClose={handleCloseAdd}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}>
             {openAdd && (
      <EmployeeForm onClose={handleCloseAdd} onEmployeeAdded={handleEmployeeAdded} />
    )}
          </Box>
        </Modal>
        <Modal
  open={openEdit}
  onClose={handleCloseEdit}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
  }}>
    {selectedEmployee && (
      <EditEmployeeForm
        employee={selectedEmployee}
        onClose={handleCloseEdit}
        onEmployeeUpdated={fetchEmployees} // Pass a valid function here
      />
    )}
  </Box>
</Modal>


      </Container>
    </ThemeProvider>
  );
};

export default Dashboard;