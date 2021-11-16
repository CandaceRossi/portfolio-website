const PORT = process.env.PORT || 8080;
const express = require('express');
const creds = require('./config');
const nodemailer = require("nodemailer");

const app = new express();
const cors = require('cors');
//static files
var path = require("path");
app.use(express.static(path.join(__dirname, 'assets')));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
// var bodyParser = require('body-parser');
// app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); 

app.use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
});

app.get('', function(request, response){
    response.sendFile(path.join(__dirname + '/index.html'));
});

// app.get('/send', function(req,res){
//   console.log("first this get request", res)
// res.send("we received your info!")
// });

app.post('/send', (req, res) => {
  let newData = req.body 
  console.log("whatcha want", req.body)
  let smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    auth: {
      user: creds.USER,
      pass: creds.PASS
    }
  })


let mailOptions = {
  from: "rossicandace85@gmail.com",
  to: "rossicandace85@gmail.com",
  subject: `Message from ${newData.name}`,
  html: `
  <h3>Information</h3>
  <ul>
  <li>Name: ${newData.name}</li>
  <li>Email: ${newData.email}</li>
  <h3>Message</h3>
  <p>${newData.message}</p>
  </ul>
  `
};

smtpTransport.sendMail(mailOptions, (error, res) => {
  if(error){
    console.log(error)
    smtpTransport.close();
  }
  else{    
    console.log("data was received", res)
    smtpTransport.close();
  }
})
  smtpTransport.close();
})

app.listen(PORT, () => console.log("server is up"));
