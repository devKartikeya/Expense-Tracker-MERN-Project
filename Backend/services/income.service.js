const mongoose = require("mongoose");
const Income = require("../models/income.model");

async function income(userId, amount, category, description, date) {
    const newIncome = await Income.create({
        userId,
        amount,
        category,
        description,
        date: date ? date : undefined
    });
    return newIncome;
}

async function incomes(userId) {
    const incomeList = await Income.find({ userId });
    return incomeList;
}

async function totalIncome(userId) {
    const total = await Income.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(userId) } },
        { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
    ]);
    return total[0] ? total[0].totalAmount : 0;
}

async function monthlyIncome(userId) {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    const total = await Income.aggregate([
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
}

module.exports = {
    income,
    incomes,
    totalIncome,
    monthlyIncome
}