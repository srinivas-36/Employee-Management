import express from "express"
import {getEmployee , addEmployee ,editEmployee,getEmployeeById,deleteEmployee} from "../controllers/employeeController.js"

const router = express.Router()

router.get("/",getEmployee)
router.get("/:id",getEmployeeById)
router.post("/add",addEmployee)
router.put("/edit/:id",editEmployee)
router.delete('/:id', deleteEmployee);

export default router;