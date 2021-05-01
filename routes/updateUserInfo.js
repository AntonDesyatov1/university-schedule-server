var express = require("express");
var router = express.Router();
const database = require("../config/my-sql-connection");

const updateUserInfo = (login, phoneNumber, email, university) =>
  new Promise((resolve, reject) =>
    database.query(
      `
        UPDATE ${university}_USERS
        SET phoneNumber="${phoneNumber}", email="${email}"
        WHERE login="${login}"
      `,
      (err, result, fields) => {
        if (!result) {
          reject(err.message);
        }
        resolve(result);
      },
    ),
  );

const getUser = (login, university) =>
  new Promise((resolve, reject) =>
    database.query(
      `SELECT * FROM ${university}_USERS WHERE login="${login}"`,
      (err, result, fields) => {
        if (!result) {
          reject(err.message);
        }
        resolve(result);
      },
    ),
  );

router.post("/", async function (req, res, next) {
  const { login, phoneNumber, email, university } = req.query;
  try {
    const userData = await updateUserInfo(login, phoneNumber, email, university)
      .then(() => getUser(login, university))
      .then((user) => {
        res.status(200);
        return user[0];
      })
      .catch((error) => {
        throw { message: error };
      });
    res.send(userData);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
});

module.exports = router;
