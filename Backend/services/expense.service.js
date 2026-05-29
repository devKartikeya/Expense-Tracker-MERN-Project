const mongoose = require('mongoose');
const Expense = require('../models/expenses.model');
const Catgeory = require("../models/category.model")

async function expense(userId, amount, category, description, date) {
    const newExpense = await Expense.create({
        userId,
        amount,
        category,
        description,
        date: date ? date : undefined
    });
    // Check if category exists, if not create it
    const existingCategory = await Catgeory.findOne({ name: category });
    if (!existingCategory) {
        await Catgeory.create({ name: category });
    }
    return newExpense;
}

async function expenses(userId) {
    const expenseList = await Expense.find({ userId });
    return expenseList;
}

module.exports = { expense, expenses };