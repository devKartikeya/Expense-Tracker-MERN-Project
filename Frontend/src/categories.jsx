// src/utils/categories.js
import {
    FaUtensils, FaShoppingBag, FaCar, FaHome, FaAppleAlt, FaBolt, FaLaptop,
    FaBook, FaHeartbeat, FaFilm, FaBus, FaFileInvoiceDollar, FaMoneyBillWave,
    FaEllipsisH, FaBeer, FaGift, FaPlane, FaTshirt, FaMobileAlt, FaGamepad,
    FaDog, FaTree, FaGasPump, FaTools, FaBicycle, FaBaby, FaMusic, FaWifi,
    FaWater, FaLightbulb, FaMedkit, FaClipboardList, FaHotel, FaDumbbell,
    FaSpa, FaTv, FaDonate, FaHandHoldingUsd, FaChartLine, FaUniversity,
    FaCoins, FaCalendarAlt, FaUmbrellaBeach, FaTheaterMasks, FaGlasses, FaGlassCheers, FaPhoneAlt,
    FaPhone, FaCode, FaClock, FaFan, FaSchool, FaBoxOpen, FaSnowflake, FaTable,
    FaBreadSlice, FaCheese, FaDrumstickBite, FaFish,
    FaCarrot, FaCookie, FaIceCream, FaCoffee, FaGlassWhiskey,
    FaWineBottle, FaEgg, FaShoppingBasket, FaPrint, FaBox, FaApple, FaOm, FaCalendarDay, FaShoePrints, FaMagic,
    FaSprayCan, FaPaintBrush, FaHammer
} from "react-icons/fa";

// Array for Expense.jsx (autocomplete)
export const categoryArray = [
    // Essentials
    { name: "Food", icon: <FaUtensils className="text-green-500" /> },
    { name: "Sugar", icon: <FaUtensils className="text-green-500" /> },
    { name: "Glasses", icon: <FaGlasses className="text-blue-500" /> },
    { name: "Glass Cheers", icon: <FaGlassCheers className="text-blue-700" /> },
    { name: "Phone", icon: <FaPhoneAlt className="text-yellow-300" /> },
    { name: "Masala", icon: <FaBox className="text-yellow-300" /> },
    { name: "Watch", icon: <FaClock className="text-yellow-300" /> },
    { name: "Recharge", icon: <FaPhone className="text-yellow-300" /> },
    { name: "Code", icon: <FaCode className="text-green-500" /> },
    { name: "God", icon: <FaOm className="text-green-500" /> },
    { name: "Vegetables", icon: <FaAppleAlt className="text-lime-600" /> },
    { name: "Rent", icon: <FaHome className="text-yellow-500" /> },
    { name: "Daily", icon: <FaCalendarDay className="text-yellow-500" /> },
    { name: "Transport", icon: <FaBus className="text-blue-400" /> },
    { name: "Fuel", icon: <FaGasPump className="text-orange-600" /> },
    { name: "Petrol", icon: <FaGasPump className="text-purple-600" /> },
    { name: "Diesel", icon: <FaGasPump className="text-cyan-900" /> },
    { name: "Water", icon: <FaWater className="text-cyan-500" /> },
    { name: "Electricity", icon: <FaLightbulb className="text-yellow-500" /> },
    { name: "Internet", icon: <FaWifi className="text-blue-400" /> },
    { name: "Wifi", icon: <FaWifi className="text-blue-400" /> },
    { name: "Medicine", icon: <FaMedkit className="text-red-600" /> },
    { name: "Fan", icon: <FaFan className="text-blue-500" /> },
    { name: "College", icon: <FaUniversity className="text-purple-600" /> },
    { name: "School", icon: <FaSchool className="text-yellow-600" /> },
    { name: "Everyday Items", icon: <FaBoxOpen className="text-green-600" /> },
    { name: "Health", icon: <FaHeartbeat className="text-red-600" /> },
    { name: "AC", icon: <FaSnowflake className="text-cyan-500" /> },
    { name: "Table", icon: <FaTable className="text-brown-500" /> },

    // Lifestyle
    { name: "Shopping", icon: <FaShoppingBag className="text-pink-500" /> },
    { name: "Clothing", icon: <FaTshirt className="text-purple-500" /> },
    { name: "Mobile", icon: <FaMobileAlt className="text-indigo-600" /> },
    { name: "Electronics", icon: <FaLaptop className="text-indigo-500" /> },
    { name: "Education", icon: <FaBook className="text-purple-600" /> },
    { name: "Gaming", icon: <FaGamepad className="text-red-600" /> },
    { name: "Music", icon: <FaMusic className="text-purple-600" /> },
    { name: "Shoes", icon: <FaShoePrints className="text-purple-600" /> },
    { name: "Slippers", icon: <FaShoePrints className="text-purple-600" /> },
    { name: "Entertainment", icon: <FaFilm className="text-pink-400" /> },
    { name: "Pets", icon: <FaDog className="text-brown-500" /> },
    { name: "Painting", icon: <FaPaintBrush className="text-brown-500" /> },
    { name: "Construction", icon: <FaHammer className="text-brown-500" /> },
    { name: "Labour", icon: <FaHammer className="text-brown-500" /> },
    { name: "Gardening", icon: <FaTree className="text-green-700" /> },
    { name: "Baby", icon: <FaBaby className="text-pink-400" /> },
    { name: "Iphone", icon: <FaApple className="text-pink-400" /> },
    { name: "Macbook", icon: <FaApple className="text-pink-400" /> },
    { name: "Apple", icon: <FaApple className="text-pink-400" /> },
    { name: "Cosmetics", icon: <FaMagic className="text-pink-400" /> },
    { name: "Perfume", icon: <FaSprayCan className="text-pink-400" /> },

    // Groceries
    { name: "Milk", icon: <FaGlassWhiskey className="text-blue-400" /> },
    { name: "Bread", icon: <FaBreadSlice className="text-yellow-600" /> },
    { name: "Cheese", icon: <FaCheese className="text-orange-500" /> },
    { name: "Meat", icon: <FaDrumstickBite className="text-red-600" /> },
    { name: "Chicken", icon: <FaDrumstickBite className="text-red-800" /> },
    { name: "Fish", icon: <FaFish className="text-blue-500" /> },
    { name: "Vegetables", icon: <FaCarrot className="text-green-600" /> },
    { name: "Fruits", icon: <FaAppleAlt className="text-lime-600" /> },
    { name: "Snacks", icon: <FaCookie className="text-pink-500" /> },
    { name: "Biscuits", icon: <FaCookie className="text-pink-500" /> },
    { name: "Cookie", icon: <FaCookie className="text-pink-500" /> },
    { name: "Ice Cream", icon: <FaIceCream className="text-purple-400" /> },
    { name: "Coffee", icon: <FaCoffee className="text-brown-600" /> },
    { name: "Tea", icon: <FaCoffee className="text-brown-600" /> },
    { name: "Juice", icon: <FaWineBottle className="text-orange-600" /> },
    { name: "Eggs", icon: <FaEgg className="text-yellow-500" /> },
    { name: "Groceries (General)", icon: <FaShoppingBasket className="text-gray-700" /> },

    // Luxury & Leisure
    { name: "Alcohol", icon: <FaBeer className="text-amber-600" /> },
    { name: "Gifts", icon: <FaGift className="text-pink-600" /> },
    { name: "Travel", icon: <FaCar className="text-blue-500" /> },
    { name: "Flights", icon: <FaPlane className="text-blue-600" /> },
    { name: "Hotels", icon: <FaHotel className="text-indigo-600" /> },
    { name: "Fitness", icon: <FaDumbbell className="text-gray-700" /> },
    { name: "Spa", icon: <FaSpa className="text-pink-400" /> },
    { name: "Movies", icon: <FaTv className="text-red-500" /> },
    { name: "Beach", icon: <FaUmbrellaBeach className="text-blue-500" /> },
    { name: "Events", icon: <FaTheaterMasks className="text-purple-500" /> },

    // Bills & Finance
    { name: "Salary", icon: <FaMoneyBillWave className="text-green-600" /> },
    { name: "Bills", icon: <FaFileInvoiceDollar className="text-gray-600" /> },
    { name: "EMI", icon: <FaFileInvoiceDollar className="text-blue-800" /> },
    { name: "Subscriptions", icon: <FaClipboardList className="text-indigo-500" /> },
    { name: "Insurance", icon: <FaHandHoldingUsd className="text-blue-600" /> },
    { name: "Investments", icon: <FaChartLine className="text-green-500" /> },
    { name: "Loans", icon: <FaUniversity className="text-gray-700" /> },
    { name: "Taxes", icon: <FaCoins className="text-yellow-600" /> },
    { name: "Print", icon: <FaPrint className="text-gray-600" /> },

    // Miscellaneous
    { name: "Repairs", icon: <FaTools className="text-gray-700" /> },
    { name: "Cycling", icon: <FaBicycle className="text-blue-500" /> },
    { name: "Convenience", icon: <FaBolt className="text-orange-500" /> },
    { name: "Donations", icon: <FaDonate className="text-green-600" /> },
    { name: "Misc", icon: <FaEllipsisH className="text-gray-400" /> },
];

// Object for Expenses & MonthlyExpenses (mapping)
export const categoryIcons = categoryArray.reduce((acc, cat) => {
    acc[cat.name] = cat.icon;
    return acc;
}, {});
