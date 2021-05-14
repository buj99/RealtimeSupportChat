//Importing Routes
const { registerUser, loginUser } = require("./routes/authRout");
const { asignChat } = require("./routes/asignchatRoute");
//Router Function
const router = async (req, res) => {
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
    default:
      res.statusCode = 404;
      res.end(JSON.stringify({ message: `Route ${req.url} doesn't exist` }));
      break;
  }
};

module.exports.router = router;
