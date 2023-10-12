const express = require("express");
const { addUser, viewAllUsers, deleteUser, updateUser} = require("../controllers/adminController/userController");
const { addBusiness, viewAllBusinesses, updateBusiness, deleteBusiness, businessesList } = require("../controllers/adminController/businessController");
const { addNewSubscription, viewSubscriptions, updateSubscription, deleteSubscription, viewSubscriptionRecord, deleteSubscriptionRecord } = require("../controllers/adminController/subscriptionController");
const { addRevenue, viewAllRevenues, addExpense, viewAllExpenses, deleteRevenue, deleteExpense } = require("../controllers/adminController/accountingController");
const { businessOwnersList } = require("../controllers/adminController/businessOwnersList");
const { totalUsers, totalMarketingAgents, totalBusinessOwners, totalBusinesses, totalRevenue, totalCustomers, totalSubscriptions, subscribedBusinesses, unsubscribedBusinesses, totalPayments ,  totalExpense, totalProfit } = require("../controllers/adminController/dashboardController");
const { addFAQ, viewAllFAQs, updateFAQ, deleteFAQ } = require("../controllers/adminController/faqController");
const { viewAllPayments , deletePayment } = require("../controllers/adminController/paymentController");
const adminRouter = express.Router();

// For Dashboard
adminRouter.get('/totalUsers', totalUsers);
adminRouter.get('/totalMarketingAgents', totalMarketingAgents);
adminRouter.get('/totalBusinessOwners', totalBusinessOwners);
adminRouter.get('/totalCustomers', totalCustomers);

adminRouter.get('/totalBusinesses', totalBusinesses);
adminRouter.get('/subscribedBusinesses', subscribedBusinesses);
adminRouter.get('/unsubscribedBusinesses', unsubscribedBusinesses);

adminRouter.get('/totalSubscriptions', totalSubscriptions);
adminRouter.get('/totalRevenue', totalRevenue);
adminRouter.get('/totalExpense', totalExpense);
adminRouter.get('/totalProfit', totalProfit);
adminRouter.get('/totalPayments', totalPayments);

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

// For Subscription Records

adminRouter.get('/viewSubscriptionRecord',viewSubscriptionRecord);
adminRouter.delete('/deleteSubscriptionRecord', deleteSubscriptionRecord);

// For Accounting

// For Revenue

adminRouter.post('/addRevenue', addRevenue);
adminRouter.get('/viewAllRevenues', viewAllRevenues);
adminRouter.delete('/deleteRevenue', deleteRevenue);

// For Expense

adminRouter.post('/addExpense', addExpense);
adminRouter.get('/viewAllExpenses', viewAllExpenses);
adminRouter.delete('/deleteExpense', deleteExpense);

// For Accounting in Dashboard

adminRouter.get('/totalRevenue', totalRevenue);
adminRouter.get('/totalExpense', totalExpense);
adminRouter.get('/totalProfit', totalProfit);

// For Payments

adminRouter.get('/viewAllPayments', viewAllPayments);
adminRouter.delete('/deletePayment', deletePayment);

// For FAQs

adminRouter.post('/addFAQ', addFAQ);
adminRouter.get('/viewAllFAQs', viewAllFAQs);
adminRouter.put('/updateFAQ', updateFAQ);
adminRouter.delete('/deleteFAQ', deleteFAQ);



module.exports = adminRouter;