const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CounterClient = require("./Counters/clientCounter");
const clientSchema = new Schema({
  clientId: { type: Number, unique: true, index: true }, // clé primaire
  nomClient: { type: String, required: true }, // varchar equivalent
  prenomClient: { type: String, required: true }, // varchar equivalent
  adresseClient: { type: String, required: true }, // varchar equivalent
  telephoneClient: { type: String, required: true }, // varchar equivalent
  creditClient: { type: Number }, // Decimal equivalent
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
