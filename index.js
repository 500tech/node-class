const env = require("./env");
const app = require("./app");
app.listen(env.port, () => console.log("Server listening"));
