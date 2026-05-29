import React from "react";
import { NavLink } from "react-router-dom";

const MiniNavbar = () => {
    return (
        <div className="bg-blue-600 shadow-md">
            <div className="flex flex-col sm:flex-row items-center justify-between px-1 py-2">

                {/* Links with icons */}
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-2 mt-3 sm:mt-0">
                    <NavLink
                        to="/expenses"
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${isActive
                                ? "bg-yellow-400 text-black shadow-md"
                                : "text-white hover:bg-blue-500"
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
                                : "text-white hover:bg-blue-500"
                            }`
                        }
                    >
                        📅 Monthly Expenses
                    </NavLink>
                    <NavLink
                        to="/category-expenses"
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${isActive
                                ? "bg-yellow-400 text-black shadow-md"
                                : "text-white hover:bg-blue-500"
                            }`
                        }
                    >
                        🏷️ Category Expenses
                    </NavLink>
                    {/* <NavLink
                        to="/categories"
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${isActive
                                ? "bg-yellow-400 text-black shadow-md"
                                : "text-white hover:bg-blue-600"
                            }`
                        }
                    >
                        📊 Categories Overview
                    </NavLink> */}
                </div>
            </div>
        </div>
    );
};

export default MiniNavbar;
