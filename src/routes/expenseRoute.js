const express = require("express");
const { addExpense, viewAllExpenses, viewSpecificExpense, deleteExpense, calculateTotalExpense} = require("../controllers/expenseController");
const expenseRouter = express.Router();
const {adminAuth} = require("../middleware/auth");

// For Expense
expenseRouter.post('/addExpense', addExpense);
expenseRouter.get('/viewAllExpenses', viewAllExpenses);
expenseRouter.get('/viewSpecificExpense/:id', viewSpecificExpense);
expenseRouter.delete('/deleteExpense/:id', deleteExpense);
expenseRouter.get('/totalExpense', calculateTotalExpense);

module.exports = expenseRouter;  