const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const fetchUniversitiesRouter = require("./routes/fetchUniversities");
const testAPIRouter = require("./routes/testAPI");
const loginUser = require("./routes/loginUser");
const fetchScheduleData = require("./routes/fetchScheduleData");
const updateUserInfo = require("./routes/updateUserInfo");
const fetchGroupsRouter = require("./routes/fetchGroups");
const addLessonRouter = require("./routes/addLesson");
const deleteLessonRouter = require("./routes/deleteLesson");
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/universities", fetchUniversitiesRouter);
app.use("/testAPI", testAPIRouter);
app.use("/loginUser", loginUser);
app.use("/fetchScheduleData", fetchScheduleData);
app.use("/updateUserInfo", updateUserInfo);
app.use("/fetchGroups", fetchGroupsRouter);
app.use("/addLesson", addLessonRouter);
app.use("/deleteLesson", deleteLessonRouter);

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
