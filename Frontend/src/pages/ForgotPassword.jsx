import React, { useState } from "react";
import { useForm } from "react-hook-form";

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
        setSuccessMessage("Password reset successful! You can now log in.");
      }
    } catch (err) {
      setServerError("Server error. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-600">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg shadow-lg p-8 w-[90%] sm:w-[400px] flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-blue-700 text-center">
          Reset Your Password
        </h2>

        {/* Username */}
        <div>
          <input
            type="text"
            placeholder="Enter your username"
            {...register("username", { required: "Username is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1 font-semibold">{errors.username.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email address" },
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 font-semibold">{errors.email.message}</p>
          )}
        </div>

        {/* New Password */}
        <div>
          <input
            type="password"
            placeholder="Enter new password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1 font-semibold">{errors.password.message}</p>
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
          className={`h-12 w-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg text-white font-semibold shadow-md transition-transform duration-300 ease-in-out ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
          }`}
        >
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
