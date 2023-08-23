const userModel = require("../../models/user");
const revenueModel = require("../../models/revenue");
const businessModel = require("../../models/business");
const subscriptionModel = require("../../models/subscription");

// TotalRevenueBlocks === Number of Users

const totalUsers = async (req, res) => {
    try {
        const totalUsers = await userModel.countDocuments();
        return res.status(200).json(totalUsers);
    } catch (err) {
        return res.status(500).json({ message: 'Error getting total users', error: err.message });
    }
};

const totalMarketingAgents = async (req, res) => {
    try {
        const totalMarketingAgents = await userModel.countDocuments({ role: 'Marketing Agent' });
        return res.status(200).json(totalMarketingAgents);
    } catch (err) {
        return res.status(500).json({ message: 'Error getting total marketing agents', error: err.message });
    }
};

const totalBusinessOwners = async (req, res) => {
    try {
        const totalMarketingAgents = await userModel.countDocuments({ role: 'Business Owner' });
        return res.status(200).json(totalMarketingAgents);
    } catch (err) {
        return res.status(500).json({ message: 'Error getting total marketing agents', error: err.message });
    }
};

const totalCustomers = async (req, res) => {
    try {
        const totalCustomers = await userModel.countDocuments({ role: 'Customer' });
        return res.status(200).json(totalCustomers);
    } catch (err) {
        return res.status(500).json({ message: 'Error getting total marketing agents', error: err.message });
    }
};

// Grouped Stats === Businesses, Subscription , Payment , Revenue


const totalSubscriptions = async (req, res) => {
    try {
        const totalSubscriptions = await subscriptionModel.countDocuments();
        return res.status(200).json(totalSubscriptions);
    } catch (err) {
        return res.status(500).json({ message: 'Error getting total businesses', error: err.message });
    }
};

const totalRevenue = async (req, res) => {
    try {
      const allRevenues = await revenueModel.find();
  
      if (allRevenues.length === 0) {
        return res.status(200).json({ totalRevenue: 0 });
      }
  
      const totalRevenue = allRevenues.reduce((accumulator, revenue) => {
        return accumulator + revenue.amount;
      }, 0);
  
      return res.status(200).json(totalRevenue);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };

const totalBusinesses = async (req, res) => {
    try {
        const totalBusinesses = await businessModel.countDocuments();
        return res.status(200).json(totalBusinesses);
    } catch (err) {
        return res.status(500).json({ message: 'Error getting total businesses', error: err.message });
    }
};


module.exports = { totalUsers , totalMarketingAgents , totalBusinessOwners , totalCustomers , totalSubscriptions , totalRevenue , totalBusinesses};
