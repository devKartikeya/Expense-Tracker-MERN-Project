import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [checkingUsername, setCheckingUsername] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("https://expense-tracker-mern-project-g2yt.onrender.com/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
        credentials: "include",
      });

      const result = await response.json();

      if (result.flag === "success") {
        navigate("/dashboard", { state: { fromSignup: true } });
      } else {
        if (result.message === "Invalid password") {
          setError("password", { type: "server", message: "Invalid password" });
        } else if (result.message === "User already exists") {
          setError("username", { type: "server", message: "User already exists" });
        } else if (result.message === "All fields are required") {
          setError("username", { type: "server", message: "All fields are required" });
          setError("password", { type: "server", message: "All fields are required" });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setError("username", {
        type: "server",
        message: "Server error. Please try later.",
      });
    }
  };

  const checkUsernameAvailable = async (e) => {
    const username = e.target.value;
    if (!username) return;

    setCheckingUsername(true);
    try {
      const response = await fetch("https://expense-tracker-mern-project-g2yt.onrender.com/check-username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const result = await response.json();

      if (result.exists) {
        setError("username", {
          type: "server",
          message: "Username is already taken",
        });
      } else {
        clearErrors("username");
      }
    } catch (error) {
      setError("username", {
        type: "server",
        message: "Error checking username availability",
      });
    } finally {
      setCheckingUsername(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex justify-center items-center w-screen min-h-screen text-white p-2">
      <form
        id="signup-form"
        onSubmit={handleSubmit(onSubmit)}
        className="w-[95%] md:w-[30%] flex flex-col items-center gap-4 md:gap-6 bg-gradient-to-br from-blue-400 via-blue-700 to-blue-400 rounded-3xl shadow-2xl px-4 md:px-6 py-4 md:py-6 overflow-y-auto"
      >
        {/* App Name */}
        <div className="flex flex-col sm:flex-row items-center gap-2 justify-center w-full text-center">
          <img
            src="/xpense-logo.png"
            alt="Xpense Tracker Logo"
            className="w-28 h-28 sm:w-32 sm:h-32 object-contain"
          />
          <h1 className="text-2xl sm:text-3xl font-bold text-yellow-300 tracking-wide drop-shadow-md">
            Xpense Tracker
          </h1>
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide text-white drop-shadow-lg text-center">
          Create Account
        </h2>

        {/* Username */}
        <div className="w-full">
          <Input
            placeholder="Enter your Username"
            type="text"
            {...register("username", { required: "Username is required" })}
            onBlur={checkUsernameAvailable}
          />
          {checkingUsername && (
            <p className="text-sm text-yellow-300 mt-1">Checking availability...</p>
          )}
          {errors.username && (
            <p className="text-red-400 text-sm font-semibold mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="w-full">
          <Input
            placeholder="Enter your Password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            })}
          />
          {errors.password && (
            <p className="text-red-400 text-sm font-semibold mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Button */}
        <Button
          command="Register"
          className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-700 transition duration-300 shadow-md"
        />

        {/* Footer */}
        <p className="text-sm md:text-md text-gray-200 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-300 hover:text-blue-200 font-semibold underline"
          >
            Login
          </Link>
        </p>
        <p className="text-xs md:text-sm text-gray-200 text-center">
          Read our{" "}
          <Link
            to="/terms-conditions"
            className="text-blue-300 hover:text-blue-200 font-semibold underline"
          >
            Terms and Conditions
          </Link>
          <span> & </span>
          <Link
            to="/privacy-policy"
            className="text-blue-300 hover:text-blue-200 font-semibold underline"
          >
            Privacy Policy
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
