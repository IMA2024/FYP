const subscriptionModel = require("../../models/subscription");
const { json } = require("express");
require("dotenv").config();

// View All Subscriptions

const viewSubscriptions = async (req, res) => {
  try {
      const subscriptions = await subscriptionModel.find();
      res.status(200).json({subscriptions : subscriptions});
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

module.exports = { viewSubscriptions }