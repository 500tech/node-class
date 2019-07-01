const env = require("./env");
const app = require("./app");

app.listen(+env.port, () => {
  if (!env.silent) {
    console.log("Server listening");
  }
});
