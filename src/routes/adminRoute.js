const express = require("express");
const { signup , signin, viewAllAdmins , viewSpecificAdmin, updateAdmin, deleteAdmin,
        addMarketingAgent, viewAllMarketingAgents, viewSpecificMarketingAgent, updateMarketingAgent, deleteMarketingAgent,
        addBusinessOwner, viewAllOwners, changePassword, viewSpecificOwner, updateOwner, deleteOwner, calculateProfit} = require("../controllers/adminController");
const { addBusiness, viewAllBusinesses, updateBusiness, deleteBusiness, viewSpecificBusiness} = require("../controllers/businessController");
const {addNewSubscription, viewAllSubscriptions, viewSpecificSubscription, updateSubscription, deleteSubscription} = require("../controllers/subscriptionController");
const {createQuestionnaire , viewAllQuestionnaires, viewSpecificQuestionnaire, updateQuestionnaire, deleteQuestionnaire} = require("../controllers/businessQuestionnaireController");
const {addRevenue, viewAllRevenues, viewSpecificRevenue, deleteRevenue, calculateTotalRevenue} = require("../controllers/revenueController");
const {addExpense, viewAllExpenses, viewSpecificExpense, deleteExpense, calculateTotalExpense} = require("../controllers/expenseController");
const { adminAuth } = require("../middleware/auth");
const adminRouter = express.Router();

// For Admins
adminRouter.post('/signup', signup);
adminRouter.post('/signin', signin);
adminRouter.get('/viewAllAdmins',adminAuth ,viewAllAdmins);
adminRouter.get('/viewSpecificAdmin/:id',adminAuth ,viewSpecificAdmin);
adminRouter.patch('/changePassword',adminAuth, changePassword);
adminRouter.patch('/updateAdmin/:id', adminAuth, updateAdmin);
adminRouter.delete('/deleteAdmin/:id', adminAuth ,deleteAdmin);

adminRouter.get('/totalProfit', calculateProfit);


// For Marketing Agents
adminRouter.post('/addMarketingAgent', adminAuth , addMarketingAgent);
adminRouter.get('/viewAllMarketingAgents', adminAuth, viewAllMarketingAgents);
adminRouter.get('/viewSpecificMarketingAgent/:id',adminAuth ,viewSpecificMarketingAgent);
adminRouter.patch('/updateMarketingAgent/:id', adminAuth, updateMarketingAgent);
adminRouter.delete('/deleteMarketingAgent/:id', adminAuth ,deleteMarketingAgent);

// For Business Owners
adminRouter.post('/addBusinessOwner', adminAuth, addBusinessOwner);
adminRouter.get('/viewAllOwners', adminAuth , viewAllOwners);
adminRouter.get('/viewSpecificOwner/:id', adminAuth, viewSpecificOwner);
adminRouter.patch('/updateOwner/:id', adminAuth, updateOwner);
adminRouter.delete('/deleteOwner/:id', adminAuth, deleteOwner);

// For Businesses
adminRouter.post('/addBusiness',adminAuth, addBusiness);
adminRouter.get('/viewBusinesses',adminAuth, viewAllBusinesses);
adminRouter.get('/viewSpecificBusiness/:id',adminAuth, viewSpecificBusiness);
adminRouter.patch('/updateBusiness/:id',adminAuth, updateBusiness);
adminRouter.delete('/deleteBusiness/:id',adminAuth, deleteBusiness);

// For Subscriptions
adminRouter.post('/addNewSubscription',adminAuth, addNewSubscription);
adminRouter.get('/viewAllSubscriptions',adminAuth, viewAllSubscriptions);
adminRouter.get('/viewSpecificSubscription/:id',adminAuth, viewSpecificSubscription);
adminRouter.patch('/updateSubscription/:id',adminAuth, updateSubscription);
adminRouter.delete('/deleteSubscription/:id',adminAuth, deleteSubscription);

// For Business Questionnaire
adminRouter.post('/createQuestionnaire', adminAuth , createQuestionnaire);
adminRouter.get('/viewAllQuestionnaires', adminAuth , viewAllQuestionnaires);
adminRouter.get('/viewSpecificQuestionnaire/:id', adminAuth , viewSpecificQuestionnaire);
adminRouter.patch('/updateQuestionnaire/:id', adminAuth , updateQuestionnaire);
adminRouter.delete('/deleteQuestionnaire/:id', adminAuth , deleteQuestionnaire);

// For Revenue
adminRouter.post('/addRevenue', adminAuth , addRevenue);
adminRouter.get('/viewAllRevenues', adminAuth ,viewAllRevenues);
adminRouter.get('/viewSpecificRevenue/:id',adminAuth , viewSpecificRevenue);
adminRouter.delete('/deleteRevenue/:id', adminAuth ,deleteRevenue);
adminRouter.get('/totalRevenue', calculateTotalRevenue);

// For Expense
adminRouter.post('/addExpense',adminAuth ,addExpense);
adminRouter.get('/viewAllExpenses', adminAuth ,viewAllExpenses);
adminRouter.get('/viewSpecificExpense/:id', adminAuth ,viewSpecificExpense);
adminRouter.delete('/deleteExpense/:id',adminAuth ,deleteExpense);
adminRouter.get('/totalExpense', calculateTotalExpense);


module.exports = adminRouter;