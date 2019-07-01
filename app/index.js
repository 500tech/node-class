const express = require("express");

const app = express();
app.use((req, res, next) => {
  console.log('This is a request!');
  next();
});

app.get("/", (_req, res) => {
  return res.json({
    message: "Hello, world"
  });
});

module.exports = app;
