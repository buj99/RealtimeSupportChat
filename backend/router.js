//Importing Routes

const { registerUser, loginUser } = require("./routes/authRout");

//Router Function
const router = (req, res) => {
  const urlComponents = req.url.split("/");
  switch (urlComponents[1]) {
    case "auth":
      switch (urlComponents[2]) {
        case "login":
          loginUser(req, res);
          break;
        case "register":
          registerUser(req, res);
          break;

        default:
          res.statusCode = 404;
          res.end(
            JSON.stringify({ message: `Route ${req.url} doesn't exist` })
          );
          break;
      }
      break;
    default:
      res.statusCode = 404;
      console.log(urlComponents);
      res.end(JSON.stringify({ message: `Route ${req.url} doesn't exist` }));
      break;
  }
};

module.exports.router = router;
