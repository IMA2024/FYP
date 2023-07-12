const businessQuestionnaireModel = require("../models/businessQuestionnaire");
const { json } = require("express");
require("dotenv").config();

        // Adding Business Questionnaire 

        const createQuestionnaire = async (req, res) => {
          const {
            businessName, location, budget, contact, description, question1, question2, question3, question4, question5
          } = req.body;
        
          try {
            const newQuestionnaire = await businessQuestionnaireModel.create({
              businessName, location, budget, contact, description, question1, question2, question3, question4, question5
            });
        
            res.status(201).json(newQuestionnaire);
          } catch (err) {
            res.status(400).json({ message: err.message });
          }
        };
    
        // View All Business Questionnaires
    
        const viewAllQuestionnaires = async (req, res) => {
          try {
            const questionnaires = await businessQuestionnaireModel.find();
            res.status(200).json(questionnaires);
          } catch (err) {
            res.status(500).json({ message: err.message });
          }
        };
          
        // View Specific Business Questionnaire 
    
        const viewSpecificQuestionnaire = async (req, res) => {
          const questionnaireId = req.params.id;
        
          try {
            const questionnaire = await businessQuestionnaireModel.findById(questionnaireId);
        
            if (!questionnaire) {
              return res.status(404).json({ error: 'Questionnaire not found.' });
            }
        
            res.status(200).json(questionnaire);
          } catch (err) {
            res.status(500).json({ message: err.message });
          }
        };
        
        // Update Business Questionnaire 
    
        const updateQuestionnaire = async (req, res) => {
          const questionnaireId = req.params.id;
          const { title, description, questions } = req.body;
        
          try {
            const updatedQuestionnaire = await businessQuestionnaireModel.findByIdAndUpdate(
              questionnaireId,
              { title, description, questions },
              { new: true }
            );
        
            if (!updatedQuestionnaire) {
              return res.status(404).json({ error: 'Questionnaire not found.' });
            }
        
            res.status(200).json(updatedQuestionnaire);
          } catch (err) {
            res.status(500).json({ message: err.message });
          }
        };

        // Delete Business Questionnaire 

        const deleteQuestionnaire = async (req, res) => {
          const questionnaireId = req.params.id;
        
          try {
            const deletedQuestionnaire = await businessQuestionnaireModel.findByIdAndDelete(questionnaireId);
        
            if (!deletedQuestionnaire) {
              return res.status(404).json({ error: 'Questionnaire not found.' });
            }
        
            res.status(200).json({ message: 'Questionnaire deleted successfully.' });
          } catch (err) {
            res.status(500).json({ message: err.message });
          }
        };
        
module.exports = { createQuestionnaire , viewAllQuestionnaires, viewSpecificQuestionnaire, updateQuestionnaire, deleteQuestionnaire}