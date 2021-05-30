//import do express
const express = require("express");

const { errors } = require("celebrate");

const cors = require("cors");

const routes = require("./routes");

require("./database");

const app = express();

app.use(express.json());

app.use(cors());

app.use(routes);

app.use(errors());

module.exports = app;