const jwt = require("jsonwebtoken");

function generateToken(user) {
    console.log('Generating token for user:');
    const payload = {
        id: user._id,
        email: user.email,
        username: user.username
    };
    const secretKey = process.env.JWT_SECRET_KEY;
    const options = { expiresIn: '1h' };
    const token = jwt.sign(payload, secretKey, options);
    console.log(token);
    return token;
}

function verifyToken(token) {
    try {
        const secretKey = process.env.JWT_SECRET_KEY;
        const verifiedToken = jwt.verify(token, secretKey);
        return verifiedToken;
    } catch (error) {
        console.error("Token verification failed:", error);
        return null;
    }
}

module.exports = {
    generateToken,
    verifyToken
}