var express = require("express");
var usersAPI = express.Router();
//setup the database
var mongoose = require("mongoose");

var users = require("./usersSchema.js");
var config = require('./config.js');
var jwt = require("jsonwebtoken");
usersAPI.post("/signup", function (req, res) {
        console.log("im in sign up");
    users.find({
        userName
        : req.body.userName
    }, function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else if (data.length > 0) {
            res.status(400).send({
                "message": "this userName is already taken"
            });
        } else {
            var newUser = new users(req.body);
            newUser.save(function (err, result) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).send({
                        "message": "you have signed up successfully"
                    });
                }
            });
        }
    });


});

usersAPI.post("/signin", function (req, res) {
    console.log("im in sign in");
    users.findOne({
        userName: req.body.userName
    }, function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else if (data == undefined) {
            res.status(404).send({
                "message": "this username is not regitered"
            });
        } else if (req.body.password != data.password) {
            res.status(400).send({
                "message": "wrong password"
            });
        } else {
            var token = jwt.sign(data.toObject(), config.secret, {
                expiresIn: "24h"
            });
            res.send({
                token: token,
                user: data.toObject(),
                success: true,
                message: "Here's your token!"
            });
        }
    });
});
module.exports = usersAPI;