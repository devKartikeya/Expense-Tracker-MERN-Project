import React from "react";
import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    setLoading(true);
    let response = await fetch("https://expense-tracker-mern-project-g2yt.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.flag === "success") {
          console.log("Login successful:", result);
          navigate("/dashboard");
        } else {
          if (result.message === "Invalid password") {
            setError("password", {
              type: "server",
              message: "Password is incorrect",
            });
          } else if (result.message === "User not found") {
            setError("username", {
              type: "server",
              message: "No account found with this username",
            });
          } else {
            setError("username", {
              type: "server",
              message: "Login failed. Please try again.",
            });
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("username", {
          type: "server",
          message: "Server error. Please try later.",
        });
      })
      .finally(() => {
        // Always stop loading, success or error
        setLoading(false);
      });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div id="login-form" className="bg-gradient-to-br bg-black flex flex-col sm:flex-row sm:justify-evenly items-center w-screen min-h-screen text-white p-2">
          <div className="flex flex-col items-center gap-3">
            <img
              src="/Copilot_20260603_103749.png"
              alt="Xpense Tracker Logo"
              className="w-64 sm:w-[580px] sm:h-[580px] object-contain"
            />
            <h1 className="italic font-semibold text-white text-center relative sm:bottom-36 bottom-16 text-lg sm:text-xl">
              "Because Numbers tell Stories"
            </h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-[95%] sm:w-[60%] flex flex-col items-center justify-center gap-4 sm:gap-6 bg-black rounded-3xl shadow-2xl px-4 sm:px-6 py-2 sm:py-6 overflow-hidden"
          >
            {/* Title */}
            <h2 className="sm:text-7xl text-5xl font-bold  text-white drop-shadow-lg sm:my-4 my-2 ml-3">
              <span className="sm:text-8xl text-6xl"> Welcome </span>Back <span className="sm:text-7xl text-4xl font-bold text-pink-400">buddy</span>
            </h2>


            {/* Username */}
            <div className="w-full">
              <Input
                placeholder="Enter your Username"
                type="text"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <p className="text-red-400 text-sm font-semibold mt-3 sm:ml-4 ml-3">
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
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-400 text-sm font-semibold mt-3 sm:ml-4 ml-3">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Button */}
            <Button
              command="Login"
              className="w-full py-3 rounded-xl transition duration-300 shadow-md"
              from_bg="blue-500"
              hover_from="pink-500"
              hover_to="pink-700"
            />

            {/* Footer */}
            <p className="text-sm mt-1 text-gray-200">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-pink-300 hover:text-pink-200 underline font-semibold"
              >
                Register
              </Link>
            </p>
            <p className="text-sm text-gray-200">
              Forgot your password?{" "}
              <Link
                to="/reset-password"
                className="text-pink-300 hover:text-pink-200 underline font-semibold"
              >
                Reset Password
              </Link>
            </p>
          </form>
        </div>
      )}
    </>
  )
};

export default Login;