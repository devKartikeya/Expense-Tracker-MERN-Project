// models/Category.js
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    iconKey: { type: String, default: "FaBox", required: true }, // e.g. "FaUtensils"
    color: { type: String, default: "text-gray-500" } // Tailwind class
});

module.exports = mongoose.model("Category", categorySchema);
