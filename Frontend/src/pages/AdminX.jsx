import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AdminX = () => {
    const { username } = useParams();
    const [records, setRecords] = useState({ expenses: [], incomes: [] });

    useEffect(() => {
        const fetchRecords = async () => {
            const res = await fetch(`https://expense-tracker-mern-project-g2yt.onrender.com/admin/users/${username}/records`, {
                credentials: "include",
            });
            const data = await res.json();
            console.log(data)
            if (data.flag === "success") {
                setRecords(data.data);
            }
        };
        fetchRecords();
    }, [username]);

    return (
        <div id="admin-x" className="w-screen min-h-screen bg-gray-950 text-white p-6">
            <h1 className="text-2xl font-bold mb-6">Records for {username}</h1>

            {/* Expenses */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-pink-400">Expenses</h2>
                {records.expenses.length === 0 ? (
                    <p className="text-gray-400">No expenses found</p>
                ) : (
                    <table className="w-full border border-gray-700 rounded-lg">
                        <thead className="bg-gray-700 text-gray-300">
                            <tr>
                                <th className="py-2 px-4">Amount</th>
                                <th className="py-2 px-4">Category</th>
                                <th className="py-2 px-4">Description</th>
                                <th className="py-2 px-4">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.expenses.map((exp) => (
                                <tr key={exp._id} className="border-b border-gray-700 hover:bg-gray-800">
                                    <td className="py-2 px-4">₹{exp.amount}</td>
                                    <td className="py-2 px-4">{exp.category}</td>
                                    <td className="py-2 px-4">{exp.description || "-"}</td>
                                    <td className="py-2 px-4">{new Date(exp.date).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>

            {/* Incomes */}
            <section>
                <h2 className="text-xl font-semibold mb-4 text-green-400">Incomes</h2>
                {records.incomes.length === 0 ? (
                    <p className="text-gray-400">No incomes found</p>
                ) : (
                    <table className="w-full border border-gray-700 rounded-lg">
                        <thead className="bg-gray-700 text-gray-300">
                            <tr>
                                <th className="py-2 px-4">Amount</th>
                                <th className="py-2 px-4">Category</th>
                                <th className="py-2 px-4">Description</th>
                                <th className="py-2 px-4">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.incomes.map((inc) => (
                                <tr key={inc._id} className="border-b border-gray-700 hover:bg-gray-800">
                                    <td className="py-2 px-4">₹{inc.amount}</td>
                                    <td className="py-2 px-4">{inc.category}</td>
                                    <td className="py-2 px-4">{inc.description || "-"}</td>
                                    <td className="py-2 px-4">{new Date(inc.date).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        </div>
    );
};

export default AdminX;