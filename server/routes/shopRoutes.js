const express = require("express");
const router = express.Router();
const shopController = require("../controls/shop");

router.post("/shop", shopController.createShop);
router.get("/shops", shopController.getAllShops);
router.put("/shop/:shopID", shopController.updateShopByShopID);
router.delete("/shops/:shopID", shopController.deleteShopByShopID);
router.get("/shop/shopID/:shopID", shopController.findShopByShopID);
router.delete("/shops", shopController.deleteAllShops);
module.exports = router;
