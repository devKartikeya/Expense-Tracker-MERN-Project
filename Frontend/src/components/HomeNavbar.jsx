import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const HomeNavbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md shadow-lg z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 cursor-pointer">
                    Xpense Tracker
                </h1>

                {/* Desktop Menu */}
                <nav className="hidden md:flex gap-8 items-center font-medium">
                    <a href="#insights" className="hover:text-blue-400 transition">Insights</a>
                    <a href="#features" className="hover:text-blue-400 transition">Features</a>
                    <Link to="/about-us" className="hover:text-blue-400 transition">About</Link>
                    <Link to="/contact-us" className="hover:text-blue-400 transition">Contact</Link>
                    <Link to="dashboard" className="hover:text-blue-400 transition">My Dashboard</Link>
                    <div className="flex gap-3 items-center">
                        <Link
                            to="/login"
                            onClick={() => setOpen(false)}
                            className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-lg font-semibold hover:scale-105 transition-transform flex items-center justify-center"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            onClick={() => setOpen(false)}
                            className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-lg font-semibold hover:scale-105 transition-transform flex items-center justify-center"
                        >
                            Signup
                        </Link>
                    </div>
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-2xl text-white"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <FiX /> : <FiMenu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <>
                    {/* Drawer */}
                    <div className={`home-drawer ${open ? "open" : "close"}`}>
                        {/* Close Button */}
                        <button
                            onClick={() => setOpen(false)}
                            className="self-end text-2xl text-white hover:text-red-400 transition"
                        >
                            <FiX />
                        </button>

                        {/* Nav Links */}
                        <a href="#insights" onClick={() => setOpen(false)} className="hover:text-blue-400 transition">Insights</a>
                        <a href="#features" onClick={() => setOpen(false)} className="hover:text-blue-400 transition">Features</a>
                        <Link to="/about-us" onClick={() => setOpen(false)} className="hover:text-blue-400 transition">About Us</Link>
                        <Link to="/contact-us" onClick={() => setOpen(false)} className="hover:text-blue-400 transition">Contact Us</Link>
                        <Link to="/dashboard" onClick={() => setOpen(false)} className="hover:text-blue-400 transition">My Dashboard</Link>
                        <div className="flex gap-3 items-center">
                            <Link
                                to="/login"
                                onClick={() => setOpen(false)}
                                className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-lg font-semibold hover:scale-105 transition-transform flex items-center justify-center"
                            >
                                Login
                            </Link>
                            or
                            <Link
                                to="/"
                                onClick={() => setOpen(false)}
                                className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-lg font-semibold hover:scale-105 transition-transform flex items-center justify-center"
                            >
                                Signup
                            </Link>
                        </div>
                    </div>

                </>
            )}

        </header>
    );
};

export default HomeNavbar;