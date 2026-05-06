const mongoose = require('mongoose');
const Expense = require('../models/expenses.model');

async function expense(userId, amount, category, description, date) {
    const newExpense = await Expense.create({
        userId,
        amount,
        category,
        description,
        date: date ? date : undefined
    });
    return newExpense;
}

async function expenses(userId) {
    const expenseList = await Expense.find({ userId });
    return expenseList;
}

module.exports = { expense, expenses };