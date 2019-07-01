require("dotenv").config({
  path: `./.${process.env.NODE_ENV}.env`
});
const { camelCase } = require("lodash");
module.exports = Object.keys(process.env).reduce((env, envVar) => {
  env[camelCase(envVar)] = process.env[envVar];
  return env;
}, {});
