import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from './Button';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logout from './Logout';
import Toast from './Toast';

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

  return (
    <>
      <nav className="bg-blue-800 p-3 font-poppins flex justify-between items-center shadow-lg relative">
        {/* App Name */}
        <h1 className="text-2xl font-bold text-white">
          <Link to="/about-us">Xpense Tracker</Link>
        </h1>

        {/* Welcome */}
        <h1 className="hidden md:block text-xl font-semibold text-yellow-300">
          Welcome, {username}!
        </h1>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-5">
          {profileMode ? (
            <>
              <Button command="About Us" onClick={goToAbout} />
              <Button command="Contact Us" onClick={goToContact} />
            </> 
          ) : (
            <>
              <Button command="Dashboard" onClick={goToDashboard} />
              <Button command="Add Expense" onClick={goToExpense} />
            </>
          )}
          <Button command="Profile" onClick={goToProfile} />
          <Button command="Logout" onClick={() => setShowLogoutModal(true)} />
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
          <div className="absolute top-full left-0 w-full bg-blue-700 flex flex-col items-center gap-4 py-4 md:hidden shadow-lg">
            {profileMode ? (
              <>
                <Button command="About Us" onClick={goToAbout} />
                <Button command="Contact Us" onClick={goToContact} />
              </>
            ) : (
              <>
                <Button command="Dashboard" onClick={goToDashboard} />
                <Button command="Add Expense" onClick={goToExpense} />
              </>
            )}
            <Button command="Profile" onClick={goToProfile} />
            <Button command="Logout" onClick={() => setShowLogoutModal(true)} />
          </div>
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
