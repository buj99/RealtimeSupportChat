const allConversations = require('../data/conversations.json')

function findConversationsForUserName(userName) {
    return new Promise((resolve, reject) => {
        const conversations = allConversations.find((c) => c.admin === userName)
        resolve(conversations)
    })
}

module.exports = {
    findConversationsForUserName
}