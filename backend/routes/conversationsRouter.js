const {
  sendMessage,
  getMessages,
  getConversationsList,
} = require("./messageRoute");

const { asignChat } = require("./asignchatRoute");

const conversations_admin = (pathParams, req, res) => {
  console.log(req.method);
  switch (req.method) {
    case "GET":
      getConversationsList(pathParams, req, res);
      break;
    case "POST":
      asignChat(pathParams, req, res);
      break;
    default:
      res.end("Bad method");
      break;
  }
};

const conversations_admin_chat = (pathParams, req, res) => {
  switch (req.method) {
    case "GET":
      getMessages(pathParams, req, res);
      break;
    case "POST":
      sendMessage(pathParams, req, res);
      break;
    default:
      break;
  }
};

module.exports.conversations_admin = conversations_admin;
module.exports.conversations_admin_chat = conversations_admin_chat;
