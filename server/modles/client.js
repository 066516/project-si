const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CounterClient = require("./Counters/clientCounter");
const clientSchema = new Schema({
  // _id: { type: Number },
  clientId: { type: Number, unique: true, index: true },
  id_shop: { type: Number, ref: "Shop", required: true }, // clé primaire
  nomClient: { type: String, required: true }, // varchar equivalent
  prenomClient: { type: String, required: true }, // varchar equivalent
  adresseClient: { type: String, required: true }, // varchar equivalent
  telephoneClient: { type: String, required: true }, // varchar equivalent
  creditClient: { type: Number, default: 0 },
  trash: { type: Boolean, default: false },
  // Decimal equivalent
});
clientSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counterDoc = await CounterClient.findByIdAndUpdate(
        { _id: "clientId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.clientId = counterDoc.seq;
      next();
    } catch (err) {
      return next(err);
    }
  } else {
    next();
  }
});

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;
