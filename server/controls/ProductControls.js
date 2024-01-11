const ProduitStock = require("../modles/ProduitStock");
const Product = require("../modles/product");

exports.createProduct = async (req, res) => {
  try {
    // Check if a product with the same name already exists
    const existingProduct = await Product.findOne({ name: req.body.name });
    if (existingProduct) {
      return res
        .status(400)
        .send({ message: "Product with this name already exists" });
    }

    // Create a new product if it doesn't exist
    const newProduct = await Product.create(req.body);

    // Add the new product to the stock
    // Set initial stock quantity, adjust as needed
    const newProductStock = await ProduitStock.create({
      id_produit: newProduct.productId, // Reference the newly created product's _id
      quantite_en_stock: newProduct.count,
      id_shop: req.body.id_shop, // Assuming you pass the shop ID in the request
    });

    res.status(201).send({
      message: "Product created successfully and added to stock",
      data: {
        product: newProduct,
        stock: newProductStock,
      },
    });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    res.status(500).send(error);
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ trash: false });
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { productId: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).send({ message: "Product not found" });
    }

    // Check if there's a new stock quantity provided in the request
    if (req.body.count !== undefined) {
      const stockItem = await ProduitStock.findOne({
        id_produit: updatedProduct.productId,
      });

      if (stockItem) {
        // Calculate the difference and update the stock
        const quantityDifference = req.body.count - stockItem.quantite_en_stock;
        stockItem.quantite_en_stock += quantityDifference;
        await stockItem.save();
      } else {
        // If no existing stock item, you might want to create a new one or handle this case differently
      }
    }

    res
      .status(200)
      .send({ message: "Product updated successfully", data: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send(error);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      {
        productId: req.params.id,
        trash: false,
      },
      {
        $set: { trash: true },
      },
      {
        new: true, // Returns the updated document
      }
    );

    const stock = await ProduitStock.findOneAndUpdate(
      {
        id_produit: req.params.id,
        trash: false,
      },
      {
        $set: { trash: true },
      },
      {
        new: true, // Returns the updated document
      }
    );
    stock.trash = true;
    stock.save();
    if (!updatedProduct || !stock) {
      return res.status(404).send({ message: "Product and Stock not found" });
    }
    res
      .status(200)
      .send({ message: "Product and Stock  deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.deleteAllProduct = async (req, res) => {
  try {
    await Product.deleteMany({});
    res.status(200).send({ message: "All Employee deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
