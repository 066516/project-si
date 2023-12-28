const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  productId: String,
  name: String,
  categoryId: String,
  price: Number,
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
