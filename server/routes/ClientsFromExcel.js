const express = require("express");
const router = express.Router();
const ExcelJS = require("exceljs");
const path = require("path");
const Client = require("../modles/client");

// Define a route for reading information from an Excel file
router.get("/read-create/:fileName", async (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, "..", fileName);

  console.log("Attempting to read file at path:", filePath);

  // Use ExcelJS to read the Excel file
  const workbook = new ExcelJS.Workbook();
  try {
    await workbook.xlsx.readFile(filePath);

    // Assume the data is in the first sheet
    const worksheet = workbook.getWorksheet(1);

    // Get headers from the first row
    const headers = worksheet.getRow(1).values;

    // Process the data
    const data = [];

    // Iterate through rows starting from the second row
    for (let rowNumber = 2; rowNumber <= worksheet.rowCount; rowNumber++) {
      const rowData = {};

      // Iterate through cells in the row
      worksheet
        .getRow(rowNumber)
        .eachCell({ includeEmpty: false }, (cell, colNumber) => {
          // Use the headers from the first row as keys
          const key = headers[colNumber];
          rowData[key] = cell.value;
        });

      // Add the row data to the main array
      data.push(rowData);
    }

    // Create clients from the data
    for (const cl of data) {
      try {
        const client = await new Client(cl);
        await client.save();
      } catch (err) {
        console.log(err);
      }
    }

    // Send the processed data as a response
    res.json({ msg: "Clients created!" });
  } catch (error) {
    // Handle errors, e.g., file not found or invalid Excel file
    console.error(error);
    res.status(500).json({ error: "Failed to read the Excel file" });
  }
});

module.exports = router;
