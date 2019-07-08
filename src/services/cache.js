const { promisify } = require("util");
const redis = require("redis");
const { redisUrl } = require("@root/env");

const client = redis.createClient(redisUrl);
const get = promisify(client.get).bind(client);
const set = promisify(client.set).bind(client);

module.exports = {
  get,
  set
};
