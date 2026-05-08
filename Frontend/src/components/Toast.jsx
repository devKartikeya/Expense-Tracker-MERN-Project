import React, { useEffect } from "react";

const Toast = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 1500); // auto close after 3s
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fadeIn">
            {message}
        </div>
    );
};

export default Toast;
