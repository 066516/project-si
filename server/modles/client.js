const clientSchema = new mongoose.Schema({
    clientId: String,
    name: String,
    contact: String,
    address: String
  });
  const Client = mongoose.model('Client', clientSchema);
  