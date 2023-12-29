const ProduitStock = require("../modles/ProduitStock"); // Adjust the path as necessary
const Product = require("../modles/product"); // Adjust the path as necessary
const Prodction = require("../modles/production");
exports.createProduction = async (req, res) => {
  const { count, name, price, status } = req.body;
  const id_centre = 1; // Ensure this is intended to be hardcoded
  const { products } = req.body;
  try {
    for (const product of products) {
      const { id_product, count } = product;
      let newProduct = await Prodction.findOne({ id_product: id_product });
      if (!newProduct) {
        newProduct = new Prodction({
          id_product,
          count,
        });
        await newProduct.save();
      }
    }
    const newProduction = new Product({ count, name, price, status });
    await newProduction.save();

    // Update or create stock entry
    const stockDestination = await ProduitStock.findOne({
      id_produit: newProduction.productId,
    });
    if (stockDestination) {
      stockDestination.quantite_en_stock += count; // Ensure 'count' is a number
      await stockDestination.save();
    } else {
      const newStock = new ProduitStock({
        id_produit: newProduction.productId,
        id_shop: id_centre,
        quantite_en_stock: count,
      });
      await newStock.save();
    }

    res.status(201).send({
      message: "Production created successfully",
      data: newProduction,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error creating production", error: error });
  }
};
exports.getAllProductions = async (req, res) => {
  try {
    const prodction = await Prodction.find();
    res.status(200).send(prodction);
  } catch (error) {
    res.status(500).send(error);
  }
};
