const revenueModel = require("../models/revenue");
const { json } = require("express");
require("dotenv").config();

        // Revenue          
        // Adding Revenue 

        const addRevenue = async (req, res) => {
            const { title, date, amount, description } = req.body;
          
            // Validate request data
            if (!title || !date || !amount) {
              return res.status(400).json({ error: 'Title, date, and amount are required.' });
            }
          
            try {
              const newRevenue = await revenueModel.create({
                title,
                date,
                amount,
                description
              });
          
              res.status(201).json(newRevenue);
            } catch (err) {
              res.status(400).json({ message: err.message });
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

        // View Specific Revenue
        
        const viewSpecificRevenue = async (req, res) => {
            const revenueId = req.params.id; 
            // Assuming the revenue ID is passed as a parameter in the URL
          
            try {
              const revenue = await revenueModel.findById(revenueId);
              
              if (!revenue) {
                return res.status(404).json({ error: 'Revenue not found.' });
              }
          
              res.status(200).json(revenue);
            } catch (err) {
              res.status(500).json({ message: err.message });
            }
          };
          
        // Delete Revenue

        const deleteRevenue = async (req, res) => {
            const revenueId = req.params.id; 
            
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

          const calculateTotalRevenue = async (req, res) => {
            try {
              const allRevenues = await revenueModel.find();
          
              if (allRevenues.length === 0) {
                return res.status(200).json({ totalRevenue: 0 });
              }
          
              const totalRevenue = allRevenues.reduce((accumulator, revenue) => {
                return accumulator + revenue.amount;
              }, 0);
          
              res.status(200).json({ totalRevenue });
            } catch (err) {
              res.status(500).json({ message: err.message });
            }
          };
          


module.exports = { addRevenue, viewAllRevenues, viewSpecificRevenue, deleteRevenue, calculateTotalRevenue}