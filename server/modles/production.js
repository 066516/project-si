const mongoose = require("mongoose");
const CounterProduction = require("./Counters/ProductionCounter");
const productionProduitsSchema = new mongoose.Schema({
  productionId: { type: Number, index: true, unique: true },
  id_product: { type: Number, ref: "Product" },
  date_creation: { type: Date, defaule: Date.now() },
  Shop_creation: { type: Number, ref: "Shop", required: true },
});
productionProduitsSchema.pre("save", async function (next) {
  const doc = this;
  try {
    const counterDoc = await CounterProduction.findByIdAndUpdate(
      { _id: "productionId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    doc.productionId = counterDoc.seq;
    next();
  } catch (err) {
    next(err);
  }
});
const Production = mongoose.model("Production", productionProduitsSchema);
module.exports = Production;
