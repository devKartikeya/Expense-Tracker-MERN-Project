import React from "react";
import { NavLink } from "react-router-dom";

const MiniNavbar = () => {
    return (
        <div className="bg-blue-700 shadow-md">
            <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-3">

                {/* Left CTA Button + Animated Arrow */}
                <div className="flex items-center gap-2">
                    <span className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg shadow-md">
                        Track Your Expenses Here
                    </span>
                    {/* Animated arrow with up-down movement */}
                    <span className="text-yellow-300 text-2xl animate-bounce">➡️</span>
                </div>

                {/* Links with icons */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mt-3 sm:mt-0">
                    <NavLink
                        to="/expenses"
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${isActive
                                ? "bg-yellow-400 text-black shadow-md"
                                : "text-white hover:bg-blue-600"
                            }`
                        }
                    >
                        💰 All Expenses
                    </NavLink>
                    <NavLink
                        to="/monthly-expenses"
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${isActive
                                ? "bg-yellow-400 text-black shadow-md"
                                : "text-white hover:bg-blue-600"
                            }`
                        }
                    >
                        📅 Monthly
                    </NavLink>
                    <NavLink
                        to="/category-expenses"
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${isActive
                                ? "bg-yellow-400 text-black shadow-md"
                                : "text-white hover:bg-blue-600"
                            }`
                        }
                    >
                        🏷️ Category
                    </NavLink>
                    <NavLink
                        to="/categories"
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${isActive
                                ? "bg-yellow-400 text-black shadow-md"
                                : "text-white hover:bg-blue-600"
                            }`
                        }
                    >
                        📊 Categories Overview
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default MiniNavbar;
