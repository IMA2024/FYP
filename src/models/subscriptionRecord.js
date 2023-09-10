const mongoose = require("mongoose");

const subscriptionRecordSchema =  mongoose.Schema({

    title: {
        type: String,
    },  
    type: {
        type: String,
    },  
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'business',
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    method: {
        type: String,
        default: 'Stripe'
    },
}, { timestamps: true });

module.exports = mongoose.model("subscriptionRecord", subscriptionRecordSchema);

