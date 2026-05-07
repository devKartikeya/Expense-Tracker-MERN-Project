const { profileData } = require("../services/profile.service");

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

module.exports = { getProfileData };
