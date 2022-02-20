require("marko/node-require.js").install();
require("marko/express");

const express = require("express");
const app = express();

const routes = require("../app/routes/routes.js")
routes(app)

module.exports = app;