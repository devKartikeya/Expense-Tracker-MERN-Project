const { profileData, Profile, Budget } = require("../services/profile.service");

const getProfileData = async (req, res) => {
  try {
    const userID = req.user.id;
    const data = await profileData(userID);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

const profile = async (req, res) => {
  try {
    const userID = req.user.id;
    const data = await Profile(userID);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

const setBudget = async (req, res) => {
    try {
        const { budget } = req.body;
        const userId = req.user.id; // or however you track logged-in user
        const user = Budget(userId, budget);
        res.json({ message: "Budget updated successfully", user });
    } catch (err) {
        res.status(500).json({ error: "Failed to update budget" });
    }
};

module.exports = { getProfileData, profile, setBudget };
