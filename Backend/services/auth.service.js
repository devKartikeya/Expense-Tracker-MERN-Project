const mongoose = require('mongoose');
const User = require('../models/users.model');
const { hashPassword, comparePassword } = require('../utils/bcrypt.utils');
const { generateToken } = require('../utils/jwt.utils');

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

module.exports = {
    register,
    login,
    checkUser
}