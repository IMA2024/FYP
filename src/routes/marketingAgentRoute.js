const express = require("express");
const { viewAllSubscribedBusinesses, deleteBusiness } = require("../controllers/marketingAgentController/businessController");
const { addAgent, viewAllAgents, deleteAgent } = require("../controllers/marketingAgentController/agentController");
const { addQuestionnaire, viewAllQuestionnaires, updateQuestionnaire, deleteQuestionnaire } = require("../controllers/marketingAgentController/questionnaireController");
const marketingAgentRouter = express.Router();

// For Business

marketingAgentRouter.get('/viewAllSubscribedBusinesses',viewAllSubscribedBusinesses);
marketingAgentRouter.delete('/deleteBusiness', deleteBusiness);

// For Questionnaires

marketingAgentRouter.post('/addQuestionnaire', addQuestionnaire);
marketingAgentRouter.get('/viewAllQuestionnaires',viewAllQuestionnaires);
marketingAgentRouter.put('/updateQuestionnaire', updateQuestionnaire);
marketingAgentRouter.delete('/deleteQuestionnaire', deleteQuestionnaire);

// For Agents

marketingAgentRouter.post('/addAgent', addAgent);
marketingAgentRouter.get('/viewAllAgents', viewAllAgents);
marketingAgentRouter.delete('/deleteAgent', deleteAgent);


module.exports = marketingAgentRouter;