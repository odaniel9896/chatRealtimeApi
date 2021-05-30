const express = require("express");
const authMiddleware = require("./middleware/authorization");

const routes = express.Router();

routes.get("/", (req,res) => {

});

module.exports = routes;