const mongoose = require("mongoose");
const CounterPv = require("./Counters/PvCounter"); // Adjust the path as necessary
const pvQuotidienSchema = new mongoose.Schema({
  id_pv: { type: Number, unique: true, index: true },
  id_centre: { type: Number, ref: "Centre" }, // Adjust 'Centre' to your Centre model
  // id_employe: { type: Number, ref: "Employe" },
  Pv_content: { type: String }, // Adjust 'Centre' to your Centre model
  date_pv: { type: Date, default: Date.now },
  pdfPath: { type: String },
});

pvQuotidienSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counterDoc = await CounterPv.findByIdAndUpdate(
        { _id: "id_pv" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.id_pv = counterDoc.seq;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

const PvQuotidien = mongoose.model("PvQuotidien", pvQuotidienSchema);
module.exports = PvQuotidien;
