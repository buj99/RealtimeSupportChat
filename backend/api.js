const http = require("http");
const mongoose = require("mongoose");
const { router } = require("./router.js");
//env variables load
const dotenv = require("dotenv");
dotenv.config();

//server setup
const server = http.createServer((req, res) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Allow-Headers":
      "Content-Type auth_token auth_unique_admin_token auth_chat",
    "Access-Control-Max-Age": 2592000, // 30 days
    /** add other headers as per requirement */
  };

  if (req.method === "OPTIONS") {
    res.writeHead(204, headers);
    res.end();
    return;
  }
  // if (["GET", "POST"].indexOf(req.method) > -1) {
  //   router(req, res);
  //   return;
  // }
  router(req, res);
});
//database conection
mongoose.connect(
  process.env.DB_CONNECTION_LINK,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("API conected to DB");
  }
);

//server start listening
const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => console.log(`Server si listeneing on PORT ${PORT}`));
