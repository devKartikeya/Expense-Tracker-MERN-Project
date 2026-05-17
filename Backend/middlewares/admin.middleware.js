const jwt = require('jsonwebtoken');

function checkAdmin(req, res, next) {
    const token = req.cookies.adminToken;
    if (!token) return res.status(403).json({ message: "No token provided" });
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err || decoded.role !== "admin") {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.admin = decoded;
        next();
    });
}


module.exports = {
    checkAdmin
}