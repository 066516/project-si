const mongoose = require("mongoose");

const CounterPvSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const CounterPv = mongoose.model("CounterPv", CounterPvSchema);
module.exports = CounterPv;
