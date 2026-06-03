import React from 'react'

const Button = ({ onClick, command, from_bg, to_bg, hover_from, hover_to }) => {
  return (
    <button
      className={`h-12 md:w-[90%] w-[95%] bg-gradient-to-r from-${from_bg} to-${to_bg} rounded-2xl text-white font-semibold shadow-lg hover:shadow-xl cursor-pointer transition-transform duration-300 ease-in-out md:my-5 my-3 hover:bg-gradient-to-r hover:from-${hover_from} hover:to-${hover_to}`}
      onClick={onClick}
    >
      {command}
    </button>
  )
}

export default Button