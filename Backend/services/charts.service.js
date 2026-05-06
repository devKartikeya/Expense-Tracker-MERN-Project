const mongoose = require("mongoose");
const Expense = require("../models/expenses.model");

async function expensesByCategory(userId) {
    const result = await Expense.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(userId) } },
        { $group: { _id: "$category", totalAmount: { $sum: "$amount" } } }
    ]);
    return result.map(r => ({ category: r._id, totalAmount: r.totalAmount }));
}

async function monthlyTotals(userId) {
    const result = await Expense.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(userId) } },
        {
            $group: {
                _id: { $month: "$date" },
                total: { $sum: "$amount" }
            }
        },
        { $sort: { "_id": 1 } }
    ]);
    return result.map(r => ({ month: r._id, total: r.total }));
}

async function dailyExpenses(userId) {
    const result = await Expense.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(userId) } },
        {
            $group: {
                _id: { $dayOfMonth: "$date" },
                total: { $sum: "$amount" }
            }
        },
        { $sort: { "_id": 1 } }
    ]);
    return result.map(r => ({ day: r._id, total: r.total }));
}

module.exports = { expensesByCategory, monthlyTotals, dailyExpenses };