const { test, app } = require("../utils");

test("Sample test", t => {
  t.equal(1 + 1, 2);
});

test("Async test", async t => {
  await new Promise(resolve => setTimeout(resolve, 100));
  t.equal(1 + 1, 2);
});

test("Index test [GET]", async t => {
  const value = await app.get();
  t.deepEqual(value, {
    message: "Hello, world"
  });
});

test("Index test [POST]", async t => {
  const payload = await app.post({
    userId: 3
  });
  t.deepEqual(payload, {
    userId: 3
  });
});
