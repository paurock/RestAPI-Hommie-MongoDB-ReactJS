const express = require("express");
const routes = require("./routes/api");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//set up express app
const app = express();

//connect to mongodb
const url = "mongodb://localhost/mydb";

mongoose.connect(url, console.log(`DB running on ${url}`));

mongoose.Promise = global.Promise;

//handle Static files directory
app.use(express.static("public"));

//body-bodyParser
app.use(bodyParser.json());

//initialize routes
app.use("/api", routes);

//err middleware
app.use(function(err, req, res, next) {
  res.status(422).send({error: err.message});
});

//listen to requests
app.listen(process.env.port || 4000, function() {
  console.log("now listening for requests");
});
