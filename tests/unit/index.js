const proxyquire = require("proxyquire");
const { unit } = require("../utils");

const db = proxyquire("../../app/db", {
  "lowdb/adapters/FileSync": require("lowdb/adapters/Memory"),
  "../env": {
    nodeEnv: "unit"
  }
});

const postsService = proxyquire("../../app/api/posts/service", {
  "../../db": db
});

const reset = () => db.set(postsService.COLLECTION, []).write();

unit("findPostById", t => {
  reset();
  const post = { $id: "foo", title: "fdfd", body: "fsdfsd" };
  const p1 = postsService.findPostById("foo");
  t.equals(p1, undefined);
  db.get(postsService.COLLECTION)
    .push(post)
    .write();
  const p2 = postsService.findPostById("foo");
  t.deepEqual(p2, post);
});

unit("getAllPosts", t => {
  reset();
  t.equals(postsService.getAllPosts().length, 0);
  const post = { $id: "foo", title: "fdfd", body: "fsdfsd" };
  db.get(postsService.COLLECTION)
    .push(post)
    .write();
  t.equals(postsService.getAllPosts().length, 1);
});

unit("createPost", t => {
  reset();
  t.equals(
    db
      .get(postsService.COLLECTION)
      .size()
      .value(),
    0
  );
  const post = postsService.createPost({ title: "title" });
  t.equals(post.title, "title");
  t.equals(
    db
      .get(postsService.COLLECTION)
      .size()
      .value(),
    1
  );
});
