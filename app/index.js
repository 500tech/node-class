const express = require("express");
const morgan = require("morgan");
const env = require("../env");

const app = express();
app.set("view engine", "pug");
if (env.logger) {
  app.use(morgan(env.logger));
}
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
