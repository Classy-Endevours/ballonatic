const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const bodyParser = require("body-parser"); // middleware
const { body } = require("express-validator");
const { checkLogin } = require("./controllers/loginCtrl");
const app = express();

// set the view engine to ejs
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
// use res.render to load up an ejs view file
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "123456cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);
app.use(flash());
app.use(function (req, res, next) {
  res.locals.success = req.flash("success");
  res.locals.info = req.flash("info");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});
// index page
app.get("/", function (req, res) {
  res.render("pages/index");
});

// about page
app.get("/about", function (req, res) {
  res.render("pages/about");
});
// contact page
app.get("/contact", function (req, res) {
  res.render("pages/contact");
});
// product page
app.get("/product", function (req, res) {
  res.render("pages/product");
});
//login page
app.get("/login", function (req, res, next) {
  res.render("pages/login-form");
});
//register page
app.get("/register", function (req, res, next) {
  res.render("pages/registration-form");
});
// save register details
app.post("/register", function (req, res, next) {
  const inputData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email_address: req.body.email_address,
    gender: req.body.gender,
    password: req.body.password,
    confirm_password: req.body.confirm_password,
  };
});
// check login details
app.post(
  "/login",
  body("email")
    .notEmpty()
    .withMessage("email cannot be empty!")
    .isEmail()
    .withMessage("please give valid email"),
  body("password")
    .notEmpty()
    .withMessage("password cannot be empty!")
    .isLength({ min: 5 }),
  checkLogin
);
app.get("/logout", function (req, res) {
  req.session.destroy();
  res.redirect("/login");
});
app.listen(8080);
console.log("Server is listening on port 8080");
