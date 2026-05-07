import React from "react";
import Navbar from "../components/Navbar";
import { FiTarget, FiTrendingUp, FiShield, FiUser } from "react-icons/fi";

const AboutUs = ({ user }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
            {/* Navbar */}
            <Navbar username={user.username} profileMode={true} />

            {/* About Card */}
            <div className="flex justify-center items-center py-12">
                <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-2xl p-10 w-[90%] sm:w-[700px] flex flex-col gap-8 animate-fadeIn">
                    <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-center">
                        About Us
                    </h2>

                    <p className="text-gray-700 text-lg leading-relaxed text-center">
                        Welcome to <span className="font-bold text-blue-600">Xpense Tracker</span> —
                        your ultimate companion for managing finances with ease, clarity, and confidence.
                        We believe expense tracking should be more than numbers; it should empower you to
                        take control of your financial journey.
                    </p>

                    {/* Mission Section */}
                    <div className="grid sm:grid-cols-2 gap-6 mt-4">
                        <div className="flex flex-col items-center text-center p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg shadow-md">
                            <FiTarget className="text-blue-600 text-3xl mb-2" />
                            <h3 className="text-xl font-semibold text-blue-700">Our Mission</h3>
                            <p className="text-gray-600 text-sm mt-2">
                                To simplify financial management and help individuals achieve
                                their goals through smart tracking and insightful analytics.
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg shadow-md">
                            <FiTrendingUp className="text-purple-600 text-3xl mb-2" />
                            <h3 className="text-xl font-semibold text-purple-700">Our Vision</h3>
                            <p className="text-gray-600 text-sm mt-2">
                                A world where everyone feels confident about their money,
                                empowered by technology and guided by clarity.
                            </p>
                        </div>
                    </div>

                    {/* Values Section */}
                    <div className="flex flex-col sm:flex-row gap-6 mt-6">
                        <div className="flex-1 flex flex-col items-center text-center p-4 bg-gradient-to-r from-green-100 to-teal-100 rounded-lg shadow-md">
                            <FiShield className="text-green-600 text-3xl mb-2" />
                            <h3 className="text-xl font-semibold text-green-700">Trust</h3>
                            <p className="text-gray-600 text-sm mt-2">
                                Your data is secure, protected, and handled with the highest standards.
                            </p>
                        </div>

                        <div className="flex-1 flex flex-col items-center text-center p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg shadow-md">
                            <FiUser className="text-yellow-600 text-3xl mb-2" />
                            <h3 className="text-xl font-semibold text-yellow-700">User First</h3>
                            <p className="text-gray-600 text-sm mt-2">
                                Every feature is designed with you in mind — simple, intuitive, and powerful.
                            </p>
                        </div>
                    </div>

                    {/* Author Section */}
                    <div className="mt-8 text-center">
                        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                            Crafted with ❤️ by Kartikeya Mishra
                        </h3>
                        <p className="text-gray-600 mt-2 text-sm">
                            Passionate about building tools that make life easier, smarter, and more beautiful.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
