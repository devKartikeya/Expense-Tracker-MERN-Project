import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [message, setMessage] = React.useState("");

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`http://localhost:3000/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: data.password }),
      });
      const result = await res.json();
      setMessage(result.message);
    } catch (err) {
      setMessage("Server error. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-600">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg shadow-lg p-8 w-[90%] sm:w-[400px] flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-blue-700 text-center">Set New Password</h2>

        <input
          type="password"
          placeholder="Enter new password"
          {...register("password", { required: "Password is required", minLength: { value: 6, message: "At least 6 characters" } })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        {message && <p className="text-center text-sm font-medium">{message}</p>}

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

export default ResetPassword;
