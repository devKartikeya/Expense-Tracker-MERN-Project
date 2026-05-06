const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');

const connectDB = require('./config/db');
const User = require('./models/users.model');
const Expense = require('./models/expenses.model');
const { checkSignUp, checkLogin } = require('./middlewares/auth.middleware');
const { authRegister, authLogin, authCheckUser, authCheckLogin, authLogout } = require('./controllers/auth.controller');
const { addExpense, getExpenses } = require('./controllers/expense.controller');
const { getTotalExpenses, getMonthlyExpenses, getTopCategory, getExpensesCount } = require('./controllers/services.controller');
const { getExpensesByCategory, getMonthlyTotals, getDailyExpenses } = require('./controllers/charts.controller');

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        password: process.env.EMAIL_PASSWORD,
    },
});

app.get("/auth/check", checkLogin, authCheckLogin);
app.post('/signup', checkSignUp, authRegister);
app.post('/login', authLogin);
app.post('/check-username', authCheckUser);
app.post("/logout", authLogout);
app.post("/expenses", checkLogin, addExpense);
app.get("/expenses", checkLogin, getExpenses);
app.get("/total-expenses", checkLogin, getTotalExpenses);
app.get("/monthly-expenses", checkLogin, getMonthlyExpenses);
app.get("/top-category", checkLogin, getTopCategory);
app.get("/expenses-count", checkLogin, getExpensesCount);
app.get("/expenses-by-category", checkLogin, getExpensesByCategory);
app.get("/monthly-totals", checkLogin, getMonthlyTotals);
app.get("/daily-expenses", checkLogin, getDailyExpenses);

const sendResetEmail = async (to, resetLink) => {
    const mailOptions = {
        from: `"Xpense Tracker" <${process.env.EMAIL_USER}>`,
        to,
        subject: "Password Reset Request",
        html: `
      <h2>Password Reset</h2>
      <p>You requested to reset your password. Click the link below:</p>
      <a href="${resetLink}" target="_blank">${resetLink}</a>
      <p>This link will expire in 15 minutes.</p>
    `,
    };

    await transporter.sendMail(mailOptions);
};

// XIpjPCfVNzudfLmO
// mongodb+srv://kartikeya2122008_db_user:XIpjPCfVNzudfLmO@cluster0.tipdh27.mongodb.net/?appName=Cluster0

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});