const PDFDocument = require("pdfkit");
const fs = require("fs");

function generatePDF(title,content) {
  const doc = new PDFDocument();
  const writeStream = fs.createWriteStream("output.pdf");
  doc.pipe(writeStream);

  doc.fontSize(25).text(title, 100, 80);
  doc.text(content, 100, 120);

  doc.end();
  writeStream.on("finish", () => {
    // The PDF is created
  });
}

module.exports = generatePDF;
