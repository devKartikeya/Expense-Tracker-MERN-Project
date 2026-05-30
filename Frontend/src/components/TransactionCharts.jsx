import React from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
} from "chart.js";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title
);

const TransactionCharts = ({ transactions }) => {
    const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const netBalance = totalIncome - totalExpenses;

    // Daily totals
    const dailyMap = {};
    transactions.forEach((t) => {
        const dateKey = new Date(t.date).toLocaleDateString();
        if (!dailyMap[dateKey]) dailyMap[dateKey] = { income: 0, expense: 0 };
        if (t.type === "income") dailyMap[dateKey].income += t.amount;
        else dailyMap[dateKey].expense += t.amount;
    });

    const labels = Object.keys(dailyMap);
    const incomeData = labels.map((d) => dailyMap[d].income);
    const expenseData = labels.map((d) => dailyMap[d].expense);
    const netData = labels.map((d) => dailyMap[d].income - dailyMap[d].expense);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 px-2">
            {/* Pie Chart */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-2">Income vs Expenses</h2>
                <div className="h-48"> {/* ✅ shorter height */}
                    <Pie
                        data={{
                            labels: ["Income", "Expenses"],
                            datasets: [
                                {
                                    data: [totalIncome, totalExpenses],
                                    backgroundColor: ["#22c55e", "#ef4444"],
                                },
                            ],
                        }}
                        options={{ maintainAspectRatio: false }}
                    />
                </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-2">Daily Totals</h2>
                <div className="h-48"> {/* ✅ shorter height */}
                    <Bar
                        data={{
                            labels,
                            datasets: [
                                { label: "Income", data: incomeData, backgroundColor: "#22c55e" },
                                { label: "Expenses", data: expenseData, backgroundColor: "#ef4444" },
                            ],
                        }}
                        options={{ maintainAspectRatio: false }}
                    />
                </div>
            </div>

            {/* Line Chart */}
            <div className="bg-white p-4 rounded-lg shadow-md md:col-span-2">
                <h2 className="text-lg font-bold mb-2">Net Balance Trend</h2>
                <div className="h-56"> {/* ✅ slightly taller but still compact */}
                    <Line
                        data={{
                            labels,
                            datasets: [
                                {
                                    label: "Net Balance",
                                    data: netData,
                                    borderColor: netBalance >= 0 ? "#22c55e" : "#ef4444",
                                    backgroundColor: netBalance >= 0 ? "#bbf7d0" : "#fecaca",
                                    fill: true,
                                },
                            ],
                        }}
                        options={{ maintainAspectRatio: false }}
                    />
                </div>
            </div>
        </div>
    );
};

export default TransactionCharts;