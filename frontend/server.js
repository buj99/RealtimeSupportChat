var http = require("http");
var fs = require("fs");
var path = require("path");
const { json } = require("express");
const localHost = "127.0.0.1";
const localNetwork = "192.168.100.60";
const ip = localHost;
http
  .createServer(function (request, response) {
    var splitRequest = request.url.split("/");
    if (splitRequest[1] != "api") {
      var filePath = "./private" + request.url;
      if (filePath == "./private/") {
        filePath = "./private/index.html";
      }

      var extname = String(path.extname(filePath)).toLowerCase();
      var mimeTypes = {
        ".html": "text/html",
        ".js": "text/javascript",
        ".css": "text/css",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpg",
        ".gif": "image/gif",
        ".svg": "image/svg+xml",
        ".wav": "audio/wav",
        ".mp4": "video/mp4",
        ".woff": "application/font-woff",
        ".ttf": "application/font-ttf",
        ".eot": "application/vnd.ms-fontobject",
        ".otf": "application/font-otf",
        ".wasm": "application/wasm",
      };

      var contentType = mimeTypes[extname] || "application/octet-stream";

      fs.readFile(path.resolve(__dirname, filePath), function (error, content) {
        if (error) {
          if (error.code == "ENOENT") {
            fs.readFile(
              path.resolve(__dirname, "./private/index.html"),
              function (error, content) {
                response.writeHead(200, { "Content-Type": "text/html" });
                response.end(content, "utf-8");
              }
            );
          } else {
            response.writeHead(500);
            response.end(
              "Sorry, check with the site admin for error: " +
                error.code +
                " ..\n"
            );
          }
        } else {
          response.writeHead(200, { "Content-Type": contentType });
          response.end(content, "utf-8");
        }
      });
    } else {
      //api calls
      switch (splitRequest[2]) {
        case "login":
          {
            console.log(request.method);
            response.writeHead(200, {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            });
            response.end(json);
          }
          break;

        default:
          break;
      }
    }
  })
  .listen(8080, ip);
console.log(`Server running at http://${ip}:8080/`);
