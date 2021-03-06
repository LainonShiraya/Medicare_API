var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var cors = require("cors");
var session = require("express-session");
var app = express();
app.use(
  session({
    secret: "2870368997705",
    resave: true,
    saveUnitialized: true,
  })
);
// nasze routery
const doctorRouter = require("./routes/doctorRoute");
const patientRouter = require("./routes/patientsRoute");
const docApiRouter = require("./routes/api/DoctorApiRoute");
const patientApiRouter = require("./routes/api/PatientApiRoute");
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// anti back button option
app.use(function (req, res, next) {
  res.set(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  next();
});
app.use(cors({ credentials: true, origin: "http://localhost:3001" }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/dashboard", doctorRouter);
app.use("/patients", patientRouter);
app.use("/api/doctor", docApiRouter);
app.use("/api/patients", patientApiRouter);
//
//
app.get("/page-count", (req, res) => {
  req.session.count = 1 + (req.session.count ?? 0);
  res.send(`Page view count: ${req.session.count}`);
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
