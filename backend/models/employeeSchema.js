import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNo: { type: String, required: true },
    designation: { type: String, required: true },
    gender: {
			type: String,
			required: true,
			enum: ["Male", "Female"],
		},
    course: { type: String, required: true },
    createDate: { type: Date, default: Date.now },
    image: { type: String }


  }, { timestamps: true });
  
  const Employee = mongoose.model("Employee", EmployeeSchema);

  export default Employee;