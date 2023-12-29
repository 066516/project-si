const express = require("express");
const mongoose = require("mongoose");
const app = express();

const shopRoutes = require("./routes/shopRoutes");
const employeRoutes = require("./routes/EmployeRoutes");
const productRoutes = require("./routes/productRoutes");
const clientRoutes = require("./routes/ClientRoutes");
const fourRouter = require("./routes/FournisseurRoutes");
const AchatRouter = require("./routes/AchatRoutes");
const StockRouter = require("./routes/ProduitStockRoutes");
const RegelmentRoutes = require("./routes/RegelmentRoutes");
const transRoutes = require("./routes/transferRoutes");
const VenteRoutes = require("./routes/VenteRoutes");
const pvRoutes = require("./routes/PvRoutes");
const AbsenceRoutes = require("./routes/AbsenceRoutes");
const MasroufRoutes = require("./routes/MasroufRoutes");
const Analyse = require("./routes/Analyse");
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
app.use("/", AchatRouter);
app.use("/", StockRouter);
app.use("/", RegelmentRoutes);
app.use("/", transRoutes);
app.use("/", VenteRoutes);
app.use("/", pvRoutes);
app.use("/", AbsenceRoutes);
app.use("/", MasroufRoutes);
app.use("/", Analyse);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
