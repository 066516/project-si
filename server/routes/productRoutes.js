const express = require("express");
const router = express.Router();
const productController = require("../controls/ProductControls");
const productionController = require("../controls/ProdctionControles");

router.post("/product", productController.createProduct);
router.post("/production", productionController.createProduction);
router.get("/production", productionController.getAllProductions);
router.get("/product/:id", productController.getProduct);
router.get("/products", productController.getAllProducts);
router.put("/product/:id", productController.updateProduct);
router.delete("/product/:id", productController.deleteProduct);
router.delete("/products", productController.deleteAllProduct);

module.exports = router;
