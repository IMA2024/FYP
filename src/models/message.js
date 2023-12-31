const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
        sender: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "user" 
        },
        receiver: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "user" 
        },
        message: { 
            type: String, 
            trim: true 
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("message", messageSchema);