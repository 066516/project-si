const express = require("express");
const router = express.Router();
const ExcelJS = require("exceljs");
const fs = require("fs").promises;
const path = require("path");

const Client = require("../modles/client"); // Import your Mongoose model
const PvQuotidien = require("../modles/PvCenter");
const ProduitStock = require("../modles/ProduitStock");
const Product = require("../modles/product");

// Define a route for creating or replacing an Excel file with all instances
router.get("/export/:id", async (req, res) => {
  try {
    const instances = await ProduitStock.find({
      trash: false,
      id_shop: req.params.id,
    });

    if (!instances || instances.length === 0) {
      return res.status(404).json({ error: "No data found in the database." });
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    const headers = [
      "stockId",
      "productName",
      "price",

      "quantite_en_stock",
      "trash",
    ];
    worksheet.addRow(headers);

    for (const instance of instances) {
      try {
        const instanceObj = instance.toObject();
        const product = await Product.findOne({
          productId: instanceObj.id_produit,
        });

        const row = [
          instanceObj.stockId,
          product ? product.name : "Product Not Found",
          product ? product.price : "Product Not Found",

          instanceObj.quantite_en_stock,
          instanceObj.trash,
        ];
        worksheet.addRow(row);
      } catch (error) {
        console.log(`Error processing instance: ${error}`);
      }
    }

    const modelName = "ProduitStock";
    const filename = `${modelName}_export.xlsx`;
    const filePath = path.join(__dirname, "..", filename);
    await workbook.xlsx.writeFile(filePath);

    res.sendFile(filePath, (err) => {
      if (err) {
        console.error(`Error sending file: ${err}`);
      }

      // Optionally delete the file after sending it
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error(`Error deleting file: ${unlinkErr}`);
        }
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch instances or create/replace Excel file",
    });
  }
});

router.get("/download-pdf", (req, res) => {
  // Path to your PDF
  const pdfPath = path.join(__dirname, "../tp3.pdf");

  // Set the content type to application/pdf
  res.contentType("application/pdf");

  // Send the file to the client
  res.sendFile(pdfPath);
});
router.get("/api/pvs/download/:id_pv", async (req, res) => {
  try {
    const pv = await PvQuotidien.findOne({ id_pv: req.params.id_pv });
    if (!pv) {
      return res.status(404).send("PV not found");
    }
    const pdfPath = path.join(__dirname, "../pvs", `pv${pv.id_pv}.pdf`);

    // Set the content type to application/pdf
    res.contentType("application/pdf");

    // Send the file to the client
    res.sendFile(pdfPath);

    // const filePath = path.join(__dirname, "../pvs", `pv${pv.id_pv}.pdf`);
    // res.download(filePath); // Make sure the path points to where the PDFs are stored
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
