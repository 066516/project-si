const mongoose = require("mongoose");
const CounterVente = require("./Counters/VenteCounter");
const Product = require("./product");
const venteSchema = new mongoose.Schema({
  id_vente: { type: Number, unique: true, index: true },
  id_client: { type: Number, ref: "Client" }, // Adjust 'Client' to your Client model
  id_produit: { type: Number, ref: "Product" },
  id_shop: { type: Number, ref: "Shop" },
  quantite_vendue: { type: Number, required: true },
  prix_unitaire_vente: { type: Number, required: true, default: 0 },
  date_vente: { type: Date, default: Date.now() },
  montant_total_vente: { type: Number, default: 0 },
  montant_encaisse_vente: { type: Number, default: 0 },
  reste: { type: Number, default: 0 },
  statut_paiement_vente: { type: Boolean, required: true },
});

venteSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counterDoc = await CounterVente.findByIdAndUpdate(
        { _id: "id_vente" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.id_vente = counterDoc.seq;
    } catch (err) {
      return next(err);
    }
    try {
      this.montant_total_vente =
        this.quantite_vendue * this.prix_unitaire_vente; // Calculate total sale amount

      next();
    } catch (error) {
      next(error);
    }
  }

  // Calculate 'montant_total_vente'
  this.montant_total_vente = this.quantité_vendue * this.prix_unitaire_vente;
  next();
});

const Vente = mongoose.model("Vente", venteSchema);
module.exports = Vente;
