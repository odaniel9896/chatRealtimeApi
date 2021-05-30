const express = require("express");
const authMiddleware = require("./middleware/authorization");

const messageController = require("./controller/message/message");

const routes = express.Router();

routes.get("/messages/:groupId", messageController.index);

module.exports = routes;