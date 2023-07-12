const express = require("express");
const { signup, signin, viewSpecificMarketingAgent, changePassword, updateMarketingAgent, deleteMarketingAgent } = require("../controllers/marketingAgentController");
const marketingAgentRouter = express.Router();
const {marketingAgentAuth} = require("../middleware/auth");

marketingAgentRouter.post('/signup', signup);
marketingAgentRouter.post('/signin', signin);
marketingAgentRouter.get('/viewSpecificMarketingAgent/:id', marketingAgentAuth ,viewSpecificMarketingAgent);
marketingAgentRouter.get('/changePassword/:id', marketingAgentAuth ,changePassword);
marketingAgentRouter.patch('/updateMarketingAgent/:id', marketingAgentAuth, updateMarketingAgent);
marketingAgentRouter.delete('/deleteMarketingAgent/:id', marketingAgentAuth ,deleteMarketingAgent);

module.exports = marketingAgentRouter;  