import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const Expenses = ({ user }) => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/expenses", { credentials: "include" })
            .then((res) => res.json())
            .then((data) => setExpenses(data))
            .catch((err) => console.error("Error fetching expenses:", err));
    }, []);

    return (
        <div id="expenses-list" className="w-screen h-screen bg-blue-600">
            <Navbar username={user.username} />

            <div className="p-6">
                <h1 className="text-2xl font-bold text-white mb-4">All Expenses</h1>

                <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                    <table className="w-full border-collapse min-w-[600px]">
                        <thead className="bg-blue-800 text-white">
                            <tr>
                                <th className="py-3 px-4 text-left text-sm md:text-base">Amount</th>
                                <th className="py-3 px-4 text-left text-sm md:text-base">Category</th>
                                <th className="py-3 px-4 text-left text-sm md:text-base">Description</th>
                                <th className="py-3 px-4 text-left text-sm md:text-base">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.length > 0 ? (
                                expenses.map((exp) => (
                                    <tr key={exp._id} className="border-b border-gray-300 hover:bg-blue-50 transition">
                                        <td className="py-3 px-4 font-semibold text-sm md:text-base">₹{exp.amount}</td>
                                        <td className="py-3 px-4 text-sm md:text-base">{exp.category}</td>
                                        <td className="py-3 px-4 text-sm md:text-base">{exp.description}</td>
                                        <td className="py-3 px-4 text-sm md:text-base">
                                            {new Date(exp.date).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="py-6 text-center text-gray-500 font-medium">
                                        No expenses found.
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

export default Expenses;
