const mongoose = require("mongoose");

const expenseSchema =  mongoose. Schema({
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
    }} ,
     { timestamps: true });

  module.exports = mongoose.model("Expense",expenseSchema);