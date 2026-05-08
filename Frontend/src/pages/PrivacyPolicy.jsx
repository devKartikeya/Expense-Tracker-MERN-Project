import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const PrivacyPolicy = ({ user }) => {
    return (
        <div id="privacy-policy" className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
            {/* Navbar
            <Navbar username={user?.username} profileMode={true} /> */}

            {/* Policy Card */}
            <div className="flex justify-center items-center py-12">
                <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-2xl p-10 w-[90%] sm:w-[800px] flex flex-col gap-8 animate-fadeIn">
                    <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-center">
                        Privacy Policy
                    </h2>

                    <p className="text-gray-700 text-lg leading-relaxed text-center">
                        At <span className="font-bold text-blue-600">Xpense Tracker</span>, your privacy is our top priority.
                        This Privacy Policy explains how we collect, use, and protect your information when you use our application.
                    </p>

                    {/* Sections */}
                    <div className="space-y-6">
                        <section>
                            <h3 className="text-xl font-semibold text-blue-700">Information We Collect</h3>
                            <ul className="list-disc list-inside text-gray-600 mt-2">
                                <li>Account Information: Username, email, and password (securely hashed).</li>
                                <li>Expense Data: Categories, amounts, descriptions, and dates of expenses you log.</li>
                                <li>Technical Data: Browser type, device info, and usage logs.</li>
                                <li>Contact Messages: Information you provide via the Contact Us form.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-blue-700">How We Use Your Information</h3>
                            <ul className="list-disc list-inside text-gray-600 mt-2">
                                <li>To provide and improve the expense tracking service.</li>
                                <li>To generate analytics such as monthly totals and spending trends.</li>
                                <li>To communicate with you (e.g., password reset emails, support responses).</li>
                                <li>To ensure account security and prevent unauthorized access.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-blue-700">Data Protection</h3>
                            <p className="text-gray-600 mt-2">
                                Passwords are stored securely using hashing algorithms. Sensitive data is transmitted over encrypted connections (HTTPS).
                                Access to your data is restricted to authorized personnel only.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-blue-700">Sharing of Information</h3>
                            <p className="text-gray-600 mt-2">
                                We do not sell or share your personal data with third parties for marketing purposes.
                                Data may only be shared if required by law or with trusted service providers strictly for app functionality.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-blue-700">Your Rights</h3>
                            <ul className="list-disc list-inside text-gray-600 mt-2">
                                <li>Access your personal data.</li>
                                <li>Request corrections or updates.</li>
                                <li>Delete your account and associated data permanently.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-blue-700">Cookies & Tracking</h3>
                            <p className="text-gray-600 mt-2">
                                Xpense Tracker may use cookies or local storage to maintain session information and improve user experience.
                                These are never used for advertising purposes.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-blue-700">Updates to Policy</h3>
                            <p className="text-gray-600 mt-2">
                                We may update this Privacy Policy from time to time. Any changes will be communicated via the app or email.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-blue-700">Contact Us</h3>
                            <p className="text-gray-600 mt-2">
                                If you have questions or concerns about this Privacy Policy, please reach out via the Contact Us page or email us at:
                                <span className="font-semibold text-purple-600">
                                    <Link to="/contact-us" className="flex items-center gap-2 hover:text-yellow-300 transition">
                                        devKartikeya2122002@gmail.com
                                    </Link>
                                </span>
                            </p>
                        </section>
                    </div>

                    {/* Author Credit */}
                    <div className="mt-8 text-center">
                        <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                            Crafted with ❤️ by Kartikeya Mishra
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
