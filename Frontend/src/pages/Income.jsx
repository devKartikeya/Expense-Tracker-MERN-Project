// src/pages/Income.jsx
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../categories"; // custom hook fetching categories

const Income = () => {
    const navigate = useNavigate();
    const { categoryArray } = useCategories();
    const { register, handleSubmit, setValue } = useForm();

    const [categoryInput, setCategoryInput] = useState("");
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [noMatchMessage, setNoMatchMessage] = useState(false);
    const [highlightIndex, setHighlightIndex] = useState(-1);

    useEffect(() => {
        if (noMatchMessage) {
            const timer = setTimeout(() => setNoMatchMessage(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [noMatchMessage]);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (categoryInput) {
                const filtered = categoryArray.filter((cat) =>
                    cat.name.toLowerCase().includes(categoryInput.toLowerCase())
                );
                setFilteredCategories(filtered);
                setNoMatchMessage(filtered.length === 0);
            } else {
                setFilteredCategories(categoryArray);
                setNoMatchMessage(false);
            }
            setHighlightIndex(-1);
        }, 300);
        return () => clearTimeout(handler);
    }, [categoryInput, categoryArray]);

    const onSubmit = async (data) => {
        let response = await fetch("https://expense-tracker-mern-project-g2yt.onrender.com/income", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(data),
        });
        let result = await response.json();
        console.log(result);
        if (response.ok) navigate("/dashboard");
    };

    const goBack = () => window.history.back();

    const handleKeyDown = (e) => {
        if (!showSuggestions) return;
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightIndex((prev) => (prev + 1) % filteredCategories.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightIndex((prev) => (prev - 1 + filteredCategories.length) % filteredCategories.length);
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

    const selectedIcon = categoryArray.find((c) => c.name === categoryInput)?.icon;

    return (
        <div
            id="income"
            className="w-screen min-h-screen flex justify-center items-center bg-gradient-to-br from-black via-purple-900 to-pink-700 p-4"
        >
            <form
                className="w-full sm:w-4/5 lg:w-1/3 bg-black/70 backdrop-blur-xl flex flex-col gap-6 rounded-2xl shadow-neon p-6 border border-pink-500/30"
                onSubmit={handleSubmit(onSubmit)}
            >
                {/* Header */}
                <div className="w-full rounded-xl py-3 flex justify-center items-center bg-gradient-to-r from-purple-700 to-pink-600 shadow-md">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">Add Income</h1>
                </div>

                {/* Inputs */}
                <div className="flex flex-col gap-4 w-full">
                    <input
                        {...register("amount", { required: true })}
                        type="number"
                        placeholder="Amount"
                        className="border border-pink-500/40 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500 font-semibold bg-black/60 text-white placeholder-gray-400"
                    />

                    {/* Smart Category Input */}
                    <div className="relative">
                        <div className="flex items-center gap-2 border border-pink-500/40 rounded-xl bg-black/60 px-4 py-3 focus-within:ring-2 focus-within:ring-pink-500">
                            {categoryInput ? (
                                <span className="flex items-center gap-2 bg-purple-700/50 px-3 py-1 rounded-full text-white font-semibold">
                                    {selectedIcon}
                                    {categoryInput}
                                </span>
                            ) : (
                                <span className="text-gray-400">Category</span>
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
                            <ul className="absolute z-10 w-full bg-black/90 border border-pink-500/40 rounded-xl mt-1 shadow-lg max-h-40 overflow-y-auto">
                                {filteredCategories.length > 0 ? (
                                    filteredCategories.map((cat, idx) => (
                                        <li
                                            key={idx}
                                            onClick={() => {
                                                setCategoryInput(cat.name);
                                                setValue("category", cat.name);
                                                setShowSuggestions(false);
                                            }}
                                            className={`flex items-center gap-2 px-4 py-2 cursor-pointer transition ${highlightIndex === idx ? "bg-purple-700/50" : "hover:bg-purple-900/40"
                                                } text-white`}
                                        >
                                            {cat.icon}
                                            <span>{cat.name}</span>
                                        </li>
                                    ))
                                ) : (
                                    noMatchMessage && (
                                        <li className="px-4 py-2 text-gray-400">
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
                        className="border border-pink-500/40 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500 font-semibold bg-black/60 text-white placeholder-gray-400"
                    />
                    <input
                        {...register("date")}
                        type="date"
                        className="border border-pink-500/40 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500 font-semibold bg-black/60 text-white"
                    />
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-4 w-full mt-4">
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-800 hover:to-pink-700 text-white font-bold py-3 rounded-xl shadow-md transition duration-300 cursor-pointer"
                    >
                        Add Income
                    </button>
                    <button
                        type="button"
                        className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 rounded-xl shadow-md transition duration-300 cursor-pointer"
                        onClick={goBack}
                    >
                        Go Back
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Income;