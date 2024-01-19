const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

function generatePDF(title, content) {
  return new Promise((resolve, reject) => {
    // Ensure the 'pvs' directory exists
    const directoryPath = path.join(__dirname, "../pvs");
    fs.mkdirSync(directoryPath, { recursive: true });

    // Define the file path
    const filePath = path.join(directoryPath, `${title}.pdf`);

    // Create a write stream to the defined path
    const writeStream = fs.createWriteStream(filePath);
    const doc = new PDFDocument();
    doc.pipe(writeStream);
    const titleWidth = doc.widthOfString(title);
    const titleHeight = doc.currentLineHeight();
    const pageWidth = doc.page.width;
    const titleX = (pageWidth - titleWidth) / 2 - titleWidth;
    // Add content to the PDF
    doc.fontSize(40).text(title, titleX, 80);
    // Increase this value to add more space between title and content
    const spaceBetweenTitleAndContent = 120; // Adjust this value as needed

    // Set the starting Y position for the content
    const contentStartY = 80 + titleHeight + spaceBetweenTitleAndContent;

    // Add content to the PDF
    doc.fontSize(12).text(content, 100, contentStartY); // Finalize the PDF and end the stream
    doc.end();

    // When the stream finishes writing, resolve the promise with the file path
    writeStream.on("finish", () => {
      resolve(filePath);
    });

    // Handle stream errors
    writeStream.on("error", (err) => {
      reject(err);
    });
  });
}

module.exports = generatePDF;
