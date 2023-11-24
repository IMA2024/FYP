// const userModel = require('../models/user');
// const chatModel = require('../models/chat');
// const messageModel = require('../models/message');
// require("dotenv").config();

// // Get All Users

// const allUsers = async (req, res) => {
//     const keyword = req.query.search
//       ? {
//           $or: [
//             { name: { $regex: req.query.search, $options: "i" } },
//             { email: { $regex: req.query.search, $options: "i" } },
//           ],
//         }
//       : {};
  
//     const users = await userModel.find(keyword).find({ _id: { $ne: req.user._id } });
//     return res.send(users);
//   };
  
//   // Access Chat or Create New One

//   const accessChat = async (req, res) => {
//     const { userId } = req.body;
  
//     if (!userId) {
//       console.log("UserId param not sent with request");
//       return res.sendStatus(400);
//     }
  
//     var isChat = await chatModel.find({
//       isGroupChat: false,
//       $and: [
//         { users: { $elemMatch: { $eq: req.user._id } } },
//         { users: { $elemMatch: { $eq: userId } } },
//       ],
//     })
//       .populate("user", "-password")
//       .populate("latestMessage");
  
//     isChat = await userModel.populate(isChat, {
//       path: "latestMessage.sender",
//       select: "firstName lastName profilePic email",
//     });
  
//     if (isChat.length > 0) {
//       return res.send(isChat[0]);
//     } else {
//       var chatData = {
//         chatName: "sender",
//         isGroupChat: false,
//         users: [req.user._id, userId],
//       };
  
//       try {
//         const createdChat = await chatModel.create(chatData);
//         const FullChat = await chatModel.findOne({ _id: createdChat._id }).populate(
//           "user",
//           "-password"
//         );
//         return res.status(200).json(FullChat);
//       } catch (error) {
//         res.status(400);
//         throw new Error(error.message);
//       }
//     }
//   };
  
//   //   Fetch all chats for a user

//   const fetchChats = async (req, res) => {
//     try {
//       chatModel.find({ users: { $elemMatch: { $eq: req.user._id } } })
//         .populate("user", "-password")
//         .populate("latestMessage")
//         .sort({ updatedAt: -1 })
//         .then(async (results) => {
//           results = await User.populate(results, {
//             path: "latestMessage.sender",
//             select: "firstName lastName profilePic email",
//           });
//           return res.status(200).send(results);
//         });
//     } catch (error) {
//       res.status(400);
//       throw new Error(error.message);
//     }
//   };

// module.exports = { allUsers , accessChat , fetchChats };