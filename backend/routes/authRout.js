const { parse } = require("dotenv");
const bcrypt = require("bcryptjs");
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

const loginUser = async (req, res) => {
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
  const { loginValidation } = require("../dataValidation");

  //get the body data from the request
  let body = "";
  req.on("data", (partData) => {
    body = body + partData;
  });
  //parse the data from the body
  req.on("end", async () => {
    var parsedBody = JSON.parse(body);

    //validation for request data
    loginValidation(parsedBody)
      .then((isValid) => {
        var validInput = isValid;
        if (!isValid)
          return res.end(JSON.stringify({ message: "Please send valid data" }));

        //validation for unique username
        Admin.findOne({ username: parsedBody.username })
          .then(async (admin) => {
            if (!admin) {
              res.statusCode = 406;
              return res.end(
                JSON.stringify({
                  message: "This username doesn't exist , please register",
                })
              );
            }
            //admin exists , check if password is maching
            const passwordIsValid = await bcrypt.compare(
              parsedBody.password,
              admin.password
            );
            if (!passwordIsValid) {
              res.statusCode = 400;
              return res.end(
                JSON.stringify({ message: "Password is incorect" })
              );
            }
            res.statusCode = 200;
            res.end(JSON.stringify({ message: "You are loged in " }));
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

const addAdminInstanceInDB = async (parsedBody, res) => {
  //hashing the password
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(parsedBody.password, salt);
  const newAdmin = Admin({
    username: parsedBody.username,
    password: hashedPassword,
  });
  newAdmin
    .save()
    .then((data) => {
      res.statusCode = 201;
      res.end(JSON.stringify(data._id));
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
