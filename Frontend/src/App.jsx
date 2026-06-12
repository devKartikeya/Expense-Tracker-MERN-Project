import React from "react";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Error from "./pages/Error";
import AboutUs from "./pages/About";
import Signup from "./pages/Signup";
import Income from "./pages/Income";
import AdminX from "./pages/AdminX";
import Profile from "./pages/Profile";
import Expense from "./pages/Expense";
import Incomes from "./pages/Incomes";
import ContactUs from "./pages/Contact";
import Expenses from "./pages/Expenses";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import Categories from "./pages/Categories";
import Transactions from "./pages/Transactions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import MonthlyIncome from "./components/MonthlyIncome";
import CategoryExpenses from "./pages/CategoryExpenses";
import ProtectedRoute from "./components/ProtectedRoute";
import MonthlyExpenses from "./components/MonthlyExpenses";
import TermsAndConditions from "./pages/TermsAndConditions";
import CategoryManagement from "./pages/CategoryManagement";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

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
          path="/home"
          element={
            <Home />
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
          path="/income"
          element={
            <ProtectedRoute>
              <Income />
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
          path="/incomes"
          element={
            <ProtectedRoute>
              <Incomes />
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
          path="/monthly-incomes"
          element={
            <ProtectedRoute>
              <MonthlyIncome />
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

            <ContactUs />
          }
        />
        <Route
          path="/about-us"
          element={
           
              <AboutUs />
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
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          }
        />
        <Route path="/admin-x/:username" element={
          <ProtectedRoute>
            <AdminX />
          </ProtectedRoute>
        } />
        <Route path="*" element={
          <Error />
        } />
      </Routes>
    </Router>
  );
};

export default App;