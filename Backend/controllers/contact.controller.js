const { saveContactMessage } = require("../services/contact.service");

const contactController = async (req, res) => {
    try {
        const { username, email, message } = req.body;

        if (!username || !email || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const saved = await saveContactMessage({ username, email, message });
        res.json({ message: "Message received successfully", data: saved });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { contactController };
