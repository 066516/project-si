const mongoose = require("mongoose");
const EmployeCounter = require("./Counters/counterEmploye");

const EmployeSchema = new mongoose.Schema({
  EmployeID: { type: Number, index: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  workIn: { type: Number, ref: "Shop", index: true },
  salary: { type: Number, default: 0 },
  trash: { type: Boolean, default: false },
});

EmployeSchema.pre("save", async function (next) {
  const doc = this;
  if (this.isNew) {
    const counterDoc = await EmployeCounter.findByIdAndUpdate(
      { _id: "EmployeID" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    doc.EmployeID = counterDoc.seq;
    next();
  } else {
    next();
  }
});

const Employe = mongoose.model("Employe", EmployeSchema);
module.exports = Employe;
