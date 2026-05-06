import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { useNavigate, Link } from "react-router-dom";
import { FaWallet, FaHistory, FaChartPie, FaCalendarAlt } from "react-icons/fa";

const Dashboard = ({ user }) => {
  const navigate = useNavigate();

  console.log("User in Dashboard:", user);

  const [totalExpenses, setTotalExpenses] = useState(0);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [topCategory, setTopCategory] = useState({ category: "", amount: 0 });

  async function fetchTotalExpenses() {
    let response = await fetch("http://localhost:3000/total-expenses", {
      method: "GET",
      credentials: "include",
    });
    let data = await response.json();
    console.log("Fetched data:", data);
    setTotalExpenses(data.total);
  }

  async function fetchMonthlyTotal() {
    let response = await fetch("http://localhost:3000/monthly-expenses", {
      method: "GET",
      credentials: "include",
    });
    let data = await response.json();
    console.log("Monthly total:", data.total);
    setMonthlyTotal(data.total);
  }

  async function fetchTopCategory() {
    let response = await fetch("http://localhost:3000/top-category", {
      method: "GET",
      credentials: "include",
    });
    let data = await response.json();
    console.log("Top category:", data);
    setTopCategory(data);
  }


  useEffect(() => {
    fetchTotalExpenses();
    fetchMonthlyTotal();
    fetchTopCategory();
  }, [])


  const goToExpenses = () => {
    navigate("/expenses");
  };

  return (
    <div className="bg-blue-600 w-screen h-screen">
      <Navbar username={user.username} />

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          title="Total This Month"
          value={`₹${monthlyTotal.toLocaleString()}`}
          icon={<FaWallet />}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 justify-between"
        />
        <Card
          title="Top Category"
          value={topCategory.category ? `${topCategory.category ? topCategory.category : 'N/A'} (₹${topCategory.amount ? topCategory.amount.toLocaleString() : '0'})` : "No data"}
          icon={<FaChartPie />}
          className="bg-gradient-to-r from-green-500 to-teal-600 justify-between"
        />
        <Card
          title="Expenses Logged"
          value="32"
          icon={<FaCalendarAlt />}
          className="bg-gradient-to-r from-pink-500 to-red-600 justify-between"
        />
        <Card
          title="Total Expenses"
          value={`₹${totalExpenses.toLocaleString()}`}
          icon={<FaCalendarAlt />}
          className="bg-gradient-to-r from-yellow-500 to-orange-600 justify-between"
        />

      </div>
      <Card
        title="See Your Expenses History"
        value="View Details"
        onClick={goToExpenses}
        icon={<FaHistory />}
        className="bg-gradient-to-r from-pink-500 to-red-600 justify-between w-3/4 mx-auto mt-10 cursor-pointer hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
};

export default Dashboard;
