// email.js

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "countalit@gmail.com",
    pass: "*************",
  },

  tls: {
    rejectUnauthorized: false, // To allow self-signed certificates (remove this line in production)
  },
});

module.exports = transporter;
