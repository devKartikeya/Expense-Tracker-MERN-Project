const mongoose = require('mongoose');
const { exists } = require('../models/users.model');
const { register, login, checkUser, deleteAccount, changePassword } = require('../services/auth.service');

async function authRegister(req, res) {
    const { username, password } = req.body;

    try {
        const user = await register(username, password);
        console.log("Registration result in controller");
        if (user.flag === 'failure') {
            res.status(400).json({ message: user.message, flag: user.flag });
        } else {
            res.cookie('token', user.token, { httpOnly: true, secure: true, sameSite: "none" });
            console.log(user.token);
            res.json({ message: 'User created successfully', user, flag: user.flag });
        }
    } catch (error) {
        res.status(400).json({ message: error.message, flag: 'failure' });
    }
}

async function authLogin(req, res) {
    const { username, password } = req.body;

    try {
        const user = await login(username, password);
        if (user.flag === 'failure') {
            res.status(400).json({ message: user.message, flag: user.flag });
        } else {
            res.cookie('token', user.token, { httpOnly: true, secure: true, sameSite: "none" });
            res.json({ message: 'Login successful', user: user.user, flag: user.flag });
        }
    } catch (error) {
        res.status(400).json({ message: error.message, flag: 'failure' });
    }
}

async function authCheckLogin(req, res) {
    res.json({ authenticated: true, user: req.user });
}

async function authLogout(req, res) {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,   // true in production with HTTPS
        sameSite: "none"  // or "None" if frontend/backend are on different domains
    });
    res.json({ message: "Logged out successfully" });
}

async function authCheckUser(req, res) {
    const { username } = req.body;
    try {
        const existingUser = await checkUser({ username });
        if (existingUser.exists === true) {
            res.json({ message: 'Username is already taken', flag: 'failure', exists: true });
        } else {
            res.json({ message: 'Username is available', flag: 'success', exists: false });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error checking username availability', flag: 'failure' });
    }
}

async function authDeleteAccount(req, res) {
    try {
        await deleteAccount(req.user.id);
        res.json({ message: "Account deleted successfully" });
    } catch (error) {
        console.error("Error deleting account:", error);
        res.status(500).json({ error: "Failed to delete account" });
    }
}

async function authChangePassword(req, res) {
    try {
        const userID = req.user.id;
        const { oldPassword, newPassword } = req.body;
        const response = await changePassword(userID, oldPassword, newPassword);
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    authRegister,
    authLogin,
    authCheckLogin,
    authLogout,
    authCheckUser,
    authDeleteAccount,
    authChangePassword
};