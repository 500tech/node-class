const { Router } = require('express');

const api = Router();

api.post("/", (req, res) => {
  const payload = req.body;
  return res.json(payload);
});

api.get("/", (_req, res) => {
  return res.json({
    message: "Hello, world"
  });
});

api.use('/posts', require('./posts'));

module.exports = api;