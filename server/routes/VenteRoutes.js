const express = require("express");
const router = express.Router();
const venteController = require("../controls/VenteControles"); // Adjust path as necessary

router.post("/ventes", venteController.createVente);
router.get("/vente/:id", venteController.getVente);
router.get("/ventes/:idShop", venteController.getAllVentes);
router.get("/ventesRecente/:shopId", venteController.VentesRecente);
router.get("/tops", venteController.getTopEntities);
router.get("/VentesTops", venteController.getTops);
router.put("/ventes/:id", venteController.updateVente);
router.delete("/ventes/:id", venteController.deleteVente);
router.delete("/ventes", venteController.deleteAllVente);

module.exports = router;
