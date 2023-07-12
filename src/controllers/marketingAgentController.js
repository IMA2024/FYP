const MarketingAgentModel = require("../models/marketingAgent");
const bcrypt = require("bcrypt");
const { json } = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (req,res) =>{

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
        const existingMarketingAgent = await MarketingAgentModel.findOne({email : email});
        if(!existingMarketingAgent){
            return res.status(404).json({message:"Marketing Agent Not Found"})
        }

        const matchPassword = await bcrypt.compare(password,existingMarketingAgent.password);

        if(!matchPassword){
            return res.status(400).json({message:"Invalid Password"});
        }

        const token = jwt.sign({email: existingMarketingAgent.email, id : existingMarketingAgent._id, role: "marketingAgent"}, process.env.SECRET_KEY);
        res.status(201).json({MarketingAgent: existingMarketingAgent, token: token})
    }
        catch (error) {
            console.log(error);
            res.status(500).json({message:"Sonething went wrong."});
        }     
    }

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


module.exports = { signup , signin, viewSpecificMarketingAgent, changePassword , updateMarketingAgent, deleteMarketingAgent}