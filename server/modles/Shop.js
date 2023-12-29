const mongoose = require("mongoose");
const Counter = require("./Counters/CounterShop");
const ShopSchema = new mongoose.Schema({
  shopID: { type: Number, index: true, unique: true },
  status: String,
  address: String,
  name: String,
  responsable_centre: { type: Number, ref: "Employe", index: true },
});

ShopSchema.pre("save", async function (next) {
  const doc = this;
  try {
    const counterDoc = await Counter.findByIdAndUpdate(
      { _id: "shopID" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    doc.shopID = counterDoc.seq;
    next();
  } catch (err) {
    next(err);
  }
});


const Shop = mongoose.model("Shop", ShopSchema);
module.exports = Shop;
