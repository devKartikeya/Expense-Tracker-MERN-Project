import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [checkingEmail, setCheckingEmail] = useState(false);

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
          email: data.email,
          password: data.password,
        }),
        credentials: "include", // Important for cookie handling
      });

      const result = await response.json();

      if (result.flag === "success") {
        navigate("/home");
      } else {
        if (result.message === "Invalid password") {
          setError("password", {
            type: "server",
            message: "Invalid password",
          });
        } else if (result.message === "Invalid email format") {
          setError("email", {
            type: "server",
            message: "Invalid email format",
          });
        } else if (result.message === "User already exists") {
          setError("email", {
            type: "server",
            message: "User already exists",
          });
        } else if (result.message === "All fields are required") {
          setError("username", {
            type: "server",
            message: "All fields are required",
          });
          setError("email", {
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
      setError("email", {
        type: "server",
        message: "Server error. Please try later.",
      });
    }
  };

  // 🔹 Email uniqueness check on blur
  const checkEmailAvailable = async (e) => {
    const email = e.target.value;
    if (!email) return;

    setCheckingEmail(true);
    try {
      const response = await fetch("http://localhost:3000/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.exists) {
        setError("email", {
          type: "server",
          message: "User already exists",
        });
      } else {
        clearErrors("email");
      }
    } catch (error) {
      setError("email", {
        type: "server",
        message: "Error checking email availability",
      });
    } finally {
      setCheckingEmail(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 flex justify-center items-center w-screen h-screen text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-[95%] w-1/3 flex flex-col items-center gap-6 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl shadow-2xl p-5"
      >
        <h1 className="text-4xl font-extrabold tracking-wide text-white">Register</h1>

        {/* Username */}
        <Input
          placeholder="Enter your Username"
          type="text"
          {...register("username", { required: "Username is required" })}
        />
        <div className="h-5">
          {errors.username && (
            <p className="text-red-500 text-md font-bold">{errors.username.message}</p>
          )}
        </div>

        {/* Email */}
        <Input
          placeholder="Enter your Email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ ]+$/,
              message: "Invalid email format",
            },
          })}
          onBlur={checkEmailAvailable} // 🔹 live check
        />
        <div className="h-5">
          {checkingEmail && (
            <p className="text-yellow-300 text-md font-bold">Checking email...</p>
          )}
          {errors.email && (
            <p className="text-red-500 text-md font-bold">{errors.email.message}</p>
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

        <p className="text-md mt-4">
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
