const mongoose = require("mongoose");

const faqSchema = mongoose.Schema({

    question: {
        type: String
    },
    answer: {
        type: String
    },
},
    { timestamps: true });

module.exports = mongoose.model("FAQ", faqSchema);