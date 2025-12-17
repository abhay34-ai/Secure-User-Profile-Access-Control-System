const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  try {
    const token = jwt.sign(
      { userId },                 // payload
      process.env.JWT_SECRET,     // secret key
      { expiresIn: "7d" }         // options
    );

    return token;
  } catch (error) {
    throw new Error("Token generation failed");
  }
};

module.exports = generateToken;
