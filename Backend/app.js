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
app.post('/check-email', authCheckUser);
app.post("/logout", authLogout);
app.post("/expenses", checkLogin, addExpense);
app.get("/expenses", checkLogin, getExpenses);

app.get("/total-expenses", checkLogin, async (req, res) => {
    try {
        const total = await Expense.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(req.user.id) } },
            { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
        ]);
        res.json({ total: total[0] ? total[0].totalAmount : 0 });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});


app.get("/monthly-expenses", checkLogin, async (req, res) => {
    try {
        // Get the first and last day of the current month
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

        const total = await Expense.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(req.user.id),
                    date: { $gte: startOfMonth, $lte: endOfMonth }
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$amount" }
                }
            }
        ]);

        res.json({ total: total[0] ? total[0].totalAmount : 0 });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});

app.get("/top-category", checkLogin, async (req, res) => {
    try {
        const result = await Expense.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(req.user.id) } },
            {
                $group: {
                    _id: "$category",
                    totalAmount: { $sum: "$amount" }
                }
            },
            { $sort: { totalAmount: -1 } }, // sort descending
            { $limit: 1 } // only top category
        ]);

        if (result.length > 0) {
            res.json({ category: result[0]._id, amount: result[0].totalAmount });
        } else {
            res.json({ category: null, amount: 0 });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});



// XIpjPCfVNzudfLmO
// mongodb+srv://kartikeya2122008_db_user:XIpjPCfVNzudfLmO@cluster0.tipdh27.mongodb.net/?appName=Cluster0

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});