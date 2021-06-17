const { authChatAdminTokenVerify } = require("../verifyToken");
const Conversation = require("../models/ConversationModel");
const Admin = require("../models/AdminModel");
const jwt = require("jsonwebtoken");
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
  "Access-Control-Allow-Headers":
    "Content-Type auth_token auth_unique_admin_token auth_chat",
  "Access-Control-Max-Age": 2592000, // 30 days
  /** add other headers as per requirement */
};
const asignChat = async (pathParams, req, res) => {
  //check if URI is corect
  console.log(req.url);
  if (req.url.split("/").length != 3) {
    // res.statusCode = 414;
    res.writeHead(414, headers);
    res.end(JSON.stringify({ message: "The request url is too long" }));
    return;
  }

  //check if the method is POST
  if (req.method != "POST") {
    // res.statusCode = 405;
    res.writeHead(405, headers);
    res.end(
      JSON.stringify({
        message: "This route can be accesed only using POST method",
      })
    );
    return;
  }
  //get the body data from the request
  let body = "";
  req.on("data", (partData) => {
    body = body + partData;
  });
  req.on("end", () => {
    var parsedBody = JSON.parse(body);

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
          //create a new conversation
          const newConversation = Conversation({
            admin_id: verify.verified._id,
            name: parsedBody.name,
            photo_link: parsedBody.photo_link,
            messages: [
              {
                message: admin.costumizations.welcomeMessage,
                isAdmin: true,
                date: Date.now(),
              },
            ],
          });
          newConversation
            .save()
            .then((data) => {
              //add created chat to admin chat list
              admin.conversations = [
                ...admin.conversations,
                { _id_chat: data._id },
              ];
              admin
                .save()
                .then(() => {
                  //create token identifyer for chat
                  const token = jwt.sign(
                    { _id: data._id },
                    process.env.TOKEN_SECRET_CHAT_IDENTIFIER
                  );
                  //save acces token for admin chat acces
                  data.admin_acces_token = token;
                  data.save().catch((error) => console.log(error));
                  //send response to client
                  // res.stautsCode = 200;
                  res.writeHead(200, headers);
                  res.end(JSON.stringify({ auth_chat: token }));
                })
                .catch((error) => {
                  //error when trying to add the new created chat to admin  chat list
                  console.log(error);
                  // res.statusCode = 500;
                  res.writeHead(500, headers);
                  res.end(JSON.stringify({ message: "Something went rong ." }));
                });
            })
            .catch((error) => {
              //error when tring to save in database the new chat
              console.log(error);
              // res.statusCode = 500;
              res.writeHead(500, headers);
              res.end(JSON.stringify({ message: "Something went rong ." }));
            });
        })
        .catch((error) => {
          // res.statusCode = 500;
          res.writeHead(500, headers);
          res.end(JSON.stringify({ message: "Something went rong ." }));
        });
    }
  });
};

module.exports.asignChat = asignChat;
