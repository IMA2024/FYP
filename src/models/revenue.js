const mongoose = require("mongoose");

const revenueSchema = mongoose.Schema({

    business: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    }
},
    { timestamps: true });

module.exports = mongoose.model("Revenue", revenueSchema);