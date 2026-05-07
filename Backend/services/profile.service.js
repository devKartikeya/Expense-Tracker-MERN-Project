const User = require("../models/users.model");
const Expense = require("../models/expenses.model");

const profileData = async (userID) => {
    const user = await User.findById(userID);
    if (!user) throw new Error("User not found");

    // Joined date
    const joinedAt = user.joinedAt;

    // All expenses
    const expenses = await Expense.find({ userId: userID });

    // Total expenses
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

    // Monthly totals (current month)
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    const monthlyExpenses = expenses
        .filter(e => {
            const d = new Date(e.date);
            return d.getMonth() === month && d.getFullYear() === year;
        })
        .reduce((sum, e) => sum + e.amount, 0);

    // Top category
    const categoryTotals = {};
    expenses.forEach(e => {
        categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
    });
    const topCategory = Object.keys(categoryTotals).length
        ? Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0][0]
        : "N/A";

    return {
        joinedAt,
        totalExpenses,
        monthlyTotals: monthlyExpenses,
        topCategory,
    };
};

module.exports = { profileData };
