const { totalExpenses, monthlyExpenses, topCategory } = require('../services/services.service');

async function getTotalExpenses(req, res) {
    try {
        const total = await totalExpenses(req.user.id);
        res.json({ total });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};

async function getMonthlyExpenses(req, res) {
    try {
        // Get the first and last day of the current month
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

        const total = await monthlyExpenses(req.user.id);
        res.json({ total });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

async function getTopCategory(req, res) {
    try {
        const category = await topCategory(req.user.id);
        res.json(category);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getTotalExpenses, getMonthlyExpenses, getTopCategory };