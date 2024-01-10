const express = require("express");
const router = express.Router();
const achatController = require("../controls/AchatControles"); // Adjust the path as necessary

router.post("/achat", achatController.createAchat);
router.get("/achat/:id", achatController.getAchat);
router.get("/achats", achatController.getAllAchats);
router.get("/achats/tops", achatController.getTops);
router.get("/achats/tops2", achatController.getTops2);
router.put("/achats/:id", achatController.updateAchat);
router.delete("/achats/:id", achatController.deleteAchat);

module.exports = router;
