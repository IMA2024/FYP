const express = require("express");
const { businessOwnerAuth } = require("../middleware/auth");
const { addBusiness, viewAllBusinesses, updateBusiness, deleteBusiness } = require("../controllers/businessOwnerController/businessController");
const { addRevenue, viewAllRevenues, deleteRevenue, addExpense, viewAllExpenses, deleteExpense } = require("../controllers/businessOwnerController/accountingController");
const { viewSubscriptions, makePayment, viewSubscriptionRecord, deleteSubscriptionRecord } = require("../controllers/businessOwnerController/subscriptionController");
const { viewAllFAQs } = require("../controllers/businessOwnerController/faqController");
const { addAgent, viewAllAgents, deleteAgent } = require("../controllers/businessOwnerController/agentController");
const { viewAllPayments, deletePayment } = require("../controllers/businessOwnerController/paymentController");
const { addQuestionnaire, viewAllQuestionnaires, updateQuestionnaire, deleteQuestionnaire } = require("../controllers/businessOwnerController/questionnaireController");
const businessOwnerRouter = express.Router();

// For Business

businessOwnerRouter.post('/addBusiness', addBusiness);
businessOwnerRouter.get('/viewAllBusinesses',viewAllBusinesses);
businessOwnerRouter.put('/updateBusiness', updateBusiness);
businessOwnerRouter.delete('/deleteBusiness', deleteBusiness);

// For Questionnaires

businessOwnerRouter.post('/addQuestionnaire', addQuestionnaire);
businessOwnerRouter.get('/viewAllQuestionnaires',viewAllQuestionnaires);
businessOwnerRouter.put('/updateQuestionnaire', updateQuestionnaire);
businessOwnerRouter.delete('/deleteQuestionnaire', deleteQuestionnaire);

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

// For Subscription Records

businessOwnerRouter.get('/viewSubscriptionRecord', viewSubscriptionRecord);
businessOwnerRouter.delete('/deleteSubscriptionRecord', deleteSubscriptionRecord);

// For Payments

businessOwnerRouter.get('/viewAllPayments', viewAllPayments);
businessOwnerRouter.delete('/deletePayment', deletePayment);

// For FAQ

businessOwnerRouter.get('/viewAllFAQs', viewAllFAQs);

module.exports = businessOwnerRouter;