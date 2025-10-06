import { Router } from "express";
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController";

const router = Router();

// all employees
router.get("/", getAllEmployees);

// single employee by ID
router.get("/:id", getEmployeeById);

// create new employee
router.post("/", createEmployee);

// update employee
router.put("/:id", updateEmployee);

// delete employee
router.delete("/:id", deleteEmployee);

export default router;
