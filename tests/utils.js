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
      await waitForPort();
    }
    this.isUp = true;
  }
};

const test = (title, cb) =>
  _test(title, async t => {
    await porter.waitForPort();
    try {
      await cb(t);
    } catch (err) {
      t.fail(err);
    } finally {
      t.end();
    }
  });

module.exports = { test, app };
