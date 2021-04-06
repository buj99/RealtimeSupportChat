const http =require("http");
const fs  = require('fs');
const url = require('url');
const lookup= require('mime-types').lookup; //function that gest the mime type form url

let resContent;
const server = http.createServer((req,res)=>{

    //createing the path to the file 
    let parseURL = url.parse(req.url,true);
    let path =  parseURL.path.replace(/^\/+|\/+$/g,"");
    if(path ===''){
        path='/index.html'
    }
    console.log(`Requested path ${path}`);

    path  =`${__dirname}/../public/${path}`;

    //reding the data from file 
    fs.readFile(path,(err,data)=>{
        if(err){
            /**
             * File not fonund error
             */
            console.log(`File not found ${path}`);
            res.writeHead(404);
            res.end();
        }
        else{
            /**
             * Serve the requested file 
             */
            res.setHeader("X-Content-Type-Opyions","nosniff");
            let mimeType = lookup(path);
            res.writeHead(200,{'Content-type':mimeType});
            res.end(data);
        }
    })
});
//seting up the port 
const PORT=process.env.PORT ||8080; 
//puting de server on listen 
server.listen(PORT,()=>{console.log(`Server runing on port ${PORT}...`)});