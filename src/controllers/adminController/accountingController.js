const revenueModel = require("../../models/revenue");
const expenseModel = require("../../models/expense");
const { json } = require("express");
require("dotenv").config();

// Revenue          

// Adding Revenue 

const addRevenue = async (req, res) => {
  const { title, business, description, date, amount, profilePic } = req.body;

  try {

    const newRevenue = await revenueModel.create({ title, business, description, date, amount, profilePic});
    return res.status(201).json({ revenue: newRevenue });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


// View All Revenues

const viewAllRevenues = async (req, res) => {
  try {
    const revenues = await revenueModel.find().populate('business');
    return res.status(200).json({ revenues: revenues });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Delete Revenue

const deleteRevenue = async (req, res) => {
  const { revenueId } = req.query;

  // Assuming the revenue ID is passed as a parameter in the URL

  try {
    const deletedRevenue = await revenueModel.findByIdAndDelete(revenueId);

    if (!deletedRevenue) {
      return res.status(404).json({ error: 'Revenue not found.' });
    }

    return res.status(200).json({ message: 'Revenue Deleted Successfully.' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Expense

// Adding Expense 

const addExpense = async (req, res) => {
  const { title, business, description, date, amount, profilePic } = req.body;

  try {
    const newExpense = await expenseModel.create({ title, business, description, date, amount, profilePic});

    return res.status(201).json({ expense: newExpense });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


// View All Expenses

const viewAllExpenses = async (req, res) => {
  try {
    const expenses = await expenseModel.find().populate('business');
    return res.status(200).json({ expenses: expenses });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Delete Expense

const deleteExpense = async (req, res) => {
  const { expenseId } = req.query;

  try {
    const deletedExpense = await expenseModel.findByIdAndDelete(expenseId);

    if (!deletedExpense) {
      return res.status(404).json({ error: 'Expense not found.' });
    }

    return res.status(200).json({ message: 'Expense Deleted Successfully.' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Total Revenue

const totalRevenue = async (req, res) => {
  try {
    const allRevenues = await revenueModel.find();

    if (allRevenues.length === 0) {
      return res.status(200).json({ totalRevenue : 0 });
    }

    const totalRevenue = allRevenues.reduce((accumulator, revenue) => {
      return accumulator + revenue.amount;
    }, 0);

    return res.status(200).json(totalRevenue);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Total Expense

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

//Total Profit 

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

module.exports = { addRevenue, viewAllRevenues, deleteRevenue , addExpense, viewAllExpenses, deleteExpense , totalRevenue , totalExpense , totalProfit}