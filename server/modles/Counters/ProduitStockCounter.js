const mongoose = require("mongoose");
const CounterProduitStockSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const CounterProduitStock = mongoose.model(
  "CounterProduitStock",
  CounterProduitStockSchema
);
module.exports = CounterProduitStock;
