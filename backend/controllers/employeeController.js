import Employee from "../models/employeeSchema.js";
import mongoose from "mongoose";

export const getEmployee = async(req,res)=>{
    try {
        const employees = await Employee.find();
        res.json(employees);
      } catch (err) {
        console.log("error in employee controller ",err.message) 
        res.status(500).json({ message: err.message });
    }
}
export const getEmployeeById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const employee = await Employee.findById(id);
  
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.status(200).json(employee);
    } catch (error) {
      console.error('Error fetching employee:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };
  export const deleteEmployee = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Check if the employee exists
      const employee = await Employee.findById(id);
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
  
      // Delete the employee
      await Employee.findByIdAndDelete(id);
  
      res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
      console.error('Error deleting employee:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

export const addEmployee = async(req,res)=>{
    try {
        const { name, email, mobileNo, designation, gender, course, image } = req.body;
        
        // Check if an employee with the same email already exists
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ message: "An employee with this email already exists." });
        }
        
        // Create a new employee instance
        const newEmployee = new Employee({
            name,
            email,
            mobileNo,
            designation,
            gender,
          course,
          image
        });
        
        // Save the new employee to the database
        const savedEmployee = await newEmployee.save();
        
        res.status(201).json({
            message: "Employee added successfully",
            employee: savedEmployee
        });
    } catch (error) {
        console.log("error in employee controller ",error.message)
        res.status(500).json({
            message: "Error adding employee",
            error: error.message
        });
    }
}

export const editEmployee = async (req, res) => {
    try {
        const empId = req.params.id; // Use req.params.id instead of empId
        const { name, email, mobileNo, designation, gender, course, imageUrl  } = req.body;

        // Check if empId is valid ObjectId
        if (!mongoose.isValidObjectId(empId)) {
            return res.status(400).json({ error: "Invalid Employee ID" });
        }

        const employee = await Employee.findById(empId);

        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }

        // Update employee fields if provided in the request body
        if (name) employee.name = name;
        if (email) {
            // Check if the new email already exists
            const emailExists = await Employee.findOne({ email });
            if (emailExists && emailExists._id.toString() !== empId) {
                return res.status(400).json({ error: "Email already exists" });
            }
            employee.email = email;
        }
        if (mobileNo) employee.mobileNo = mobileNo; // Ensure this matches the frontend
        if (designation) employee.designation = designation;
        if (gender) employee.gender = gender;
        if (course) employee.course = course;

        // If an image is provided in the request, update it
        if (imageUrl) {
            employee.image = imageUrl; // Assuming you're sending the image URL from the frontend
          }

        await employee.save();

        res.status(200).json({
            _id: employee._id,
            name: employee.name,
            email: employee.email,
            mobileNo: employee.mobileNo,
            designation: employee.designation,
            gender: employee.gender,
            course: employee.course,
            createDate: employee.createDate,
            image: employee.image
        });
    } catch (error) {
        console.error("Error in editEmployee controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

