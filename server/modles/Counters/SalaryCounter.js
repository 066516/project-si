const mongoose = require("mongoose");
const CounterSalarySchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const CounterSalary = mongoose.model("CounterSalary", CounterSalarySchema);
module.exports = CounterSalary;
