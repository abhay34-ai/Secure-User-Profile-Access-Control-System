const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

// Load environment variables
dotenv.config();

const app = express();

// Connect MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes


// Health check
app.get("/", (req, res) => {
  res.send("🚀 Secure User Profile API is running");
});

app.use("/api/auth", require("./routes/authRoutes"));



// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
