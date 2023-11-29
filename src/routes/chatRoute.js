const express = require("express");
const { getContactsHistory, getChat } = require("../controllers/chatController");
const chatRouter = express.Router(); 

chatRouter.post("/", getContactsHistory);
chatRouter.post("/:userId", getChat);

module.exports = chatRouter;