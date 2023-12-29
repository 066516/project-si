const express = require("express");
const router = express.Router();
const employeController = require("../controls/EmployeControler");

router.post("/employe", employeController.createEmploye);
router.get("/employe/:id", employeController.getEmploye);
router.get("/employes", employeController.getAllEmployes);
router.put("/employe/:id", employeController.updateEmploye);
router.delete("/employe/:id", employeController.deleteEmploye);
router.delete("/employes", employeController.deleteAllEmploye);

module.exports = router;
