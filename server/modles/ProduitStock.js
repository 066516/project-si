const mongoose = require("mongoose");
const CounterProduitStock = require("./Counters/ProduitStockCounter"); // Adjust the path as necessary

const produitStockSchema = new mongoose.Schema({
  stockId: { type: Number, index: true, unique: true },
  id_produit: { type: Number, ref: "Product", required: true },
  id_shop: { type: Number, ref: "Shop", required: true, default: 1 },
  quantite_en_stock: { type: Number, required: true, default: 0 },
  trash: { type: Boolean, default: false },
});
produitStockSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counterDoc = await CounterProduitStock.findByIdAndUpdate(
        { _id: "stockId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.stockId = counterDoc.seq;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

const ProduitStock = mongoose.model("ProduitStock", produitStockSchema);
module.exports = ProduitStock;
