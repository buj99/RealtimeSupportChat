const allConversations = require("../data/conversations.json");

function findConversationsForUserName(userName) {
  return new Promise((resolve, reject) => {
    const conversations = allConversations.find((c) => c.admin === userName);
    resolve(conversations);
  });
}
function addNewAdmin(userName, password) {
  return new Promise((resolve, reject) => {
    const adminAdded = allConversations.push({
      admin: userName,
      conversations: [],
    });
    resolve(adminAdded);
  });
}
module.exports = {
  findConversationsForUserName,
  addNewAdmin,
};
