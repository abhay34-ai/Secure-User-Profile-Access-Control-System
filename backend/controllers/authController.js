const User = require("../models/User");
const bcrypt = require("bcryptjs");
const emailValidator = require("email-validator");
const generateToken = require("../config/token");
const { encrypt } = require("../utils/encrypt");

//  register controlller
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, aadhaar } = req.body;
    console.log("AADHAAR VALUE:", req.body.aadhaar);

    if (!name || !email || !password || !aadhaar) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!emailValidator.validate(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const aadhaarEncrypted = encrypt(aadhaar);
    console.log("AADHAAR VALUE:",aadhaarEncrypted);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      aadhaarEncrypted,
    });

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};






// login controller
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    if (!emailValidator.validate(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000
    });

    res.json({
      message: "Login successful",
      token
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};



// logout controller

exports.logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: false,     
      sameSite: "lax",
      expires: new Date(0) 
    });

    res.status(200).json({
      message: "Logout successful"
    });
  } catch (error) {
    res.status(500).json({
      message: "Logout failed",
      error: error.message,
    });
  }
};
