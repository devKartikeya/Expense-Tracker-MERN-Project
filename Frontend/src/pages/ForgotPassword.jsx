import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (data) => {
    setServerError("");
    setSuccessMessage("");

    try {
      const res = await fetch("http://localhost:3000/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setServerError(result.message || "Something went wrong.");
      } else {
        setSuccessMessage("Password reset link sent! Check your email.");
      }
    } catch (err) {
      setServerError("Server error. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white/90 backdrop-blur-md rounded-xl shadow-2xl p-8 w-[90%] sm:w-[420px] flex flex-col gap-5 animate-fadeIn"
      >
        <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-left">
          Xpense Tracker
        </h2>
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-center">
          Forgot Password
        </h2>
        <p className="text-gray-600 text-center text-sm">
          Enter your Username and Email to reset.
        </p>

        {/* Username */}
        <div className="relative">
          <FiUser className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Username"
            {...register("username", { required: "Username is required" })}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1 font-semibold">{errors.username.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="relative">
          <FiMail className="absolute left-3 top-3 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email address" },
            })}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 font-semibold">{errors.email.message}</p>
          )}
        </div>

        {/* Feedback messages */}
        {serverError && (
          <div className="text-red-600 text-sm font-medium text-center">{serverError}</div>
        )}
        {successMessage && (
          <div className="text-green-600 text-sm font-medium text-center">{successMessage}</div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`h-12 w-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-semibold shadow-lg transition-transform duration-300 ease-in-out ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
          }`}
        >
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
