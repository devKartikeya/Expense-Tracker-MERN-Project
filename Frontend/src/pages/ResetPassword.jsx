import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { FiLock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [message, setMessage] = React.useState("");
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const res = await fetch(`https://expense-tracker-mern-project-g2yt.onrender.com/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: data.password }),
      });
      const result = await res.json();
      setMessage(result.message);
      if (res.ok) {
        setTimeout(() => navigate("/login"), 1000);
      }
    } catch (err) {
      setMessage("Server error. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white/90 backdrop-blur-md rounded-xl shadow-2xl p-8 w-[90%] sm:w-[420px] flex flex-col gap-6 animate-fadeIn"
      >
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-center">
          Set New Password
        </h2>
        <p className="text-gray-600 text-center text-sm">
          Enter a strong new password to secure your account.
        </p>

        {/* Password field */}
        <div className="relative">
          <FiLock className="absolute left-3 top-3 text-gray-400" />
          <input
            type="password"
            placeholder="New Password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "At least 6 characters" },
            })}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1 font-semibold">{errors.password.message}</p>
          )}
        </div>

        {/* Feedback messages */}
        {message && (
          <div
            className={`text-sm font-medium text-center ${
              message.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`h-12 w-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-semibold shadow-lg transition-transform duration-300 ease-in-out ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
          }`}
        >
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
