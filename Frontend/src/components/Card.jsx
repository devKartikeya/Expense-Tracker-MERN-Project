import React from "react";

const Card = ({ title, value, icon, className, onClick, id }) => {
  return (
    <div id={id}
      className={`flex flex-col sm:flex-row items-center justify-between p-6 rounded-lg shadow-lg ${className}`}
      onClick={onClick}
    >
      <div className="text-center sm:text-left">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <p className="text-2xl font-bold mt-2 text-yellow-300">{value}</p>
      </div>
      {icon && <div className="text-3xl text-white mt-4 sm:mt-0">{icon}</div>}
    </div>
  );
};

export default Card;
