const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
// import { v2 as cloudinary } from "cloudinary";
const cloudinary = require("cloudinary").v2;
// import multer from "multer";
const multer = require("multer");

const connectDB = require('./config/db');
const User = require("./models/users.model");
const Admin = require("./models/admin.model");
const Income = require("./models/income.model");
const mailRoutes = require("./routes/mail.route");
const categoryRoutes = require("./routes/category.route");
const adminRoutes = require("./routes/adminCategories.route");
const { checkAdmin } = require('./middlewares/admin.middleware');
const { adminLogin } = require('./controllers/admin.controller');
const { getProfileData, profile, setBudget } = require("./controllers/profile.controller");
const { contactController } = require("./controllers/contact.controller");
const { checkSignUp, checkLogin } = require('./middlewares/auth.middleware');
const { addExpense, getExpenses } = require('./controllers/expense.controller');
const { getExpensesByCategory, getMonthlyTotals, getDailyExpenses } = require('./controllers/charts.controller');
const { getTotalExpenses, getMonthlyExpenses, getTopCategory, getExpensesCount } = require('./controllers/services.controller');
const { authRegister, authLogin, authCheckUser, authCheckLogin, authLogout, authDeleteAccount, authChangePassword } = require('./controllers/auth.controller');
const { addIncome, getIncomes, getMonthlyIncome, getIncomeList } = require("./controllers/income.controller");

const app = express();
app.use(cors({
    origin: [
        "http://localhost:5173",                               // dev frontend
        "https://expense-tracker-mern-project-seven.vercel.app" // prod frontend
    ],
    credentials: true
}));

connectDB();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/auth", mailRoutes);
app.use("/admin", adminRoutes);
app.use("/admin/categories", categoryRoutes);

console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASSWORD);

app.post('/login', authLogin);
app.post("/logout", authLogout);
app.post("/admin-login", adminLogin);
app.post('/check-username', authCheckUser);
app.post("/income", checkLogin, addIncome);
app.post("/expenses", checkLogin, addExpense);
app.post('/signup', checkSignUp, authRegister);
app.post("/profile-data", checkLogin, getProfileData);
app.get("/profile", checkLogin, profile);
app.post("/set-budget", checkLogin, setBudget);
app.post("/contact-us", checkLogin, contactController);
app.post("/delete-account", checkLogin, authDeleteAccount);
app.post("/change-password", checkLogin, authChangePassword);

app.get("/check", checkLogin, authCheckLogin);
app.get("/income", checkLogin, getIncomeList);
app.get("/expenses", checkLogin, getExpenses);
app.get("/total-income", checkLogin, getIncomes);
app.get("/top-category", checkLogin, getTopCategory);
app.get("/total-expenses", checkLogin, getTotalExpenses);
app.get("/expenses-count", checkLogin, getExpensesCount);
app.get("/monthly-totals", checkLogin, getMonthlyTotals);
app.get("/daily-expenses", checkLogin, getDailyExpenses);
app.get("/monthly-income", checkLogin, getMonthlyIncome);
app.get("/monthly-expenses", checkLogin, getMonthlyExpenses);
app.get("/expenses-by-category", checkLogin, getExpensesByCategory);

app.post("/verify-user", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ flag: "fail", message: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ flag: "fail", message: "Invalid password" });

        res.json({ flag: "success" });
    } catch (err) {
        res.status(500).json({ flag: "fail", message: "Server error" });
    }
});

app.get("/admin-panel", checkAdmin, (req, res) => {
    res.json({ message: "Welcome to Admin Panel" });
});

app.get("/profile-pic", checkLogin, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json({ success: true, url: user.profilePicUrl });
    } catch (err) {
        res.json({ success: false, error: err.message });
    }
});

app.post("/upload-profile-pic", checkLogin, upload.single("profilePic"), async (req, res) => {
    try {
        cloudinary.uploader.upload_stream(
            { folder: "profile_pics" },
            async (error, result) => {
                if (error) return res.json({ success: false, error });

                // Save Cloudinary URL in MongoDB
                await User.findByIdAndUpdate(req.user.id, { profilePicUrl: result.secure_url });

                res.json({ success: true, url: result.secure_url });
            }
        ).end(req.file.buffer);
    } catch (err) {
        res.json({ success: false, error: err.message });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});