const mongoose = require("mongoose");

const revenueSchema = mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'business',
        required: true
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },  
    profilePic:{
        type: String
      },
},
    { timestamps: true });

module.exports = mongoose.model("Revenue", revenueSchema);