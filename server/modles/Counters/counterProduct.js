const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const CounterProduct = mongoose.model("CounterProduct", CounterSchema);
module.exports = CounterProduct;
