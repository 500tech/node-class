const { test, app } = require("../utils");

test("Create a new user", async t => {
  await app.api.auth.signup.post({
    email: "foo@bar.io",
    password: "password"
  });
});

test("Create an invalid user", async t => {
  try {
    await app.api.auth.signup.post({
      email: "foo@bar.io",
      password: "pa"
    });
    t.fail();
  } catch (err) {
    t.equals(err.code, 422);
  }
});

test("Create a new user and login", async t => {
  await app.api.auth.signup.post({
    email: "test@bar.io",
    password: "password"
  });
  const user = await app.api.auth.login.post({
    email: "test@bar.io",
    password: "password"
  });
  t.equals(user.email, "test@bar.io");
  try {
    await app.api.auth.login.post({
      email: "test@bar.io",
      password: "password1"
    });
    t.fail();
  } catch (err) {
    t.equals(err.code, 404);
  }
});
