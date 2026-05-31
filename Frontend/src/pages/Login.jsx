import React from "react";
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
        <div id="login-form" className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 flex justify-center items-center w-screen h-screen text-white">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-[90%] md:w-[30%] flex flex-col items-center gap-6 bg-gradient-to-br from-blue-700 to-cyan-600 rounded-3xl shadow-2xl p-8"
          >
            {/* App Name */}
            {/* App Name with Logo */}
            <div className="flex items-center gap-2 justify-center w-full">
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
            <h2 className="text-4xl font-extrabold tracking-wide text-white drop-shadow-lg">
              Welcome Back
            </h2>


            {/* Username */}
            <div className="w-full">
              <Input
                placeholder="Enter your Username"
                type="text"
                {...register("username", { required: "Username is required" })}
              />
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
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
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
              command="Login"
              className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-700 transition duration-300 shadow-md"
            />

            {/* Footer */}
            <p className="text-sm mt-2 text-gray-200">
              Don’t have an account?{" "}
              <Link
                to="/"
                className="text-pink-300 hover:text-pink-200 font-semibold"
              >
                Register
              </Link>
            </p>
            <p className="text-sm text-gray-200">
              Forgot your password?{" "}
              <Link
                to="/reset-password"
                className="text-pink-300 hover:text-pink-200 font-semibold"
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