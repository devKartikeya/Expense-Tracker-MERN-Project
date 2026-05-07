const Contact = require("../models/contact.model");

const saveContactMessage = async (data) => {
  const contact = new Contact(data);
  await contact.save();
  return contact;
};

module.exports = { saveContactMessage };
