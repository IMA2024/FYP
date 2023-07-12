const mongoose = require("mongoose");

const subscriptionSchema =  mongoose.Schema({

    type: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    limit: {
      type: String,
      required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("subscription", subscriptionSchema);