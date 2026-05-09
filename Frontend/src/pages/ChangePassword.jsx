import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FiLock } from "react-icons/fi";

const ChangePassword = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setMessage("");
    try {
      const res = await fetch("https://expense-tracker-mern-project-g2yt.onrender.com/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const result = await res.json();
      setMessage(result.message);
        if (res.ok) {
            setTimeout(() => navigate("/profile"), 1000);
        }
    } catch (err) {
      setMessage("Server error. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
      {/* App Name */}
      <h1 className="text-4xl font-extrabold text-white drop-shadow-lg mb-6">
        Xpense Tracker
      </h1>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white/90 backdrop-blur-md rounded-xl shadow-2xl p-8 w-[90%] sm:w-[420px] flex flex-col gap-6 animate-fadeIn"
      >
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-center">
          Change Password
        </h2>
        <p className="text-gray-600 text-center text-sm">
          Secure your account by updating your password.
        </p>

        {/* Old Password */}
        <div className="relative">
          <FiLock className="absolute left-3 top-3 text-gray-400" />
          <input
            type="password"
            placeholder="Old Password"
            {...register("oldPassword", { required: "Old password is required" })}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.oldPassword && (
            <p className="text-red-500 text-xs mt-1 font-semibold">{errors.oldPassword.message}</p>
          )}
        </div>

        {/* New Password */}
        <div className="relative">
          <FiLock className="absolute left-3 top-3 text-gray-400" />
          <input
            type="password"
            placeholder="New Password"
            {...register("newPassword", {
              required: "New password is required",
              minLength: { value: 6, message: "At least 6 characters" },
            })}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.newPassword && (
            <p className="text-red-500 text-xs mt-1 font-semibold">{errors.newPassword.message}</p>
          )}
        </div>

        {/* Feedback */}
        {message && (
          <p
            className={`text-center text-sm font-medium ${
              message.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`h-12 w-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-semibold shadow-lg transition-transform duration-300 ease-in-out ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
          }`}
        >
          {isSubmitting ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
