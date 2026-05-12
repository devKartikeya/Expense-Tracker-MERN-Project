import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import { FiUser, FiMail, FiMessageSquare } from "react-icons/fi";

const ContactUs = ({ user }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset} = useForm();
    const [feedback, setFeedback] = useState("");

    const onSubmit = async (data) => {
        try {
            const res = await fetch("https://expense-tracker-mern-project-g2yt.onrender.com/contact-us", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                credentials: "include"
            });
            const result = await res.json();
            if (res.ok) {
                setFeedback(result.message);
                reset();
            } else {
                setFeedback(result.message || "Error sending message");
            }
        } catch (err) {
            setFeedback("Server error. Please try again.");
        }
    };


    return (
        <div id="contact" className="min-h-screen pt-[100px] bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
            {/* Navbar */}
            <Navbar username={user.username} profileMode={true} />

            {/* Contact Card */}
            <div className="flex justify-center items-center py-12">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white/90 backdrop-blur-md rounded-xl shadow-2xl p-8 w-[90%] sm:w-[500px] flex flex-col gap-6 animate-fadeIn"
                >
                    <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-center">
                        Contact Us
                    </h2>
                    <p className="text-gray-600 text-center text-sm">
                        Have questions or feedback? Fill out the form below.
                    </p>

                    {/* Name */}
                    <div className="relative">
                        <FiUser className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Your Name"
                            {...register("username", { required: "Name is required" })}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.name && <p className="text-red-500 text-sm font-semibold mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <FiMail className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Your Email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                            })}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.email && <p className="text-red-500 text-sm font-semibold mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Message */}
                    <div className="relative">
                        <FiMessageSquare className="absolute left-3 top-3 text-gray-400" />
                        <textarea
                            placeholder="Your Message"
                            {...register("message", { required: "Message is required" })}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 h-28 resize-none"
                        ></textarea>
                        {errors.message && <p className="text-red-500 text-sm font-semibold mt-1">{errors.message.message}</p>}
                    </div>

                    {/* Feedback */}
                    {feedback && (
                        <p className="text-center text-sm font-medium text-green-600">
                            {feedback}
                        </p>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`h-12 w-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-semibold shadow-lg transition-transform duration-300 ease-in-out ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
                            }`}
                    >
                        {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
