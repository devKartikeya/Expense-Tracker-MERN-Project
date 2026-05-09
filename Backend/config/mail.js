const axios = require("axios");

const sendResetEmail = async (to, resetLink) => {
  try {

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",

      {
        sender: {
          name: "Xpense Tracker",

          email: "devkartikeya2122002@gmail.com",
        },

        to: [
          {
            email: to,
          },
        ],

        subject: "Reset Your Password",

        htmlContent: `
          <h2>Password Reset</h2>

          <p>Click below to reset password:</p>

          <a href="${resetLink}">
            Reset Password
          </a>
        `,
      },

      {
        headers: {
          accept: "application/json",

          "api-key": process.env.BREVO_API_KEY,

          "content-type": "application/json",
        },
      }
    );

    console.log("Email Sent:", response.data);

  } catch (error) {

    console.log(
      "Error sending email:",
      error.response?.data || error.message
    );

    throw error;
  }
};

module.exports = { sendResetEmail };