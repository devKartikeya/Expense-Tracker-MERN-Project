import React from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    let response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
      credentials: "include", // Important for cookie handling
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
            // fallback: show a general error
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
      });
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 flex justify-center items-center w-screen h-screen text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-auto w-1/3 flex flex-col items-center gap-4 bg-gradient-to-br from-blue-700 to-cyan-600 rounded-3xl shadow-2xl p-5"
      >
        <h1 className="text-4xl font-extrabold tracking-wide text-white">Login</h1>

        {/* Username */}
        <Input
          placeholder="Enter your Username"
          type="text"
          {...register("username", {
            required: "Username is required",
          })}
        />
        <div className="h-5">
          {errors.username && (
            <p className="text-red-500 text-md font-bold transition-opacity duration-300">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Password */}
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
        <div className="h-5">
          {errors.password && (
            <p className="text-red-500 text-md font-bold transition-opacity duration-300">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Button */}
        <Button command="Login" />

        <p className="text-sm mt-4">
          Don’t have an account?{" "}
          <Link
            to="/"
            className="text-pink-300 hover:text-pink-200 font-semibold underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
