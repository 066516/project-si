const express = require("express");
const mongoose = require("mongoose");
const app = express();

const shopRoutes = require("./routes/shopRoutes");
const employeRoutes = require("./routes/EmployeRoutes");
const productRoutes = require("./routes/productRoutes");
const clientRoutes = require("./routes/ClientRoutes");
const fourRouter = require("./routes/FournisseurRoutes");
const venteRouter = require("./routes/VenteRoutes");
const StockRouter = require("./routes/ProduitStockRoutes");
// ... rest of your server setup ...

// Middleware to parse JSON
app.use(express.json());

// Start the server

mongoose
  .connect("mongodb://127.0.0.1:27017/stock")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));
app.use("/", shopRoutes);
app.use("/", employeRoutes);
app.use("/", productRoutes);
app.use("/", clientRoutes);
app.use("/", fourRouter);
app.use("/", venteRouter);
app.use("/", StockRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
