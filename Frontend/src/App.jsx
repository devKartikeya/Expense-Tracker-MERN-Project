import React from "react";
import Login from "./pages/Login";
import AboutUs from "./pages/About";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Expense from "./pages/Expense";
import ContactUs from "./pages/Contact";
import Expenses from "./pages/Expenses";
import Dashboard from "./pages/Dashboard";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import ProtectedRoute from "./components/ProtectedRoute";
import TermsAndConditions from "./pages/TermsAndConditions";
import MonthlyExpenses from "./components/MonthlyExpenses";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expense"
          element={
            <ProtectedRoute>
              <Expense />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <Expenses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/monthly-expenses"
          element={
            <ProtectedRoute>
              <MonthlyExpenses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact-us"
          element={
            <ProtectedRoute>
              <ContactUs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about-us"
          element={
            <ProtectedRoute>
              <AboutUs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <PrivacyPolicy />
          }
        />
        <Route
          path="/terms-conditions"
          element={
            <TermsAndConditions />
          }
        />
        <Route path="/reset-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
};

export default App;