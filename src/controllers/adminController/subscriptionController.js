const subscriptionModel = require("../../models/subscription");
const subscriptionRecordModel = require("../../models/subscriptionRecord");
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
        res.status(200).json({subscriptions : subscriptions});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update Subscription

const updateSubscription = async (req, res) => {
  const { title, price, limit, description } = req.body;

  try {
    // Find the subscription to be updated by title
    const existingSubscription = await subscriptionModel.findOne({ title });
    if (!existingSubscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    // Update the subscription properties
    existingSubscription.title = title;
    existingSubscription.price = price;
    existingSubscription.limit = limit;
    existingSubscription.description = description;

    // Save the updated subscription
    const updatedSubscription = await existingSubscription.save();

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

// View All Subscription Record

const viewSubscriptionRecord = async (req, res) => {
  try {
      const subscriptionsRecord = await subscriptionRecordModel.find()
      .populate({
        path: 'business',
        populate: {
          path: 'businessOwner',
          model: 'user' 
        }
      });
      res.status(200).json({subscriptionsRecord : subscriptionsRecord});
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

// Delete Subscription Record

const deleteSubscriptionRecord = async (req, res) => {
  const {subscriptionId} = req.query;

  try {
      const subscription = await subscriptionRecordModel.findByIdAndDelete(subscriptionId);

      if (!subscription) {
          return res.status(404).json({ message: 'Subscription not found' });
      }

      res.status(200).json({ message: 'Subscription Deleted Successfully' });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

module.exports = { addNewSubscription, viewSubscriptions, updateSubscription, deleteSubscription, viewSubscriptionRecord , deleteSubscriptionRecord}
