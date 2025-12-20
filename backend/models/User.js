
// structure of data jo store karna hai 
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    aadhaarEncrypted: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      default: 1000   // initial balance  
    }


  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
