const mongoose = require("mongoose");

const agentSchema = mongoose.Schema({
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'business',
        required: true
    },
    name: {
        type: String,
    },
    voice: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model("agent", agentSchema);