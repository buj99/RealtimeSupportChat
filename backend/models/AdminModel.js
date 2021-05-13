const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    requered: true,
    max: 255,
    min: 4,
  },
  password: {
    type: String,
    requered: true,
    max: 255,
    min: 4,
  },
  conversations: {
    type: Array,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Admin", AdminSchema);
