import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Confetti from "react-confetti";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Pie, Bar, Line } from "react-chartjs-2";
import { useNavigate, useLocation } from "react-router-dom";
import { FaWallet, FaHistory, FaCoins, FaChartPie, FaCalendarAlt, FaClipboardCheck } from "react-icons/fa";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const Dashboard = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [expenses, setExpenses] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [topCategory, setTopCategory] = useState({ category: "", amount: 0 });

  const [totalIncome, setTotalIncome] = useState(0)
  const [monthlyIncome, setMonthlyIncome] = useState(0)

  const [expensesByCategory, setExpensesByCategory] = useState([]);
  const [monthlyTotals, setMonthlyTotals] = useState([]);
  const [dailyExpenses, setDailyExpenses] = useState([]);

  // Welcome Modal state
  const [showWelcomeModal, setShowWelcomeModal] = useState(location.state?.fromSignup || false);

  const pieOptions = {
    maintainAspectRatio: false,
    responsive: true,
  };

  useEffect(() => {
    if (location.state?.fromSignup) {
      // clear the flag so it doesn't persist
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);


  useEffect(() => {
    fetch("https://expense-tracker-mern-project-g2yt.onrender.com/expenses-by-category", { credentials: "include" })
      .then(res => res.json())
      .then(data => setExpensesByCategory(data));

    fetch("https://expense-tracker-mern-project-g2yt.onrender.com/monthly-totals", { credentials: "include" })
      .then(res => res.json())
      .then(data => setMonthlyTotals(data));
  }, []);

  useEffect(() => {
    fetch("https://expense-tracker-mern-project-g2yt.onrender.com/daily-expenses", { credentials: "include" })
      .then(res => res.json())
      .then(data => setDailyExpenses(data));
  }, []);

  useEffect(() => {
    fetch("https://expense-tracker-mern-project-g2yt.onrender.com/total-income", { credentials: "include" })
      .then(res => res.json())
      .then(data => setTotalIncome(data)).then(() => console.log(totalIncome));
  }, [])

  useEffect(() => {
    fetch("https://expense-tracker-mern-project-g2yt.onrender.com/monthly-income", { credentials: "include" })
      .then(res => res.json())
      .then(data => setMonthlyIncome(data.total));
    console.log(monthlyIncome);
  }, [])

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
        tension: 0.3,
      },
    ],
  };

  async function fetchTotalExpenses() {
    let response = await fetch("https://expense-tracker-mern-project-g2yt.onrender.com/total-expenses", {
      method: "GET",
      credentials: "include",
    });
    let data = await response.json();
    setTotalExpenses(data.total);
  }

  async function fetchMonthlyTotal() {
    let response = await fetch("https://expense-tracker-mern-project-g2yt.onrender.com/monthly-expenses", {
      method: "GET",
      credentials: "include",
    });
    let data = await response.json();
    setMonthlyTotal(data.total);
  }

  async function fetchTopCategory() {
    let response = await fetch("https://expense-tracker-mern-project-g2yt.onrender.com/top-category", {
      method: "GET",
      credentials: "include",
    });
    let data = await response.json();
    setTopCategory(data);
  }

  async function fetchExpensesCount() {
    let response = await fetch("https://expense-tracker-mern-project-g2yt.onrender.com/expenses-count", {
      method: "GET",
      credentials: "include",
    });
    let data = await response.json();
    setExpenses(data.count);
  }

  useEffect(() => {
    fetchTotalExpenses();
    fetchMonthlyTotal();
    fetchTopCategory();
    fetchExpensesCount();
  }, []);

  const goToExpenses = () => {
    navigate("/expenses");
  };

  const goToMonthlyExpenses = () => {
    navigate("/monthly-expenses");
  }

  const goToMonthlyIncome = () => {
    navigate("/monthly-incomes");
  };

  const goToCategories = () => {
    navigate("/categories");
  }

  const goToIncomes = () => {
    navigate("/incomes");
  }

  const goToTransactions = () => {
    navigate("/transactions");
  }

  return (
    <div id="dashboard" className="bg-black pt-[75px] sm:pt-[105px] w-screen h-screen">
      <Navbar username={user.username} />

      {/* Welcome Modal */}
      {showWelcomeModal && (
        <>
          <Confetti width={window.innerWidth} height={window.innerHeight} />
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-[90%] sm:w-[400px] animate-fadeIn">
              <h3 className="text-2xl font-bold text-blue-600 mb-4 text-center">Welcome, {user.username}!</h3>
              <p className="text-gray-700 mb-6 text-center">
                🎉 Your account has been created successfully. Start exploring your dashboard and track your expenses with ease!
              </p>
              <div className="flex justify-center">
                <button
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-md hover:scale-105 transition-transform"
                  onClick={() => setShowWelcomeModal(false)}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Stats Cards */}
      <div className="p-6 border-b-2 border-purple-500/50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-4">
        <Card
          title="Expenses This Month"
          value={`₹${monthlyTotal.toLocaleString()}`}
          onClick={goToMonthlyExpenses}
          icon={<FaWallet />}
          className="bg-gradient-to-r from-purple-500 to-indigo-500 justify-between"
        />

        <Card
          title="Income This Month"
          onClick={goToMonthlyIncome}
          value={`₹${monthlyIncome.toLocaleString()}`}
          icon={<FaCoins />}
          className="bg-gradient-to-r from-purple-500 to-indigo-500 justify-between"
        />

        <Card
          title="Top Category"
          onClick={goToCategories}
          value={topCategory.category ? `${topCategory.category} (₹${topCategory.amount.toLocaleString()})` : "No data"}
          icon={<FaChartPie />}
          className="bg-gradient-to-r from-purple-500 to-indigo-500 justify-between"
        />

        <Card
          title="Total Expenses"
          onClick={goToExpenses}
          value={`₹${totalExpenses.toLocaleString()}`}
          icon={<FaClipboardCheck />}
          className="bg-gradient-to-r from-purple-500 to-indigo-500 justify-between"
        />

        <Card
          title="Total Income"
          onClick={goToIncomes}
          value={`₹${totalIncome.toLocaleString()}`}
          icon={<FaCoins />}
          className="bg-gradient-to-r from-purple-500 to-indigo-500 justify-between"
        />

        <Card
          title="Expenses Logged"
          value={expenses}
          icon={<FaCalendarAlt />}
          className="bg-gradient-to-r from-purple-500 to-indigo-500 justify-between"
        />
      </div>

      <Card
        title="See Your Transactions History"
        onClick={goToTransactions}
        value="View Details"
        icon={<FaHistory />}
        className="bg-gradient-to-r from-pink-500 to-red-600 justify-between w-3/4 mx-auto mt-10 cursor-pointer hover:scale-105 transition-transform duration-300"
      />

      {/* Charts */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 border-t-2  border-purple-500/50 mt-9 border-b border-purple-500/50 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4 border-2 border-purple-600">
          <h2 id="pie" className="text-xl font-bold mb-4">Expenses by Category</h2>
          <div className="h-64">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 border-2 border-purple-600">
          <h2 id="bar" className="text-xl font-bold mb-4">Monthly Totals</h2>
          <Bar data={barData}  />
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 lg:col-span-2 border-2 border-purple-600">
          <h2 id="line" className="text-xl font-bold mb-4">Daily Spending Trend</h2>
          <div className="h-64">
            <Line data={lineData} options={{maintainAspectRatio: false, responsive: true}}/>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;