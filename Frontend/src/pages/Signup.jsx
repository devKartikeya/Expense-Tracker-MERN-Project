import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [ checkingUsername, setCheckingUsername] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
        credentials: "include", // Important for cookie handling
      });

      const result = await response.json();

      if (result.flag === "success") {
        navigate("/dashboard");
      } else {
        if (result.message === "Invalid password") {
          setError("password", {
            type: "server",
            message: "Invalid password",
          });
        } else if (result.message === "User already exists") {
          setError("username", {
            type: "server",
            message: "User already exists",
          });
        } else if (result.message === "All fields are required") {
          setError("username", {
            type: "server",
            message: "All fields are required",
          });
          setError("password", {
            type: "server",
            message: "All fields are required",
          });
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
      const response = await fetch("http://localhost:3000/check-username", {
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
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 flex justify-center items-center w-screen h-screen text-white">
      <form id="signup-form"
        onSubmit={handleSubmit(onSubmit)}
        className="h-3/4 w-1/3 flex flex-col items-center justify-evenly gap-4 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl shadow-2xl p-3"
      >
        <h1 className="text-4xl font-extrabold tracking-wide text-white">Register</h1>

        {/* Username */}
        <Input
          placeholder="Enter your Username"
          type="text"
          {...register("username", { required: "Username is required" })}
          onBlur={checkUsernameAvailable} // 🔹 live check
        />
        <div className="h-5">
          {errors.username && (
            <p className="text-red-500 text-md font-bold">{errors.username.message}</p>
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
            <p className="text-red-500 text-md font-bold">{errors.password.message}</p>
          )}
        </div>

        {/* Button */}
        <Button command="Register" />

        <p className="text-md">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-300 font-semibold underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
