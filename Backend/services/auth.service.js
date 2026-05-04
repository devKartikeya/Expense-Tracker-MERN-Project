const mongoose = require('mongoose');
const User = require('../models/users.model');
const { hashPassword, comparePassword } = require('../utils/bcrypt.utils');
const { generateToken } = require('../utils/jwt.utils');

async function register(username, email, password) {
    console.log('I am in the register service');
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        console.log('User already exists');
       return { message: 'User already exists', flag: 'failure' };
    }
    const hashedPassword = await hashPassword(password);
    const user = await User.create({ username, email, password: hashedPassword });
    const token = generateToken(user);
    console.log('Generated token:', token);
    return { user, token, flag: 'success' };
}

async function login(email, password) {
    const user = await User.findOne({ email });
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

async function checkUser(email) {
    const user = await User.findOne({ email });
    if (user) {
        return { exists: true, flag: 'failure' };
    } else {
        return { exists: false, flag: 'success' };
    }
}

module.exports = {
    register,
    login,
    checkUser
}