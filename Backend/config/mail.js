// config/mail.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendResetEmail = async (to, resetLink) => {
  console.log('Sending to', to);
  const mailOptions = {
    from: `"Xpense Tracker" <aac2ff001@smtp-brevo.com>`,
    to,
    subject: "Password Reset Request",
    html: `
      <h2>Password Reset</h2>
      <p>You requested to reset your password. Click the link below:</p>
      <a href="${resetLink}" target="_blank">${resetLink}</a>
      <p>This link will expire in 15 minutes.</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};


module.exports = { sendResetEmail, transporter };