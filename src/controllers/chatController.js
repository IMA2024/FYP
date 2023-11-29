const Message = require('../models/message');
const ObjectId = require('mongoose').Types.ObjectId;

async function getContactsHistory(req, res, next){

    console.log('Contacts History --- LOADED');
    let {id} = req.body;

    let contactsHistory = Message.aggregate([
        {
          $match: {
            $or: [
              {
                sender: new ObjectId(id),
              },
              {
                receiver: new ObjectId(id),
              },
            ],
          },
        },
        {
          $project: {
            "user": {
                  $cond: {
                     if: { $eq: [ new ObjectId(id), "$sender" ] },
                     then: "$receiver",
                     else: "$sender"
                  }
              },
            "message": 1,
            "status": {
                  $cond: {
                     if: { $eq: [ new ObjectId(id), "$sender" ] },
                     then: "send",
                     else: "receive"
                  }
              },
            "createdAt": 1
          }
        },
        {
        $group: {
          _id: "$user",
          latestMessage: {
            $push: {
              message: "$message",
              createdAt: "$createdAt",
              status: "$status"
            }
          },
          latestCreatedAt: {
            $max: "$createdAt"
          }
        }
      },
      {
        $project: {
          _id: 1,
          latestMessage: {
            $filter: {
              input: "$latestMessage",
              cond: { $eq: ["$latestCreatedAt", "$$this.createdAt"] }
            }
          }
        }
      },
        {$unwind:{
          path: "$latestMessage"
        }},
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "user"
          }
        },
        {
          $unwind: {
            path: "$user"
          }
        }
      ]);
    
    return contactsHistory;
}

async function getChat(req, res, next){

    let {id} = req.body;
    let secUserId = req.params.userId;

    let chat = Message.aggregate([
        {
          $match: {
            $or: [
              {
                $and: [
                  {
                    sender: new ObjectId(
                        id
                    ),
                  },
                  {
                    receiver: new ObjectId(
                      secUserId
                    ),
                  },
                ],
              },
              {
                $and: [
                  {
                    sender: new ObjectId(
                      secUserId
                    ),
                  },
                  {
                    receiver: new ObjectId(
                        id
                    ),
                  },
                ],
              },
            ],
          },
        },
        {
          $project: {
            user: {
              $cond: {
                if: {
                  $eq: [
                    new ObjectId(
                        id
                    ),
                    "$sender",
                  ],
                },
                then: "$receiver",
                else: "$sender",
              },
            },
            message: 1,
            status: {
              $cond: {
                if: {
                  $eq: [
                    new ObjectId(
                        id
                    ),
                    "$sender",
                  ],
                },
                then: "send",
                else: "receive",
              },
            },
            createdAt: 1,
          },
        },
        {
          $group: {
            _id: "$user",
            messages: {
              $push: {
                id: "$_id",
                message: "$message",
                createdAt: "$createdAt",
                status: "$status",
              },
            },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: {
            path: "$user",
          },
        }
        ]);
      
      return chat;
}

module.exports = { getContactsHistory, getChat  }