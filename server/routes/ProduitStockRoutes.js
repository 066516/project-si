const express = require("express");
const router = express.Router();
const produitStockController = require("../controls/ProduitStockControles"); // Adjust path as necessary

router.post("/produitstocks", produitStockController.createProduitStock);
router.get("/produitstocks/:id", produitStockController.getProduitStock);
router.get("/produitstocks", produitStockController.getAllProduitStocks);
router.put("/produitstocks/:id", produitStockController.updateProduitStock);
router.delete("/produitstocks/:id", produitStockController.deleteProduitStock);

module.exports = router;
