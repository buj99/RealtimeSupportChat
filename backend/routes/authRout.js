const Admin = require("../models/AdminModel");
const registerUser = async (req, res) => {
  //verify if the corect method is used
  if (req.method != "POST") {
    res.statusCode = 405;
    return res.end(
      JSON.stringify({
        message: "This route can be used only using POST method",
      })
    );
  }

  //get the body data from the request
  let body = "";
  req.on("data", (partData) => {
    body = body + partData;
  });

  //parse the data from the body
  let parsedBody;
  req.on("end", async () => {
    var parsedBody = JSON.parse(body);
    const newAdmin = Admin({
      username: parsedBody.username,
      password: parsedBody.password,
    });
    let dbResponse;
    newAdmin
      .save()
      .then((data) => {
        res.statusCode = 201;
        res.end(JSON.stringify(data));
      })
      .catch((error) => {
        console.log(error);
        res.statusCode = 500;
        res.end(
          JSON.stringify({
            message: "Register failed , try again in a fiew minutes",
          })
        );
      });
  });
};

const loginUser = (req, res) => {};

module.exports.registerUser = registerUser;
module.exports.loginUser = loginUser;
