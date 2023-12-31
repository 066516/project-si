const express = require("express");
const router = express.Router();
const transporter = require("../controls/Email"); // Assuming this file exports your transporter instance
const path = require("path");
router.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;
  const filePath = path.join(__dirname, "..", "pv.pdf");
  const mailOptions = {
    from: "countalit@gmail.com",
    to,
    subject,
    text,
    attachments: [
      {
        filename: "pv.pdf", // change the filename as needed
        path: filePath,
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

module.exports = router;
