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
    let produitStocks = await ProduitStock.find({
      id_shop: req.params.shop,
      trash: false,
    });
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
    const produitStock = await ProduitStock.findOne({
      stockId: req.params.id,
      trash: false,
    });
    produitStock.trash = true;
    produitStock.save();
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
// Replace with the actual path

exports.getProductStockInfo = async (req, res) => {
  try {
    const aggregateResult = await ProduitStock.aggregate([
      { $match: { id_shop: 1, trash: false } },
      {
        $group: {
          _id: "$id_produit",
          totalUnits: { $sum: "$quantite_en_stock" }, // Summing up quantities for each product
        },
      },
      { $sort: { totalUnits: -1 } }, // Sorting by total units in descending order
      { $limit: 1 }, // Limiting to the top product
      {
        $lookup: {
          from: "products", // Make sure this matches your products collection name
          localField: "_id", // 'id_produit' in 'ProduitStock' collection
          foreignField: "productId", // 'productId' in 'Product' collection
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" }, // Unwind for easier access to product details
    ]);

    // Also calculate the total number of products and total units in a separate query
    const totalStats = await ProduitStock.aggregate([
      { $match: { id_shop: 1, trash: false } },
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          totalUnits: { $sum: "$quantite_en_stock" },
        },
      },
    ]);

    res.status(200).send({
      topProduct: aggregateResult[0] ? aggregateResult[0] : null,
      totalStats: totalStats[0] ? totalStats[0] : null,
    });
  } catch (error) {
    console.error("Error getting product stock info:", error);
    res.status(500).send(error);
  }
};
