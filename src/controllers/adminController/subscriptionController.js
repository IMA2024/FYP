const subscriptionModel = require("../../models/subscription");
const { json } = require("express");
require("dotenv").config();

// Adding Subscription 

const addNewSubscription = async (req, res) => {
    const { type, title, description, price, limit } = req.body;
  
    try {
      const existingSubscriptions = await subscriptionModel.find({});
      if (existingSubscriptions.length >= 3) {
        return res.status(400).json({ message: "Admin can only add 3 subscriptions." });
      }
  
      // Check if the new subscription already exists by type
      const duplicateSubscription = await subscriptionModel.findOne({ type });
      if (duplicateSubscription) {
        return res.status(400).json({ message: "Duplicate Subscription not allowed." });
      }
  
      const newSubscription = await subscriptionModel.create({
        type, title, description, price, limit,
      });
  
      res.status(201).json({subscription: newSubscription});
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

// View All Subscriptions

const viewSubscriptions = async (req, res) => {
    try {
        const subscriptions = await subscriptionModel.find();
        res.status(200).json(subscriptions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update Subscription

const updateSubscription = async (req, res) => {
    const { subscriptionId, type, title, description, price, limit } = req.body;
  
    try {
      // Check if the subscription to be updated exists
      const existingSubscription = await subscriptionModel.findById(subscriptionId);
      if (!existingSubscription) {
        return res.status(404).json({ message: 'Subscription not found' });
      }
  
      // Check if a subscription with the same type already exists (excluding the current subscription)
      const duplicateSubscription = await subscriptionModel.findOne({ type, _id: { $ne: subscriptionId } });
      if (duplicateSubscription) {
        return res.status(409).json({ message: 'Duplicate subscription not allowed' });
      }
  
      // Perform the update
      const updatedSubscription = await subscriptionModel.findByIdAndUpdate(
        subscriptionId,
        { type, title, description, price, limit },
        { new: true }
      );
  
      res.status(200).json({ subscription: updatedSubscription });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


// Delete Subscription

const deleteSubscription = async (req, res) => {
    const {subscriptionId} = req.query;

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


module.exports = { addNewSubscription, viewSubscriptions, updateSubscription, deleteSubscription }
