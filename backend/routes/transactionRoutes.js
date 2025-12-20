const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {transferAmount,getTransactionHistory} = require("../controllers/transactionController");

router.post("/transfer", authMiddleware, transferAmount);
router.get("/history", authMiddleware, getTransactionHistory);

module.exports = router;
