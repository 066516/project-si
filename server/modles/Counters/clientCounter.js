const mongoose = require("mongoose");

const CounterClientSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const CounterClient = mongoose.model("CounterClient", CounterClientSchema);
module.exports = CounterClient;
