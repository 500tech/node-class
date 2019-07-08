const path = require("path");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const env = require("@root/env");

const adapter = new FileSync(
  path.resolve(process.cwd(), `db.${env.nodeEnv}.json`)
);
const db = low(adapter).defaults({
  posts: [],
  users: []
});

module.exports = db;
