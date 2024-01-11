const mongoose = require("mongoose");
const CounterReglement = require("./Counters/CounterReglment"); // Counter model for id_reglement
const reglementSchema = new mongoose.Schema({
  id_reglement: { type: Number, unique: true, index: true },
  id_fournisseur: { type: Number, ref: "Fournisseur", default: null },
  // id_Achat: { type: Number, ref: "Achat" },
  montant_reglement: { type: Number, required: true },
  date_reglement: { type: Date, default: Date.now },
});

reglementSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counterDoc = await CounterReglement.findByIdAndUpdate(
        { _id: "id_reglement" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.id_reglement = counterDoc.seq;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

const Reglement = mongoose.model("Reglement", reglementSchema);
module.exports = Reglement;
