const allConversations = require("../data/conversations.json");

function findConversationsForUserName(userName) {
  return new Promise((resolve, reject) => {
    const conversations = allConversations.find((c) => c.admin === userName);
    resolve(conversations);
  });
}
function addNewAdmin(userName, password) {
  return new Promise((resolve, reject) => {
    const userNameMatches = allConversations.find(
      (adminObj) => adminObj.admin === username
    );
    if (!userNameMatches) {
      const adminAdded = allConversations.push({
        admin: userName,
        conversations: [],
      });

      resolve(adminAdded);
    } else {
      reject("Username exists");
    }
  });
}
module.exports = {
  findConversationsForUserName,
  addNewAdmin,
};
