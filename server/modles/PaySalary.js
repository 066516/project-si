const mongoose = require("mongoose");
const CounterSalary = require("./Counters/SalaryCounter");
const SalarySchema = new mongoose.Schema({
  SalaryId: { type: Number, index: true, unique: true },
  // id_centre: { type: Number, ref: "Shop", required: true },
  id_employe: { type: Number, ref: "Employe" },
  // amount: { type: Number, default: 0 },
  date: { type: Date, default: Date.now() },
});
SalarySchema.pre("save", async function (next) {
  const doc = this;
  try {
    const counterDoc = await CounterSalary.findByIdAndUpdate(
      { _id: "SalaryId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    doc.SalaryId = counterDoc.seq;
    next();
  } catch (err) {
    next(err);
  }
});
const Salary = mongoose.model("Salary", SalarySchema);
module.exports = Salary;
