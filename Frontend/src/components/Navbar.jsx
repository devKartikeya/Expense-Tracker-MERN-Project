import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from './Button';
import DashboardButton from './DashboardButton';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logout from './Logout';
import Toast from './Toast';
import logo from "/xpense-logo.png";

const Navbar = ({ username, profileMode = false }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleLogoutConfirm = async () => {
    await fetch("https://expense-tracker-mern-project-g2yt.onrender.com/logout", {
      method: "POST",
      credentials: "include"
    });
    setShowLogoutModal(false);
    setShowToast(true); // show goodbye toast
    setTimeout(() => {
      navigate("/login");
    }, 1500); // short delay so toast is visible
  };

  const goToDashboard = () => navigate("/dashboard");
  const goToExpense = () => navigate("/expense");
  const goToAbout = () => navigate("/about-us");
  const goToContact = () => navigate("/contact-us");
  const goToProfile = () => navigate("/profile");
  const goToIncome = () => navigate("/income")

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-black p-3 font-poppins flex justify-between items-center shadow-lg border-b-2 border-purple-500/50">
        {/* App Name */}
        <div className="flex items-center">
          {/* <img
            src={logo}
            alt="Xpense Tracker Logo"
            className="w-12 h-12 sm:w-20 sm:h-20 object-contain"
          /> */}
          <h1 className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mx-5">
            <Link to="/about-us">Xpense Tracker</Link>
          </h1>
        </div>

        {/* Welcome */}
        <h1 className="hidden md:block text-xl font-semibold text-purple-500">
          Welcome, <span className="text-pink-400">{username} !</span>
        </h1>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-5">
          <DashboardButton command="Dashboard" onClick={goToDashboard} />
          <DashboardButton command="Add Expense" onClick={goToExpense} />
          <DashboardButton command="Add Income" onClick={goToIncome} />
          <DashboardButton command="Profile" onClick={goToProfile} />
          <DashboardButton command="Logout" onClick={() => setShowLogoutModal(true)} />
        </div>

        {/* Hamburger Icon (mobile only) */}
        <div
          className="md:hidden text-white text-2xl cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className={`backdrop ${isOpen ? "open" : "close"}`}
              onClick={() => setIsOpen(false)}
            ></div>

            {/* Right Drawer Menu */}
            <div
              className={`drawer ${isOpen ? "open" : "close"}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drawer Header */}
              <div className="w-full flex flex-col items-center mb-2 border-b border-white/30 pb-4 -mt-5">
                <img
                  src={logo}
                  alt="Xpense Tracker Logo"
                  className="w-20 h-20 object-contain mb-1"
                />
                <h2 className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-green-400 to-blue-300">
                  Xpense Tracker
                </h2>
              </div>

              {/* Drawer Content */}
              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col border-b border-white/30 pb-4 gap-2">
                  <Link to="/dashboard" className='text-white font-semibold text-lg hover:text-purple-500'>Dashbaord</Link>
                </div>
                <div className="flex flex-col gap-2 justify-center items-center border-b border-white/30 pb-4">
                  <DashboardButton command="Add Expense" onClick={goToExpense} />
                  <DashboardButton command="Add Income" onClick={goToIncome} />
                </div>
              </div>
              {/* Bottom Section */}
              <div className="mt-auto w-full flex flex-col gap-4">

                {/* About + Contact Box */}
                <div className="w-full border-t border-white/30 pt-6 flex flex-col gap-3">
                  <Link
                    to="/about-us"
                    className="text-white font-semibold text-lg hover:text-pink-500 transition-colors"
                  >
                    About Us
                  </Link>
                  <Link
                    to="/contact-us"
                    className="text-white font-semibold text-lg hover:text-pink-500 transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>

                {/* Profile Box */}
                <div className="w-full border-t border-white/30 pt-6">
                  <Link
                    to="/profile"
                    className="text-white font-semibold text-lg hover:text-pink-500 transition-colors"
                  >
                    My Profile
                  </Link>
                </div>

                {/* Logout Box */}
                <div className="w-full border-t border-white/30 pt-6">
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className="w-full bg-gradient-to-r from-red-500 via-rose-600 to-rose-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:from-red-700 hover:to-red-900 transition"
                  >
                    Logout
                  </button>
                </div>

              </div>
            </div>
          </>
        )}
      </nav>

      {/* Logout Modal */}
      {showLogoutModal && (
        <Logout
          onConfirm={handleLogoutConfirm}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}

      {/* Goodbye Toast */}
      {showToast && (
        <Toast
          message="👋 You’ve been logged out successfully!"
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
};

export default Navbar;