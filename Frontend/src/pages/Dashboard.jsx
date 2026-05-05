import React from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { FaWallet, FaHistory, FaChartPie, FaCalendarAlt } from "react-icons/fa";

const Dashboard = ({ user }) => {
  return (
    <div className="bg-blue-600 w-screen h-screen">
      <Navbar username={user.username} />

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          title="Total This Month"
          value="₹12,500"
          icon={<FaWallet />}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 justify-between"
        />
        <Card
          title="Top Category"
          value="Food - ₹4,200"
          icon={<FaChartPie />}
          className="bg-gradient-to-r from-green-500 to-teal-600 justify-between"
        />
        <Card
          title="Expenses Logged"
          value="32"
          icon={<FaCalendarAlt />}
          className="bg-gradient-to-r from-pink-500 to-red-600 justify-between"
        />
        
      </div>
      <Card
          title="See Your Expenses History"
          value="View Details"
          icon={<FaHistory />}
          className="bg-gradient-to-r from-pink-500 to-red-600 justify-between w-3/4 mx-auto mt-10 cursor-pointer hover:scale-105 transition-transform duration-300"
        />
    </div>
  );
};

export default Dashboard;
