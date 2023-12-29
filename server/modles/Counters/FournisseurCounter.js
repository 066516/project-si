const mongoose = require("mongoose");

const CounterFournisseurSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const CounterFournisseur = mongoose.model(
  "CounterFournisseur",
  CounterFournisseurSchema
);
module.exports = CounterFournisseur;
