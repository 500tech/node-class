const { test, app } = require("../utils");

test("Sample test", t => {
  t.equal(1 + 1, 2);
});

test("Async test", async t => {
  await new Promise(resolve => setTimeout(resolve, 100));
  t.equal(1 + 1, 2);
});

test("Index test", async t => {
  const value = await app.get();
  t.deepEqual(value, {
    message: "Hello, world"
  });
});
