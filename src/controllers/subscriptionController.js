const subscriptionModel = require("../models/subscription");
const { json } = require("express");
require("dotenv").config();

        // Adding Subscription 

        const addNewSubscription = async (req, res) => {
            const { type, title, description, price, limit } = req.body;
          
            try {
              const newSubscription = await subscriptionModel.create({
                type,
                title,
                description,
                price,
                limit
              });
          
              res.status(201).json(newSubscription);
            } catch (err) {
              res.status(400).json({ message: err.message });
            }
          };
          
    
          // View All Subscriptions
    
          const viewAllSubscriptions = async (req, res) => {
            try {
              const subscriptions = await subscriptionModel.find();
              res.status(200).json(subscriptions);
            } catch (err) {
              res.status(500).json({ message: err.message });
            }
          };
          
    
          // View Specific Subscription
    
          const viewSpecificSubscription = async (req, res) => {
            const subscriptionId = req.params.id;
          
            try {
              const subscription = await subscriptionModel.findById(subscriptionId);
              
              if (!subscription) {
                return res.status(404).json({ message: 'Subscription not found' });
              }
              
              res.status(200).json(subscription);
            } catch (err) {
              res.status(500).json({ message: err.message });
            }
          };
          
    
          // Update Subscription
    
          const updateSubscription = async (req, res) => {
            const  subscriptionId  = req.params.id;
            const { type, title, description, price, limit } = req.body;
          
            try {
              const subscription = await subscriptionModel.findByIdAndUpdate(subscriptionId, {
                type,
                title,
                description,
                price,
                limit
              }, { new: true });
          
              if (!subscription) {
                return res.status(404).json({ message: 'Subscription not found' });
              }
          
              res.status(200).json(subscription);
            } catch (err) {
              res.status(500).json({ message: err.message });
            }
          };
          
    
          // Delete Subscription

          const deleteSubscription = async (req, res) => {
            const  subscriptionId  = req.params.id;
          
            try {
              const subscription = await subscriptionModel.findByIdAndDelete(subscriptionId);
          
              if (!subscription) {
                return res.status(404).json({ message: 'Subscription not found' });
              }
          
              res.status(200).json({ message: 'Subscription deleted successfully' });
            } catch (err) {
              res.status(500).json({ message: err.message });
            }
          };
          

module.exports = { addNewSubscription, viewAllSubscriptions, viewSpecificSubscription, updateSubscription, deleteSubscription}