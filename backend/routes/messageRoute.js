const { authChatToken } = require("../verifyToken");
const { messageValidation } = require("../dataValidation");
const { adminAuthVerify } = require("../verifyToken");
const Conversation = require("../models/ConversationModel");
//method for  : /conversation:POST
const sendMessage = async (req, res) => {
  //check if URI is corect
  if (req.url.split("/").length != 2) {
    res.statusCode = 414;
    res.end(JSON.stringify({ message: "The request url is too long" }));
    return;
  }

  //check if unique auth admin key is corect

  const verifiedChat = authChatToken(req, res);
  if (verifiedChat.succes === true) {
    //verify if is send by admin
    const isAdmin = adminAuthVerify(req, res);
    //get the body data from the request
    let body = "";
    req.on("data", (partData) => {
      body = body + partData;
    });
    //parse the body
    req.on("end", async () => {
      var parsedBody = JSON.parse(body);

      messageValidation(parsedBody)
        .then((isValid) => {
          if (!isValid) {
            return res.end(
              JSON.stringify({ message: "Please send valid data" })
            );
          }
          //get the conversation
          Conversation.findById(verifiedChat.verified._id)
            .then((conversation) => {
              //add message to conversation
              conversation.messages = [
                ...conversation.messages,
                {
                  message: parsedBody.message,
                  isAdmin: isAdmin,
                  date: Date.now(),
                },
              ];
              //save conversation
              conversation.save(() => {
                res.statusCode = 200;
                res.end(JSON.stringify({ succes: true }));
              });
              // .catch((error) => console.log(error));
            })
            .catch((error) => {
              console.log(error);
              res.statusCode = 500;
              res.end(JSON.stringify({ message: "Something went rong" }));
            });
        })
        .catch((error) => {
          console.log(error);
          res.statusCode = 500;
          res.end(JSON.stringify({ message: "something went rong ." }));
        });
    });
  }
};

//method for  /conversation : GET
const getMessages = async (req, res) => {
  //check if URI is corect
  if (req.url.split("/").length != 2) {
    res.statusCode = 414;
    res.end(JSON.stringify({ message: "The request url is too long" }));
    return;
  }

  //check if unique auth admin key is corect

  const verifiedChat = authChatToken(req, res);
  if (!verifiedChat.succes) return;
  Conversation.findById(verifiedChat.verified._id)
    .then((conversation) => {
      res.statusCode = 200;
      res.end(JSON.stringify(conversation.messages));
    })
    .catch((error) => {
      console.log(error);
      res.statusCode = 500;
      res.end(JSON.stringify({ message: "Someting went rong" }));
    });
};
module.exports.sendMessage = sendMessage;
module.exports.getMessages = getMessages;
