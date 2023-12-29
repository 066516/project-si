const express = require("express");
const router = express.Router();
const achatController = require("../controls/VenteControles"); // Adjust the path as necessary

router.post("/achat", achatController.createAchat);
router.get("/achats/:id", achatController.getAchat);
router.get("/achats", achatController.getAllAchats);
router.put("/achats/:id", achatController.updateAchat);
router.delete("/achats/:id", achatController.deleteAchat);

module.exports = router;
