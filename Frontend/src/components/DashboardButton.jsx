import React from 'react'

const Button = ({ onClick, command, bgColor }) => {
    return (
        <button
            className="h-12 md:w-[130px] w-[130px] bg-gradient-to-r from-pink-400 to-pink-600 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl cursor-pointer transition-transform duration-300 ease-in-out md:my-5 my-3 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600"
            onClick={onClick}
        >
            {command}
        </button>
    )
}

export default Button