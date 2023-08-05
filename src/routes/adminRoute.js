const express = require("express");
const { addUser, viewAllUsers, deleteUser, updateUser} = require("../controllers/adminController/userController");
const { addBusiness, viewAllBusinesses, updateBusiness, deleteBusiness } = require("../controllers/adminController/businessController");
const { addNewSubscription, viewSubscriptions, updateSubscription, deleteSubscription } = require("../controllers/adminController/subscriptionController");
const { adminAuth, marketingAgentAuth, businessOwnerAuth, customerAuth } = require("../middleware/auth");
const { addRevenue, viewAllRevenues, deleteRevenue, addExpense, viewAllExpenses, deleteExpense } = require("../controllers/adminController/accountingController");
const adminRouter = express.Router();

// For Users

adminRouter.post('/addUser',addUser);
adminRouter.get('/viewAllUsers',viewAllUsers);
adminRouter.put('/updateUser',updateUser);
adminRouter.delete('/deleteUser' ,deleteUser);

// For Business

adminRouter.post('/addBusiness',addBusiness);
adminRouter.get('/viewAllBusinesses',viewAllBusinesses);
adminRouter.put('/updateBusiness', updateBusiness);
adminRouter.delete('/deleteBusiness', deleteBusiness);

// For Subscription

adminRouter.post('/addNewSubscription',addNewSubscription);
adminRouter.get('/viewSubscriptions',viewSubscriptions);
adminRouter.put('/updateSubscription', updateSubscription);
adminRouter.delete('/deleteSubscription', deleteSubscription);

// For Revenue

adminRouter.post('/addRevenue', addRevenue);
adminRouter.get('/viewAllRevenues', viewAllRevenues);
adminRouter.delete('/deleteRevenue', deleteRevenue);

// For Expense

adminRouter.post('/addExpense', addExpense);
adminRouter.get('/viewAllExpenses', viewAllExpenses);
adminRouter.delete('/deleteExpense', deleteExpense);


module.exports = adminRouter;