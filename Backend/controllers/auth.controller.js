const mongoose = require('mongoose');
const { register, login } = require('../services/auth.service');
const { exists } = require('../models/users.model');

async function authRegister(req, res) {
    const { username, password } = req.body;

    try {
        const user = await register(username, password);
        console.log("Registration result in controller");
        if (user.flag === 'failure') {
            res.status(400).json({ message: user.message, flag: user.flag });
        } else {
            res.cookie('token', user.token, { httpOnly: true, sameSite: 'Lax' });
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
            res.cookie('token', user.token, { httpOnly: true, sameSite: 'Lax' });
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
        secure: false,   // true in production with HTTPS
        sameSite: "Lax"  // or "None" if frontend/backend are on different domains
    });
    res.json({ message: "Logged out successfully" });
}

module.exports = {
    authRegister,
    authLogin,
    authCheckLogin,
    authLogout
};