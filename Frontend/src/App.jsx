import React from "react";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import AboutUs from "./pages/About";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Expense from "./pages/Expense";
import ContactUs from "./pages/Contact";
import Expenses from "./pages/Expenses";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import Categories from "./pages/Categories";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import CategoryExpenses from "./pages/CategoryExpenses";
import ProtectedRoute from "./components/ProtectedRoute";
import MonthlyExpenses from "./components/MonthlyExpenses";
import TermsAndConditions from "./pages/TermsAndConditions";
import CategoryManagement from "./pages/CategoryManagement";
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
          path="/categories"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/category-expenses"
          element={
            <ProtectedRoute>
              <CategoryExpenses />
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
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-panel"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-categories"
          element={
            <ProtectedRoute>
              <CategoryManagement />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;