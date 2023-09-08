const express = require("express");
const { businessOwnerAuth } = require("../middleware/auth");
const { addBusiness, viewAllBusinesses, updateBusiness, deleteBusiness } = require("../controllers/businessOwnerController/businessController");
const { addRevenue, viewAllRevenues, deleteRevenue, addExpense, viewAllExpenses, deleteExpense } = require("../controllers/businessOwnerController/accountingController");
const { viewSubscriptions, makePayment } = require("../controllers/businessOwnerController/subscriptionController");
const { viewAllFAQs } = require("../controllers/businessOwnerController/faqController");
const { addAgent, viewAllAgents, deleteAgent } = require("../controllers/businessOwnerController/agentController");
const businessOwnerRouter = express.Router();

// For Business

businessOwnerRouter.post('/addBusiness', addBusiness);
businessOwnerRouter.get('/viewAllBusinesses',viewAllBusinesses);
businessOwnerRouter.put('/updateBusiness', updateBusiness);
businessOwnerRouter.delete('/deleteBusiness', deleteBusiness);

// For Agents

businessOwnerRouter.post('/addAgent', addAgent);
businessOwnerRouter.get('/viewAllAgents', viewAllAgents);
businessOwnerRouter.delete('/deleteAgent', deleteAgent);

// For Revenue

businessOwnerRouter.post('/addRevenue', addRevenue);
businessOwnerRouter.get('/viewAllRevenues', viewAllRevenues);
businessOwnerRouter.delete('/deleteRevenue', deleteRevenue);

// For Expense

businessOwnerRouter.post('/addExpense', addExpense);
businessOwnerRouter.get('/viewAllExpenses', viewAllExpenses);
businessOwnerRouter.delete('/deleteExpense', deleteExpense);

// For Subscription

businessOwnerRouter.get('/viewSubscriptions', viewSubscriptions);
businessOwnerRouter.post('/makePayment', makePayment);

// For FAQ

businessOwnerRouter.get('/viewAllFAQs', viewAllFAQs);

module.exports = businessOwnerRouter;