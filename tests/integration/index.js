const { test, app } = require("../utils");

test("Index test [GET]", async t => {
  const value = await app.api.get();
  t.deepEqual(value, {
    message: "Hello, world"
  });
});

test("Index test [POST]", async t => {
  const payload = await app.api.post({
    userId: 3
  });
  t.deepEqual(payload, {
    userId: 3
  });
});
