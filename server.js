var express=require("express");

var bodyParser= require("body-parser");

var path =require("path");

var ejs =require("ejs");

var mongoose=require("mongoose");

var expressJwt=require("express-jwt");

mongoose.connect("mongodb://localhost/AuthAPI");

var app =express();

var port= process.env.port ||8080;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var apiRout= require("./api.js");

var filesRouter =require("./files.js");

var usersApi= require("./usersApi.js");

//app.use(apiRout); 
app.use(filesRouter);

app.use(express.static(path.join(__dirname+"//..//public")));

app.set("views", __dirname + "//..//public//view");
app.engine("html", ejs.renderFile);
app.set("view engine", "ejs");

var jwt= require("jsonwebtoken");
var config =require("./config.js");

app.use("/normalApi",apiRout);
app.use("/usersApi",usersApi);



app.listen(port,function(){
    
    console.log("My port is"+port);
});