const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const HttpStatus = require("http-status-codes");
const env = require("@root/env");

const app = express();
app.set("view engine", "pug");
if (env.logger) {
  app.use(morgan(env.logger));
}
app.use(express.json());
app.use("/api", require("@app/api"));
app.use("/", require("@app/views"));

app.use((err, _req, res, next) => {
  if (typeof err === "number") {
    return res.status(err).json({ error: HttpStatus.getStatusText(err) });
  } else if (Array.isArray(err)) {
    const [code, error] = err;
    return res.status(code).json({ error });
  }
  return next(err);
});

module.exports = app;
