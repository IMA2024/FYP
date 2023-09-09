const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
    title: {
        type: String,
        default: 'Subscription'
    },  
    // businessOwner: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'user',
    //     required: true
    // },
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
    status: {
        type: String,
        default: "Completed"
    },
},
    { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);