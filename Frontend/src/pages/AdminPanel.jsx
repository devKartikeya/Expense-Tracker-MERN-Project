import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({ users: 0, expenses: 0 });
    const [users, setUsers] = useState([]);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    // Fetch stats
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch("https://expense-tracker-mern-project-g2yt.onrender.com/admin/dashboard", {
                    method: "GET",
                    credentials: "include",
                });
                const data = await res.json();
                if (data.flag === "success") {
                    setStats({
                        users: data.stats.users,
                        expenses: data.stats.expenses,
                        categories: data.stats.categories,
                    });
                } else {
                    navigate("/admin");
                }
            } catch (err) {
                console.error(err);
                navigate("/admin");
            }
        };
        fetchStats();
    }, [navigate]);

    // Fetch users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("https://expense-tracker-mern-project-g2yt.onrender.com/admin/users", {
                    method: "GET",
                    credentials: "include",
                });
                const data = await res.json();
                setUsers(data.users || []);
            } catch (err) {
                console.error(err);
            }
        };
        fetchUsers();
    }, []);

    const handleDeleteUser = async (id) => {
        await fetch(`https://expense-tracker-mern-project-g2yt.onrender.com/admin/users/${id}`, {
            method: "DELETE",
            credentials: "include",
        });
        setUsers(users.filter((u) => u._id !== id));
    };

    const handleResetPassword = async (id) => {
        await fetch(`https://expense-tracker-mern-project-g2yt.onrender.com/admin/users/${id}/reset-password`, {
            method: "POST",
            credentials: "include",
        });
        alert("Password reset successfully!");
    };

    const confirmLogout = async () => {
        await fetch("https://expense-tracker-mern-project-g2yt.onrender.com/admin/logout", {
            method: "POST",
            credentials: "include",
        });
        navigate("/admin");
    };

    const goToCategoryManagement = () => {
        navigate("/admin-categories");
    }

    return (
        <div id="admin-panel" className="w-screen h-screen bg-gray-950 text-white flex flex-col font-poppins">
            {/* Header */}
            <header className="w-full bg-gradient-to-r bg-black p-5 flex justify-between items-center shadow-xl border-b border-gray-700">
                <h1 className="text-3xl font-bold tracking-wide uppercase">Admin Panel</h1>
                <button
                    onClick={() => setShowLogoutConfirm(true)}
                    className="bg-rose-600 hover:bg-rose-700 px-5 py-2 rounded-lg cursor-pointer font-semibold shadow-md transition-transform transform hover:scale-105"
                >
                    Logout
                </button>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-y-auto">
                {/* Dashboard Overview */}
                <section className="bg-black backdrop-blur-md rounded-xl p-6 shadow-lg border border-gray-700 hover:border-blue-500 transition-all">
                    <h2 className="text-xl font-bold uppercase tracking-wider mb-4">Dashboard</h2>
                    <div className="space-y-3 text-lg">
                        <p className="flex justify-between">
                            <span className="text-gray-400">Total Users</span>
                            <span className="text-blue-400 font-bold">{stats.users}</span>
                        </p>
                        <p className="flex justify-between">
                            <span className="text-gray-400">Total Expenses</span>
                            <span className="text-pink-400 font-bold">{stats.expenses}</span>
                        </p>
                        <p className="flex justify-between">
                            <span className="text-gray-400">Total Categories</span>
                            <span className="text-purple-400 font-bold">{stats.categories}</span>
                        </p>
                    </div>
                    <button className="mt-5 bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-lg w-full font-semibold hover:scale-105 transition-transform">
                        View Analytics
                    </button>
                </section>

                {/* User Management */}
                <section className="bg-black backdrop-blur-md rounded-xl p-6 shadow-lg border border-gray-700 hover:border-pink-500 transition-all lg:col-span-2">
                    <h2 className="text-xl font-bold uppercase tracking-wider mb-4">User Management</h2>
                    <div className="overflow-x-auto">
                        {users.length === 0 ? (
                            <p className="text-gray-400">No users found</p>
                        ) : (
                            <table className="w-full text-sm border border-gray-700 rounded-lg overflow-hidden">
                                <thead className="bg-gray-700 text-gray-300 uppercase text-xs">
                                    <tr>
                                        <th className="py-3 px-4">Username</th>
                                        <th className="py-3 px-4">Email</th>
                                        <th className="py-3 px-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr
                                            key={user._id}
                                            className="border-b border-gray-700 hover:bg-gray-700/50 transition"
                                        >
                                            <td className="py-3 px-4">{user.username}</td>
                                            <td className="py-3 px-4">{user.email}</td>
                                            <td className="py-3 px-4 flex gap-3">
                                                <button className="bg-rose-600 hover:bg-rose-700 px-3 cursor-pointer py-1 rounded text-xs font-bold">
                                                    Delete
                                                </button>
                                                <button className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 cursor-pointer rounded text-xs font-bold">
                                                    Reset
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </section>

                {/* Category Management */}
                <section className="bg-black backdrop-blur-md rounded-xl p-6 shadow-lg border border-gray-700 hover:border-green-500 transition-all">
                    <h2 className="text-xl font-bold uppercase tracking-wider mb-4">Category Management</h2>
                    <button
                        onClick={goToCategoryManagement}
                        className="bg-gradient-to-r from-green-500 to-lime-400 px-4 py-2 rounded-lg w-full font-semibold hover:scale-105 transition-transform"
                    >
                        Manage Categories
                    </button>
                </section>

                {/* System Settings */}
                <section className="bg-black backdrop-blur-md rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500 transition-all">
                    <h2 className="text-xl font-bold uppercase tracking-wider mb-4">System Settings</h2>
                    <button
                        onClick={() => navigate("/settings")}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-lg w-full font-semibold hover:scale-105 transition-transform"
                    >
                        Go to Settings
                    </button>
                </section>
            </main>

            {/* Logout Confirmation Modal */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                    <div className="bg-gray-900 rounded-xl p-6 shadow-2xl w-[90%] sm:w-[400px] flex flex-col gap-5 border border-red-600">
                        <h2 className="text-lg font-bold text-red-500 uppercase">Confirm Logout</h2>
                        <p className="text-gray-300">Are you sure you want to log out?</p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowLogoutConfirm(false)}
                                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-semibold"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmLogout}
                                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold"
                            >
                                Yes, Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
