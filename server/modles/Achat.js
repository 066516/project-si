const mongoose = require("mongoose");
const CounterAchat = require("./Counters/AchatCounter");
const Product = require("./product");

const achatSchema = new mongoose.Schema({
  id_achat: { type: Number, unique: true, index: true },
  id_fournisseur: { type: Number, ref: "Fournisseur", required: true },
  id_produit: { type: Number, ref: "Product", required: true },
  quantite_achat: { type: Number, required: true },
  montant_total_achat: { type: Number },
  reste: { type: Number, default: 0 },
  date_achat: { type: Date, default: Date.now },
  statut_paiement_achat: { type: Boolean, required: true, default: true },
});

achatSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counterDoc = await CounterAchat.findByIdAndUpdate(
        { _id: "id_achat" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.id_achat = counterDoc.seq;
    } catch (err) {
      return next(err);
    }
  } else {
    next();
  }
  try {
    const product = await Product.findOne({ productId: this.id_produit });
    if (!product) {
      next(new Error("Product not found"));
    } else {
      this.montant_total_achat = product.price * this.quantite_achat;
      if (!this.statut_paiement_achat) {
        this.reste = this.montant_total_achat;
      }
      next();
    }
  } catch (err) {
    next(err);
  }
});

const Achat = mongoose.model("Achat", achatSchema);
module.exports = Achat;
