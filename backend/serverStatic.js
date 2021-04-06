const http =require("http");
const fs  = require('fs');
const url = require('url');
const lookup= require('mime-types').lookup;

let resContent;
const server = http.createServer((req,res)=>{
    let parseURL = url.parse(req.url,true);
    let path =  parseURL.path.replace(/^\/+|\/+$/g,"");
    if(path ===''){
        path='/index.html'
    }
    console.log(`Requested path ${path}`);


    path  =`${__dirname}/../public/${path}`;

    fs.readFile(path,(err,data)=>{
        if(err){
            console.log(`File not found ${path}`);
            res.writeHead(404);
            res.end();
        }
        else{
            res.setHeader("X-Content-Type-Opyions","nosniff");
            let mimeType = lookup(path);
            res.writeHead(200,{'Content-type':mimeType});
            res.end(data);
        }
        
        
    })

    

});

const PORT=process.env.PORT ||8080; 
server.listen(PORT,()=>{console.log(`Server runing on port ${PORT}...`)});