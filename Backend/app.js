const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const connectDB = require('./config/db');
const mailRoutes = require("./routes/mail.route");
const { getProfileData } = require("./controllers/profile.controller");
const { contactController } = require("./controllers/contact.controller");
const { checkSignUp, checkLogin } = require('./middlewares/auth.middleware');
const { checkAdmin } = require('./middlewares/admin.middleware');
const { adminLogin } = require('./controllers/admin.controller');
const { addExpense, getExpenses } = require('./controllers/expense.controller');
const { getExpensesByCategory, getMonthlyTotals, getDailyExpenses } = require('./controllers/charts.controller');
const { getTotalExpenses, getMonthlyExpenses, getTopCategory, getExpensesCount } = require('./controllers/services.controller');
const { authRegister, authLogin, authCheckUser, authCheckLogin, authLogout, authDeleteAccount, authChangePassword } = require('./controllers/auth.controller');
const adminRoutes = require("./routes/adminCategories.route");
const categoryRoutes = require("./routes/category.route");
const Admin = require("./models/admin.model");
const User = require("./models/users.model");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors({
    origin: [
        "http://localhost:5173",                               // dev frontend
        "https://expense-tracker-mern-project-seven.vercel.app" // prod frontend
    ],
    credentials: true
}));

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/auth", mailRoutes);
app.use("/admin", adminRoutes);
app.use("/admin/categories", categoryRoutes);

console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASSWORD);

app.post("/profile-data", checkLogin, getProfileData);
app.post('/signup', checkSignUp, authRegister);
app.post('/login', authLogin);
app.post('/check-username', authCheckUser);
app.post("/logout", authLogout);
app.post("/delete-account", checkLogin, authDeleteAccount);
app.post("/change-password", checkLogin, authChangePassword);
app.post("/expenses", checkLogin, addExpense);
app.post("/contact-us", checkLogin, contactController);
app.get("/check", checkLogin, authCheckLogin);
app.get("/expenses", checkLogin, getExpenses);
app.get("/total-expenses", checkLogin, getTotalExpenses);
app.get("/monthly-expenses", checkLogin, getMonthlyExpenses);
app.get("/top-category", checkLogin, getTopCategory);
app.get("/expenses-count", checkLogin, getExpensesCount);
app.get("/expenses-by-category", checkLogin, getExpensesByCategory);
app.get("/monthly-totals", checkLogin, getMonthlyTotals);
app.get("/daily-expenses", checkLogin, getDailyExpenses);
app.post("/admin-login", adminLogin);

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

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});