const mongoose = require("mongoose");

const businessSchema = mongoose.Schema({
  photo:{
    type: String
  },
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true,
   }, 
   status:{
    type: String,
    default: 'Active'
   }
}, { timestamps: true });

module.exports = mongoose.model("business", businessSchema);