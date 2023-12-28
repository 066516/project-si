const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Product = require("./modles/product");
// Middleware to parse JSON
app.use(express.json());

// Start the server

mongoose
  .connect("mongodb://127.0.0.1:27017/stock")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.post("/products", async (req, res) => {
  const { productId, name, categoryId, price } = req.body;

  const newProduct = new Product({
    productId,
    name,
    categoryId,
    price,
  });

  try {
    await newProduct.save();
    res.status(201).send(newProduct);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send({
      mssg: "data get succes",
      data: products,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get("/products/:productId", async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate({
      productId: req.params.productId,
    });
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.patch("/products/:productId", async (req, res) => {
  try {
    // Extract categoryId from the request body
    const { categoryId } = req.body;

    // Find the product by productId and update its categoryId
    const product = await Product.findOneAndUpdate(
      { productId: req.params.productId },
      { categoryId: categoryId }, // Update only the categoryId
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
