//Importing Routes
const {
  registerUser,
  loginUser,
  getUniqueChatKey,
} = require("./routes/authRout");
const {
  conversations_admin,
  conversations_admin_chat,
} = require("./routes/conversationsRouter");
const { admins_costumizations_admin } = require("./routes/adminCostumization");
//import utils
const { pathToRegex, getParams } = require("./utils.js");

//router function
const router = async (req, res) => {
  const routes = [
    {
      path: "/",
      execute: () => {
        res.end("API documentation at : http://localhost:8090/APIdoc.html");
      },
    },
    {
      path: "/admins",
      execute: registerUser,
    },
    {
      path: "/admins/-idadmin",
      execute: loginUser,
    },
    {
      path: "/admins/-idadmin/chatkey",
      execute: getUniqueChatKey,
    },

    {
      path: "/admins/customizations/-idadmin",
      execute: admins_costumizations_admin,
    },
    {
      path: "/conversations/-idadmin",
      execute: conversations_admin,
    },
    {
      path: "/conversations/-idadmin/@idchat",
      execute: conversations_admin_chat,
    },
  ];

  //testing routes for match

  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      result: req.url.match(pathToRegex(route.path)),
    };
  });
  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );

  if (!match) {
    res.end("404");
  }
  match.route.execute(getParams(match), req, res);
};

module.exports.router = router;
