const { income, incomes, totalIncome, monthlyIncome } = require("../services/income.service")

async function addIncome(req, res) {
    const { amount, category, description, date } = req.body;

    console.log(category);

    try {
        const newIncome = await income(req.user.id, amount, category, description, date);
        res.json({ message: "Income added", income: newIncome });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function getIncomes(req, res) {
    try {
        const incomes = await totalIncome(req.user.id);
        res.json(incomes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function getIncomeList(req, res) {
    try {
        const incomeList = await incomes(req.user.id); // userId from auth middleware
        res.json(incomeList);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function getMonthlyIncome(req, res) {
    try {
        // Get the first and last day of the current month
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

        const total = await monthlyIncome(req.user.id);
        console.log(total);
        res.json({ total });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    addIncome,
    getIncomes,
    getIncomeList,
    getMonthlyIncome
}