import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { useCategories } from "../categories"; // ✅ dynamic categories + icons

const Incomes = ({ user }) => {
    const [income, setIncome] = useState([]);
    const [expanded, setExpanded] = useState(null);
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
        fetch("https://expense-tracker-mern-project-g2yt.onrender.com/income", { credentials: "include" })
            .then((res) => res.json())
            .then((data) => {
                const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));

                // Group by date
                const grouped = sorted.reduce((acc, inc) => {
                    const dateKey = new Date(inc.date).toLocaleDateString();
                    if (!acc[dateKey]) {
                        acc[dateKey] = { date: dateKey, total: 0, items: [] };
                    }
                    acc[dateKey].total += inc.amount;
                    acc[dateKey].items.push(inc);
                    return acc;
                }, {});

                setIncome(Object.values(grouped));
            })
            .catch((err) => console.error("Error fetching income:", err));
    }, []);

    // Print
    const handlePrint = () => window.print();

    // Export to PDF
    const exportToPDF = async () => {
        const doc = new jsPDF();
        const isMobile = window.innerWidth < 768;
        await addLogoToPDF(doc);

        doc.setFontSize(isMobile ? 12 : 16);
        doc.text("Xpense Tracker – Income Report", isMobile ? 14 : 40, isMobile ? 40 : 20);
        doc.setFontSize(isMobile ? 8 : 10);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, isMobile ? 14 : 40, isMobile ? 48 : 28);

        autoTable(doc, {
            head: [["Amount", "Category", "Description", "Date"]],
            body: income.flatMap((day) =>
                day.items.map((inc) => [
                    `₹${inc.amount}`,
                    inc.category,
                    inc.description || "-",
                    new Date(inc.date).toLocaleDateString(),
                ])
            ),
            margin: { top: isMobile ? 55 : 40 },
        });

        autoTable(doc, {
            body: [["Total", "", "", `₹${income.reduce((sum, d) => sum + d.total, 0)}`]],
            theme: "plain",
            styles: { fontStyle: "bold", halign: "right", fontSize: isMobile ? 8 : 10 },
            margin: { top: 10 },
        });

        doc.save("income-report.pdf");
    };

    // Export to Excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            income.flatMap((day) =>
                day.items.map((inc) => ({
                    Amount: inc.amount,
                    Category: inc.category,
                    Description: inc.description,
                    Date: new Date(inc.date).toLocaleDateString(),
                }))
            )
        );
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Income");
        XLSX.writeFile(workbook, "income-report.xlsx");
    };

    const goToMonthlyIncome = () => navigate("/monthly-incomes");

    return (
        <div id="income-list" className="w-screen min-h-screen bg-green-600 pt-[100px]">
            <Navbar username={user.username} className="print:hidden" />

            <div className="p-6">
                {/* Header + Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 print:hidden gap-4">
                    <h1 className="text-xl sm:text-2xl font-bold text-white">All Income</h1>
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <button onClick={handlePrint} className="flex-1 bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-lg shadow-md">Print</button>
                        <button onClick={exportToPDF} className="flex-1 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md">PDF</button>
                        <button onClick={exportToExcel} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg shadow-md">Excel</button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg shadow-md overflow-x-auto print:shadow-none print:bg-transparent">
                    <table className="w-full border-collapse min-w-[600px] print:min-w-full">
                        <thead className="bg-green-800 text-white print:bg-gray-200 print:text-black">
                            <tr>
                                <th className="py-3 px-4 text-left">Amount</th>
                                <th className="py-3 px-4 text-left">Category</th>
                                <th className="py-3 px-4 text-left">Description</th>
                                <th className="py-3 px-4 text-left">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {income.length > 0 ? (
                                income.map((day, idx) => (
                                    <React.Fragment key={idx}>
                                        {/* Summary Row */}
                                        <tr
                                            className="border-b border-gray-300 bg-green-100 cursor-pointer hover:bg-green-200 transition"
                                            onClick={() => setExpanded(expanded === idx ? null : idx)}
                                        >
                                            <td className="py-3 px-4 font-bold text-green-900 flex items-center gap-2">
                                                {expanded === idx ? (
                                                    <FaChevronDown className="transition-transform duration-300" />
                                                ) : (
                                                    <FaChevronRight className="transition-transform duration-300" />
                                                )}
                                                ₹{day.total}
                                            </td>
                                            <td className="py-3 px-4">—</td>
                                            <td className="py-3 px-4">—</td>
                                            <td className="py-3 px-4 font-semibold">{day.date}</td>
                                        </tr>

                                        {/* Expanded Details */}
                                        {expanded === idx &&
                                            day.items.map((inc) => (
                                                <tr key={inc._id} className="border-b border-gray-200 bg-white hover:bg-gray-50">
                                                    <td className="py-2 px-8">₹{inc.amount}</td>
                                                    <td className="py-2 px-4 flex items-center gap-2">
                                                        {categoryIcons[inc.category] || null}
                                                        {inc.category}
                                                    </td>
                                                    <td className="py-2 px-4">{inc.description || "-"}</td>
                                                    <td className="py-2 px-4 text-gray-600">{new Date(inc.date).toLocaleTimeString()}</td>
                                                </tr>
                                            ))}
                                    </React.Fragment>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="py-6 text-center text-gray-500 font-medium">
                                        No income records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Monthly Button */}
                <div className="flex justify-center mt-6">
                    <button
                        onClick={goToMonthlyIncome}
                        className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md"
                    >
                        Show Monthly Income
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Incomes;