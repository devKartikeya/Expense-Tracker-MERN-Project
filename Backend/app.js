const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/db');
const mailRoutes = require("./routes/mail.route");
const { getProfileData } = require("./controllers/profile.controller");
const { contactController } = require("./controllers/contact.controller");
const { checkSignUp, checkLogin } = require('./middlewares/auth.middleware');
const { addExpense, getExpenses } = require('./controllers/expense.controller');
const { getExpensesByCategory, getMonthlyTotals, getDailyExpenses } = require('./controllers/charts.controller');
const { getTotalExpenses, getMonthlyExpenses, getTopCategory, getExpensesCount } = require('./controllers/services.controller');
const { authRegister, authLogin, authCheckUser, authCheckLogin, authLogout, authDeleteAccount, authChangePassword } = require('./controllers/auth.controller');

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

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});