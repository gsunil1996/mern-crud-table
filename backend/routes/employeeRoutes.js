const express = require('express')
const router = express.Router()
const employeesController = require("../controllers/employeesController")

router.get("/employeesTable", employeesController.getEmployeesTable);
router.get("/employeesTable/:id", employeesController.getSingleEmployeeDetails);
router.post("/addEmployee", employeesController.addNewEmployee);
router.patch("/updateEmployeeDetails/:id", employeesController.updateEmployeeDetails);
router.delete("/deleteEmployee/:id", employeesController.deleteEmployee)

module.exports = router;