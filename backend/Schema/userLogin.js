const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },

    phoneNumber: {
      type: String,
    },

    address: {
      doorno: String,
      street: String,
      landmark: String,
      area: String,
      district: String,
      state: String,
      pincode: String,
    },

    email: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    otp: { type: String, required: false },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  {
    timestamps: true,
  }
);
//mongoose model
const signupModel = mongoose.model("Users", signupSchema);

module.exports = signupModel;
