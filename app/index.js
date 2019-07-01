const express = require("express");
const morgan = require("morgan");
const env = require("../env");

const app = express();
app.set("view engine", "pug");
if (env.logger) {
  app.use(morgan(env.logger));
}
app.use(express.json());
app.use('/api', require('./api'));
app.use('/', require('./views'));

module.exports = app;
