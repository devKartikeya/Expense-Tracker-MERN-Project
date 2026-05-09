const Contact = require("../models/contact.model");

const sendEmailViaBrevo = async (mailOptions) => {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY,
    },
    body: JSON.stringify(mailOptions),
  });
  const data = await response.json();
  console.log("Brevo response:", data);
};

const saveContactMessage = async (data) => {
  const contact = new Contact(data);
  await contact.save();

  // Email to owner
  await sendEmailViaBrevo({
    sender: { name: "Xpense Tracker Contact", email: "devkartikeya2122002@gmail.com" },
    to: [{ email: process.env.EMAIL_USER }],
    subject: `New Contact Message from ${data.username}`,
    htmlContent: `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${data.username}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Message:</strong> ${data.message}</p>
      <p>Received at: ${new Date().toLocaleString()}</p>
    `
  });

  // Confirmation email to sender
  await sendEmailViaBrevo({
    sender: { name: "Xpense Tracker", email: "devkartikeya2122002@gmail.com" },
    to: [{ email: data.email }],
    subject: "We received your message",
    htmlContent: `
      <h2>Thanks for contacting us!</h2>
      <p>Hi ${data.username},</p>
      <p>We've received your message and will get back to you soon.</p>
      <p>Message you sent:</p>
      <blockquote>${data.message}</blockquote>
      <p>Regards,<br/>Xpense Tracker Team</p>
    `
  });

  return contact;
};

module.exports = { saveContactMessage };