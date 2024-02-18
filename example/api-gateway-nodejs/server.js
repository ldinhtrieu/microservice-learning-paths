const express = require("express");
const { setupRateLimit } = require("./ratelimit");
const { setupLogging } = require("./logging");
const { ROUTES } = require("./routes");
const { setupCreditCheck } = require("./creditcheck");
const { setupProxies } = require("./proxy");
const { setupAuth } = require("./auth");
const app = express();
const port = 3000;

setupLogging(app);
setupRateLimit(app, ROUTES);
//setup Auth, #Note: before setup proxies
setupAuth(app, ROUTES);
setupCreditCheck(app, ROUTES);
setupProxies(app, ROUTES);

app.listen(port, () => {
  console.log(`Example app listening at http:/localhost:${port}`);
});
