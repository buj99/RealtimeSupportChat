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
  unique_chat_key: {
    type: String,
    requered: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  costumizations:{
    type :Object
  },
});

module.exports = mongoose.model("Admin", AdminSchema);
