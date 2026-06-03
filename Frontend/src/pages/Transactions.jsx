import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import TransactionCharts from "../components/TransactionCharts";
import TransactionSummary from "../components/TransactionSummary";
import { useCategories } from "../categories"; // ✅ fetch categories + icons

const Transactions = ({ user }) => {
    const [transactions, setTransactions] = useState([]);
    const [expanded, setExpanded] = useState(null);
    const [budget, setBudget] = useState(0);
    const [filter, setFilter] = useState("month"); // default filter
    const navigate = useNavigate();

    const { categoryIcons } = useCategories(); // ✅ dynamic icons


    const addLogoToPDF = async (doc) => {
        const img = await fetch("/xpense-logo.png")
            .then((res) => res.blob())
            .then(
                (blob) =>
                    new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result);
                        reader.readAsDataURL(blob);
                    })
            );
        doc.addImage(img, "PNG", 14, 10, 20, 20);
    };

    useEffect(() => {
        Promise.all([
            fetch("https://expense-tracker-mern-project-g2yt.onrender.com/expenses", { credentials: "include" }).then((res) => res.json()),
            fetch("https://expense-tracker-mern-project-g2yt.onrender.com/income", { credentials: "include" }).then((res) => res.json()),
            fetch("https://expense-tracker-mern-project-g2yt.onrender.com/profile", { credentials: "include" }).then((res) => res.json()) // ✅ fetch user profile
        ])
            .then(([expenses, income, profile]) => {
                const expData = expenses.map((e) => ({ ...e, type: "expense" }));
                const incData = income.map((i) => ({ ...i, type: "income" }));
                const combined = [...expData, ...incData].sort(
                    (a, b) => new Date(b.date) - new Date(a.date)
                );
                setTransactions(combined);
                setBudget(profile.monthlyBudget || 0); // store budget 
            })
            .catch((err) => console.error("Error fetching transactions:", err));
    }, []);

    // Filter logic
    const applyFilter = (data) => {
        const now = new Date();
        if (filter === "month") {
            return data.filter((t) => {
                const d = new Date(t.date);
                return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
            });
        } else if (filter === "2months") {
            const cutoff = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            return data.filter((t) => new Date(t.date) >= cutoff);
        } else if (filter === "6months") {
            const cutoff = new Date(now.getFullYear(), now.getMonth() - 5, 1);
            return data.filter((t) => new Date(t.date) >= cutoff);
        } else if (filter === "year") {
            const cutoff = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
            return data.filter((t) => new Date(t.date) >= cutoff);
        }
        return data; // all
    };

    const filteredTransactions = applyFilter(transactions);

    // Group by date
    const grouped = filteredTransactions.reduce((acc, t) => {
        const dateKey = new Date(t.date).toLocaleDateString();
        if (!acc[dateKey]) {
            acc[dateKey] = { date: dateKey, items: [] };
        }
        acc[dateKey].items.push(t);
        return acc;
    }, {});

    const groupedArray = Object.values(grouped);

    // Print
    const handlePrint = () => window.print();

    // Export to PDF
    const exportToPDF = async () => {
        const doc = new jsPDF();
        const isMobile = window.innerWidth < 768;
        await addLogoToPDF(doc);

        doc.setFontSize(isMobile ? 12 : 16);
        doc.text("Xpense Tracker – Transactions Report", isMobile ? 14 : 40, isMobile ? 40 : 20);
        doc.setFontSize(isMobile ? 8 : 10);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, isMobile ? 14 : 40, isMobile ? 48 : 28);

        autoTable(doc, {
            head: [["Amount", "Type", "Category", "Description", "Date"]],
            body: filteredTransactions.map((t) => [
                t.type === "income" ? `+₹${t.amount}` : `-₹${t.amount}`,
                t.type,
                t.category,
                t.description || "-",
                new Date(t.date).toLocaleDateString(),
            ]),
            margin: { top: isMobile ? 55 : 40 },
        });

        doc.save("transactions-report.pdf");
    };

    // Export to Excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            filteredTransactions.map((t) => ({
                Amount: t.type === "income" ? `+${t.amount}` : `-${t.amount}`,
                Type: t.type,
                Category: t.category,
                Description: t.description,
                Date: new Date(t.date).toLocaleDateString(),
            }))
        );
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
        XLSX.writeFile(workbook, "transactions-report.xlsx");
    };

    return (
        <div id="transactions" className="w-screen min-h-screen bg-black pt-[100px] px-4 mt-4">
            <Navbar username={user.username} className="print:hidden" />

            <div className="flex flex-col sm:flex-row justify-between items-center print:hidden gap-3">
                <h1 className="text-xl sm:text-2xl font-bold mx-5 sm:mt-4 text-white">Transactions</h1>
                <div className="flex gap-2 sm:mt-4 mx-4">
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-3 py-2 font-semibold  rounded-xl border cursor-pointer border-gray-300 text-black bg-white"
                    >
                        <option value="all">All Time</option>
                        <option value="month">Current Month</option>
                        <option value="2months">Last 2 Months</option>
                        <option value="6months">Last 6 Months</option>
                        <option value="year">Last Year</option>
                    </select>
                </div>
            </div>

            <TransactionSummary transactions={filteredTransactions} budget={budget} />

            <div className="border border-purple-500/50 my-9"></div>
            <TransactionCharts transactions={filteredTransactions} />

            <div className="border border-purple-500/50 my-9"></div>

            <div className="p-6">
                {/* Header + Filters + Actions */}
                <div className="flex flex-col sm:flex-row justify-center items-center mb-10 print:hidden gap-4">
                    <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
                        <button onClick={handlePrint} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md cursor-pointer">Print</button>
                        <button onClick={exportToPDF} className="flex-1 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md cursor-pointer">PDF</button>
                        <button onClick={exportToExcel} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 cursor-pointer rounded-lg shadow-md">Excel</button>
                    </div>
                </div>

                {/* Table */}
                <h1 className="text-xl sm:text-2xl font-bold text-white p-2 my-2">Ledger Table</h1>
                <div className="bg-white rounded-lg shadow-md overflow-x-auto print:shadow-none print:bg-transparent">
                    <table className="w-full border-collapse min-w-[600px] print:min-w-full">
                        <thead className="bg-gray-900 text-white print:bg-gray-200 print:text-black">
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
                                    // Calculate net balance for the day
                                    const net = day.items.reduce((sum, t) => {
                                        return sum + (t.type === "income" ? t.amount : -t.amount);
                                    }, 0);

                                    return (
                                        <React.Fragment key={idx}>
                                            {/* Summary Row */}
                                            <tr
                                                className="border-b border-gray-300 bg-gray-100 cursor-pointer hover:bg-gray-200 transition"
                                                onClick={() => setExpanded(expanded === idx ? null : idx)}
                                            >
                                                {/* Amount column → net profit/loss */}
                                                <td
                                                    className={`py-3 px-4 font-bold flex items-center gap-2 ${net >= 0 ? "text-green-600" : "text-red-600"
                                                        }`}
                                                >
                                                    {expanded === idx ? (
                                                        <FaChevronDown className="transition-transform duration-300" />
                                                    ) : (
                                                        <FaChevronRight className="transition-transform duration-300" />
                                                    )}
                                                    {net >= 0 ? `+₹${net}` : `-₹${Math.abs(net)}`}
                                                </td>

                                                {/* Type column → just a dash */}
                                                <td className="py-3 px-4">—</td>

                                                {/* Category column → dash */}
                                                <td className="py-3 px-4">—</td>

                                                {/* Description column → dash */}
                                                <td className="py-3 px-4">—</td>

                                                {/* Date column → summary date */}
                                                <td className="py-3 px-4 font-semibold">{day.date}</td>
                                            </tr>

                                            {/* Expanded Details */}
                                            {expanded === idx &&
                                                day.items.map((t) => (
                                                    <tr
                                                        key={t._id}
                                                        className="border-b border-gray-200 bg-white hover:bg-gray-50"
                                                    >
                                                        <td
                                                            className={`py-2 px-8 font-semibold ${t.type === "income" ? "text-green-600" : "text-red-600"
                                                                }`}
                                                        >
                                                            {t.type === "income" ? `+₹${t.amount}` : `-₹${t.amount}`}
                                                        </td>
                                                        <td className={`py-2 px-8 font-semibold capitalize ${t.type === "income" ? "text-green-600" : "text-red-600"
                                                            }`}>{t.type}</td>
                                                        {/* <td className="py-2 px-4">{t.category}</td> */}
                                                        <td className="py-6 px-4 flex items-center gap-2 font-medium">
                                                            {categoryIcons[t.category] || null}
                                                            {t.category}
                                                        </td>
                                                        <td className="py-2 px-4">{t.description || "-"}</td>
                                                        <td className="py-2 px-4 text-gray-600">
                                                            {new Date(t.date).toLocaleTimeString()}
                                                        </td>
                                                    </tr>
                                                ))}
                                        </React.Fragment>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="5" className="py-6 text-center text-gray-500 font-medium">
                                        No transactions found for this filter.
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

export default Transactions;