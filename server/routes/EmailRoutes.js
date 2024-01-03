const express = require("express");
const router = express.Router();
const transporter = require("../controls/Email"); // Assuming this file exports your transporter instance
const path = require("path");
router.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;
  const filePath = path.join(__dirname, "..", "tp3.pdf");
  const htmlContent = `
  <div style="background-color: #f5f5f5; padding: 20px; text-align: center; border-radius: 10px;">
  <h1 style="color: #333;">Hello sir! 😊</h1>
  <p style="color: #555;">This is the rapport system. I'm sorry for the late dispatch.</p>
  <h3 style="color: #333; padding: 10px; text-align: start;  text-transform: uppercase;">Best Regards.</h3>
  </div>

`;

  //  const too=`<h1>${to}</h1>`
  const mailOptions = {
    from: "countalit@gmail.com",
    to: to,
    subject,
    html: htmlContent,
    attachments: [
      {
        filename: "tp3.pdf", // change the filename as needed
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
