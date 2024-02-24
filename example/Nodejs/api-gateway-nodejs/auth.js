const Keycloak = require("keycloak-connect");

const session = require("express-session");

const setupAuth = (app, routers) => {
  let memoryStore = new session.MemoryStore();
  let keycloak = new Keycloak({ store: memoryStore });

  app.use(
    session({
      secret: "3DFF18881B95A39113516DBD3BF42",
      resave: false,
      saveUninitialized: true,
      store: memoryStore,
    })
  );

  app.use(keycloak.middleware());

  routers.forEach((element) => {
    if (element.auth) {
      app.use(element.url, keycloak.protect(), function (req, res, next) {
        next();
      });
    }
  });
};

exports.setupAuth = setupAuth;
