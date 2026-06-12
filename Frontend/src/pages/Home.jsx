import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { FiShield, FiBarChart2, FiDownload, FiSmartphone } from "react-icons/fi";
import HomeNavbar from "../components/HomeNavbar";

const Home = () => {
    const navigate = useNavigate()
    return (
        <main id="home" className="bg-black text-white w-screen min-h-screen">
            {/* Navbar */}
            <HomeNavbar />

            {/* Hero Section */}
            <section
                className="relative w-full h-[95vh] flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1679923813998-6603ee2466c5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }} // replace with a professional image
            >
                <div className="absolute inset-0 bg-black/70"></div>
                <div className="relative z-10 text-center px-6">
                    <h1 className="text-5xl sm:text-6xl font-extrabold mb-4">
                        Empowering <span className="text-blue-400">Financial Clarity</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
                        Xpense Tracker helps individuals and organizations manage finances with confidence,
                        security, and insightful analytics.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <button onClick={() => { navigate("/login") }} className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform">
                            Get Started
                        </button>
                        <button className="bg-gradient-to-r from-pink-500 to-red-600 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* Capabilities Section */}
            <section className="py-20 px-6 sm:px-12 bg-gradient-to-br from-gray-900 via-black to-gray-800">
                <h2 className="sm:text-6xl text-4xl font-extrabold text-center mb-4">
                    Our Capabilities
                </h2>
                <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
                    We combine enterprise‑grade security, insightful analytics, and responsive design
                    to deliver a financial management experience trusted by professionals worldwide.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {/* Secure */}
                    <div className="flex flex-col items-center text-center p-8 bg-gray-800 rounded-xl shadow-lg hover:scale-105 transition-transform">
                        <FiShield className="text-5xl text-blue-400 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Secure</h3>
                        <p className="text-gray-400 text-sm">
                            Enterprise‑grade authentication and encrypted data handling for peace of mind.
                        </p>
                    </div>

                    {/* Analytics */}
                    <div className="flex flex-col items-center text-center p-8 bg-gray-800 rounded-xl shadow-lg hover:scale-105 transition-transform">
                        <FiBarChart2 className="text-5xl text-green-400 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Analytics</h3>
                        <p className="text-gray-400 text-sm">
                            Smart dashboards and charts that turn numbers into actionable insights.
                        </p>
                    </div>

                    {/* Reports */}
                    <div className="flex flex-col items-center text-center p-8 bg-gray-800 rounded-xl shadow-lg hover:scale-105 transition-transform">
                        <FiDownload className="text-5xl text-yellow-400 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Reports</h3>
                        <p className="text-gray-400 text-sm">
                            Export to PDF or Excel for professional documentation and compliance.
                        </p>
                    </div>

                    {/* Responsive */}
                    <div className="flex flex-col items-center text-center p-8 bg-gray-800 rounded-xl shadow-lg hover:scale-105 transition-transform">
                        <FiSmartphone className="text-5xl text-pink-400 mb-4" />
                        <h3 className="text-xl font-semibold mb-2"> Mobile Support</h3>
                        <p className="text-gray-400 text-sm">
                            Optimized for desktop and mobile with premium brutalist UI.
                        </p>
                    </div>

                    {/* Scalability */}
                    <div className="flex flex-col items-center text-center p-8 bg-gray-800 rounded-xl shadow-lg hover:scale-105 transition-transform">
                        <span className="text-5xl text-purple-400 mb-4">⚡</span>
                        <h3 className="text-xl font-semibold mb-2">Scalable</h3>
                        <p className="text-gray-400 text-sm">
                            Built to grow with you — from personal finance to organizational needs.
                        </p>
                    </div>

                    {/* Support */}
                    <div className="flex flex-col items-center text-center p-8 bg-gray-800 rounded-xl shadow-lg hover:scale-105 transition-transform">
                        <span className="text-5xl text-teal-400 mb-4">🤝</span>
                        <h3 className="text-xl font-semibold mb-2">Support</h3>
                        <p className="text-gray-400 text-sm">
                            Dedicated community and helpline to guide you at every step.
                        </p>
                    </div>
                </div>
            </section>

            {/* Features / Services Section */}
            <section id="features" className="py-20 px-6 sm:px-12 bg-gradient-to-br from-white via-gray-100 to-gray-200 text-black">
                <h2 className="text-4xl font-extrabold text-center mb-4">
                    Our Services
                </h2>
                <p className="text-gray-700 text-center max-w-2xl mx-auto mb-12">
                    Xpense Tracker offers a suite of services designed to simplify financial management,
                    empower decision‑making, and deliver clarity for individuals and organizations.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {/* Daily Tracking */}
                    <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition">
                        <h3 className="text-xl font-semibold mb-2 text-blue-600">Daily Tracking</h3>
                        <p className="text-gray-600 text-sm">
                            Record expenses and incomes effortlessly with category icons and filters,
                            keeping your ledger accurate every day.
                        </p>
                    </div>

                    {/* Budget Management */}
                    <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition">
                        <h3 className="text-xl font-semibold mb-2 text-purple-600">Budget Management</h3>
                        <p className="text-gray-600 text-sm">
                            Set monthly or yearly budgets, monitor progress, and receive alerts when you’re close to limits.
                        </p>
                    </div>

                    {/* Analytics Dashboard */}
                    <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition">
                        <h3 className="text-xl font-semibold mb-2 text-green-600">Analytics Dashboard</h3>
                        <p className="text-gray-600 text-sm">
                            Visualize spending trends with charts and summaries, helping you make informed financial decisions.
                        </p>
                    </div>

                    {/* Export & Reporting */}
                    <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition">
                        <h3 className="text-xl font-semibold mb-2 text-yellow-600">Export & Reporting</h3>
                        <p className="text-gray-600 text-sm">
                            Generate professional reports in PDF or Excel formats for compliance, sharing, or record keeping.
                        </p>
                    </div>

                    {/* Admin Oversight */}
                    <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition">
                        <h3 className="text-xl font-semibold mb-2 text-pink-600">Admin Oversight</h3>
                        <p className="text-gray-600 text-sm">
                            A dedicated admin panel to manage users, categories, and monitor overall financial health.
                        </p>
                    </div>

                    {/* Support & Community */}
                    <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition">
                        <h3 className="text-xl font-semibold mb-2 text-teal-600">Support & Community</h3>
                        <p className="text-gray-600 text-sm">
                            Access responsive support and join a growing community focused on financial empowerment.
                        </p>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-16 px-6 sm:px-12 bg-black text-center">
                <h2 className="text-3xl font-bold mb-6">About Xpense Tracker</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Inspired by the professionalism of global firms like EY, KPMG, and Deloitte,
                    Xpense Tracker is built to deliver clarity and confidence in financial management.
                    Our mission is to simplify expense tracking while maintaining enterprise‑level security
                    and design excellence.
                </p>
            </section>

            {/* Footer */}
            <footer className="py-6 bg-gray-900 text-center text-gray-500 text-sm">
                © 2026 Xpense Tracker | Crafted with ❤️ by Kartikeya Mishra
            </footer>
        </main>
    );
};

export default Home;
