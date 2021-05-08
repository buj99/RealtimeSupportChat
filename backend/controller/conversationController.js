const Conversation = require('../models/conversationModel')

//@desc Get all the conversations for the user with the name 'username
//@route POST/login/
async function getConversations(req, res) {
    try {

        // const credentialsFromBody = {
        //     userName: 'Emi',
        //     password: 'password'
        // }

        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString()
        })

        req.on('end', async() => {
            const { userName, password } = JSON.parse(body)

            const conversations = await Conversation.findConversationsForUserName(userName)

            if (!conversations) {
                res.writeHead(404, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ message: 'Conversations not found' }))
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify(conversations))
            }
        })



    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getConversations
}