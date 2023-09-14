const mongoose = require("mongoose");

const questionnaireSchema = mongoose.Schema({
    
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'business',
    required: true
    },
    questionnaire: [{
        question: String,
        answer: [String]
    }]
}, { timestamps: true });

module.exports = mongoose.model("Questionnaire", questionnaireSchema);