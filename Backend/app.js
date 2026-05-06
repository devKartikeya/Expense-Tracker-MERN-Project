const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/db');
const User = require('./models/users.model');
const Expense = require('./models/expenses.model');
const { checkSignUp, checkLogin } = require('./middlewares/auth.middleware');
const { authRegister, authLogin, authCheckUser, authCheckLogin, authLogout } = require('./controllers/auth.controller');
const { addExpense, getExpenses } = require('./controllers/expense.controller');
const { getTotalExpenses, getMonthlyExpenses, getTopCategory } = require('./controllers/services.controller');

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/auth/check", checkLogin, authCheckLogin);
app.post('/signup', checkSignUp, authRegister);
app.post('/login', authLogin);
app.post('/check-username', async (req, res) => {
    const { username } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            res.json({ message: 'Username is already taken', flag: 'failure', exists: true });
        } else {
            res.json({ message: 'Username is available', flag: 'success', exists: false });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error checking username availability' });
    }
});
app.post("/logout", authLogout);
app.post("/expenses", checkLogin, addExpense);
app.get("/expenses", checkLogin, getExpenses);
app.get("/total-expenses", checkLogin, getTotalExpenses);
app.get("/monthly-expenses", checkLogin, getMonthlyExpenses);
app.get("/top-category", checkLogin, getTopCategory);



// XIpjPCfVNzudfLmO
// mongodb+srv://kartikeya2122008_db_user:XIpjPCfVNzudfLmO@cluster0.tipdh27.mongodb.net/?appName=Cluster0

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});