const { expensesByCategory, monthlyTotals, dailyExpenses } = require("../services/charts.service");

async function getExpensesByCategory(req, res) {
    const data = await expensesByCategory(req.user.id);
    res.json(data);
}

async function getMonthlyTotals(req, res) {
    const data = await monthlyTotals(req.user.id);
    res.json(data);
}

async function getDailyExpenses(req, res) {
    const data = await dailyExpenses(req.user.id);
    res.json(data);
}

module.exports = { getExpensesByCategory, getMonthlyTotals, getDailyExpenses };