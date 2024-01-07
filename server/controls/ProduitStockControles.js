const ProduitStock = require("../modles/ProduitStock"); // Adjust path as necessary
const Product = require("../modles/product");

// Create a new ProduitStock entry
exports.createProduitStock = async (req, res) => {
  try {
    const newProduitStock = new ProduitStock(req.body);
    await newProduitStock.save();
    res.status(201).send({
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
    let produitStocks = await ProduitStock.find({ id_shop:req.params.shop });
    produitStocks = await Promise.all(
      produitStocks.map(async (stock) => {
        stock = stock.toObject(); // Convert Mongoose document to a plain JavaScript object

        // Fetch product details
        const product = await Product.findOne({
          productId: stock.id_produit,
        }).select("name categoryId IsRawMaterial price");
        stock.productDetails = product; // Add product details to stock

        return stock;
      })
    );

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
    res.status(200).send({
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
exports.deleteAllProduitStock = async (req, res) => {
  try {
    const produitStock = await ProduitStock.deleteMany({});

    res.status(200).send({ message: " deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
