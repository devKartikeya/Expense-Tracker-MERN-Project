import React from "react";

const Input = React.forwardRef(({ placeholder, type, ...rest }, ref) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      ref={ref}
      autoComplete="off"
      {...rest}
      className="md:w-[90%] h-14 rounded-2xl text-white font-semibold pl-5 border border-gray-100 focus:border-blue-400 focus:ring-2 md:ml-9 ml-3 focus:ring-blue-300 outline-none transition duration-300 ease-in-out"
    />
  );
});

export default Input;
