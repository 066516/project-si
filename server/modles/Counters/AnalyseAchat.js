const mongoose = require("mongoose");

const counterAnalyseAchatSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const CounterAnalyseAchat = mongoose.model(
  "CounterAnalyseAchat",
  counterAnalyseAchatSchema
);
module.exports = CounterAnalyseAchat;
