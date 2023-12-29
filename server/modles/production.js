const mongoose = require("mongoose");
const CounterProduction = require("./Counters/ProductionCounter");
const productionProduitsSchema = new mongoose.Schema({
  ProductionId: { type: Number, index: true, unique: true },
  id_product: { type: Number, ref: "Product" },
  count: { type: Number, default: 0 },
});
productionProduitsSchema.pre("save", async function (next) {
  const doc = this;
  try {
    const counterDoc = await CounterProduction.findByIdAndUpdate(
      { _id: "ProductionId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    doc.ProductionId = counterDoc.seq;
    next();
  } catch (err) {
    next(err);
  }
});
const Production = mongoose.model("Production", productionProduitsSchema);
module.exports = Production;
