const express = require("express");
const router = express.Router();
const database = require("../config/my-sql-connection");
const ip = require("ip");

const GET_UNIVERSITIES_QUERY = "SELECT * FROM universities";
const getUniversityTable = new Promise((resolve, reject) =>
  database.query(GET_UNIVERSITIES_QUERY, (err, result, fields) =>
    resolve(result),
  ),
);

router.get("/", (req, res, next) =>
  getUniversityTable.then((universities) => {
    console.log(universities);
    res.status(200).send(
      universities.map((uni) => ({
        ...uni,
        img: uni.img.replace("localhost", ip.address()),
      })),
    );
  }),
);

module.exports = router;
