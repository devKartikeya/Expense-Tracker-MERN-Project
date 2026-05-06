import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ username }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    fetch("http://localhost:3000/logout", {
      method: "POST",
      credentials: "include"
    }).then(() => navigate("/login"));
  };

  const goToDashboard = () => navigate("/dashboard");
  const goToExpense = () => navigate("/expense");

  return (
    <nav className="bg-blue-800 p-3 font-poppins flex justify-between items-center shadow-lg relative">
      {/* App Name */}
      <h1 className="text-2xl font-bold text-white">Xpense Tracker</h1>

      {/* Welcome */}
      <h1 className="hidden md:block text-xl font-semibold text-yellow-300">
        Welcome, {username}!
      </h1>

      {/* Desktop Buttons */}
      <div className="hidden md:flex gap-5">
        <Button command="Dashboard" onClick={goToDashboard} />
        <Button command="Add Expense" onClick={goToExpense} />
        <Button command="Profile" />
        <Button command="Logout" onClick={handleLogout} />
      </div>

      {/* Hamburger Icon (mobile only) */}
      <div className="md:hidden text-white text-2xl cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-blue-700 flex flex-col items-center gap-4 py-4 md:hidden shadow-lg">
          <Button command="Dashboard" onClick={goToDashboard} />
          <Button command="Add Expense" onClick={goToExpense} />
          <Button command="Profile" />
          <Button command="Logout" onClick={handleLogout} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
