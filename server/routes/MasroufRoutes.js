const express = require("express");
const router = express.Router();
const masroufController = require("../controls/MasroufControles");

router.post("/masroufs", masroufController.createMasrouf);
router.get("/masroufs/:id", masroufController.getMasrouf);
router.get("/masroufs", masroufController.getAllMasroufs);
router.put("/masroufs/:id", masroufController.updateMasrouf);
router.delete("/masroufs/:id", masroufController.deleteMasrouf);

module.exports = router;
