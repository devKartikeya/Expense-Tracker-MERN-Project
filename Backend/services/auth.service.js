const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const User = require('../models/users.model');
const Expense = require("../models/expenses.model");
const Income = require("../models/income.model");
const { generateToken } = require('../utils/jwt.utils');
const { hashPassword, comparePassword } = require('../utils/bcrypt.utils');

async function register(username, password) {
    console.log('I am in the register service');
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        console.log('User already exists');
        return { message: 'User already exists', flag: 'failure' };
    }
    const hashedPassword = await hashPassword(password);
    const user = await User.create({ username, password: hashedPassword });
    const token = generateToken(user);
    console.log('Generated token:', token);
    return { user, token, flag: 'success' };
}

async function login(username, password) {
    const user = await User.findOne({ username });
    if (!user) {
        return { message: 'User not found', flag: 'failure' };
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
        return { message: 'Invalid password', flag: 'failure' };
    }
    const token = generateToken(user);
    return { user, token, flag: 'success' };
}

async function checkUser({ username }) {
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return { message: 'Username is already taken', flag: 'failure', exists: true };
        } else {
            return { message: 'Username is available', flag: 'success', exists: false };
        }
    } catch (error) {
        return { message: 'Error checking username availability', flag: 'failure' };
    }
}

async function deleteAccount(userId) {
    try {
        // Delete the user
        await User.findByIdAndDelete(userId);

        // Delete all expenses linked to this user
        await Expense.deleteMany({ userId });

        // Delete all incomes linked to this user
        await Income.deleteMany({ userId });

        return { message: "Account, expenses, and incomes deleted successfully" };
    } catch (error) {
        console.error("Error deleting account:", error);
        return { error: "Failed to delete account and related data" };
    }
}

async function changePassword(userId, oldPassword, newPassword) {
    try {
        // Find user from session (assuming you store userId in cookie/JWT)
        const user = await User.findById(userId);
        if (!user) return { message: "User not found", flag: "failure" };
        const isMatch = await comparePassword(oldPassword, user.password);
        if (!isMatch) {
            return { message: "Old password is incorrect", flag: "failure" };
        }
        user.password = await hashPassword(newPassword, 10);
        await user.save();

        return { message: "Password changed successfully", flag: "success" };
    } catch (err) {
        return { message: "Server error", flag: "failure" };
    }
}


module.exports = {
    register,
    login,
    checkUser,
    deleteAccount,
    changePassword
}