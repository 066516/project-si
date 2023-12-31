const express = require("express");
const router = express.Router();
const ExcelJS = require("exceljs");
const fs = require("fs").promises;
const path = require("path");

const Client = require("../modles/client"); // Import your Mongoose model

// Define a route for creating or replacing an Excel file with all instances
router.get("/export", async (req, res) => {
  try {
    // Fetch all instances from the database
    const instances = await Client.find();

    if (!instances || instances.length === 0) {
      return res.status(404).json({ error: "No data found in the database." });
    }

    // Create a new Excel workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    // Add headers to the worksheet
    const headers = Object.keys(instances[0].toObject());
    worksheet.addRow(headers);

    // Add data to the worksheet
    instances.forEach((instance) => {
      const values = Object.values(instance.toObject());
      worksheet.addRow(values);
    });

    // Generate a unique filename based on the model name
    const modelName = "clients";
    const filename = `${modelName}_export.xlsx`;

    // Save the Excel file to the root project directory
    const filePath = path.join(__dirname, "..", filename);
    await workbook.xlsx.writeFile(filePath);

    // Send a success message
    res.status(200).json({ message: "File created or replaced successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error:
          "Failed to fetch instances from the database or create/replace Excel file",
      });
  }
});

module.exports = router;
