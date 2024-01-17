const mongoose = require("mongoose");
const CounterReglement = require("./Counters/CounterReglmentClient"); // Counter model for id_reglement
const reglementSchema = new mongoose.Schema({
  id_reglement_Client: { type: Number, unique: true, index: true },
  id_client: { type: Number, ref: "Client" },
  id_vente: { type: Number, ref: "Vente" },
  montant_reglement: { type: Number, required: true },
  date_reglement: { type: Date, default: Date.now },
});

reglementSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counterDoc = await CounterReglement.findByIdAndUpdate(
        { _id: "id_reglement_Client" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.id_reglement_Client = counterDoc.seq;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

const ReglementClient = mongoose.model("ReglementClient", reglementSchema);
module.exports = ReglementClient;
