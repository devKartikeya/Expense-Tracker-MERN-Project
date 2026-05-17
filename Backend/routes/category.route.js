// routes/adminCategories.route.js
const express = require("express");
const router = express.Router();
const Category = require("../models/category.model");
const { checkAdmin } = require("../middlewares/admin.middleware");

// Get all categories
router.get("/", async (req, res) => {
    console.log("Fetching categories...");
    try {
        const categories = await Category.find();
        console.log(categories);
        res.json({ flag: "success", categories });
    } catch (err) {
        res.status(500).json({ flag: "fail", message: "Error fetching categories" });
    }
});

// Add category
router.post("/", async (req, res) => {
    try {
        const { name, iconKey, color } = req.body;
        const category = new Category({ name, iconKey, color });
        await category.save();
        res.json({ flag: "success", category });
    } catch (err) {
        res.status(500).json({ flag: "fail", message: "Error adding category" });
    }
});

// Delete category
router.delete("/:id", async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.json({ flag: "success", message: "Category deleted" });
    } catch (err) {
        res.status(500).json({ flag: "fail", message: "Error deleting category" });
    }
});

module.exports = router;
