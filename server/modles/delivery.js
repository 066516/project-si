const deliverySchema = new mongoose.Schema({
    deliveryId: String,
    clientId: String,
    productId: String,
    date: Date,
    quantity: Number
  });
  const Delivery = mongoose.model('Delivery', deliverySchema);
  