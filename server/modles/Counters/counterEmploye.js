const mongoose = require("mongoose");

const EmployeCounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const EmployeCounter = mongoose.model("EmployeCounter", EmployeCounterSchema);
module.exports = EmployeCounter;
