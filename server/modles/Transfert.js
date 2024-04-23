const mongoose = require("mongoose");
const CounterTransfert = require("./Counters/TransfertCounter"); // Adjust the path as necessary
const Product = require("./product");

const transfertSchema = new mongoose.Schema({
  id_transfert: { type: Number, unique: true, index: true },
  id_produit: { type: Number, ref: "Product", required: true },
  id_centre: { type: Number, ref: "Shop", required: true },
  quantite_transfert: { type: Number, required: true },
  cout_transfert: { type: Number, default: 0 },
  date_transfert: { type: Date, default: Date.now },
});

transfertSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counterDoc = await CounterTransfert.findByIdAndUpdate(
        { _id: "id_transfert" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.id_transfert = counterDoc.seq;
      next();
    } catch (err) {
      next(err);
    }
    // try {
    //   const product = await Product.findOne({ productId: this.id_produit });
    //   if (!product) {
    //     next(new Error("Product not found"));
    //   } else {
    //     this.cout_transfert = product.price * this.quantite_transfert;

    //     next();
    //   }
    // } catch (err) {
    //   next(err);
    // }
  } else {
    next();
  }
});

const Transfert = mongoose.model("Transfert", transfertSchema);
module.exports = Transfert;
