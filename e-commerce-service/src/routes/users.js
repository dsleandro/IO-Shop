const express = require("express");
const Router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const verifyToken = require("../config/verifyToken");

Router.get("/api/users", async (req, res)=> {
    const user = await User.find();
    res.json(user);
});

Router.get("/protected", verifyToken, (req, res) =>{    //rout that verify authorization
    res.json({auth: true});
});

Router.post("/signin", passport.authenticate("local"), (req, res)=> {
   const token =  jwt.sign({id: req.user._id}, process.env.SECRET_JWT, {
        expiresIn: 60 * 60 * 24,
    });
    res.json({user: req.user, token: token});
});

Router.post("/signup", async (req, res) => {
    const {name, lastName, email, password} = req.body

    const newUser = new User({
        name,
        lastName,
        email,
        password,
    })
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();

});

Router.get("/logout", (req, res) => {
    req.logout();
    res.json({message: "user logout success"});
});
module.exports = Router;
