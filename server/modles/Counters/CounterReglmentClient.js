const mongoose = require("mongoose");

const CounterReglementClientSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const CounterReglementClient = mongoose.model(
  "CounterReglementClient",
  CounterReglementClientSchema
);
module.exports = CounterReglementClient;
