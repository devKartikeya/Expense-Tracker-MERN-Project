// src/categories.js
import {
    FaUtensils, FaShoppingBag, FaCar, FaHome, FaAppleAlt, FaBolt, FaLaptop,
    FaBook, FaHeartbeat, FaFilm, FaBus, FaFileInvoiceDollar, FaMoneyBillWave,
    FaEllipsisH, FaBeer, FaGift, FaPlane, FaTshirt, FaMobileAlt, FaGamepad,
    FaDog, FaTree, FaGasPump, FaTools, FaBicycle, FaBaby, FaMusic, FaWifi,
    FaWater, FaLightbulb, FaMedkit, FaClipboardList
} from "react-icons/fa";

// Export as an array for Expense.jsx (autocomplete)
export const categoryArray = [
    { name: "Food", icon: <FaUtensils className="text-green-500" /> },
    { name: "Shopping", icon: <FaShoppingBag className="text-pink-500" /> },
    { name: "Travel", icon: <FaCar className="text-blue-500" /> },
    { name: "Rent", icon: <FaHome className="text-yellow-500" /> },
    { name: "Vegetables", icon: <FaAppleAlt className="text-lime-600" /> },
    { name: "Convenience", icon: <FaBolt className="text-orange-500" /> },
    { name: "Electronics", icon: <FaLaptop className="text-indigo-500" /> },
    { name: "Education", icon: <FaBook className="text-purple-600" /> },
    { name: "Health", icon: <FaHeartbeat className="text-red-500" /> },
    { name: "Entertainment", icon: <FaFilm className="text-pink-400" /> },
    { name: "Transport", icon: <FaBus className="text-blue-400" /> },
    { name: "Bills", icon: <FaFileInvoiceDollar className="text-gray-600" /> },
    { name: "Salary", icon: <FaMoneyBillWave className="text-green-600" /> },
    { name: "Misc", icon: <FaEllipsisH className="text-gray-400" /> },
    { name: "Alcohol", icon: <FaBeer className="text-amber-600" /> },
    { name: "Gifts", icon: <FaGift className="text-pink-600" /> },
    { name: "Flights", icon: <FaPlane className="text-blue-600" /> },
    { name: "Clothing", icon: <FaTshirt className="text-purple-500" /> },
    { name: "Mobile", icon: <FaMobileAlt className="text-indigo-600" /> },
    { name: "Gaming", icon: <FaGamepad className="text-red-600" /> },
    { name: "Pets", icon: <FaDog className="text-brown-500" /> },
    { name: "Gardening", icon: <FaTree className="text-green-700" /> },
    { name: "Fuel", icon: <FaGasPump className="text-orange-600" /> },
    { name: "Repairs", icon: <FaTools className="text-gray-700" /> },
    { name: "Cycling", icon: <FaBicycle className="text-blue-500" /> },
    { name: "Baby", icon: <FaBaby className="text-pink-400" /> },
    { name: "Music", icon: <FaMusic className="text-purple-600" /> },
    { name: "Internet", icon: <FaWifi className="text-blue-400" /> },
    { name: "Water", icon: <FaWater className="text-cyan-500" /> },
    { name: "Electricity", icon: <FaLightbulb className="text-yellow-500" /> },
    { name: "Medicine", icon: <FaMedkit className="text-red-600" /> },
    { name: "Subscriptions", icon: <FaClipboardList className="text-indigo-500" /> },
];

// Export as an object for Expenses & MonthlyExpenses (mapping category → icon)
export const categoryIcons = categoryArray.reduce((acc, cat) => {
    acc[cat.name] = cat.icon;
    return acc;
}, {});
