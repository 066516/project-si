const mongoose = require("mongoose");

const CounterReglementSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const CounterReglement = mongoose.model(
  "CounterReglement",
  CounterReglementSchema
);
module.exports = CounterReglement;
