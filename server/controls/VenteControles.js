const Vente = require("../modles/Vente");
const Client = require("../modles/client"); // Adjust the path as necessary
const Product = require("../modles/product"); // Adjust the path as necessary
const Shop = require("../modles/Shop"); // Adjust the path as necessary
const ProduitStock = require("../modles/ProduitStock"); // Adjust the path as necessary

exports.createVente = async (req, res) => {
  const {
    id_client,
    id_produit,
    id_shop,
    quantite_vendue,
    prix_unitaire_vente,
    statut_paiement_vente,
  } = req.body;

  try {
    // Verify if the Client exists
    // const clientExists = await Client.findOne({ clientId: id_client });
    // if (!clientExists) {
    //   return res.status(404).send({ message: "Client not found" });
    // }

    // Verify if the Product exists
    // const productExists = await Product.findOne({ productId: id_produit });
    // if (!productExists) {
    //   return res.status(404).send({ message: "Product not found" });
    // }

    // const stockItem = await ProduitStock.findOne({ id_produit, id_shop });
    // if (!stockItem || stockItem.quantite_en_stock < quantite_vendue) {
    //   return res.status(400).send({
    //     message: "Insufficient stock for this product in the specified shop",
    //   });
    // }
    // If all exist, create the Vente
    const newVente = new Vente({
      id_client,
      id_produit,
      id_shop,
      quantite_vendue,
      prix_unitaire_vente,
      date_vente: new Date(),
      statut_paiement_vente, // or based on your business logic
    });
    await newVente.save();
    // stockItem.quantite_en_stock -= quantite_vendue;
    // await stockItem.save();
    res.status(201).send({
      message: "Vente created successfully",
      data: newVente,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a single Vente entry by ID
exports.getVente = async (req, res) => {
  try {
    const vente = await Vente.findById(req.params.id);
    if (!vente) {
      return res.status(404).send({ message: "Vente not found" });
    }
    res.status(200).send(vente);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get all Vente entries
exports.getAllVentes = async (req, res) => {
  try {
    let ventes = await Vente.find();
    ventes = await Promise.all(
      ventes.map(async (vente) => {
        vente = vente.toObject(); // Convert Mongoose document to a plain JavaScript object

        // Fetch client details
        const client = await Client.findOne({
          clientId: vente.id_client,
        }).select("nomClient prenomClient");
        vente.clientDetails = client; // Add client details to vente

        // Fetch product details
        const product = await Product.findOne({
          productId: vente.id_produit,
        }).select("name"); // Replace 'idProduct' and 'name' with actual field names in your Product model
        vente.productDetails = product; // Add product details to vente

        return vente;
      })
    );

    res.status(200).send(ventes);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a Vente entry by ID
exports.updateVente = async (req, res) => {
  try {
    // Find the existing vente
    const existingVente = await Vente.findOne({ id_vente: req.params.id });
    if (!existingVente) {
      return res.status(404).send({ message: "Vente not found" });
    }

    const oldQuantiteVendue = existingVente.quantite_vendue;

    // Update the vente
    const updatedVente = await Vente.findOneAndUpdate(
      { id_vente: req.params.id },
      req.body,
      { new: true }
    );

    const newQuantiteVendue = updatedVente.quantite_vendue;

    // Adjust the stock if the sold quantity has changed
    if (oldQuantiteVendue !== newQuantiteVendue) {
      const stockItem = await ProduitStock.findOne({
        id_produit: updatedVente.id_produit,
        id_shop: updatedVente.id_shop,
      });
      if (stockItem) {
        // Adjust the stock based on the difference in quantities
        stockItem.quantite_en_stock += oldQuantiteVendue - newQuantiteVendue;
        await stockItem.save();
      }
    }

    res
      .status(200)
      .send({ message: "Vente updated successfully", data: updatedVente });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete a Vente entry by ID
exports.deleteVente = async (req, res) => {
  try {
    const vente = await Vente.findOneAndDelete({ id_vente: req.params.id });
    if (!vente) {
      return res.status(404).send({ message: "Vente not found" });
    }

    // Retrieve the quantity sold
    const { id_produit, id_shop, quantite_vendue } = vente;

    // Update the stock
    const stockItem = await ProduitStock.findOne({ id_produit, id_shop });
    if (stockItem) {
      stockItem.quantite_en_stock += quantite_vendue; // Return the quantity to stock
      await stockItem.save();
    }

    res.status(200).send({ message: "Vente deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteAllVente = async (req, res) => {
  try {
    const Ventes = await Vente.deleteMany({});
    res.status(200).send({ message: "Vente deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
