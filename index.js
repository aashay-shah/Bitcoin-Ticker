//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var amount = req.body.amount;

  console.log(crypto);
  console.log(fiat);
  console.log(amount);

  var options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }
  };
  console.log(options);

  request(options, function(error, response, body){
    console.log(body);
    var data = JSON.parse(body);
    var timestamp = data.time;
    var currentPrice = data.price;
    res.write("<p>The cuurent date is " + timestamp + ".</p>");
    res.write("<h1>The current price for " + amount + " " + crypto + " is " + currentPrice + " " + fiat + ".</h1>");
    res.send();
  });
});

app.listen(3000, function(){
  console.log("Server started on port 3000");
});
