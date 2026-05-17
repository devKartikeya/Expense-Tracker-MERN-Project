const jwt = require("jsonwebtoken");
const { admin } = require("../services/admin.service");

const adminLogin = async (req, res) => {
    const { username, password } = req.body;
    console.log("Admin Login Attempt:", username, password);

    try {
        const result = await admin(username, password);
        if (result.flag === "success") {
            const token = jwt.sign({ username, role: "admin" }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
            res.cookie("adminToken", token, { httpOnly: true, secure: false, sameSite: "Lax" });
            return res.json({ flag: "success", message: "Admin authenticated" });
        } else {
            return res.json({ flag: "fail", message: result.message || "Authentication failed" });
        }
    } catch (error) {
        console.error("Admin Login Error:", error);
        res.status(500).json({ flag: "fail", message: "Server error" });
    }
}

module.exports = {
    adminLogin
}