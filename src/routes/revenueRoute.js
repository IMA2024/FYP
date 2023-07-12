const express = require("express");
const { addRevenue, viewAllRevenues, viewSpecificRevenue, deleteRevenue, calculateTotalRevenue} = require("../controllers/revenueController");
const revenueRouter = express.Router();
const {adminAuth} = require("../middleware/auth");

// For Revenue
revenueRouter.post('/addRevenue', addRevenue);
revenueRouter.get('/viewAllRevenues', viewAllRevenues);
revenueRouter.get('/viewSpecificRevenue/:id', viewSpecificRevenue);
revenueRouter.delete('/deleteRevenue/:id', deleteRevenue);
revenueRouter.get('/totalRevenue', calculateTotalRevenue);



module.exports = revenueRouter;  