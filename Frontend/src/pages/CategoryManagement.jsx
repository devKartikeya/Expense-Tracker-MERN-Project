import React, { useEffect, useState } from "react";
import { iconMap } from "../iconMap";

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: "", iconKey: "", color: "" });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("https://expense-tracker-mern-project-g2yt.onrender.com/admin/categories", {
                    method: "GET",
                    credentials: "include",
                });
                const data = await res.json();
                setCategories(data.categories || []);
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        };
        fetchCategories();
    }, []);

    const handleAddCategory = async () => {
        if (!newCategory.name || !newCategory.iconKey || !newCategory.color) return;

        const res = await fetch("https://expense-tracker-mern-project-g2yt.onrender.com/admin/categories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(newCategory),
        });
        const data = await res.json();
        setCategories([...categories, data.category]);
        setShowModal(false); // close modal after save
        setNewCategory({ name: "", iconKey: "", color: "" }); // reset form
    };

    const handleDeleteCategory = async (id) => {
        await fetch(`https://expense-tracker-mern-project-g2yt.onrender.com/admin/categories/${id}`, {
            method: "DELETE",
            credentials: "include",
        });
        setCategories(categories.filter((c) => c._id !== id));
    };

    return (
        <section
            id="admin-category"
            className="bg-gray-900/80 backdrop-blur-md rounded-xl p-6 shadow-xl flex flex-col gap-4 border border-gray-700 hover:border-blue-500 transition-all"
        >
            <h2 className="text-2xl font-bold uppercase tracking-wide text-blue-400">
                Category Management
            </h2>

            <button
                onClick={() => setShowModal(true)}
                className="bg-gradient-to-r text-white from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 font-semibold px-4 py-2 rounded-lg w-full shadow-md transition-transform transform hover:scale-105"
            >
                + Add Category
            </button>

            {/* Responsive Table */}
            <div className="overflow-x-auto mt-4">
                <table className="hidden md:table w-full text-sm text-left border border-gray-700 rounded-lg">
                    <thead className="bg-gray-800 text-gray-300 uppercase text-xs">
                        <tr>
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Icon</th>
                            <th className="py-3 px-4">Color</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((c) => (
                            <tr
                                key={c._id}
                                className="border-b border-gray-700 hover:bg-gray-800/50 transition"
                            >
                                <td className="py-3 px-4 font-medium text-lg text-white">{c.name}</td>
                                <td className="py-3 px-4">
                                    {iconMap[c.iconKey] &&
                                        React.createElement(iconMap[c.iconKey], {
                                            className: `${c.color} text-lg`,
                                        })}
                                </td>
                                <td className="py-3 px-4 text-gray-400">{c.color}</td>
                                <td className="py-3 px-4">
                                    <button
                                        onClick={() => handleDeleteCategory(c._id)}
                                        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs font-bold shadow-md transition-transform transform hover:scale-105"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Mobile Card View */}
                <div className="md:hidden flex flex-col gap-3">
                    {categories.map((c) => (
                        <div
                            key={c._id}
                            className="bg-gray-800 rounded-lg p-4 flex justify-between items-center shadow-md border border-gray-700"
                        >
                            <div className="flex items-center gap-3">
                                {iconMap[c.iconKey] &&
                                    React.createElement(iconMap[c.iconKey], {
                                        className: `${c.color} text-xl`,
                                    })}
                                <div>
                                    <p className="font-semibold text-white">{c.name}</p>
                                    <p className="text-xs text-gray-400">{c.color}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDeleteCategory(c._id)}
                                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs font-bold shadow-md"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-gray-800 rounded-xl shadow-lg p-6 w-[90%] md:w-[400px]">
                        <h2 className="text-xl font-bold text-white mb-4">Add New Category</h2>

                        <input
                            type="text"
                            placeholder="Category Name"
                            value={newCategory.name}
                            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                            className="w-full mb-3 px-3 py-2 rounded bg-gray-700 text-white"
                        />

                        <input
                            type="text"
                            placeholder="Icon Key (e.g., FaUtensils)"
                            value={newCategory.iconKey}
                            onChange={(e) => setNewCategory({ ...newCategory, iconKey: e.target.value })}
                            className="w-full mb-3 px-3 py-2 rounded bg-gray-700 text-white"
                        />

                        <input
                            type="text"
                            placeholder="Tailwind Color (e.g., text-blue-500)"
                            value={newCategory.color}
                            onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                            className="w-full mb-3 px-3 py-2 rounded bg-gray-700 text-white"
                        />

                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 text-white"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddCategory}
                                className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white font-semibold"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </section>
    );
};

export default CategoryManagement;
