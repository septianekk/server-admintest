var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const session = require("express-session");
const dotenv = require("dotenv");
const flash = require("connect-flash");
const cors = require("cors");
// const DB = process.env.DATABASE;

dotenv.config({ path: "config/.env" });

mongoose
  .connect(
    "mongodb+srv://admin-user:admin90@cluster0.rzqnb.mongodb.net/server-appv2?authSource=admin&replicaSet=atlas-kw0a30-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then((connection) => {
    console.log("Connected To Database");
  });

// const categoryRouter = require("./routes/category");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
// router admin
const adminRouter = require("./routes/admin");
// user
const itemRouter = require("./routes/item");
const userRouter = require("./routes/users");
const orderRouter = require("./routes/order");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);
app.use(cors());
app.use(flash());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/sb-admin-2",
  express.static(path.join(__dirname, "node_modules/startbootstrap-sb-admin-2"))
);

app.use("/", indexRouter);

// app.use("/categories", categoryRouter);
// admin
app.use("/admin", adminRouter);
app.use("/api/v1", itemRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", orderRouter);

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
