const http = require('http');
const { getConversations } = require('./controller/conversationController')

const conversations = require('./data/conversations.json')

const server = http.createServer((req, res) => {
    if (req.method === "POST" && req.url === '/login') {
        getConversations(req, res)
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Route not found' }))
    }

});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`server running  on port ${PORT}`))