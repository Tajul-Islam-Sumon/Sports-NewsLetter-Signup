// jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

    const firstName = req.body.fname; 
    const lastName = req.body.lname; 
    const email = req.body.emailadd; 

    const data = {
        members: [
            {
                email_address: email, 
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us8.api.mailchimp.com/3.0/lists/66b8027bf1" ;

    const options = {
        method: "POST",
        auth: "sumon1998:6da62e4f26e1fce8b3c2dc760a224e96-us8",
    };

    const request = https.request(url, options, function(responce){
        if ( responce.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failed.html");
        }

        responce.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();

});

app.post("/failed", function(req, res){
    res.redirect("/");
});

const port = process.env.PORT || 3000;
app.listen(port , function(){
    console.log("Server is running on Port 3000.");
});


/*
Api Key: 6da62e4f26e1fce8b3c2dc760a224e96-us8
List (unique) ID: 66b8027bf1
*/

