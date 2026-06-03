import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { useCategories } from "../categories"; // ✅ dynamic categories + icons

const MonthlyExpenses = ({ user }) => {
  const [expenses, setExpenses] = useState([]);
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

        // Group by date
        const grouped = filtered.reduce((acc, exp) => {
          const dateKey = new Date(exp.date).toLocaleDateString();
          if (!acc[dateKey]) {
            acc[dateKey] = { date: dateKey, total: 0, items: [] };
          }
          acc[dateKey].total += exp.amount;
          acc[dateKey].items.push(exp);
          return acc;
        }, {});

        setExpenses(Object.values(grouped));
      })
      .catch((err) => console.error("Error fetching expenses:", err));
  }, []);

  // Print
  const handlePrint = () => window.print();

  // Export to PDF
  const exportToPDF = async () => {
    const doc = new jsPDF();
    const isMobile = window.innerWidth < 768;
    await addLogoToPDF(doc);

    doc.setFontSize(isMobile ? 12 : 16);
    doc.text("Xpense Tracker – Monthly Report", isMobile ? 14 : 40, isMobile ? 40 : 20);
    doc.setFontSize(isMobile ? 8 : 10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, isMobile ? 14 : 40, isMobile ? 48 : 28);

    autoTable(doc, {
      head: [["Amount", "Category", "Description", "Date"]],
      body: expenses.flatMap((day) =>
        day.items.map((exp) => [
          `₹${exp.amount}`,
          exp.category,
          exp.description || "-",
          new Date(exp.date).toLocaleDateString(),
        ])
      ),
      margin: { top: isMobile ? 55 : 40 },
    });

    autoTable(doc, {
      body: [["Total", "", "", `₹${expenses.reduce((sum, d) => sum + d.total, 0)}`]],
      theme: "plain",
      styles: { fontStyle: "bold", halign: "right", fontSize: isMobile ? 8 : 10 },
      margin: { top: 10 },
    });

    doc.save("monthly-expenses-report.pdf");
  };

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      expenses.flatMap((day) =>
        day.items.map((exp) => ({
          Amount: exp.amount,
          Category: exp.category,
          Description: exp.description,
          Date: new Date(exp.date).toLocaleDateString(),
        }))
      )
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Monthly Expenses");
    XLSX.writeFile(workbook, "monthly-expenses-report.xlsx");
  };

  const goToExpenses = () => navigate("/expenses");

  return (
    <div id="monthly-expenses" className="w-screen min-h-screen bg-black pt-[100px]">
      <Navbar username={user.username} className="print:hidden" />

      <div className="p-6">
        {/* Header + Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 print:hidden gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-white">Current Month Expenses</h1>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button onClick={handlePrint} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md cursor-pointer">Print</button>
            <button onClick={exportToPDF} className="flex-1 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md cursor-pointer">PDF</button>
            <button onClick={exportToExcel} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg shadow-md cursor-pointer">Excel</button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md overflow-x-auto print:shadow-none print:bg-transparent">
          <table className="w-full border-collapse min-w-[600px] print:min-w-full">
            <thead className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white print:bg-gray-200 print:text-black">
              <tr>
                <th className="py-3 px-4 text-left">Amount</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length > 0 ? (
                expenses.map((day, idx) => (
                  <React.Fragment key={idx}>
                    {/* Summary Row */}
                    <tr
                      className="border-b border-gray-300 bg-blue-100 cursor-pointer hover:bg-blue-200 transition"
                      onClick={() => setExpanded(expanded === idx ? null : idx)}
                    >
                      <td className="py-3 px-4 font-bold text-blue-900 flex items-center gap-2">
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
                      day.items.map((exp) => (
                        <tr key={exp._id} className="border-b border-gray-200 bg-white hover:bg-gray-50">
                          <td className="py-2 px-8">₹{exp.amount}</td>
                          <td className="py-2 px-4 flex items-center gap-2">
                            {categoryIcons[exp.category] || null}
                            {exp.category}
                          </td>
                          <td className="py-2 px-4">{exp.description || "-"}</td>
                          <td className="py-2 px-4 text-gray-600">{new Date(exp.date).toLocaleTimeString()}</td>
                        </tr>
                      ))}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-6 text-center text-gray-500 font-medium">
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
