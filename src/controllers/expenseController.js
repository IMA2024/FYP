const expenseModel = require("../models/expense");
const { json } = require("express");
require("dotenv").config();

        // Expense

        // Adding Expense 

        const addExpense = async (req, res) => {
            const { title, date, amount, description } = req.body;
          
            try {
              const newExpense = await expenseModel.create({
                title,
                date,
                amount,
                description
              });
          
              res.status(201).json(newExpense);
            } catch (err) {
              res.status(400).json({ message: err.message });
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

        // View Specific Expense
        
        const viewSpecificExpense = async (req, res) => {
            const expenseId = req.params.id;
          
            try {
              const expense = await expenseModel.findById(expenseId);
          
              if (!expense) {
                return res.status(404).json({ error: 'Expense not found.' });
              }
          
              res.status(200).json(expense);
            } catch (err) {
              res.status(500).json({ message: err.message });
            }
          };

        // Delete Expense

        const deleteExpense = async (req, res) => {
            const expenseId = req.params.id;
          
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

          const calculateTotalExpense = async (req, res) => {
            try {
              const allExpenses = await expenseModel.find();
          
              if (allExpenses.length === 0) {
                return res.status(200).json({ totalExpense: 0 });
              }
          
              const totalExpense = allExpenses.reduce((accumulator, expense) => {
                return accumulator + expense.amount;
              }, 0);
          
              res.status(200).json({ totalExpense });
            } catch (err) {
              res.status(500).json({ message: err.message });
            }
          };
          


module.exports = {addExpense, viewAllExpenses, viewSpecificExpense, deleteExpense, calculateTotalExpense }

