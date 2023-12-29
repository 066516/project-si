const express = require("express");
const router = express.Router();
const venteController = require("../controls/VenteControles"); // Adjust path as necessary

router.post("/ventes", venteController.createVente);
router.get("/ventes/:id", venteController.getVente);
router.get("/ventes", venteController.getAllVentes);
router.put("/ventes/:id", venteController.updateVente);
router.delete("/ventes/:id", venteController.deleteVente);

module.exports = router;
