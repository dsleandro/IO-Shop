const env = require("dotenv").config();
const Path = require("path");
const express = require("express");
const multer = require("multer");
const uuid = require("uuid/v4");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

//Initialize
const app = express();
require("./database");
require("./config/passport");


//Settings
app.set("Port", process.env.PORT || 8080);


//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const storage = multer.diskStorage({
    destination: Path.join(__dirname, "public/imgs/uploads"),
    filename: (req, file, cb, filename) => {
        cb(null, uuid() + Path.extname(file.originalname));
    },

});

//upload images
app.use(multer({
    storage: storage,
}).array("images", 6));
app.use(session({
    secret: "qcnrt",
    resave: true,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

//Global variables
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});


//static Files
app.use(express.static(Path.join(__dirname, "public")));

//Routes
app.use("/", require("./routes/products"));
app.use("/", require("./routes/users"));

//Server listening
app.listen(app.get("Port"), () => {
    console.log("Server listening on port: " + app.get("Port"));
});