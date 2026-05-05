import React from "react";

const Card = ({ title, value, icon, className }) => {
  return (
    <div
      className={`flex items-center p-6 rounded-lg shadow-lg ${className}`}
    >
      <div>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <p className="text-2xl font-bold mt-2 text-yellow-300">{value}</p>
      </div>
      {icon && <div className="text-3xl text-white">{icon}</div>}
    </div>
  );
};

export default Card;
