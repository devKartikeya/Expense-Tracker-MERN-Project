import React from "react";

const Logout = ({ onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-[90%] sm:w-[400px] animate-fadeIn">
                <h3 className="text-2xl font-bold text-blue-600 mb-4 text-center">
                    Confirm Logout
                </h3>
                <p className="text-gray-700 mb-6 text-center">
                    Are you sure you want to logout?
                </p>
                <div className="flex justify-center gap-4">
                    <button
                        className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg shadow-md hover:scale-105 transition-transform"
                        onClick={onConfirm}
                    >
                        Yes, Logout
                    </button>
                    <button
                        className="px-6 py-2 bg-gradient-to-r from-gray-400 to-gray-600 text-white rounded-lg shadow-md hover:scale-105 transition-transform"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Logout;
