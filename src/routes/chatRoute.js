const express = require("express");
const { fetchChats, accessChat } = require("../controllers/chatcontroller");
const chatRouter = express.Router(); 

chatRouter.post("/", accessChat);
chatRouter.get("/", fetchChats);

module.exports = chatRouter;