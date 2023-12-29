const mongoose = require("mongoose");

const CounterProductionSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const CounterProduction = mongoose.model(
  "CounterProduction",
  CounterProductionSchema
);
module.exports = CounterProduction;

