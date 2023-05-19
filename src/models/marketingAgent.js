const mongoose = require("mongoose");

const marketingAgentSchema = mongoose.Schema({

  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    immutable: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  businesses: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'business'
  }
}, { timestamps: true });

module.exports = mongoose.model("marketingAgent", marketingAgentSchema);