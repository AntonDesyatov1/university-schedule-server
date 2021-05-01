var express = require("express");
var router = express.Router();
const database = require("../config/my-sql-connection");

const deleteLesson = (day, lesson, time, group) =>
  new Promise((resolve, reject) =>
    database.query(
      `DELETE FROM ${group} WHERE day="${day}" AND lesson="${lesson}" AND time="${time}"`,
      (err, result, fields) => {
        if (!result) {
          reject(err.sqlMessage);
        }
        resolve();
      },
    ),
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

const getGroupSchedule = (group) =>
  new Promise((resolve, reject) =>
    database.query(`SELECT * FROM ${group}`, (err, result, fields) => {
      if (!result || !result.length) {
        reject(ERROR_MESSAGE);
      }
      resolve(result);
    }),
  );

router.delete("/", async function (req, res, next) {
  const { day, lesson, time, group } = req.body;

  try {
    const data = await deleteLesson(day, lesson, time, group).then(
      async () => {
        const schedule = await getGroupSchedule(group);

        res.status(200);
        return organizeDays(schedule);
      },
      (error) => {
        throw { message: error };
      },
    );
    res.send(data);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
});

module.exports = router;
