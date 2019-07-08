const proxyquire = require("proxyquire").noCallThru();
const sinon = require("sinon");
const { unit } = require("../utils");

const db = proxyquire("@services/db", {
  "lowdb/adapters/FileSync": require("lowdb/adapters/Memory"),
  "@root/env": {
    nodeEnv: "unit"
  }
});

const cache = {
  get: sinon.stub(),
  set: sinon.stub()
};

const postsService = proxyquire("@services/posts", {
  "@services/cache": cache,
  "@services/db": db,
});

const reset = () => {
  cache.set.reset();
  cache.get.reset();
  db.set(postsService.COLLECTION, []).write();
};

unit("findPostById (uncached)", async t => {
  reset();
  cache.get.resolves(null);
  cache.set.resolves();
  const post = { $id: "foo", title: "fdfd", body: "fsdfsd" };
  const p1 = await postsService.findPostById("foo");
  t.equals(p1, undefined);
  db.get(postsService.COLLECTION)
    .push(post)
    .write();
  const p2 = await postsService.findPostById("foo");
  t.deepEqual(p2, post);
});

unit("findPostById (cached)", async t => {
  reset();
  const post = { $id: "foo", title: "fdfd", body: "fsdfsd" };
  cache.get.resolves(JSON.stringify(post));
  cache.set.rejects();
  const p1 = await postsService.findPostById("foo");
  t.deepEqual(p1, post);
});

unit("getAllPosts", async t => {
  reset();
  t.equals((await postsService.getAllPosts()).length, 0);
  const post = { $id: "foo", title: "fdfd", body: "fsdfsd" };
  db.get(postsService.COLLECTION)
    .push(post)
    .write();
  t.equals((await postsService.getAllPosts()).length, 1);
});

unit("createPost", async t => {
  reset();
  t.equals(
    db
      .get(postsService.COLLECTION)
      .size()
      .value(),
    0
  );
  const post = await postsService.createPost({ title: "title" });
  t.equals(post.title, "title");
  t.equals(
    db
      .get(postsService.COLLECTION)
      .size()
      .value(),
    1
  );
});
