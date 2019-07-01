const express = require("express");

const app = express();

app.get("/", (_req, res) => {
  return res.json({
    message: "Hello, world"
  });
});

app.listen(3000, () => "Server listening");
