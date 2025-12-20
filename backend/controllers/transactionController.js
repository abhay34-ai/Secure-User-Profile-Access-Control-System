const mongoose = require("mongoose");
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const AuditLog = require("../models/AuditLog");

// POST /api/transactions/transfer
exports.transferAmount = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const senderId = req.user.userId;
    const { receiverId, amount } = req.body;

    if (!receiverId || !amount) {
      return res.status(400).json({
        message: "Receiver ID and amount are required",
      });
    }
        const amountNumber = Number(amount); 


    if (amount <= 0) {
      return res.status(400).json({
        message: "Amount must be greater than zero",
      });
    }

    const sender = await User.findById(senderId).session(session);
    const receiver = await User.findById(receiverId).session(session);

    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Debit & credit
    sender.balance -= amountNumber;
    receiver.balance += amountNumber;

    await sender.save({ session });
    await receiver.save({ session });

    const transaction = await Transaction.create(
      [
        {
          sender: senderId,
          receiver: receiverId,
          amount:amountNumber,
          status: "SUCCESS",
        },
      ],
      { session }
    );

    await AuditLog.create({
      transactionId: transaction[0]._id,
      senderId,
      receiverId,
      amount,
      status: "SUCCESS",
    });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: "Transfer successful",
      balance: sender.balance,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({
      message: "Transaction failed",
      error: error.message,
    });
  }
};

// GET /api/transactions/history
exports.getTransactionHistory = async (req, res) => {
  try {
    const userId = req.user.userId;

    const transactions = await Transaction.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .sort({ createdAt: -1 })
      .populate("sender receiver", "name email");

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch transaction history",
      error: error.message,
    });
  }
}; 