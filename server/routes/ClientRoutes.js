const express = require("express");
const router = express.Router();
const clientController = require("../controls/ClientControls"); // Adjust the path as necessary

router.post("/client", clientController.createClient);
router.get("/clients/:id", clientController.getClient);
router.get("/clients", clientController.getAllClients);
router.put("/client/:id", clientController.updateClient);
router.delete("/clients/:id", clientController.deleteClient);

module.exports = router;
