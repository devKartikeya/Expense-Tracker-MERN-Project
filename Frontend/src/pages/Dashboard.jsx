import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { useNavigate, Link } from "react-router-dom";
import { FaWallet, FaHistory, FaChartPie, FaCalendarAlt } from "react-icons/fa";
import { Pie, Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const Dashboard = ({ user }) => {
  const navigate = useNavigate();

  console.log("User in Dashboard:", user);

  const [expenses, setExpenses] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [topCategory, setTopCategory] = useState({ category: "", amount: 0 });

  const [expensesByCategory, setExpensesByCategory] = useState([]);
  const [monthlyTotals, setMonthlyTotals] = useState([]);
  const [dailyExpenses, setDailyExpenses] = useState([]);

  const pieOptions = {
    maintainAspectRatio: false,
    responsive: true,
  };

  useEffect(() => {
    fetch("http://localhost:3000/expenses-by-category", { credentials: "include" })
      .then(res => res.json())
      .then(data => setExpensesByCategory(data));

    fetch("http://localhost:3000/monthly-totals", { credentials: "include" })
      .then(res => res.json())
      .then(data => setMonthlyTotals(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/daily-expenses", { credentials: "include" })
      .then(res => res.json())
      .then(data => setDailyExpenses(data));
  }, []);

  const pieData = {
    labels: expensesByCategory.map(e => e.category),
    datasets: [
      {
        data: expensesByCategory.map(e => e.totalAmount),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9C27B0"],
      },
    ],
  };

  const barData = {
    labels: monthlyTotals.map(m => `Month ${m.month}`),
    datasets: [
      {
        label: "Monthly Expenses",
        data: monthlyTotals.map(m => m.total),
        backgroundColor: "#36A2EB",
      },
    ],
  };

  const lineData = {
    labels: dailyExpenses.map(d => `Day ${d.day}`),
    datasets: [
      {
        label: "Daily Expenses",
        data: dailyExpenses.map(d => d.total),
        borderColor: "#FF6384",
        backgroundColor: "rgba(255,99,132,0.2)",
        tension: 0.3, // smooth curve
      },
    ],
  };

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

  async function fetchExpensesCount() {
    let response = await fetch("http://localhost:3000/expenses-count", {
      method: "GET",
      credentials: "include",
    });
    let data = await response.json();
    console.log("Expenses count:", data);
    setExpenses(data.count);
  }


  useEffect(() => {
    fetchTotalExpenses();
    fetchMonthlyTotal();
    fetchTopCategory();
    fetchExpensesCount();
  }, [])


  const goToExpenses = () => {
    navigate("/expenses");
  };

  return (
    <div className="bg-blue-600 w-screen h-screen">
      <Navbar username={user.username} />

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
          value={expenses}
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

      {/* Charts */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-bold mb-4">Expenses by Category</h2>
          <div className="h-64"> {/* height control */}
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-bold mb-4">Monthly Totals</h2>
          <Bar data={barData} />
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 lg:col-span-2">
          <h2 className="text-xl font-bold mb-4">Daily Spending Trend</h2>
          <div className="h-64">
            <Line data={lineData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
