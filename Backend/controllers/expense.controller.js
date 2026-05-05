const { expense, expenses } = require("../services/expense.service");

async function addExpense(req, res) {
    const { amount, category, description, date } = req.body;

    try {
        const newExpense = await expense(req.user.id, amount, category, description, date);
        res.json({ message: "Expense added", expense: newExpense });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function getExpenses(req, res) {
    try {
        const expenseList = await expenses(req.user.id);
        res.json(expenseList);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


module.exports = { addExpense, getExpenses };