const mongoose = require("mongoose");

const CounterAchatSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const CounterAchat = mongoose.model("CounterAchat", CounterAchatSchema);
module.exports = CounterAchat;
