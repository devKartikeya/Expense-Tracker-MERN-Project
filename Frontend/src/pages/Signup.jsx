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
    watch
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
    <div className="bg-gradient-to-br bg-black flex flex-col sm:flex-row sm:justify-evenly items-center w-screen min-h-screen text-white p-2">
      <img
        src="/Copilot_20260603_103749.png"
        alt="Xpense Tracker Logo"
        width={330}
        className="sm:w-[580px] sm:h-[580px] object-contain bg-black"
      />
      <form
        id="signup-form"
        onSubmit={handleSubmit(onSubmit)}
        className="w-[95%] sm:w-[60%] flex flex-col items-center justify-center gap-4 sm:gap-6 bg-black rounded-3xl shadow-2xl px-4 sm:px-6 py-2 sm:py-6 overflow-y-auto"
      >

        {/* Title */}
        <h2 className="text-center font-bold drop-shadow-lg md:my-5 my-3">
          <span className="block md:inline text-7xl sm:text-7xl m-2 text-white">Create</span>
          <span className="block md:inline text-6xl sm:text-7xl sm:ml-2 m-1 text-white">Account</span>
        </h2>

        {/* Username */}
        <div className="w-full">
          <Input
            placeholder="Username"
            type="text"
            {...register("username", { required: "Username is required" })}
            onBlur={checkUsernameAvailable}
          />
          {checkingUsername && (
            <p className="text-sm text-yellow-300 mt-2">Checking availability...</p>
          )}
          {errors.username && (
            <p className="text-red-400 text-sm font-semibold mt-3 sm:ml-4 ml-3">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="w-full">
          <Input
            placeholder="Password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              validate: {
                hasUpper: (value) =>
                  /[A-Z]/.test(value) || "Must include at least one uppercase letter",
                hasLower: (value) =>
                  /[a-z]/.test(value) || "Must include at least one lowercase letter",
                hasNumber: (value) =>
                  /\d/.test(value) || "Must include at least one number",
                hasSpecial: (value) =>
                  /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                  "Must include at least one special character",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-400 text-sm font-semibold mt-3 sm:ml-4 ml-3">
              {errors.password.message}
            </p>
          )}
        </div>

        {watch("password") && (
          <p className="text-xs mt-2 text-gray-200">
            Strength: {watch("password").length >= 12 ? "Strong ✅" : "Weak ⚠️"}
          </p>
        )}

        {/* Button */}
        <Button
          command="Register"
          className="py-3 w-full rounded-xl transition duration-300 shadow-md"
          from_bg="blue-500"
          hover_from="blue-500"
          hover_to="blue-700"
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
          By continuing, you agree to our{" "}
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