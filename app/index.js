const express = require("express");
const morgan = require("morgan");

const app = express();
app.set("view engine", "pug");
app.use(morgan("combined"));
app.use(express.json());

app.post("/", (req, res) => {
  const payload = req.body;
  return res.json(payload);
});

app.get("/", (_req, res) => {
  return res.json({
    message: "Hello, world"
  });
});

app.get("/foo", (_req, res) => {
  return res.render("index");
});

module.exports = app;
