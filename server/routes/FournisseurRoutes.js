const express = require("express");
const router = express.Router();
const fournisseurController = require("../controls/FournisseurControles");

router.post("/fournisseurs", fournisseurController.createFournisseur);
router.get("/fournisseurs/:id", fournisseurController.getFournisseur);
router.get("/fournisseurs", fournisseurController.getAllFournisseurs);
router.put("/fournisseurs/:id", fournisseurController.updateFournisseur);
router.delete("/fournisseurs/:id", fournisseurController.deleteFournisseur);

module.exports = router;
