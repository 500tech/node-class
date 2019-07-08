require("module-alias/register");
const env = require("@root/env");
const app = require("@app");

app.listen(+env.port, () => {
  if (!env.silent) {
    console.log("Server listening");
  }
});
