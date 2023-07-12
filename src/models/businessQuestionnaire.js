const mongoose = require("mongoose");

const businessQuestionnaireSchema =  mongoose.Schema({
    businessName: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    budget: {
      type: Number,
      required: true
    },
    contact: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    question1: {
      type: String
    },
    question2: {
      type: String
    },
    question3: {
      type: String
    },
    question4: {
      type: String
    },
    question5: {
      type: String
    }}, { timestamps: true });

module.exports = mongoose.model("businessQuestionnaire", businessQuestionnaireSchema);