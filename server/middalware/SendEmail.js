const transporter = require("../controls/Email"); // Assuming this file exports your transporter instance
const path = require("path");
const sendEmail = async (title) => {
  const to = "ghmamnbyl@gmail.com";
  const subject = "last pv";
  const text = "pv today";

  const filePath = path.join(__dirname, "../pvs", title + ".pdf");
  const mailOptions = {
    from: "countalit@gmail.com",
    to,
    subject,
    text,
    attachments: [
      {
        filename: title, // change the filename as needed
        path: filePath,
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("email sended");
  } catch (error) {
    console.error(error);
  }
};
module.exports = sendEmail;
