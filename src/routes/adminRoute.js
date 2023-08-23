const express = require("express");
const { addUser, viewAllUsers, deleteUser, updateUser} = require("../controllers/adminController/userController");
const { addBusiness, viewAllBusinesses, updateBusiness, deleteBusiness, businessesList } = require("../controllers/adminController/businessController");
const { addNewSubscription, viewSubscriptions, updateSubscription, deleteSubscription } = require("../controllers/adminController/subscriptionController");
const { adminAuth } = require("../middleware/auth");
const { addRevenue, viewAllRevenues, addExpense, viewAllExpenses, deleteRevenue, deleteExpense } = require("../controllers/adminController/accountingController");
const { businessOwnersList } = require("../controllers/adminController/businessOwnersList");
const { totalUsers, totalMarketingAgents, totalBusinessOwners, totalBusinesses, totalRevenue, totalCustomers, totalSubscriptions } = require("../controllers/adminController/dashboardController");
const adminRouter = express.Router();

// For Dashboard
adminRouter.get('/totalUsers', totalUsers);
adminRouter.get('/totalMarketingAgents', totalMarketingAgents);
adminRouter.get('/totalBusinessOwners', totalBusinessOwners);
adminRouter.get('/totalCustomers', totalCustomers);

adminRouter.get('/totalSubscriptions', totalSubscriptions);
adminRouter.get('/totalRevenue', totalRevenue);
adminRouter.get('/totalBusinesses', totalBusinesses);


// For Users

adminRouter.post('/addUser', addUser);
adminRouter.get('/viewAllUsers',viewAllUsers);
adminRouter.put('/updateUser',updateUser);
adminRouter.delete('/deleteUser' ,deleteUser);

// For Business Owners List
adminRouter.get('/businessOwnersList',businessOwnersList);

// For Business

adminRouter.post('/addBusiness',addBusiness);
adminRouter.get('/viewAllBusinesses',viewAllBusinesses);
adminRouter.put('/updateBusiness', updateBusiness);
adminRouter.delete('/deleteBusiness', deleteBusiness);

adminRouter.get('/businessesList',businessesList);

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