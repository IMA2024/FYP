const revenueModel = require("../../models/revenue");
const expenseModel = require("../../models/expense");
const businessModel = require("../../models/business");
const subscriptionRecordModel = require("../../models/subscriptionRecord");
const paymentModel = require("../../models/payment");


// Grouped Stats === Total Businesses, Subscribed Businesses, Unsubscribed Businesses

const totalBusinesses = async (req, res) => {
  try {
    const userId = req.params.userId;
    const totalBusinesses = await businessModel.countDocuments({ businessOwner: userId });
    return res.status(200).json(totalBusinesses);
  } catch (err) {
    return res.status(500).json({ message: 'Error getting total businesses', error: err.message });
  }
};

const subscribedBusinesses = async (req, res) => {
  try {
    const userId = req.params.userId;
    const subscribedBusinesses = await businessModel.countDocuments({ businessOwner: userId , subscribed: 'Subscribed' });
    return res.status(200).json(subscribedBusinesses);
  } catch (err) {
    return res.status(500).json({ message: 'Error getting subscribed businesses', error: err.message });
  }
};

const unsubscribedBusinesses = async (req, res) => {
  try {
    const userId = req.params.userId;
    const unsubscribedBusinesses = await businessModel.countDocuments({ businessOwner: userId, subscribed: 'Unsubscribed' });
    return res.status(200).json(unsubscribedBusinesses);
  } catch (err) {
    return res.status(500).json({ message: 'Error getting unsubscribed businesses', error: err.message });
  }
};

// Grouped Stats === Businesses, Subscription , Payment , Revenue


const totalSubscriptions = async (req, res) => {
  try {
    const totalSubscriptions = await subscriptionRecordModel.countDocuments();
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

const totalExpense = async (req, res) => {
  try {
    const allExpenses = await expenseModel.find();

    if (allExpenses.length === 0) {
      return res.status(200).json({ totalExpense: 0 });
    }

    const totalExpense = allExpenses.reduce((accumulator, expense) => {
      return accumulator + expense.amount;
    }, 0);

    return res.status(200).json(totalExpense);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const totalProfit = async (req, res) => {
  try {
    const allRevenues = await revenueModel.find();
    const allExpenses = await expenseModel.find();

    const totalRevenue = allRevenues.reduce((accumulator, revenue) => {
      return accumulator + revenue.amount;
    }, 0);

    const totalExpense = allExpenses.reduce((accumulator, expense) => {
      return accumulator + expense.amount;
    }, 0);

    const profit = totalRevenue - totalExpense;

    return res.status(200).json(profit);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const totalPayments = async (req, res) => {
  try {
    const paymentCount = await paymentModel.countDocuments();
    return res.status(200).json(paymentCount);
  } catch (err) {
    return res.status(500).json({ message: 'Error counting payments', error: err.message });
  }
};

module.exports = { totalBusinesses, subscribedBusinesses, unsubscribedBusinesses, totalSubscriptions, totalRevenue, totalExpense, totalProfit, totalPayments };
