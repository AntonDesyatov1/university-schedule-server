var express = require("express");
var router = express.Router();
const database = require("../config/my-sql-connection");

const ERROR_MESSAGE = "ID or password is incorrect!";
const getGroups = (university) =>
  new Promise((resolve, reject) =>
    database.query(
      `SELECT * FROM ${university}_GROUPS`,
      (err, result, fields) => {
        if (!result) {
          reject(err.sqlMessage);
        }
        resolve(result);
      },
    ),
  );

router.get("/", async function (req, res, next) {
  const { university } = req.headers;

  try {
    const groups = await getGroups(university).then(
      (groups) => {
        res.status(200);
        return groups.map(({ number }) => number);
      },
      (error) => {
        throw { message: error };
      },
    );
    res.send(groups);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
});

module.exports = router;
