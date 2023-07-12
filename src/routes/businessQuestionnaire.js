const express = require("express");
const { createQuestionnaire, viewAllQuestionnaires, viewSpecificQuestionnaire, updateQuestionnaire, deleteQuestionnaire } = require("../controllers/businessQuestionnaireController");
const businessQuestionnaireRouter = express.Router();
const {adminAuth} = require("../middleware/auth");

businessQuestionnaireRouter.post('/createQuestionnaire',adminAuth , createQuestionnaire);
businessQuestionnaireRouter.get('/viewAllQuestionnaires', adminAuth, viewAllQuestionnaires);
businessQuestionnaireRouter.get('/viewSpecificQuestionnaire/:id', adminAuth, viewSpecificQuestionnaire);
businessQuestionnaireRouter.patch('/updateQuestionnaire/:id',adminAuth, updateQuestionnaire);
businessQuestionnaireRouter.delete('/deleteQuestionnaire/:id',adminAuth, deleteQuestionnaire);

module.exports = businessQuestionnaireRouter;  