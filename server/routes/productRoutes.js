const express = require("express");
const router = express.Router();
const productController = require("../controls/ProductControls");
const productionController = require("../controls/ProdctionControles");

router.post("/product", productController.createProduct);
router.post("/production", productionController.createProduction);
router.get("/production/:id", productionController.getAllProductions);
router.get("/product/:id", productController.getProduct);
router.get("/products", productController.getAllProducts);
router.get("/productsliste", productionController.getAllProductionsListe);
router.delete("/productsliste", productionController.deleteAllProductionsListe);
router.put("/product/:id", productController.updateProduct);
router.delete("/product/:id", productController.deleteProduct);
router.delete("/products", productController.deleteAllProduct);
router.delete("/Productions", productionController.deleteAllProductions);

module.exports = router;
