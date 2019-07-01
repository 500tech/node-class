const { test } = require("../utils");

test("Sample test", t => {
  t.equal(1 + 1, 2);
});

test("Async test", async t => {
  await new Promise(resolve => setTimeout(resolve, 100));
  t.equal(1 + 1, 2);
});
