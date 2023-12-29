const mongoose = require("mongoose");
const CounterMasrouf = require("./Counters/MasroufCounter"); // Adjust the path as necessary

const masroufSchema = new mongoose.Schema({
  id_masrouf: { type: Number, unique: true, index: true },
  id_employe: { type: Number, ref: "Employe" }, // Reference to Employe model
  montant_masrouf: { type: Number, required: true },
  date_masrouf: { type: Date, default: Date.now },
});

masroufSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await CounterMasrouf.findByIdAndUpdate(
      { _id: "id_masrouf" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.id_masrouf = counter.seq;
    next();
  } else {
    next();
  }
});

const Masrouf = mongoose.model("Masrouf", masroufSchema);
module.exports = Masrouf;
