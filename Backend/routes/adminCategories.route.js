// routes/admin.route.js
const express = require("express");
const router = express.Router();
const User = require("../models/users.model");       // your user schema
const Expense = require("../models/expenses.model"); // your expense schema
const Category = require("../models/category.model"); // your category schema
const { checkAdmin } = require("../middlewares/admin.middleware");
const bcrypt = require("bcrypt");

// Dashboard Overview
router.get("/dashboard", checkAdmin, async (req, res) => {
    try {
        const usersCount = await User.countDocuments();
        const expensesCount = await Expense.countDocuments();
        const categoriesCount = await Category.countDocuments();

        console.log("Dashboard stats:", { usersCount, expensesCount, categoriesCount });

        res.json({
            flag: "success",
            stats: {
                users: usersCount,
                expenses: expensesCount,
                categories: categoriesCount,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ flag: "fail", message: "Error fetching dashboard stats" });
    }
});

// User Management
router.get("/users", checkAdmin, async (req, res) => {
    try {
        const users = await User.find({}, "username email createdAt"); // only safe fields
        res.json({ flag: "success", users });
    } catch (err) {
        res.status(500).json({ flag: "fail", message: "Error fetching users" });
    }
});


//Delete user  
router.delete("/users/:id", checkAdmin, async (req, res) => {
    console.log("Received request to delete user with ID:", req.params.id);
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ flag: "success", message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ flag: "fail", message: "Error deleting user" });
    }
});

//Reset user password
router.post("/users/:id/reset-password", checkAdmin, async (req, res) => {
    console.log("Received request to reset password for user ID:", req.params.id);
    try {
        // For now, set a default password (hashed)
        const bcrypt = require("bcrypt");
        const newPassword = await bcrypt.hash("default123", 10);

        await User.findByIdAndUpdate(req.params.id, { password: newPassword });
        res.json({ flag: "success", message: "Password reset successfully" });
    } catch (err) {
        res.status(500).json({ flag: "fail", message: "Error resetting password" });
    }
});

router.post("/logout", (req, res) => {
    res.clearCookie("adminToken");
    res.json({ flag: "success", message: "Admin logged out successfully" });
});

module.exports = router;