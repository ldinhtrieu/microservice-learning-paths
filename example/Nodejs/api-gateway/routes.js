const ROUTES = [
  {
    url: "/hello",
    auth: false,
    creditCheck: false,
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 5,
    },
    proxy: {
      target: "https://dictionary.cambridge.org/vi/dictionary/english",
      changeOrigin: true,
      pathRewrite: {
        [`^/hello
    `]: "",
      },
    },
  },
  {
    url: "/ldinhtrieu",
    auth: true,
    creditCheck: true,
    proxy: {
      target: "https://github.com/",
      changeOrigin: true,
      pathRewrite: {
        [`^/ldinhtrieu
    `]: "",
      },
    },
  },
];
exports.ROUTES = ROUTES;
