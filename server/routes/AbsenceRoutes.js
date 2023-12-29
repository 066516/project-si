const express = require("express");
const router = express.Router();
const absenceEmployeController = require("../controls/AbsenceControles"); // Adjust the path as necessary

router.post("/absences", absenceEmployeController.createAbsence);
router.get("/absences/:id", absenceEmployeController.getAbsence);
router.get("/absences", absenceEmployeController.getAllAbsences);
router.put("/absences/:id", absenceEmployeController.updateAbsence);
router.delete("/absences/:id", absenceEmployeController.deleteAbsence);
router.get("/absences/count/:id", absenceEmployeController.countAbsences);

module.exports = router;
