import mongoose from "mongoose";
import express from "express"
import cors from "cors"
import employeeRoute from "./routes/employeeRoute.js"
import authRoute from "./routes/userRoute.js"


const app = express();
const PORT = 7000;

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://tejaswinibeedila:teju2002@employee.vhmcv.mongodb.net/?retryWrites=true&w=majority&appName=employee')
  .then(() => {
    console.log('Connected successfully to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:',error);
  });

  app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
  });
  

  app.use("/api/auth", authRoute);
  app.use("/api/employees",employeeRoute)