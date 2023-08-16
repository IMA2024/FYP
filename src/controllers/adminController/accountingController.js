const revenueModel = require("../../models/revenue");
const expenseModel = require("../../models/expense");
const { json } = require("express");
require("dotenv").config();

// Revenue          

        // Adding Revenue 

        const addRevenue = async (req, res) => {
            const { title, business, description,  date, amount } = req.body;
          
            try {

                const newRevenue = await revenueModel.create({  title, business, description,  date, amount });
                res.status(201).json({ revenue: newRevenue });

            } catch (err) {
              res.status(500).json({ message: err.message });
            }
          };
          

        // View All Revenues
    
        const viewAllRevenues = async (req, res) => {
            try {
              const revenues = await revenueModel.find();
              res.status(200).json({ revenues : revenues });
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
          
              return res.status(200).json({ message: 'Revenue Deleted Successfully.' });
            } catch (err) {
              return res.status(500).json({ message: err.message });
            }
          };
          

// Expense

// Adding Expense 

const addExpense = async (req, res) => {
    const {  title, business, description,  date, amount  } = req.body;
  
    try {
        const newExpense = await expenseModel.create({  title, business, description,  date, amount  });
  
        res.status(201).json({ expense: newExpense });

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

// View All Expenses

const viewAllExpenses = async (req, res) => {
    try {
        const expenses = await expenseModel.find();
        return res.status(200).json({expenses : expenses});
    } catch (err) {
      return res.status(500).json({ message: err.message });
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

        return  res.status(200).json({ message: 'Expense Deleted Successfully.' });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
};

module.exports = { addRevenue, viewAllRevenues , deleteRevenue , addExpense, viewAllExpenses , deleteExpense}