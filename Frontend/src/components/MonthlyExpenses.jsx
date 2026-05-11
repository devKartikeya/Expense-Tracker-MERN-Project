import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const MonthlyExpenses = ({ user }) => {
    const [expenses, setExpenses] = useState([]);
    const navigate = useNavigate();

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
                const now = new Date();
                const currentMonth = now.getMonth();
                const currentYear = now.getFullYear();

                const filtered = data
                    .filter((exp) => {
                        const d = new Date(exp.date);
                        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
                    })
                    .sort((a, b) => new Date(b.date) - new Date(a.date));

                setExpenses(filtered);
            })
            .catch((err) => console.error("Error fetching expenses:", err));
    }, []);

    // 🔹 Print
    const handlePrint = () => {
        window.print();
    };

    // 🔹 Export to PDF
    const exportToPDF = async () => {
        const doc = new jsPDF();
        const isMobile = window.innerWidth < 768;

        await addLogoToPDF(doc);

        if (isMobile) {
            doc.setFontSize(12);
            doc.text("Xpense Tracker – Monthly Report", 14, 40);
            doc.setFontSize(8);
            doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 48);

            autoTable(doc, {
                head: [["Amount", "Category", "Description", "Date"]],
                body: expenses.map((exp) => [
                    `₹${exp.amount}`,
                    exp.category,
                    exp.description || "-",
                    new Date(exp.date).toLocaleDateString(),
                ]),
                margin: { top: 55 },
            });
        } else {
            doc.setFontSize(16);
            doc.text("Xpense Tracker – Monthly Report", 40, 20);
            doc.setFontSize(10);
            doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 40, 28);

            autoTable(doc, {
                head: [["Amount", "Category", "Description", "Date"]],
                body: expenses.map((exp) => [
                    `₹${exp.amount}`,
                    exp.category,
                    exp.description || "-",
                    new Date(exp.date).toLocaleDateString(),
                ]),
                margin: { top: 40 },
            });
        }

        autoTable(doc, {
            body: [
                ["Total", "", "", `₹${expenses.reduce((sum, e) => sum + e.amount, 0)}`],
            ],
            theme: "plain",
            styles: { fontStyle: "bold", halign: "right", fontSize: isMobile ? 8 : 10 },
            margin: { top: 10 },
        });

        doc.save("monthly-expenses-report.pdf");
    };

    // 🔹 Export to Excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            expenses.map((exp) => ({
                Amount: exp.amount,
                Category: exp.category,
                Description: exp.description,
                Date: new Date(exp.date).toLocaleDateString(),
            }))
        );
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Monthly Expenses");
        XLSX.writeFile(workbook, "monthly-expenses-report.xlsx");
    };

    const goToExpenses = () => {
        navigate("/expenses");
    };

    return (
        <div id="monthly-expenses" className="w-screen min-h-screen bg-blue-600">
            <Navbar username={user.username} className="print:hidden" />

            <div className="p-6">
                {/* Header + Buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 print:hidden gap-4">
                    <h1 className="text-xl sm:text-2xl font-bold text-white">
                        Current Month Expenses
                    </h1>
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <button
                            onClick={handlePrint}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md"
                        >
                            Print
                        </button>
                        <button
                            onClick={exportToPDF}
                            className="flex-1 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md"
                        >
                            PDF
                        </button>
                        <button
                            onClick={exportToExcel}
                            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg shadow-md"
                        >
                            Excel
                        </button>
                    </div>
                </div>

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
                            {expenses.length > 0 ? (
                                expenses.map((exp) => (
                                    <tr
                                        key={exp._id}
                                        className="border-b border-gray-300 hover:bg-blue-50 transition"
                                    >
                                        <td className="py-3 px-4 font-semibold">₹{exp.amount}</td>
                                        <td className="py-3 px-4">{exp.category}</td>
                                        <td className="py-3 px-4">{exp.description}</td>
                                        <td className="py-3 px-4">
                                            {new Date(exp.date).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="py-6 text-center text-gray-500 font-medium"
                                    >
                                        No expenses found for this month.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Bottom Button */}
                <div className="flex justify-center mt-6">
                    <button
                        onClick={goToExpenses}
                        className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md"
                    >
                        Show All Expenses
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MonthlyExpenses;
