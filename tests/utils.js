const _test = require("tape");
const request = require("xyquest/request");
const app = require("xyquest")(request, "http://localhost:3000", {
  json: true
});

const test = (title, cb) =>
  _test(title, async t => {
    try {
      await cb(t);
    } finally {
      t.end();
    }
  });

module.exports = { test, app };
