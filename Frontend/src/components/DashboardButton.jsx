import React from 'react'

const DashboardButton = ({ onClick, command, bgColor }) => {
    return (
        <button
            className="h-12 md:w-[130px] w-[170px] bg-gradient-to-r from-pink-400 to-pink-600 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl cursor-pointer transition-transform duration-300 ease-in-out md:my-5 my-2 hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500"
            onClick={onClick}
        >
            {command}
        </button>
    )
}

export default DashboardButton