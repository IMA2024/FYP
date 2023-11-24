// const messageModel = require('../models/message');
// const userModel = require("../models/userModel");
// const chatModel = require("../models/chatModel");

// //@description     Get all Messages
// //@route           GET /api/Message/:chatId
// //@access          Protected
// const allMessages = async (req, res) => {
//   try {
//     const messages = await messageModel.find({ chat: req.params.chatId })
//       .populate("sender", "name pic email")
//       .populate("chat");
//     res.json(messages);
//   } catch (error) {
//     res.status(400);
//     throw new Error(error.message);
//   }
// };

// //@description     Create New Message
// //@route           POST /api/Message/
// //@access          Protected
// const sendMessage = async (req, res) => {
//   const { content, chatId } = req.body;

//   if (!content || !chatId) {
//     console.log("Invalid data passed into request");
//     return res.sendStatus(400);
//   }

//   var newMessage = {
//     sender: req.user._id,
//     content: content,
//     chat: chatId,
//   };

//   try {
//     var message = await messageModel.create(newMessage);

//     message = await messageModel.populate("sender", "name pic").execPopulate();
//     message = await messageModel.populate("chat").execPopulate();
//     message = await userModel.populate(message, {
//       path: "chat.users",
//       select: "name pic email",
//     });

//     await chatModel.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

//     res.json(message);
//   } catch (error) {
//     res.status(400);
//     throw new Error(error.message);
//   }
// };

// module.exports = { allMessages, sendMessage };
