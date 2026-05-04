import React from "react";

const Input = React.forwardRef(({ placeholder, type, ...rest }, ref) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      ref={ref}
      {...rest}
      className="w-4/5 h-14 rounded-2xl text-black bg-white font-bold pl-5 border-2 border-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-300 outline-none transition duration-300 ease-in-out"
    />
  );
});

export default Input;
