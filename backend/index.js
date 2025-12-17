const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config(); // load .env

const app = express();

// Port
const PORT = process.env.PORT || 5000;


// Connect Database
connectDB();





// Middlewares
app.use(cors());
app.use(express.json());



// Test route
app.get("/", (req, res) => {
  res.send("🚀 Backend + MongoDB server is running!");
});








app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
