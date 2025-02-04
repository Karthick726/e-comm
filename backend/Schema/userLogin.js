const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
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
  otp: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});
//mongoose model
const signupModel = mongoose.model("signups", signupSchema);

module.exports = signupModel;
