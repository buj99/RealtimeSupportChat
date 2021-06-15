const { authChatAdminTokenVerify, authVerify } = require("../verifyToken");
const Admin = require("../models/AdminModel");
const defaultCostumizations = {
  backgroudTheme: "light",
  textColor: "blue",
  welcomeMessage: "Hello!What cand I help you with?",
  fontSize: "normal",
  admin_photo_link: "",
};
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
  "Access-Control-Allow-Headers":
    "Content-Type, auth_token, auth_unique_admin_token",
  "Access-Control-Max-Age": 2592000, // 30 days
  /** add other headers as per requirement */
};

const admins_costumizations_admin = (pathParams, req, res) => {
  switch (req.method) {
    case "GET":
      getCostumizations(pathParams, req, res);
      break;
    case "POST":
      setCostumizations(pathParams, req, res);
      break;
    default:
      break;
  }
};

const getCostumizations = (pathParams, req, res) => {
  console.log(req.url);
  if (req.url.split("/").length != 4) {
    // res.statusCode = 414;
    res.writeHead(414, headers);
    res.end(JSON.stringify({ message: "The request url is too long" }));
    return;
  }

  //check if the method is POST
  if (req.method != "GET") {
    // res.statusCode = 405;
    res.writeHead(405, headers);
    res.end(
      JSON.stringify({
        message: "This route can be accesed only using GET method",
      })
    );
    return;
  }

  //check if unique auth admin key is corect
  const verify = authChatAdminTokenVerify(req, res);
  if (verify.succes) {
    //check if admin exist in DB
    Admin.findById(verify.verified._id)
      .then((admin) => {
        if (!admin) {
          //admin doesn't exist
          // res.statusCode = 400;
          res.writeHead(400, headers);
          res.end(
            JSON.stringify({ message: "This admin key is not eligible" })
          );
          return;
        }
        //admin exists , send costumizations
        res.writeHead(200, headers);
        res.end(
          JSON.stringify({ ...admin.costumizations, username: admin.username })
        );
      })
      .catch((error) => {
        //error when tring to save in database the new chat
        console.log(error);
        // res.statusCode = 500;
        res.writeHead(500, headers);
        res.end(JSON.stringify({ message: "Something went rong ." }));
      });
  }
};

const setCostumizations = (pathParams, req, res) => {
  //check if URI is corect
  if (req.url.split("/").length != 4) {
    res.writeHead(414, headers);
    res.end(JSON.stringify({ message: "The request url is too long" }));
    return;
  }
  //check if the method is GET
  if (req.method != "POST") {
    res.writeHead(405, headers);
    res.end(
      JSON.stringify({
        message: "This route can be accesed only using GET method",
      })
    );
    return;
  }
  //get the body data from the request
  let body = "";
  req.on("data", (partData) => {
    body = body + partData;
  });
  //check if unique auth admin key is corect
  const verified = authVerify(req, res);
  req.on("end", () => {
    var parsedBody = JSON.parse(body);
    Admin.findById(verified.verified._id).then((admin) => {
      admin.costumizations = JSON.parse(body);
      admin.save();
      res.writeHead(200, headers);
      res.end();
    });
  });
};

module.exports.defaultCostumizations = defaultCostumizations;
module.exports.admins_costumizations_admin = admins_costumizations_admin;
