import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'

const Navbar = ({ username }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("http://localhost:3000/logout", {
      method: "POST",
      credentials: "include"
    })
      .then(() => {
        navigate("/login");
      });
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <nav className='bg-blue-800 p-2 font-poppins flex justify-between items-center shadow-lg'>
        <h1 className='text-2xl font-bold text-white'>Expense Tracker</h1>
        <h1 className='text-xl font-semibold text-yellow-300'>Welcome, {username}!</h1>
        <div className='flex gap-5'>
        <Button command="Dashboard" onClick={goToDashboard} />
        <Button command="Add Expense" />
        </div>
        <Button command="Profile"/>
        <Button command="Logout" onClick={handleLogout}/>
    </nav>
  )
}

export default Navbar
