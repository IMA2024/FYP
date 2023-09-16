const questionnaireModel = require("../../models/questionnaire");
const jwt = require('jsonwebtoken');
require("dotenv").config();

const addQuestionnaire = async (req, res) => {
    const { business , questionnaire } = req.body;
  
    try {
      const newQuestionnaire = await questionnaireModel.create({ business, questionnaire });
      return res.status(201).json({ message: 'Questionnaire Added Successfully', questionnaire: newQuestionnaire });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Something went wrong.' });
    }
  };
  

const viewAllQuestionnaires = async (req, res) => {
    try {
      const questionnaires = await questionnaireModel.find().populate('business');
      return res.status(200).json({ questionnaires: questionnaires });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Something went wrong.' });
    }
  };
  
//   const viewQuestionnaireById = async (req, res) => {
//     try {
//       const questionnaire = await Questionnaire.findById(req.params.id).populate('business');
//       if (!questionnaire) {
//         return res.status(404).json({ message: 'Questionnaire not found' });
//       }
//       return res.status(200).json({ questionnaire: questionnaire });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: 'Something went wrong.' });
//     }
//   };
  

const updateQuestionnaire = async (req, res) => {
    const { questionnaireId, businessId , questionnaire } = req.body;
  
    try {
      const updatedQuestionnaire = await questionnaireModel.findByIdAndUpdate(
        questionnaireId,
        { businessId, questionnaire },
        { new: true }
      );
  
      if (!updatedQuestionnaire) {
        return res.status(404).json({ message: 'Questionnaire Not Found' });
      }
  
      return res.status(200).json({ questionnaire: updatedQuestionnaire });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Something went wrong.' });
    }
  };
  

const deleteQuestionnaire = async (req, res) => {
    const { questionnaireId } = req.query;
  
    try {
      const deletedQuestionnaire = await questionnaireModel.findByIdAndDelete(questionnaireId);
      if (!deletedQuestionnaire) {
        return res.status(404).json({ message: 'Questionnaire not found' });
      }
  
      return res.status(200).json({ message: 'Questionnaire Deleted Successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Something went wrong.' });
    }
  };
  
module.exports = { addQuestionnaire , viewAllQuestionnaires , updateQuestionnaire , deleteQuestionnaire };