const mysql = require("mysql");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "universityApplication",
});

module.exports = connection;
