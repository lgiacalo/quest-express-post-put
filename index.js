// dotenv loads parameters (port and database config) from .env
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./db");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// respond to requests on `/api/users`
app.get("/api/users", (req, res) => {
  // send an SQL query to get all users
  connection.query("SELECT * FROM user", (err, results) => {
    if (err) {
      res.status(500).json({
        error: err.message,
        sql: err.sql,
      });
    } else {
      res.json(results);
    }
  });
});

app.post("/api/users", (req, res) => {
  const formData = req.body;

  connection.query("INSERT INTO user SET ?", formData, (err, results) => {
    if (err) {
      res.status(500).json({
        error: err.message,
        sql: err.sql,
      });
    } else {
      res.json(results);
    }
  });
});

app.listen(process.env.PORT, (err) => {
  if (err) {
    throw new Error("Something bad happened...");
  }

  console.log(`Server is listening on ${process.env.PORT}`);
});
