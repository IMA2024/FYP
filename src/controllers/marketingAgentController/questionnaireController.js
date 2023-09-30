const questionnaireModel = require("../../models/questionnaire");
require("dotenv").config();

const addQuestionnaire = async (req, res) => {
  const { business, questionnaire } = req.body;

  try {
    const existingQuestionnaire = await questionnaireModel.findOne({ business });

    if (existingQuestionnaire) {
      return res.status(400).json({ message: 'Questionnaire Already Exists For This Business.' });
    }

    const newQuestionnaire = await questionnaireModel.create({ business, questionnaire });
    return res.status(201).json({ message: 'Questionnaire Added Successfully', questionnaire: newQuestionnaire });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong.' });
  }
};

  

const viewAllQuestionnaires = async (req, res) => {
    try {
      const questionnaires = await questionnaireModel.find().populate({
        path: 'business',
        populate: {
          path: 'businessOwner',
          model: 'user' 
        }
      });
      return res.status(200).json({ questionnaires: questionnaires });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Something went wrong.' });
    }
  };

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