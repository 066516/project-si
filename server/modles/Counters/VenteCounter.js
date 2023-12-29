const mongoose = require("mongoose");

const CounterVenteSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const CounterVente = mongoose.model("CounterVente", CounterVenteSchema);
module.exports = CounterVente;
