import React from "react";
import { useNavigate } from "react-router-dom";
import { FiAlertTriangle } from "react-icons/fi";

const Error = () => {
    const navigate = useNavigate();

    return (
        <div id="error" className="w-screen h-screen bg-black flex flex-col items-center justify-center text-white font-poppins">
            {/* Icon + Title */}
            <FiAlertTriangle className="text-6xl text-rose-500 mb-6 animate-pulse" />
            <h1 className="text-4xl font-extrabold mb-4">404 — Page Not Found</h1>
            <p className="text-gray-400 text-center max-w-md mb-8">
                Oops! The page you’re looking for doesn’t exist or has been moved.
                Please check the URL or return to the homepage.
            </p>

            {/* Action Buttons */}
            <div className="flex gap-4">
                <button
                    onClick={() => navigate("/")}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg"
                >
                    Go Home
                </button>
                <button
                    onClick={() => navigate(-1)}
                    className="bg-gradient-to-r from-rose-600 to-pink-600 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg"
                >
                    Go Back
                </button>
            </div>

            {/* Footer */}
            <p className="text-gray-600 text-xs mt-12">
                Crafted with ❤️ by Kartikeya Mishra
            </p>
        </div>
    );
};

export default Error;