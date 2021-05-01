var express = require("express");
var router = express.Router();
const database = require("../config/my-sql-connection");

const addLesson = (day, lesson, time, location, teacher, group) =>
  new Promise((resolve, reject) =>
    database.query(
      `INSERT ${group}(day, lesson, time, location, teacher) VALUES("${day}", "${lesson}", "${time}", "${location}", "${teacher}")`,
      (err, result, fields) => {
        if (!result) {
          reject(err.sqlMessage);
        }
        resolve(result);
      },
    ),
  );

router.post("/", async function (req, res, next) {
  const { day, lesson, time, location, teacher, group } = req.query;

  try {
    await addLesson(day, lesson, time, location, teacher, group).then(
      (groups) => {
        res.status(200);
        return;
      },
      (error) => {
        throw { message: error };
      },
    );
    res.send("success");
  } catch (error) {
    res.status(400);
    res.send(error);
  }
});

module.exports = router;
