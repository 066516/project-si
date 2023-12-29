const express = require("express");
const router = express.Router();
const salaryController = require("../controls/SalaryControles"); // Adjust the path as necessary

router.post("/salaries", salaryController.createSalary);
router.get("/salaries/total", salaryController.calculateTotalSalaries);
router.get("/salaries/:id", salaryController.getSalary);
router.get("/salaries", salaryController.getAllSalaries);
router.put("/salaries/:id", salaryController.updateSalary);
router.delete("/salaries/:id", salaryController.deleteSalary);

module.exports = router;
