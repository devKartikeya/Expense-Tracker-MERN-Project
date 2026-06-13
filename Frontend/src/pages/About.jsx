import React from "react";
import { FiTarget, FiTrendingUp, FiShield, FiUser } from "react-icons/fi";

const AboutUs = () => {
    return (
        <div
            id="about"
            className="pt-[100px] min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500"
        >
            <div className="max-w-7xl mx-auto w-[90%] bg-white/90 backdrop-blur-md rounded-xl shadow-2xl p-10 flex flex-col gap-12 animate-fadeIn">

                {/* Intro with Photo */}
                <div className="grid lg:grid-cols-2 gap-10 items-center">
                    <div>
                        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
                            About Xpense Tracker
                        </h2>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            Xpense Tracker is more than an app — it’s a vision to redefine
                            financial clarity. Inspired by the professionalism of global firms,
                            we combine enterprise‑grade security with intuitive design to
                            empower individuals and organizations.
                        </p>
                        <p className="text-gray-700 text-lg leading-relaxed mt-4">
                            Our platform is built on trust, innovation, and user‑centric
                            design. We believe finance should be transparent, insightful, and
                            empowering — not overwhelming.
                        </p>
                    </div>
                    <div className="flex justify-center flex-col items-center gap-4">
                        <img
                            src="/Profile.jpeg" // replace with actual photo path
                            alt="Founder"
                            width={300}
                            className="rounded-xl shadow-lg max-w-md object-cover"
                        />
                        <p className="text-lg font-semibold">Founder - <span className="text-purple-600">Kartikeya Mishra</span></p>
                    </div>
                </div>

                {/* Mission & Vision */}
                <div className="grid sm:grid-cols-2 gap-6">
                    <div className="p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg shadow-md">
                        <FiTarget className="text-blue-600 text-3xl mb-2" />
                        <h3 className="text-xl font-semibold text-blue-700">Our Mission</h3>
                        <p className="text-gray-600 text-sm mt-2">
                            To simplify financial management and help individuals achieve
                            their goals through smart tracking and insightful analytics.
                        </p>
                    </div>
                    <div className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg shadow-md">
                        <FiTrendingUp className="text-purple-600 text-3xl mb-2" />
                        <h3 className="text-xl font-semibold text-purple-700">Our Vision</h3>
                        <p className="text-gray-600 text-sm mt-2">
                            A world where everyone feels confident about their money,
                            empowered by technology and guided by clarity.
                        </p>
                    </div>
                </div>

                {/* Company Story */}
                <div>
                    <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4 ">
                        Our Story
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        Founded with the belief that financial empowerment should be
                        accessible to all, Xpense Tracker has grown into a trusted platform
                        for professionals, students, and enterprises alike. We blend
                        cutting‑edge technology with human‑centered design, ensuring every
                        feature delivers clarity and confidence.
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed mt-4">
                        From smart tracking to insightful analytics, our journey is about
                        building tools that make life easier, smarter, and more beautiful.
                    </p>
                </div>

                {/* Why Choose Us */}
                <div className="mt-10">
                    <h3 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
                        Why Choose Us ?
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg shadow-md">
                            <h4 className="text-xl font-semibold text-blue-700">Secure & Reliable</h4>
                            <p className="text-gray-600 text-sm mt-2">
                                Your financial data is protected with strict authentication and modern encryption standards.
                            </p>
                        </div>
                        <div className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg shadow-md">
                            <h4 className="text-xl font-semibold text-purple-700">Intuitive Design</h4>
                            <p className="text-gray-600 text-sm mt-2">
                                A premium brutalist UI with glassmorphism and neon accents makes tracking finances engaging and easy.
                            </p>
                        </div>
                        <div className="p-6 bg-gradient-to-r from-green-100 to-teal-100 rounded-lg shadow-md">
                            <h4 className="text-xl font-semibold text-green-700">Insightful Analytics</h4>
                            <p className="text-gray-600 text-sm mt-2">
                                Smart charts, ledgers, and exportable reports give you clarity on spending and income trends.
                            </p>
                        </div>
                        <div className="p-6 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg shadow-md">
                            <h4 className="text-xl font-semibold text-yellow-700">Community Support</h4>
                            <p className="text-gray-600 text-sm mt-2">
                                We’re more than an app — we’re a growing community dedicated to financial empowerment.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Values */}
                <div className="grid sm:grid-cols-2 gap-6">
                    <div className="p-6 bg-gradient-to-r from-green-100 to-teal-100 rounded-lg shadow-md">
                        <FiShield className="text-green-600 text-3xl mb-2" />
                        <h3 className="text-xl font-semibold text-green-700">Trust</h3>
                        <p className="text-gray-600 text-sm mt-2">
                            Your data is secure, protected, and handled with the highest standards.
                        </p>
                    </div>
                    <div className="p-6 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg shadow-md">
                        <FiUser className="text-yellow-600 text-3xl mb-2" />
                        <h3 className="text-xl font-semibold text-yellow-700">User First</h3>
                        <p className="text-gray-600 text-sm mt-2">
                            Every feature is designed with you in mind — simple, intuitive, and powerful.
                        </p>
                    </div>
                </div>

                {/* Community Section */}
                <div className="mt-8">
                    <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                        Community & Support
                    </h3>
                    <p className="text-gray-600 mt-4 text-md">
                        Xpense Tracker is more than an app — it’s a growing community of people who value clarity in finance.
                        We’re here to support you with guides, updates, and a responsive helpline whenever you need help.
                    </p>
                </div>

                {/* Author */}
                <div className="mt-8">
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                        Crafted with ❤️ by Kartikeya Mishra
                    </h3>
                    <p className="text-gray-600 mt-2 text-sm">
                        Passionate about building tools that make life easier, smarter, and more beautiful.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;