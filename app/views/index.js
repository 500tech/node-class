const { Router } = require("express");

const views = Router();

views.get("/", (_req, res) => {
  return res.render("index");
});

module.exports = views;
