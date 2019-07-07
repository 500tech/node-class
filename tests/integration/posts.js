const { test, app } = require("../utils");

test("Fail to create a new post w/o token", async t => {
  try {
    await app.api.posts.post({
      title: "Lorem Ipsum",
      body: "Foo bar"
    });
    t.fail();
  } catch (err) {
    t.equal(err.code, 401);
  }
});

async function getValidToken() {
  const random = Math.round(Math.random() * 10000);
  const email = `u${random}@test.io`;
  const password = "password";
  await app.api.auth.signup.post({ email, password });
  const { token } = await app.api.auth.login.post({ email, password });
  return token;
}

test("Create a new post", async t => {
  const post = await app.api.posts.post(
    {
      title: "Lorem Ipsum",
      body: "Foo bar"
    },
    {
      headers: {
        Authorization: await getValidToken()
      }
    }
  );
  t.equal(post.title, "Lorem Ipsum");
  t.equal(post.body, "Foo bar");
  t.ok(typeof post.$id === "string");
});

test("Create an invalid post", async t => {
  try {
    await app.api.posts.post(
      {
        body: "Foo bar"
      },
      {
        headers: {
          Authorization: await getValidToken()
        }
      }
    );
    t.fail();
  } catch (err) {
    t.equals(err.code, 422);
  }
});

test("Get post by id", async t => {
  const { $id } = await app.api.posts.post(
    {
      title: "Lorem Ipsum",
      body: "Foo bar"
    },
    {
      headers: {
        Authorization: await getValidToken()
      }
    }
  );
  const post = await app.api.posts[$id].get();
  t.equal(post.title, "Lorem Ipsum");
  t.equal(post.body, "Foo bar");
  t.ok(typeof post.$id === "string");
});

test("Get non existent post by id", async t => {
  try {
    await app.api.posts.nope1.get();
  } catch (err) {
    t.equals(err.code, 404);
  }
});
