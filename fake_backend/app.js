var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var bodyParser = require("body-parser");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send({
    message: "test",
  });
});
app.post("/login", (req, res) => {
  if (req.body.email === "a@a" && req.body.password === "123") {
    res.send({
      token: "SOME_TOKEN_HERE",
    });
  } else {
    res.status("400").send("Not Found");
  }
});
app.post("/register", (req, res) => {
  console.log(req.body);
  res.send({
    message: "success!",
  });
});
app.get("/me", (req, res) => {
  if (!req.headers["authorization"]) {
    res.status(400).send("Bad request");
  }
  const token = req.headers["authorization"].split("Bearer ")[1];
  if (token === "SOME_TOKEN_HERE") {
    res.send({
      id: 1,
      email: "a@a",
      name: "A",
    });
  } else {
    res.status(401).send("Unauthorized");
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
