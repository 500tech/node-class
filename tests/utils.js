const _test = require("tape");
const request = require("xyquest/request");
const detect = require("detect-port");
const sleep = require("sleep-promise");
const app = require("xyquest")(request, "http://localhost:4000", {
  json: true
});
const env = require("../env");

const porter = {
  isUp: false,
  async waitForPort() {
    if (this.isUp) {
      return;
    }
    const { port, portWaitInterval } = env;
    if ((await detect(+port)) === +port) {
      await sleep(+portWaitInterval);
      await this.waitForPort();
    }
    this.isUp = true;
  }
};

const test = (title, cb, unit = false) =>
  _test(title, async t => {
    if (!unit) {
      await porter.waitForPort();
    }
    try {
      await cb(t);
    } catch (err) {
      t.fail(err);
    } finally {
      t.end();
    }
  });

const unit = (...args) => test(...args, true);

module.exports = { test, app, unit };
