// src/pages/Expense.jsx
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../categories"; // custom hook fetching categories from backend

const Expense = () => {
  const navigate = useNavigate();
  const { categoryArray } = useCategories(); // dynamic categories
  const { register, handleSubmit, setValue } = useForm();

  const [categoryInput, setCategoryInput] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [noMatchMessage, setNoMatchMessage] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  // Auto-hide "no match" message
  useEffect(() => {
    if (noMatchMessage) {
      const timer = setTimeout(() => setNoMatchMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [noMatchMessage]);

  // Debounce filtering
  useEffect(() => {
    const handler = setTimeout(() => {
      if (categoryInput) {
        const filtered = categoryArray.filter((cat) =>
          cat.name.toLowerCase().includes(categoryInput.toLowerCase())
        );
        setFilteredCategories(filtered);

        if (filtered.length === 0) {
          setNoMatchMessage(true);
        } else {
          setNoMatchMessage(false);
        }
      } else {
        setFilteredCategories(categoryArray);
        setNoMatchMessage(false);
      }
      setHighlightIndex(-1);
    }, 300);

    return () => clearTimeout(handler);
  }, [categoryInput, categoryArray]);

  const onSubmit = async (data) => {
    let response = await fetch("https://expense-tracker-mern-project-g2yt.onrender.com/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    let result = await response.json();
    console.log(result);
    if (response.ok) {
      navigate("/dashboard");
    }
  };

  const goBack = () => window.history.back();

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev + 1) % filteredCategories.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex(
        (prev) => (prev - 1 + filteredCategories.length) % filteredCategories.length
      );
    } else if (e.key === "Enter") {
      if (highlightIndex >= 0 && filteredCategories[highlightIndex]) {
        e.preventDefault();
        const selected = filteredCategories[highlightIndex];
        setCategoryInput(selected.name);
        setValue("category", selected.name);
        setShowSuggestions(false);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  // Find icon for selected category
  const selectedIcon = categoryArray.find((c) => c.name === categoryInput)?.icon;

  return (
    <div
      id="expense"
      className="w-screen min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 p-2"
    >
      <form
        className="w-full sm:w-4/5 lg:w-1/3 bg-white flex flex-col gap-6 rounded-2xl shadow-2xl p-4 sm:p-6 overflow-y-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Header */}
        <div className="w-full rounded-xl py-3 flex justify-center items-center bg-blue-500 shadow-md sticky top-0 z-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Add Expense</h1>
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-4 w-full">
          <input
            {...register("amount", { required: true })}
            type="number"
            placeholder="Amount"
            className="border border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 text-black placeholder-gray-500"
          />

          {/* Smart Category Input */}
          <div className="relative">
            <div className="flex items-center gap-2 border border-gray-300 rounded-xl bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
              {categoryInput ? (
                <span className="flex items-center gap-2 bg-blue-200 px-3 py-1 rounded-full text-gray-800 font-semibold">
                  {selectedIcon}
                  {categoryInput}
                </span>
              ) : (
                <span className="text-gray-500">Category</span>
              )}
              <input
                {...register("category", { required: true })}
                type="text"
                value={categoryInput}
                onChange={(e) => {
                  setCategoryInput(e.target.value);
                  setValue("category", e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                className="absolute inset-0 opacity-0 cursor-text"
              />
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && categoryInput && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-xl mt-1 shadow-lg max-h-40 overflow-y-auto">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((cat, idx) => (
                    <li
                      key={idx}
                      onClick={() => {
                        setCategoryInput(cat.name);
                        setValue("category", cat.name);
                        setShowSuggestions(false);
                      }}
                      className={`flex items-center gap-2 px-4 py-2 cursor-pointer transition ${highlightIndex === idx ? "bg-blue-100" : "hover:bg-blue-50"
                        }`}
                    >
                      {cat.icon}
                      <span>{cat.name}</span>
                    </li>
                  ))
                ) : (
                  noMatchMessage && (
                    <li className="px-4 py-2 text-gray-500">
                      No matches, press Enter to add custom
                    </li>
                  )
                )}
              </ul>
            )}
          </div>

          <input
            {...register("description")}
            type="text"
            placeholder="Description"
            className="border border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold  text-gray-800 bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 placeholder-gray-500"
          />
          <input
            {...register("date")}
            type="date"
            className="border border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 text-gray-800"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 w-full mt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md transition duration-300 cursor-pointer"
          >
            Add Expense
          </button>
          <button
            type="button"
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 rounded-xl shadow-md transition duration-300 cursor-pointer"
            onClick={goBack}
          >
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default Expense;
