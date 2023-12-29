const mongoose = require("mongoose");
const Counter = require("./Counters/absenceCounter"); // Adjust the path as necessary

const absenceEmployeSchema = new mongoose.Schema({
  id_absence: { type: Number, unique: true, index: true },
  id_employe: {
    type: Number,
    ref: "Employe",
    required: true,
  },
  date_absence: { type: Date, default: Date.now() },
});

absenceEmployeSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: "id_absence" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.id_absence = counter.seq;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

const AbsenceEmploye = mongoose.model("AbsenceEmploye", absenceEmployeSchema);
module.exports = AbsenceEmploye;
