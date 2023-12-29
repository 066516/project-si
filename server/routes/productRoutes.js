const express = require("express");
const router = express.Router();
const productController = require("../controls/ProductControls");

router.post("/product", productController.createProduct);
router.get("/product/:id", productController.getProduct);
router.get("/products", productController.getAllProducts);
router.put("/product/:id", productController.updateProduct);
router.delete("/product/:id", productController.deleteProduct);
router.delete("/products", productController.deleteAllProduct);

module.exports = router;
