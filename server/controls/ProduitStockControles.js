const ProduitStock = require("../modles/ProduitStock"); // Adjust path as necessary

// Create a new ProduitStock entry
exports.createProduitStock = async (req, res) => {
  try {
    const newProduitStock = new ProduitStock(req.body);
    await newProduitStock.save();
    res
      .status(201)
      .send({
        message: "ProduitStock entry created successfully",
        data: newProduitStock,
      });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a single ProduitStock entry by ID
exports.getProduitStock = async (req, res) => {
  try {
    const produitStock = await ProduitStock.findById(req.params.id);
    if (!produitStock) {
      return res.status(404).send({ message: "ProduitStock entry not found" });
    }
    res.status(200).send(produitStock);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get all ProduitStock entries
exports.getAllProduitStocks = async (req, res) => {
  try {
    const produitStocks = await ProduitStock.find();
    res.status(200).send(produitStocks);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a ProduitStock entry by ID
exports.updateProduitStock = async (req, res) => {
  try {
    const updatedProduitStock = await ProduitStock.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduitStock) {
      return res.status(404).send({ message: "ProduitStock entry not found" });
    }
    res
      .status(200)
      .send({
        message: "ProduitStock entry updated successfully",
        data: updatedProduitStock,
      });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete a ProduitStock entry by ID
exports.deleteProduitStock = async (req, res) => {
  try {
    const produitStock = await ProduitStock.findByIdAndDelete(req.params.id);
    if (!produitStock) {
      return res.status(404).send({ message: "ProduitStock entry not found" });
    }
    res
      .status(200)
      .send({ message: "ProduitStock entry deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
