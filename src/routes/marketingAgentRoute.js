const express = require("express");
const { signup, signin, viewAllMarkeingAgents, viewSpecificMarkeingAgent, updateMarkeingAgent, deleteMarkeingAgent } = require("../controllers/marketingAgentController");
const marketingAgentRouter = express.Router();

marketingAgentRouter.post('/signup', signup);
marketingAgentRouter.post('/signin', signin);
marketingAgentRouter.get('/viewAllMarkeingAgents', viewAllMarkeingAgents);
marketingAgentRouter.get('/viewSpecificMarkeingAgent/:id',viewSpecificMarkeingAgent);
marketingAgentRouter.patch('/updateMarketingAgent/:id', updateMarkeingAgent);
marketingAgentRouter.delete('/deleteMarkeingAgent/:id', deleteMarkeingAgent);



module.exports = marketingAgentRouter;  