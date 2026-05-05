import React from 'react'

const Button = ({ onClick, command }) => {
  return (
    <button 
      className="h-12 w-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl cursor-pointer transition-transform duration-300 ease-in-out"
      onClick={onClick}
    >
      {command}
    </button>
  )
}

export default Button
