import React from "react";
import Navbar from "../components/Navbar";

const TermsAndConditions = ({ user }) => {
  return (
    <div id="terms-and-conditions" className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">

      {/* Terms Card */}
      <div className="flex justify-center items-center py-12">
        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-2xl p-10 w-[90%] sm:w-[800px] flex flex-col gap-8 animate-fadeIn">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-center">
            Terms & Conditions
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed text-center">
            Welcome to <span className="font-bold text-blue-600">Xpense Tracker</span>.
            By creating an account and using our services, you agree to the following terms and conditions.
          </p>

          {/* Sections */}
          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-semibold text-blue-700">1. Account Responsibility</h3>
              <p className="text-gray-600 mt-2">
                You are responsible for maintaining the confidentiality of your account credentials.
                Any activity under your account is your responsibility.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-blue-700">2. Acceptable Use</h3>
              <p className="text-gray-600 mt-2">
                You agree not to misuse Xpense Tracker for unlawful purposes, including but not limited to
                hacking, spamming, or unauthorized data access.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-blue-700">3. Data Accuracy</h3>
              <p className="text-gray-600 mt-2">
                The accuracy of expense data you enter is your responsibility.
                Xpense Tracker provides analytics based on the information you supply.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-blue-700">4. Service Availability</h3>
              <p className="text-gray-600 mt-2">
                While we strive to provide uninterrupted service, Xpense Tracker may experience downtime
                due to maintenance or unforeseen issues. We are not liable for any loss during such periods.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-blue-700">5. Limitation of Liability</h3>
              <p className="text-gray-600 mt-2">
                Xpense Tracker is a tool for personal finance management. We are not responsible for
                financial decisions made based on the app’s analytics.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-blue-700">6. Updates to Terms</h3>
              <p className="text-gray-600 mt-2">
                We may update these Terms & Conditions from time to time. Continued use of the app
                after updates indicates your acceptance of the revised terms.
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

export default TermsAndConditions;
