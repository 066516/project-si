const mongoose = require("mongoose");
const CounterAnalyseAchat = require("./Counters/AnalyseAchat"); // Adjust the path as necessary

const analyseAchatSchema = new mongoose.Schema({
  id_analyse_achat: { type: Number, unique: true, index: true },
  top_fournisseur: { type: Number, ref: "Fournisseur" }, // Reference to Fournisseur model
  date_analyse: { type: Date, default: Date.now },
  taux_evolution_achats: { type: Number },
});

analyseAchatSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await CounterAnalyseAchat.findByIdAndUpdate(
      { _id: "id_analyse_achat" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.id_analyse_achat = counter.seq;
    next();
  } else {
    next();
  }
});

const AnalyseAchat = mongoose.model("AnalyseAchat", analyseAchatSchema);
module.exports = AnalyseAchat;
