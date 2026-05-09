import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, Link } from "react-router-dom";
import { FiUser, FiMail, FiCalendar, FiDollarSign, FiPieChart } from "react-icons/fi";

const Profile = ({ user }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [date, setDate] = useState("N/A");
  const [stats, setStats] = useState({
    totalExpenses: 0,
    monthlyTotals: "N/A",
    topCategory: "N/A",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        let res = await fetch("https://expense-tracker-mern-project-g2yt.onrender.com/profile-data", {
          method: "POST",
          credentials: "include",
        });
        let response = await res.json();
        if (res.ok) {
          const joinedAt = new Date(response.joinedAt).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          setDate(joinedAt);
          setStats({
            totalExpenses: response.totalExpenses,
            monthlyTotals: response.monthlyTotals,
            topCategory: response.topCategory,
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfileData();
  }, []);

  const deleteAccount = async () => {
    let res = await fetch("https://expense-tracker-mern-project-g2yt.onrender.com/delete-account", {
      method: "POST",
      credentials: "include",
    });
    let response = await res.json();
    if (res.ok) {
      setShowModal(false);          // close confirmation modal
      setShowDeleteSuccess(true);   // show success popup
      setTimeout(() => {
        navigate("/");              // redirect after a short delay
      }, 5000);
    } else {
      alert(response.error);
    }
  };


  const goToDashboard = () => navigate("/dashboard");
  const changePassword = () => navigate("/change-password");

  return (
    <div id="profile" className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
      {/* Navbar with About Us + Contact Us */}
      <Navbar username={user.username} profileMode={true} />

      {/* Profile card content */}
      <div className="flex justify-center items-center py-12">
        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-2xl p-8 w-[90%] sm:w-[500px] flex flex-col gap-6 animate-fadeIn">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-center">
            PROFILE
          </h2>

          {/* Basic Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <FiUser className="text-blue-600 text-xl" />
              <p className="font-semibold">{user.username}</p>
            </div>
            <div className="flex items-center gap-3">
              <FiMail className="text-blue-600 text-xl" />
              <p>{user.email || "No email linked"}</p>
            </div>
            <div className="flex items-center gap-3">
              <FiCalendar className="text-blue-600 text-xl" />
              <p>Joined: {date}</p>
            </div>
          </div>

          {/* Expense Stats */}
          <div className="mt-6">
            <h3 className="text-lg font-bold text-blue-700 mb-3">Expense Stats</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <FiDollarSign className="text-green-600 text-xl" />
                <p>Total Expenses: {stats.totalExpenses}</p>
              </div>
              <div className="flex items-center gap-3">
                <FiPieChart className="text-purple-600 text-xl" />
                <p>Top Category: {stats.topCategory}</p>
              </div>
              <div className="flex items-center gap-3">
                <FiCalendar className="text-pink-600 text-xl" />
                <p>Monthly Trend: {stats.monthlyTotals}</p>
              </div>
            </div>
          </div>

          {/* Delete Success Popup */}
          {showDeleteSuccess && (
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
              <div className="bg-white rounded-lg shadow-xl p-6 w-[90%] sm:w-[400px] animate-fadeIn">
                <h3 className="text-2xl font-bold text-green-600 mb-4 text-center">
                  Account Deleted
                </h3>
                <p className="text-gray-700 mb-6 text-center">
                  Your account has been deleted successfully.
                  Thank you for being a part of <span className="font-bold text-blue-600">Xpense Tracker</span>.
                  We hope to see you again someday!
                </p>
                <div className="flex justify-center">
                  <button
                    className="px-6 py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg shadow-md hover:scale-105 transition-transform"
                    onClick={() => navigate("/")}
                  >
                    Go to Home
                  </button>
                </div>
              </div>
            </div>
          )}


          {/* Settings */}
          <div className="mt-6">
            <h3 className="text-lg font-bold text-blue-700 mb-3">Settings</h3>
            <div className="flex flex-col gap-3">
              <button className="h-10 cursor-pointer w-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg text-white font-semibold shadow-md hover:scale-105 transition-transform" onClick={changePassword}>
                Change Password
              </button>
              <button className="h-10 cursor-pointer w-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold shadow-md hover:scale-105 transition-transform">
                Theme Preferences
              </button>
              <button
                className="h-10 cursor-pointer w-full bg-gradient-to-r from-red-500 to-orange-500 rounded-lg text-white font-semibold shadow-md hover:scale-105 transition-transform"
                onClick={() => setShowModal(true)}
              >
                Delete Account
              </button>
              <button
                className="h-10 cursor-pointer w-full bg-gradient-to-r from-green-500 to-green-300 rounded-lg text-white font-semibold shadow-md hover:scale-105 transition-transform"
                onClick={goToDashboard}
              >
                Go Back
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">

            <Link
              to="/terms-conditions"
              className="text-blue-500 text-sm hover:text-blue-200 font-semibold"
            >
              Terms and Conditions
            </Link>
            <Link
              to="/privacy-policy"
              className="text-blue-500 text-sm hover:text-blue-200 font-semibold"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-[90%] sm:w-[400px]">
            <h3 className="text-xl font-bold text-red-600 mb-4">Confirm Delete</h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                onClick={deleteAccount}
              >
                Yes, Delete
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Profile;