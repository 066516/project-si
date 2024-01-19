const ProduitStock = require("../modles/ProduitStock");
const Product = require("../modles/product");

exports.createProduct = async (req, res) => {
  try {
    // Check if a product with the same name already exists
    const existingProduct = await Product.findOne({
      name: req.body.name,
    });
    if (existingProduct && !existingProduct.trash) {
      return res
        .status(400)
        .send({ message: "Product with this name already exists" });
    }
    if (existingProduct && existingProduct.trash) {
      const updatedProduct = await Product.findOneAndUpdate(
        { productId: existingProduct.productId },
        { ...req.body, trash: false },
        { new: true, runValidators: true }
      );
      const stock = await ProduitStock.findOneAndUpdate(
        {
          id_produit: updatedProduct.productId,
          trash: true,
        },
        {
          id_produit: updatedProduct.productId, // Reference the newly created product's _id
          quantite_en_stock: updatedProduct.count,
          id_shop: req.body.id_shop,
          trash: false,
        },

        {
          new: true, // Returns the updated document
        }
      );
      return res.status(201).send({
        message: "Product re-created successfully and added to stock",
        data: {
          product: updatedProduct,
          stock: stock,
        },
      });
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
    const product = await Product.findOne({ productId: req.params.id });
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
    // Update the product to set trash to true
    const updatedProduct = await Product.findOneAndUpdate(
      { productId: req.params.id, trash: false },
      { $set: { trash: true } },
      { new: true }
    );

    // Update the stock to set trash to true
    const updatedStock = await ProduitStock.findOneAndUpdate(
      { id_produit: req.params.id, trash: false },
      { $set: { trash: true } },
      { new: true }
    );
    console.log(updatedProduct, updatedStock);

    // Check if either the product or the stock was not found
    if (!updatedProduct || !updatedStock) {
      return res
        .status(404)
        .send({ message: "Product and/or Stock not found" });
    }

    // If both updates were successful
    res.status(200).send({ message: "Product and Stock deleted successfully" });
  } catch (error) {
    console.log(error);
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
