const mongoose = require('mongoose');
const Expense = require('../models/expenses.model');

async function totalExpenses(userId) {
    const total = await Expense.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(userId) } },
        { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
    ]);
    return total[0] ? total[0].totalAmount : 0;
};

async function monthlyExpenses(userId) {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    const total = await Expense.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(userId),
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

    return total[0] ? total[0].totalAmount : 0;
}; 

async function topCategory(userId) {
    const result = await Expense.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(userId) } },
        {
            $group: {
                _id: "$category",
                totalAmount: { $sum: "$amount" }
            }
        },
        { $sort: { totalAmount: -1 } },
        { $limit: 1 }
    ]);

    return result.length > 0 ? { category: String(result[0]._id), amount: result[0].totalAmount } : { category: null, amount: 0 };
};

async function expensesCount(userId) {
    const count = await Expense.countDocuments({ userId: new mongoose.Types.ObjectId(userId) });
    return count;
}

module.exports = { totalExpenses, monthlyExpenses, topCategory, expensesCount };