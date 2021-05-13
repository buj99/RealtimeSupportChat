const http = require("http");
const mongoose = require("mongoose");
const { router } = require("./router.js");
//env variables load
const dotenv = require("dotenv");
dotenv.config();

//server setup
const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
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
