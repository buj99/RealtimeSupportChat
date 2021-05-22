//Importing Routes
const {
  registerUser,
  loginUser,
  getUniqueChatKey,
} = require("./routes/authRout");
const { asignChat } = require("./routes/asignchatRoute");
const { sendMessage, getMessages } = require("./routes/messageRoute");
//Router Function
const router = async (req, res) => {
  //CORS SETUP
  res.setHeader("Access-Control-Allow-Origin", "*");

  //routing
  const urlComponents = req.url.split("/");
  switch (urlComponents[1]) {
    case "auth":
      switch (urlComponents[2]) {
        case "login":
          await loginUser(req, res);
          break;
        case "register":
          await registerUser(req, res);
          break;
        case "uniquechattoke":
          await getUniqueChatKey(req, res);
          break;

        default:
          res.statusCode = 404;
          res.end(
            JSON.stringify({ message: `Route ${req.url} doesn't exist` })
          );
          break;
      }
      break;
    case "asignchat":
      await asignChat(req, res);
      break;
    case "conversation":
      switch (req.method) {
        case "POST":
          await sendMessage(req, res);
          break;
        case "GET":
          await getMessages(req, res);
          break;
        default:
          break;
      }
      break;
    default:
      res.statusCode = 404;
      res.end(JSON.stringify({ message: `Route ${req.url} doesn't exist` }));
      break;
  }
};

module.exports.router = router;
