var express = require("express");
var router = express.Router();
const database = require("../config/my-sql-connection");

const ERROR_MESSAGE = "There was some error!";
const getGroupSchedule = (group) =>
  new Promise((resolve, reject) =>
    database.query(`SELECT * FROM ${group}`, (err, result, fields) => {
      if (!result || !result.length) {
        reject(ERROR_MESSAGE);
      }
      resolve(result);
    }),
  );

const organizeDays = (data) => {
  let result = [[], [], [], [], [], []];

  data.forEach((lesson) => {
    switch (lesson.day) {
      case "Monday":
        result[0].push(lesson);
        return;
      case "Tuesday":
        result[1].push(lesson);
        return;
      case "Wednesday":
        result[2].push(lesson);
        return;
      case "Thursday":
        result[3].push(lesson);
        return;
      case "Friday":
        result[4].push(lesson);
        return;
      case "Saturday":
        result[5].push(lesson);
        return;
    }
  });

  return result;
};

router.get("/", async function (req, res, next) {
  const { group } = req.headers;
  try {
    const userData = await getGroupSchedule(group).then(
      (data) => {
        res.status(200);
        return organizeDays(data);
      },
      (error) => {
        throw { message: error };
      },
    );
    res.send(userData);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
});

module.exports = router;
