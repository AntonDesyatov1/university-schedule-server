var express = require("express");
var router = express.Router();

// use child.stdout.setEncoding('utf8'); if you want text chunks
router.post("/", function(req, res, next) {
  res.send("API is working properly");
});

module.exports = router;
