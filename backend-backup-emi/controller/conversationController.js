const Conversation = require("../models/conversationModel");

//@desc Get all the conversations for the user with the name 'username
//@route POST/login/
async function getConversations(req, res) {
  try {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const { userName, password } = JSON.parse(body);
      console.log(userName);
      console.log(password);

      const conversations = await Conversation.findConversationsForUserName(
        userName
      );
      if (!conversations) {
        res.writeHead(404, {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        });
        res.end(JSON.stringify({ message: "Conversations not found" }));
      } else {
        res.writeHead(200, {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        });
        res.end(JSON.stringify(conversations));
      }
    });
  } catch (error) {
    console.log(error);
  }
}
//@desc Add new username and password to admins list
//@route POST/register
async function registerNewAdmin(req, res) {
  try {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const { userName, password, confrimPassword } = JSON.parse(body);
      if (password !== confrimPassword) {
        res.writeHead(406, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: "Password and confirmation password don't match",
          })
        );
      } else {
        // const adminAdded = await Conversation.addNewAdmin(userName, password);
        Conversation.addNewAdmin(userName, password)
          .then((response) => {
            console.log(response);
            res.writeHead(201, {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            });
            res.end(JSON.stringify({ success: true }));
          })
          .catch((err) => {
            res.writeHead(409, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false }));
          });
        // if (!adminAdded) {
        //   res.writeHead(409, { "Content-Type": "application/json" });
        //   res.end(JSON.stringify({ success: false }));
        // } else {
        //   res.writeHead(201, {
        //     "Content-Type": "application/json",
        //     "Access-Control-Allow-Origin": "*",
        //   });
        //   res.end(JSON.stringify({ success: true }));
        // }
      }
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getConversations,
  registerNewAdmin,
};
