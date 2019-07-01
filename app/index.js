const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();
app.use(morgan("combined"));
app.use(bodyParser.json());

app.post("/", (req, res) => {
  const payload = req.body;
  return res.json(payload);
});

app.get("/", (_req, res) => {
  return res.json({
    message: "Hello, world"
  });
});

module.exports = app;
