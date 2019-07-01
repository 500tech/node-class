const _test = require("tape");

const test = (title, cb) =>
  _test(title, async t => {
    await cb(t);
    t.end();
  });

module.exports = { test };
