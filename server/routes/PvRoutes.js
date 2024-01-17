const express = require("express");
const router = express.Router();
const pvQuotidienController = require("../controls/PvControles"); // Adjust path as necessary

router.post("/pvs", pvQuotidienController.createPvQuotidien);
router.get("/pv/:id", pvQuotidienController.getPvQuotidien);
 router.get("/pvs/:id", pvQuotidienController.getAllpvs);
router.put("/pvs/:id", pvQuotidienController.updatePvQuotidien);
router.delete("/pvs/:id", pvQuotidienController.deletePvQuotidien);

module.exports = router;
