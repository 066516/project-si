const mongoose = require("mongoose");

const CounterTransfertSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const CounterTransfert = mongoose.model(
  "CounterTransfert",
  CounterTransfertSchema
);
module.exports = CounterTransfert;
