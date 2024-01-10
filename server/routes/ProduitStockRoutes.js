const express = require("express");
const router = express.Router();
const produitStockController = require("../controls/ProduitStockControles"); // Adjust path as necessary

router.post("/produitstocks", produitStockController.createProduitStock);
router.get("/produitstocks/:id", produitStockController.getProduitStock);
router.get("/produitstocksShop/:shop", produitStockController.getAllProduitStocks);
router.get("/produitstock/info", produitStockController.getProductStockInfo);
router.put("/produitstocks/:id", produitStockController.updateProduitStock);
router.delete("/produitstocks/:id", produitStockController.deleteProduitStock);
router.delete("/produitstocks", produitStockController.deleteAllProduitStock);

module.exports = router;
