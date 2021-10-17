// var http = require('http');
// var fs = require('fs');

// const PORT=8080; 

// fs.readFile('./index.html', function (err, html) {

//     if (err) throw err;    

//     http.createServer(function(request, response) {  
//         response.writeHeader(200, {"Content-Type": "text/html"});  
//         response.write(html);  
//         response.end();  
//     }).listen(PORT);
// });

const express = require('express');
const app = new express();
var path = require("path");

//static files
app.use(express.static('assets'));
app.use(express.static(__dirname + 'assets/css'));
app.use(express.static(__dirname + 'assets/fonts'));
app.use(express.static(__dirname + 'assets/js'));
app.use(express.static(__dirname + 'assets/sass'));

app.get('', function(request, response){
    response.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3001, ()=>{console.log("server is up")} ) 