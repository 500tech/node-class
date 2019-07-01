const { test, app } = require("../utils");

test("Create a new post", async t => {
  const post = await app.api.posts.post({
    title: "Lorem Ipsum",
    body: "Foo bar"
  });
  t.equal(post.title, "Lorem Ipsum");
  t.equal(post.body, "Foo bar");
  t.ok(typeof post.$id === "string");
});

test("Create an invalid post", async t => {
  try {
    await app.api.posts.post({
      body: "Foo bar"
    });
    t.fail();
  } catch (err) {
    t.equals(err.code, 422);
  }
});

test("Get post by id", async t => {
  const { $id } = await app.api.posts.post({
    title: "Lorem Ipsum",
    body: "Foo bar"
  });
  const post = await app.api.posts[$id].get();
  t.equal(post.title, "Lorem Ipsum");
  t.equal(post.body, "Foo bar");
  t.ok(typeof post.$id === "string");
});

test("Get non existent post by id", async t => {
  try {
    await app.api.posts.nope.get();
  } catch (err) {
    t.equals(err.code, 404);
  }
});
