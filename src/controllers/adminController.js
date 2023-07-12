const adminModel = require("../models/admin");
const businessOwnerModel = require("../models/businessOwner");
const MarketingAgentModel = require("../models/marketingAgent");
const revenueModel = require("../models/revenue");
const expenseModel = require("../models/expense");
const bcrypt = require("bcrypt");
const { json } = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Admin SignUp

const signup = async (req,res) =>{

    const { firstName, lastName, email, password, confirmPassword } = req.body;
    
    try {

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return res.status(400).json({ error: 'All fields are required' });
          }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email address' });
        
    }

        const existingAdmin = await adminModel.findOne({email : email});
        if(existingAdmin){
            return res.status(400).json({message:"Admin Already Exist"})
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
          }

        const hashPassword = await bcrypt.hash(password,10);

        const result = await adminModel.create({
            firstName : firstName,
            lastName: lastName,
            email : email,
            password: hashPassword
        });

        const token = jwt.sign({email : result.email, id : result_id, role: "admin"}, process.env.SECRET_KEY);
        res.status(201).json({Admin: result , token: token})

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong."});
    }
}

// Admin Signin

const signin = async (req,res) =>{

    const {email,password} = req.body;
    
    try {
        
        if (!email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
          }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email address' });
        
    }
        const existingAdmin = await adminModel.findOne({email : email});
        if(!existingAdmin){
            return res.status(404).json({message:"Admin Not Found"})
        }

        const matchPassword = await bcrypt.compare(password,existingAdmin.password);

        if(!matchPassword){
            return res.status(400).json({message:"Invalid Password"});
        }

        const token = jwt.sign({email: existingAdmin.email, id : existingAdmin._id, role:"admin"}, process.env.SECRET_KEY);
        res.status(201).json({Admin: existingAdmin, token: token})
    }
        catch (error) {
            console.log(error);
            res.status(500).json({message:"Sonething went wrong."});
        }     
    }

    // View All Admins

    const viewAllAdmins = async (req, res) => {
        try {
          const Admins = await adminModel.find();
          res.status(200).json({ Admins });
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: 'Something went wrong.' });
        }
      };

      // View Specific Admins

      const viewSpecificAdmin = async (req, res) => {
        const AdminId = req.params.id;
      
        try {
          const Admin = await adminModel.findById(AdminId);
          if (!Admin) {
            return res.status(404).json({ message: 'Admin not found' });
          }
      
          res.status(200).json({ Admin });
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: 'Something went wrong.' });
        }
      };

      // Update Profile

    const updateAdmin = async (req, res) => {
        const { firstName, lastName } = req.body;
        const AdminId = req.params.id; 
        // Assuming you have middleware that extracts the Admin ID from the JWT token
        
        try {
          if (!firstName || !lastName) {
            return res.status(400).json({ error: 'All fields are required' });
          }
      
          const updatedAdmin = await adminModel.findByIdAndUpdate(
            AdminId,
            { firstName, lastName },
            { new: true }
          );
      
          if (!updatedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
          }
      
          res.status(200).json({ Admin: updatedAdmin });
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: 'Something went wrong.' });
        }
      };

      // Delete Profile 

      const deleteAdmin = async (req, res) => {
        const AdminId = req.params.id;
      
        try {
          const deletedAdmin = await adminModel.findByIdAndDelete(AdminId);
          if (!deletedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
          }
      
          res.status(200).json({ message: 'Admin deleted successfully' });
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: 'Something went wrong.' });
        }
      };

      // Add Marketing Agent

      const addMarketingAgent = async (req,res) =>{

        const { firstName, lastName, email, password, confirmPassword, phoneNumber, businesses} = req.body;
        
        try {
    
            if (!firstName || !lastName || !email || !password || !confirmPassword || !phoneNumber || !businesses) {
                return res.status(400).json({ error: 'All fields are required' });
              }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ error: 'Invalid email address' });
            
        }
    
            const existingMarketingAgent = await MarketingAgentModel.findOne({email : email});
            if(existingMarketingAgent){
                return res.status(400).json({message:"Marketing Agent Already Exist"})
            }
    
            if (password !== confirmPassword) {
                return res.status(400).json({ error: 'Passwords do not match' });
              }
    
            const hashPassword = await bcrypt.hash(password,10);
    
            const result = await MarketingAgentModel.create({
                firstName : firstName,
                lastName: lastName,
                email : email,
                password: hashPassword,
                phoneNumber : phoneNumber,
                businesses : businesses
            });
    
            const token = jwt.sign({email : result.email, id : result_id,  role: "marketingAgent"}, process.env.SECRET_KEY);
            res.status(201).json({MarketingAgent: result , token: token})
    
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"Something went wrong."});
        }
    }

    const viewAllMarketingAgents = async (req, res) => {
      try {
        const MarketingAgents = await MarketingAgentModel.find();
        res.status(200).json({ MarketingAgents });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong.' });
      }
    };

    const viewSpecificMarketingAgent = async (req, res) => {
      const MarketingAgentId = req.params.id;
    
      try {
        const MarketingAgent = await MarketingAgentModel.findById(MarketingAgentId);
        if (!MarketingAgent) {
          return res.status(404).json({ message: 'Marketing Agent not found' });
        }
    
        res.status(200).json({ MarketingAgent });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong.' });
      }
    };

  const updateMarketingAgent = async (req, res) => {
      const { firstName, lastName, phoneNumber } = req.body;
      const MarketingAgentId = req.params.id; 
      // Assuming you have middleware that extracts the MarketingAgent ID from the JWT token
      
      try {
        if (!firstName || !lastName || !phoneNumber) {
          return res.status(400).json({ error: 'All fields are required' });
        }
    
        const updatedMarketingAgent = await MarketingAgentModel.findByIdAndUpdate(
          MarketingAgentId,
          { firstName, lastName, phoneNumber },
          { new: true }
        );
    
        if (!updatedMarketingAgent) {
          return res.status(404).json({ message: 'Marketing Agent not found' });
        }
    
        res.status(200).json({ MarketingAgent: updatedMarketingAgent });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong.' });
      }
    };
    
    const deleteMarketingAgent = async (req, res) => {
      const MarketingAgentId = req.params.id;
    
      try {
        const deletedMarketingAgent = await MarketingAgentModel.findByIdAndDelete(MarketingAgentId);
        if (!deletedMarketingAgent) {
          return res.status(404).json({ message: 'Marketing Agent not found' });
        }
    
        res.status(200).json({ message: 'Marketing Agent Deleted Successfully' });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong.' });
      }
    };

    // Add Business Owner

    const addBusinessOwner = async (req,res) =>{

      const { firstName, lastName, email, password, confirmPassword, phoneNumber } = req.body;
      
      try {
  
          if (!firstName || !lastName || !email || !password || !confirmPassword || !phoneNumber) {
              return res.status(400).json({ error: 'All fields are required' });
            }
          
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
              return res.status(400).json({ error: 'Invalid email address' });
          
      }
  
          const existingOwner = await businessOwnerModel.findOne({email : email});
          if(existingOwner){
              return res.status(400).json({message:"Business Owner Already Exist"})
          }
  
          if (password !== confirmPassword) {
              return res.status(400).json({ error: 'Passwords do not match' });
            }
  
          const hashPassword = await bcrypt.hash(password,10);
  
          const result = await businessOwnerModel.create({
              firstName : firstName,
              lastName: lastName,
              email : email,
              password: hashPassword,
              phoneNumber : phoneNumber,
          });
  
          const token = jwt.sign({email : result.email, id : result_id, role: "businessOwner"}, process.env.SECRET_KEY);
          res.status(201).json({Owner: result , token: token})
  
      } catch (error) {
          console.log(error);
          res.status(500).json({message:"Something went wrong."});
      }
  }
  
    const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const businessOwnerId = req.businessOwner.id;
  
    try {
      // Find the businessOwner in the database
      const businessOwner = await businessOwnerModel.findById(businessOwnerId);
  
      // Check if the current password matches
      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, businessOwner.password);
      if (!isCurrentPasswordValid) {
        return res.status(401).json({ error: 'Current password is incorrect' });
      }
  
      // Generate a hash for the new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the businessOwner's password
      businessOwner.password = hashedNewPassword;
      await businessOwner.save();
  
      // Generate a new JWT token (optional)
      const token = jwt.sign({ id: businessOwner.id, email: businessOwner.email }, process.env.SECRET_KEY);
  
      res.json({ message: 'Password changed successfully', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while changing the password' });
    }
  };
  
      const viewAllOwners = async (req, res) => {
          try {
            const Owners = await businessOwnerModel.find();
            res.status(200).json({ Owners });
          } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Something went wrong.' });
          }
        };
  
        const viewSpecificOwner = async (req, res) => {
          const OwnerId = req.params.id;
        
          try {
            const Owner = await businessOwnerModel.findById(OwnerId);
            if (!Owner) {
              return res.status(404).json({ message: 'Business Owner not found' });
            }
        
            res.status(200).json({ Owner });
          } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Something went wrong.' });
          }
        };
  
      const updateOwner = async (req, res) => {
          const { firstName, lastName, phoneNumber } = req.body;
          const OwnerId = req.params.id; 
          // Assuming you have middleware that extracts the Owner ID from the JWT token
          
          try {
            if (!firstName || !lastName || !phoneNumber) {
              return res.status(400).json({ error: 'All fields are required' });
            }
        
            const updatedOwner = await businessOwnerModel.findByIdAndUpdate(
              OwnerId,
              { firstName, lastName, phoneNumber },
              { new: true }
            );
        
            if (!updatedOwner) {
              return res.status(404).json({ message: 'Business Owner Not Found' });
            }
        
            res.status(200).json({ Owner: updatedOwner });
          } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Something went wrong.' });
          }
        };
  
        const deleteOwner = async (req, res) => {
          const OwnerId = req.params.id;
        
          try {
            const deletedOwner = await businessOwnerModel.findByIdAndDelete(OwnerId);
            if (!deletedOwner) {
              return res.status(404).json({ message: 'Business Owner Not Found' });
            }
        
            res.status(200).json({ message: 'Business Owner Deleted Successfully' });
          } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Something went wrong.' });
          }
        };

        // Calculating Profit

        const calculateProfit = async (req, res) => {
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

            res.status(200).json({ profit });
          } catch (err) {
            res.status(500).json({ message: err.message });
          }
        };
        
module.exports = {signup , signin, viewAllAdmins , viewSpecificAdmin, updateAdmin, deleteAdmin,
                 addMarketingAgent, viewAllMarketingAgents, viewSpecificMarketingAgent, updateMarketingAgent, deleteMarketingAgent,
                 addBusinessOwner, viewAllOwners, changePassword, viewSpecificOwner, updateOwner, deleteOwner,
                 calculateProfit}




