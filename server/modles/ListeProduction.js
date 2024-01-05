const mongoose = require("mongoose");
const ListeProductionCpunter = require("./Counters/ListeProductionCounter");
const listeProductionSchema = new mongoose.Schema({
  liste_id: { type: Number, index: true, unique: true },
  id_production: { type: Number, ref: "Production", required: true },
  id_product: { type: Number, ref: "Product", required: true },
  count: { type: Number, default: 0, required: true },
});
listeProductionSchema.pre("save", async function (next) {
  const doc = this;
  try {
    const counterDoc = await ListeProductionCpunter.findByIdAndUpdate(
      { _id: "liste_id" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    doc.liste_id = counterDoc.seq;
    next();
  } catch (err) {
    next(err);
  }
});
const ListeProduction = mongoose.model(
  "ListeProduction",
  listeProductionSchema
);
module.exports = ListeProduction;
