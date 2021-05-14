const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema({
  admin_id: {
    type: String,
    requered: true,
  },
  messages: {
    type: Array,
  },
  last_message: {
    type: String,
  },
  admin_acces_token:{
    type:String,
  }
});
module.exports = mongoose.model("Conversation", ConversationSchema);