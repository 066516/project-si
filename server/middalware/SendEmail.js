// const nodemailer = require("nodemailer");
// const sendEmail = async (to, subject, text) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: "smtp.example.com", // Replace with your mail provider's SMTP server
//       port: 587,
//       secure: false, // true for 465, false for other ports
//       auth: {
//         user: "countalit@gmail.com", // Replace with your email
//         pass: "12345678", // Replace with your email password
//       },
//     });

//     const mailOptions = {
//       from: "countalit@gmail.com",
//       to: to,
//       subject: subject,
//       text: text,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email sent:", info.messageId);
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// };

// module.exports = sendEmail;
