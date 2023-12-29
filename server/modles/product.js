const mongoose = require("mongoose");
const CounterProduct = require("./Counters/counterProduct");
const productSchema = new mongoose.Schema({
  productId: { type: Number, index: true, unique: true },
  name: String,
  categoryId: String,
  status: { type: String, default: "premier" },
  price: Number,
  count: { type: Number, default: 0 },
});
productSchema.pre("save", async function (next) {
  const doc = this;
  try {
    const counterDoc = await CounterProduct.findByIdAndUpdate(
      { _id: "productId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    doc.productId = counterDoc.seq;
    next();
  } catch (err) {
    next(err);
  }
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
