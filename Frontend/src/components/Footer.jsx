import React from "react";
import { Link } from "react-router-dom";
import { FiMail, FiInfo, FiGithub, FiLinkedin, FiShield } from "react-icons/fi";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-6 mt-10">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">

                {/* Left Section */}
                <div className="text-center md:text-left">
                    <h3 className="text-lg font-bold">Xpense Tracker</h3>
                    <p className="text-sm text-gray-200">
                        Manage your expenses with clarity and confidence.
                    </p>
                </div>

                {/* Middle Section - Links */}
                <div className="flex gap-6 text-sm">
                    <Link to="/about-us" className="flex items-center gap-2 hover:text-yellow-300 transition">
                        <FiInfo /> About Us
                    </Link>
                    <Link to="/contact-us" className="flex items-center gap-2 hover:text-yellow-300 transition">
                        <FiMail /> Contact Us
                    </Link>
                    <Link to="/privacy-policy" className="flex items-center gap-2 hover:text-yellow-300 transition">
                        <FiShield /> Privacy Policy
                    </Link>
                    <Link to="/terms-conditions" className="flex items-center gap-2 hover:text-yellow-300 transition">
                        <FiShield /> Terms & Conditions
                    </Link>
                </div>

                {/* Right Section - Socials */}
                <div className="flex gap-4">
                    <a
                        href="https://github.com/yourgithub"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-yellow-300 transition"
                    >
                        <FiGithub size={20} />
                    </a>
                    <a
                        href="https://linkedin.com/in/yourlinkedin"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-yellow-300 transition"
                    >
                        <FiLinkedin size={20} />
                    </a>
                </div>
            </div>

            {/* Bottom Line */}
            <div className="text-center text-xs text-gray-300 mt-6">
                Crafted with ❤️ by <span className="font-semibold text-yellow-300">Kartikeya Mishra</span> © {new Date().getFullYear()}
            </div>
        </footer>
    );
};

export default Footer;
