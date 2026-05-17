import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import logo from "/xpense-logo.png";

const Admin = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await fetch("https://expense-tracker-mern-project-g2yt.onrender.com/admin-login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                credentials: "include",
            });

            const result = await response.json();
            if (result.flag === "success") {
                navigate("/admin-panel"); // redirect to actual Admin Panel
                alert("Admin authenticated! (Redirect to Admin Panel)");
                reset(); // clear form
            } else {
                alert(result.message || "Authentication failed. Try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Server error. Try again later.");
        }
    };

    return (
        <div id="admin" className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-black via-gray-900 to-black text-white">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-[90%] sm:w-[70%] md:w-[30%] bg-gray-800 rounded-2xl shadow-2xl p-6 flex flex-col gap-6 items-center border border-red-600/40"
            >
                {/* Logo + Title */}
                <div className="flex flex-col items-center gap-3">
                    <img
                        src={logo}
                        alt="Xpense Tracker Logo"
                        className="w-24 h-24 object-contain"
                    />
                    <FaLock className="text-red-500 text-4xl animate-pulse" />
                    <h1 className="text-2xl sm:text-3xl font-bold text-red-500 tracking-wide">
                        Admin Login
                    </h1>
                    <p className="text-sm text-gray-400 italic">Restricted Access Only</p>
                </div>

                {/* Inputs */}
                <input
                    {...register("username", { required: true })}
                    type="text"
                    placeholder="Admin Username"
                    className="w-full border border-gray-600 rounded-lg py-3 px-4 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <input
                    {...register("password", { required: true })}
                    type="password"
                    placeholder="Admin Password"
                    className="w-full border border-gray-600 rounded-lg py-3 px-4 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />

                {/* Button */}
                <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg shadow-md transition duration-300"
                >
                    Login
                </button>

                {/* Footer */}
                <p className="text-sm text-gray-400">
                    Not an admin?{" "}
                    <Link to="/login" className="text-red-400 underline">
                        Go to User Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Admin;
