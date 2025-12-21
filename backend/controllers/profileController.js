const User = require("../models/User");
const { decrypt } = require("../utils/encrypt");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const aadhaar = decrypt(user.aadhaarEncrypted);

    res.json({
      name: user.name,
      email: user.email,
      aadhaar,
      balance: user.balance,
      createdAt: user.createdAt,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch profile",
      error: error.message,
    });
  }
};
