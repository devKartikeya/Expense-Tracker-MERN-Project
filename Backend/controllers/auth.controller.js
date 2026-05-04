const mongoose = require('mongoose');
const { register, login, checkUser } = require('../services/auth.service');
const { exists } = require('../models/users.model');

async function authRegister(req, res) {
    const { username, email, password } = req.body;

    try {
        const user = await register(username, email, password);
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
    const { email, password } = req.body;

    try {
        const user = await login(email, password);
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

async function authCheckUser(req, res) {
    const { email } = req.body;

    try {
        const result = await checkUser(email);
        if (result.flag === 'failure') {
            res.json({ message: 'User already exists', flag: result.flag, exists: result.exists });
        } else {
            res.json({ message: 'Email is available', flag: result.flag, exists: result.exists });
        }
    } catch (error) {
        res.status(400).json({ message: error.message, flag: 'failure' });
    }
}

async function authCheckLogin(req, res) {
    res.json({ authenticated: true, user: req.user });
}

module.exports = {
    authRegister,
    authLogin,
    authCheckUser,
    authCheckLogin
}