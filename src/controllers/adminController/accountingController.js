const businessModel = require("../../models/business");
const revenueModel = require("../../models/revenue");
const expenseModel = require("../../models/expense");
const { json } = require("express");
require("dotenv").config();

// Revenue          

        // Adding Revenue 

        const addRevenue = async (req, res) => {
            const { email, business, title, date, amount, description } = req.body;
          
            try {
              const existingBusiness = await businessModel.findOne({ email });
          
              if (existingBusiness) {
                const newRevenue = await revenueModel.create({ business, title, date, amount, description });
          
                res.status(201).json({ revenue: newRevenue });
              } else {
                res.status(400).json({ message: "Business not found in records. Please add the business first." });
              }
            } catch (err) {
              res.status(500).json({ message: err.message });
            }
          };
          

        // View All Revenues
    
        const viewAllRevenues = async (req, res) => {
            try {
              const allRevenues = await revenueModel.find();
              res.status(200).json(allRevenues);
            } catch (err) {
              res.status(500).json({ message: err.message });
            }
          };
          
        // Delete Revenue

        const deleteRevenue = async (req, res) => {
            const {revenueId} = req.query; 
            
            // Assuming the revenue ID is passed as a parameter in the URL
          
            try {
              const deletedRevenue = await revenueModel.findByIdAndDelete(revenueId);
          
              if (!deletedRevenue) {
                return res.status(404).json({ error: 'Revenue not found.' });
              }
          
              res.status(200).json({ message: 'Revenue deleted successfully.' });
            } catch (err) {
              res.status(500).json({ message: err.message });
            }
          };
          

// Expense

// Adding Expense 

const addExpense = async (req, res) => {
    const { email, business, title, date, amount, description } = req.body;
  
    try {
      const existingBusiness = await businessModel.findOne({ email });
  
      if (existingBusiness) {
        const newExpense = await expenseModel.create({ business, title, date, amount, description });
  
        res.status(201).json({ expense: newExpense });
      } else {
        res.status(400).json({ message: "Business not found in records. Please add the business first." });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

// View All Expenses

const viewAllExpenses = async (req, res) => {
    try {
        const allExpenses = await expenseModel.find();
        res.status(200).json(allExpenses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete Expense

const deleteExpense = async (req, res) => {
    const {expenseId} = req.query;

    try {
        const deletedExpense = await expenseModel.findByIdAndDelete(expenseId);

        if (!deletedExpense) {
            return res.status(404).json({ error: 'Expense not found.' });
        }

        res.status(200).json({ message: 'Expense deleted successfully.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { addRevenue, viewAllRevenues, deleteRevenue , addExpense, viewAllExpenses, deleteExpense}