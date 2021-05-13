const { parse } = require("dotenv");
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
  //import validation method
  const { registerValidation } = require("../dataValidation");

  //get the body data from the request
  let body = "";
  req.on("data", (partData) => {
    body = body + partData;
  });

  //parse the data from the body
  req.on("end", async () => {
    var parsedBody = JSON.parse(body);

    //validation for request data
    registerValidation(parsedBody)
      .then((isValid) => {
        var validInput = isValid;
        if (!isValid)
          return res.end(JSON.stringify({ message: "Please send valid data" }));

        //validation for unique username
        Admin.findOne({ username: parsedBody.username })
          .then((admin) => {
            if (admin) {
              usernameExists = true;
              res.statusCode = 409;
              return res.end(
                JSON.stringify({ message: "This username already exists" })
              );
            }
            addAdminInstanceInDB(parsedBody, res);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        res.statusCode = 500;
        res.end(
          JSON.stringify({
            message:
              "An error ocured during input Validation , please try again .",
          })
        );
      });
  });
};

const loginUser = (req, res) => {};

const addAdminInstanceInDB = (parsedBody, res) => {
  const newAdmin = Admin({
    username: parsedBody.username,
    password: parsedBody.password,
  });
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
};
module.exports.registerUser = registerUser;
module.exports.loginUser = loginUser;
