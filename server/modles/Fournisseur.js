const mongoose = require("mongoose");
const CounterFournisseur = require("./Counters/FournisseurCounter"); // Adjust the path as necessary

const fournisseurSchema = new mongoose.Schema({
  Id_fournisseur: { type: Number, unique: true, index: true },
  Nom_fournisseur: { type: String, required: true },
  Prenom_fournisseur: { type: String, required: true },
  adresse_fournisseur: { type: String, default: "" },
  telephone_fournisseur: { type: String, required: true },
  montant_encaisse_vente: { type: Number, default: 0 },
  solde_fournisseur: { type: Number, default: 0 },
});

fournisseurSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counterDoc = await CounterFournisseur.findByIdAndUpdate(
      { _id: "Id_fournisseur" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.Id_fournisseur = counterDoc.seq;
    next();
  } else {
    next();
  }
});

const Fournisseur = mongoose.model("Fournisseur", fournisseurSchema);
module.exports = Fournisseur;
