const express = require("express");
const router = express.Router();
const transfertController = require("../controls/transferControls"); // Adjust path as necessary

router.post("/transferts", transfertController.createTransfert);
router.get("/transfert/:id", transfertController.getTransfert);
router.get("/transferts/:idShop", transfertController.getAllTransferts);
router.get(
  "/transfertsRecente/:shopId",
  transfertController.getRecentTransfers
);
router.put("/transferts/:id", transfertController.updateTransfert);
router.delete("/transferts/:id", transfertController.deleteTransfert);

module.exports = router;
