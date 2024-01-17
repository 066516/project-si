const express = require("express");
const router = express.Router();
const reglementController = require("../controls/ReglementControles"); // Adjust path as necessary

router.post("/reglements", reglementController.createReglement);
router.post("/reglementClient", reglementController.createReglementClient);
router.get("/reglement/:id", reglementController.getReglement);
router.get("/reglements/:id", reglementController.getAllReglements);
router.get("/reglementClient/:id", reglementController.getAllReglementsClient);
router.put("/reglements/:id", reglementController.updateReglement);
router.delete("/reglements/:id", reglementController.deleteReglement);

module.exports = router;
