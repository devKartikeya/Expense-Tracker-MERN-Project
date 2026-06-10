// src/pages/AdminX.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { useCategories } from "../categories"; // dynamic icons

const AdminX = () => {
    const { username } = useParams();
    const [transactions, setTransactions] = useState([]);
    const [expanded, setExpanded] = useState(null);

    const { categoryIcons } = useCategories();

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const res = await fetch(`https://expense-tracker-mern-project-g2yt.onrender.com/admin/users/${username}/records`, {
                    credentials: "include",
                });
                const data = await res.json();
                if (data.flag === "success") {
                    // Combine expenses + incomes into one array
                    const combined = [
                        ...data.data.expenses.map((e) => ({ ...e, type: "expense" })),
                        ...data.data.incomes.map((i) => ({ ...i, type: "income" })),
                    ];
                    // Sort by date (latest first)
                    combined.sort((a, b) => new Date(b.date) - new Date(a.date));
                    setTransactions(combined);
                }
            } catch (err) {
                console.error("Error fetching records:", err);
            }
        };
        fetchRecords();
    }, [username]);

    // Group by date
    const groupedArray = transactions.reduce((acc, t) => {
        const dateKey = new Date(t.date).toLocaleDateString();
        let group = acc.find((g) => g.date === dateKey);
        if (!group) {
            group = { date: dateKey, items: [] };
            acc.push(group);
        }
        group.items.push(t);
        return acc;
    }, []);

    return (
        <div id="admin-x" className="w-screen min-h-screen bg-black text-white p-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-8">
                Ledger for <span className="text-pink-400">{username}</span>
            </h1>

            <div className="bg-black/70 backdrop-blur-xl rounded-lg shadow-neon overflow-x-auto border border-pink-500/30">
                <table className="w-full border-collapse min-w-[600px]">
                    <thead className="bg-gradient-to-r from-pink-600 to-purple-700 text-white">
                        <tr>
                            <th className="py-3 px-4 text-left">Amount</th>
                            <th className="py-3 px-4 text-left">Type</th>
                            <th className="py-3 px-4 text-left">Category</th>
                            <th className="py-3 px-4 text-left">Description</th>
                            <th className="py-3 px-4 text-left">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groupedArray.length > 0 ? (
                            groupedArray.map((day, idx) => {
                                const net = day.items.reduce(
                                    (sum, t) => sum + (t.type === "income" ? t.amount : -t.amount),
                                    0
                                );

                                return (
                                    <React.Fragment key={idx}>
                                        {/* Summary Row */}
                                        <tr
                                            className="border-b border-pink-500/30 bg-purple-900/40 cursor-pointer hover:bg-purple-800/50 transition"
                                            onClick={() => setExpanded(expanded === idx ? null : idx)}
                                        >
                                            <td
                                                className={`py-3 px-4 font-bold flex items-center gap-2 ${net >= 0 ? "text-green-400" : "text-red-400"
                                                    }`}
                                            >
                                                {expanded === idx ? <FaChevronDown /> : <FaChevronRight />}
                                                {net >= 0 ? `+₹${net}` : `-₹${Math.abs(net)}`}
                                            </td>
                                            <td className="py-3 px-4">—</td>
                                            <td className="py-3 px-4">—</td>
                                            <td className="py-3 px-4">—</td>
                                            <td className="py-3 px-4 font-semibold text-white">{day.date}</td>
                                        </tr>

                                        {/* Expanded Details */}
                                        {expanded === idx &&
                                            day.items.map((t) => (
                                                <tr
                                                    key={t._id}
                                                    className="border-b border-gray-700 bg-black/60 hover:bg-black/80 transition"
                                                >
                                                    <td
                                                        className={`py-2 px-8 font-semibold ${t.type === "income" ? "text-green-400" : "text-red-400"
                                                            }`}
                                                    >
                                                        {t.type === "income" ? `+₹${t.amount}` : `-₹${t.amount}`}
                                                    </td>
                                                    <td
                                                        className={`py-2 px-8 capitalize font-semibold ${t.type === "income" ? "text-green-400" : "text-red-400"
                                                            }`}
                                                    >
                                                        {t.type}
                                                    </td>
                                                    <td className="py-2 px-4 flex items-center gap-2 text-white font-medium">
                                                        {categoryIcons[t.category] || null}
                                                        {t.category}
                                                    </td>
                                                    <td className="py-2 px-4 text-gray-300">{t.description || "-"}</td>
                                                    <td className="py-2 px-4 text-gray-400">
                                                        {new Date(t.date).toLocaleTimeString()}
                                                    </td>
                                                </tr>
                                            ))}
                                    </React.Fragment>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="5" className="py-6 text-center text-gray-400 font-medium">
                                    No records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminX;