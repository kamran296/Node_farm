const fs= require('fs');
const http = require("http");
const url = require("url")
const replaceTemplate = require('./modules/replaceTemplate');


//function replacetemplate


////Reading file from JSON file
const tempOverview= fs.readFileSync("./Node_farm/template-overview.html","utf-8");
const tempCard= fs.readFileSync("./Node_farm/template-card.html","utf-8");
const tempProduct= fs.readFileSync("./Node_farm/template-product.html","utf-8");

const data1= fs.readFileSync("./Node_farm/farm.json","utf-8");
const dataObj = JSON.parse(data1);  



const server = http.createServer((req,res)=>{
    
    const {query, pathname} = (url.parse(req.url,true));
    

    //overview
    if(pathname=== '/' || pathname==="/Overview"){
        res.writeHead(200,{"Content-type": "text/html"})
        //now to get the value of actual element from json well iterate over the json file
        const cardhtml = dataObj.map(el=>replaceTemplate(tempCard,el)).join('');
        
        const output1 = tempOverview.replace('{%PRODUCT_CARDS%}',cardhtml);
        res.end(output1);
    }
    //product
    else if(pathname==='/product'){
        res.writeHead(200,{'Content-type':'text/html'});
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
       
    }
    //API
    else if(pathname ==='/api'){
        res.writeHead(200,{'Content-type': ' application/json'});
        res.end(data1);
    }
    else{
        res.writeHead(404,{
            'content-head':"/html",
            'my-own-header': "Hello world"
        });
        res.end('<h1>Page Not Found!!</h1>');
    }
});

server.listen(3000,'127.0.0.1',()=>{
    console.log("Listening from server on port 3000");
})