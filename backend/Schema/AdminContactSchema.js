const mongoose = require("mongoose");

const adminaddedSchema = new mongoose.Schema({
  phoneIndia: {
    type: String,
    required: true,
  },

  whatsapp: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
});

module.exports = mongoose.model("contacts", adminaddedSchema);
