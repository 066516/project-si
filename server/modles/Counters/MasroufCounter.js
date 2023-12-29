const mongoose = require("mongoose");

const MasroufCounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const MasroufCounter = mongoose.model("MasroufCounter", MasroufCounterSchema);
module.exports = MasroufCounter; // Replace 'employeObjectId' and amount as needed
