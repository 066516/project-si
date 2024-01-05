const mongoose = require("mongoose");

const ListeProductionSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const ListeProductionCpunter = mongoose.model(
  "ListeProductionCpunter",
  ListeProductionSchema
);
module.exports = ListeProductionCpunter;
