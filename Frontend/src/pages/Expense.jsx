import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Expense = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        let response = await fetch("http://localhost:3000/expenses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(data)
        });
        let result = await response.json();
        console.log(result);
        if (response.ok) {
            navigate("/dashboard");
        }
    };

    const goBack = () => {
        window.history.back();
    };

    return (
        <div id="expense" className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-blue-600 to-blue-800">
            <form className="h-[90%] w-1/3 bg-white flex flex-col items-center justify-between rounded-3xl shadow-2xl p-6" onSubmit={handleSubmit(onSubmit)}>

                {/* Header */}
                <div className="w-full rounded-2xl py-4 flex justify-center items-center bg-blue-500 shadow-md">
                    <h1 className="text-3xl font-bold text-white">Add Expense</h1>
                </div>

                {/* Inputs */}
                <div className="flex flex-col gap-5 w-full px-4 mt-6">
                    <input
                        {...register("amount", { required: true })}
                        type="number"
                        placeholder="Amount"
                        className="border border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold bg-blue-100 text-gray-800 placeholder-gray-500"
                    />
                    <input
                        {...register("category", { required: true })}
                        type="text"
                        placeholder="Category"
                        className="border border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold bg-blue-100 text-gray-800 placeholder-gray-500"
                    />
                    <input
                        {...register("description")}
                        type="text"
                        placeholder="Description"
                        className="border border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold bg-blue-100 text-gray-800 placeholder-gray-500"
                    />
                    <input
                        {...register("date")}
                        type="date"
                        className="border border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold bg-blue-100 text-gray-800"
                    />
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-4 w-full px-4 mt-6">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md transition duration-300"
                    >
                        Add Expense
                    </button>
                    <button
                        type="button"
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 rounded-xl shadow-md transition duration-300"
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
