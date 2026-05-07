const Contact = require("../models/contact.model");
const { transporter } = require("../config/mail"); // reuse transporter

const saveContactMessage = async (data) => {
  const contact = new Contact(data);
  await contact.save();

  // Email to owner
  const mailOptions = {
    from: `"Xpense Tracker Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER, // owner Gmail ID
    subject: `New Contact Message from ${data.username}`,
    html: `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${data.username}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Message:</strong> ${data.message}</p>
      <p>Received at: ${new Date().toLocaleString()}</p>
    `,
  };

  await transporter.sendMail(mailOptions);

  // Optional: confirmation email back to sender
  const confirmOptions = {
    from: `"Xpense Tracker" <${process.env.EMAIL_USER}>`,
    to: data.email,
    subject: "We received your message",
    html: `
      <h2>Thanks for contacting us!</h2>
      <p>Hi ${data.username},</p>
      <p>We’ve received your message and will get back to you soon.</p>
      <p>Message you sent:</p>
      <blockquote>${data.message}</blockquote>
      <p>Regards,<br/>Xpense Tracker Team</p>
    `,
  };

  await transporter.sendMail(confirmOptions);

  return contact;
};

module.exports = { saveContactMessage };
