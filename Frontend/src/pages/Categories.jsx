import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const Categories = ({ user }) => {
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [viewMode, setViewMode] = useState("overall"); // overall or monthly

    useEffect(() => {
        fetch("http://localhost:3000/expenses", { credentials: "include" })
            .then((res) => res.json())
            .then((data) => {
                setExpenses(data);
            })
            .catch((err) => console.error("Error fetching expenses:", err));
    }, []);

    useEffect(() => {
        if (expenses.length === 0) return;

        let filteredData = expenses;

        if (viewMode === "monthly") {
            const now = new Date();
            const currentMonth = now.getMonth();
            const currentYear = now.getFullYear();

            filteredData = expenses.filter((exp) => {
                const d = new Date(exp.date);
                return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
            });
        }

        const categoryTotals = {};
        filteredData.forEach((exp) => {
            if (!categoryTotals[exp.category]) {
                categoryTotals[exp.category] = 0;
            }
            categoryTotals[exp.category] += exp.amount;
        });

        const categoryArray = Object.entries(categoryTotals).map(([cat, total]) => ({
            category: cat,
            total,
        }));

        categoryArray.sort((a, b) => b.total - a.total);
        setCategories(categoryArray);
    }, [viewMode, expenses]);

    // 🔹 Filter categories by search input
    const filteredCategories = categories.filter((c) =>
        c.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div id="categories" className="w-screen min-h-screen bg-blue-600">
            <Navbar username={user.username} className="print:hidden" />

            <div className="p-6">
                {/* Header */}
                <h1 className="text-xl sm:text-2xl font-bold text-white mb-4">
                    Categories Overview
                </h1>

                {/* Controls: Dropdown + Search */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                    <select
                        value={viewMode}
                        onChange={(e) => setViewMode(e.target.value)}
                        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-yellow-300"
                    >
                        <option value="overall">Overall Totals</option>
                        <option value="monthly">Current Month Totals</option>
                    </select>


                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full sm:w-1/2 px-4 py-2 rounded-lg border text-white font-bold bg-green-500 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Categories Table */}
                <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                    <table className="w-full border-collapse min-w-[400px]">
                        <thead className="bg-blue-800 text-white">
                            <tr>
                                <th className="py-3 px-4 text-left">Category</th>
                                <th className="py-3 px-4 text-left">Total Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCategories.length > 0 ? (
                                filteredCategories.map((c) => (
                                    <tr
                                        key={c.category}
                                        className="border-b border-gray-300 hover:bg-blue-50 transition"
                                    >
                                        <td className="py-3 px-4 font-semibold">{c.category}</td>
                                        <td className="py-3 px-4">₹{c.total}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="2"
                                        className="py-6 text-center text-gray-500 font-medium"
                                    >
                                        {search
                                            ? `No categories found for "${search}"`
                                            : "No categories found."}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Categories;
