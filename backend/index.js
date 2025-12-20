const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,               
  })
);

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));


const transactionRoutes = require("./routes/transactionRoutes");
app.use("/api/transactions", transactionRoutes);



app.get("/", (req, res) => {
  res.send("Secure User Profile API is running");
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ message: "Invalid JSON input" });
  }
  next();
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
