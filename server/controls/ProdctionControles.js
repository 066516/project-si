const ProduitStock = require("../modles/ProduitStock"); // Adjust the path as necessary
const Product = require("../modles/product"); // Adjust the path as necessary
const Prodction = require("../modles/production");
const ListeProduction = require("../modles/ListeProduction");
exports.createProduction = async (req, res) => {
  const { count, name, price, shop } = req.body;

  const { products } = req.body;
  try {
    const existProduct = await Product.findOne({ name: name });
    if (existProduct) {
      return res.status(409).json({ msg: "This product already exists" });
    }
    let newProd = await Product.create({
      count,
      name,
      price,
      IsRawMaterial: false,
    });

    const newProduction = await Prodction.create({
      id_product: newProd.productId,
      Shop_creation: shop,
    });

    for (const product of products) {
      const { id_product, count } = product;
      let newProListe = await ListeProduction.create({
        id_production: newProduction.productionId,
        id_product: id_product,
        count: count,
      });
    }

    // Update or create stock entry
    // const stockDestination = await ProduitStock.findOne({
    //   id_produit: newProd.productId,
    // });
    // if (stockDestination) {
    //   stockDestination.quantite_en_stock += count; // Ensure 'count' is a number
    //   await stockDestination.save();
    // } else {
    const newStock = await ProduitStock.create({
      id_produit: newProd.productId,
      id_shop: shop,
      quantite_en_stock: count,
    });

    // }

    let ListeProductions = await ListeProduction.find({
      id_production: newProduction.productionId,
    });
    let data = { newProd, ListeProductions };
    res.status(201).send({
      message: "Production created successfully",
      data,
    });
  } catch (error) {
    console.log(error);
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
exports.getAllProductionsListe = async (req, res) => {
  try {
    const prodction = await ListeProduction.find();
    res.status(200).send(prodction);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.deleteAllProductionsListe = async (req, res) => {
  try {
    const prodction = await ListeProduction.deleteMany({});
    res.status(200).send(prodction);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.deleteAllProductions = async (req, res) => {
  try {
    const prodction = await Prodction.deleteMany({});
    res.status(200).send("deleted");
  } catch (error) {
    res.status(500).send(error);
  }
};
