const mongoose = require("mongoose");
const EmployeCounter = require("./Counters/counterEmploye");
const { CronJob } = require("cron");
const bcrypt = require("bcrypt");

const EmployeSchema = new mongoose.Schema({
  EmployeID: { type: Number, index: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  workIn: { type: Number, ref: "Shop", index: true },
  salary: { type: Number, default: 0 },
  salaireJour: { type: Number, default: 20 },
  nbAbsence: { type: Number, default: 0 },
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
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } else {
    next();
  }
});
EmployeSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Employe = mongoose.model("Employe", EmployeSchema);

const job = new CronJob("0 0 1 * *", async () => {
  try {
    await Employee.updateMany({}, { $set: { nbAbsence: 0 } });
    console.log("Employee absence count reset successfully.");
  } catch (err) {
    console.error("Error resetting employee absence count:", err);
  }
});
job.start();
module.exports = Employe;
