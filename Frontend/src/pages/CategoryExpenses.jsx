import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const CategoryExpenses = ({ user }) => {
    const [expenses, setExpenses] = useState([]);
    const [category, setCategory] = useState("");
    const [filteredExpenses, setFilteredExpenses] = useState([]);

    const addLogoToPDF = async (doc) => {
        const img = await fetch("/xpense-logo.png")
            .then(res => res.blob())
            .then(blob => new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(blob);
            }));
        doc.addImage(img, "PNG", 14, 10, 20, 20);
    };

    useEffect(() => {
        fetch("https://expense-tracker-mern-project-g2yt.onrender.com/expenses", { credentials: "include" })
            .then((res) => res.json())
            .then((data) => {
                // Sort newest → oldest
                const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setExpenses(sorted);
            })
            .catch((err) => console.error("Error fetching expenses:", err));
    }, []);

    // 🔹 Filter by category whenever input changes
    // 🔹 Filter by category whenever input changes
    useEffect(() => {
        if (category.trim() === "") {
            setFilteredExpenses([]);
        } else {
            const filtered = expenses.filter(
                (exp) => exp.category.toLowerCase().includes(category.toLowerCase())
            );
            setFilteredExpenses(filtered);
        }
    }, [category, expenses]);


    // 🔹 Print
    const handlePrint = () => window.print();

    // 🔹 Export to PDF
    const exportToPDF = async () => {
        const doc = new jsPDF();
        const isMobile = window.innerWidth < 768;
        await addLogoToPDF(doc);

        doc.setFontSize(isMobile ? 12 : 16);
        doc.text(`Xpense Tracker – ${category} Expenses`, isMobile ? 14 : 40, isMobile ? 40 : 20);

        autoTable(doc, {
            head: [["Amount", "Category", "Description", "Date"]],
            body: filteredExpenses.map((exp) => [
                `₹${exp.amount}`,
                exp.category,
                exp.description || "-",
                new Date(exp.date).toLocaleDateString(),
            ]),
            margin: { top: isMobile ? 55 : 40 },
        });

        autoTable(doc, {
            body: [["Total", "", "", `₹${filteredExpenses.reduce((sum, e) => sum + e.amount, 0)}`]],
            theme: "plain",
            styles: { fontStyle: "bold", halign: "right" },
            margin: { top: 10 },
        });

        doc.save(`${category}-expenses-report.pdf`);
    };

    // 🔹 Export to Excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            filteredExpenses.map((exp) => ({
                Amount: exp.amount,
                Category: exp.category,
                Description: exp.description,
                Date: new Date(exp.date).toLocaleDateString(),
            }))
        );
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, `${category} Expenses`);
        XLSX.writeFile(workbook, `${category}-expenses-report.xlsx`);
    };

    return (
        <div id="category-expenses" className="w-screen min-h-screen bg-blue-600">
            <Navbar username={user.username} className="print:hidden" />
            <div className="p-6">
                {/* Input Field */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Enter category name..."
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full sm:w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Header + Buttons */}
                {category && (
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4 print:hidden">
                        <h1 className="text-xl sm:text-2xl font-bold text-white">
                            {category} Expenses
                        </h1>
                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                            <button onClick={handlePrint} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md">Print</button>
                            <button onClick={exportToPDF} className="flex-1 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md">PDF</button>
                            <button onClick={exportToExcel} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg shadow-md">Excel</button>
                        </div>
                    </div>
                )}

                {/* Table */}
                <div className="bg-white rounded-lg shadow-md overflow-x-auto print:shadow-none print:bg-transparent">
                    <table className="w-full border-collapse min-w-[600px] print:min-w-full">
                        <thead className="bg-blue-800 text-white print:bg-gray-200 print:text-black">
                            <tr>
                                <th className="py-3 px-4 text-left">Amount</th>
                                <th className="py-3 px-4 text-left">Category</th>
                                <th className="py-3 px-4 text-left">Description</th>
                                <th className="py-3 px-4 text-left">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredExpenses.length > 0 ? (
                                filteredExpenses.map((exp) => (
                                    <tr key={exp._id} className="border-b border-gray-300 hover:bg-blue-50 transition">
                                        <td className="py-3 px-4 font-semibold">₹{exp.amount}</td>
                                        <td className="py-3 px-4">{exp.category}</td>
                                        <td className="py-3 px-4">{exp.description}</td>
                                        <td className="py-3 px-4">{new Date(exp.date).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="py-6 text-center text-gray-500 font-medium">
                                        {category ? `No expenses found for ${category}.` : "Enter a category to view expenses."}
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

export default CategoryExpenses;
