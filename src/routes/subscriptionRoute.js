const express = require("express");
const { addNewSubscription, viewAllSubscriptions, viewSpecificSubscription, updateSubscription, deleteSubscription } = require("../controllers/subscriptionController");
const subscriptionRouter = express.Router();
const {adminAuth} = require("../middleware/auth");

subscriptionRouter.post('/addNewSubscription', addNewSubscription);
subscriptionRouter.get('/viewAllSubscriptions', viewAllSubscriptions);
subscriptionRouter.get('/viewSpecificSubscription/:id', viewSpecificSubscription);
subscriptionRouter.patch('/updateSubscription/:id', updateSubscription);
subscriptionRouter.delete('/deleteSubscription/:id', deleteSubscription);

module.exports = subscriptionRouter;  