const jwt = require('jsonwebtoken');
const { verifyToken } = require('../utils/jwt.utils');

function checkSignUp(req, res, next) {
    const { username, password } = req.body;
    console.log("Received signup data:", { username, password });
    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required', flag: 'failure' });
        console.log("All fields are required");
    }
    else if (password.length < 6) {
        return res.status(400).json({ message: 'Invalid password', flag: 'failure' });
        console.log("Invalid password");
    }
    next();
}

function checkLogin(req, res, next) {
    const token = req.cookies.token; // cookie set during login/signup
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const decoded = verifyToken(token);
        req.user = decoded; // attach user info
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = {
    checkSignUp,
    checkLogin
}