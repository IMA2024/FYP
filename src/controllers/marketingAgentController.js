const markeingAgentModel = require("../models/marketingAgent");
const bcrypt = require("bcrypt");
const { json } = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (req,res) =>{

    const { firstName, lastName, email, password, confirmPassword, phoneNumber } = req.body;
    
    try {

        if (!firstName || !lastName || !email || !password || !confirmPassword || !phoneNumber) {
            return res.status(400).json({ error: 'All fields are required' });
          }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email address' });
        
    }

        const existingMarkeingAgent = await markeingAgentModel.findOne({email : email});
        if(existingMarkeingAgent){
            return res.status(400).json({message:"Markeing Agent Already Exist"})
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
          }

        const hashPassword = await bcrypt.hash(password,10);

        const result = await markeingAgentModel.create({
            firstName : firstName,
            lastName: lastName,
            email : email,
            password: hashPassword,
            phoneNumber : phoneNumber,
        });

        const token = jwt.sign({email : result.email, id : result_id}, process.env.SECRET_KEY);
        res.status(201).json({MarkeingAgent: result , token: token})

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
        const existingMarkeingAgent = await markeingAgentModel.findOne({email : email});
        if(!existingMarkeingAgent){
            return res.status(404).json({message:"Markeing Agent Not Found"})
        }

        const matchPassword = await bcrypt.compare(password,existingMarkeingAgent.password);

        if(!matchPassword){
            return res.status(400).json({message:"Invalid Password"});
        }

        const token = jwt.sign({email: existingMarkeingAgent.email, id : existingMarkeingAgent._id}, process.env.SECRET_KEY);
        res.status(201).json({MarkeingAgent: existingMarkeingAgent, token: token})
    }
        catch (error) {
            console.log(error);
            res.status(500).json({message:"Sonething went wrong."});
        }     
    }

    const viewAllMarkeingAgents = async (req, res) => {
        try {
          const MarkeingAgents = await markeingAgentModel.find();
          res.status(200).json({ MarkeingAgents });
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: 'Something went wrong.' });
        }
      };

      const viewSpecificMarkeingAgent = async (req, res) => {
        const MarkeingAgentId = req.params.id;
      
        try {
          const MarkeingAgent = await markeingAgentModel.findById(MarkeingAgentId);
          if (!MarkeingAgent) {
            return res.status(404).json({ message: 'Markeing Agent not found' });
          }
      
          res.status(200).json({ MarkeingAgent });
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: 'Something went wrong.' });
        }
      };

    const updateMarkeingAgent= async (req, res) => {
        const { firstName, lastName, phoneNumber } = req.body;
        const MarkeingAgentId = req.params.id; 
        // Assuming you have middleware that extracts the MarkeingAgent ID from the JWT token
        
        try {
          if (!firstName || !lastName || !phoneNumber) {
            return res.status(400).json({ error: 'All fields are required' });
          }
      
          const updatedMarkeingAgent = await markeingAgentModel.findByIdAndUpdate(
            MarkeingAgentId,
            { firstName, lastName, phoneNumber },
            { new: true }
          );
      
          if (!updatedMarkeingAgent) {
            return res.status(404).json({ message: 'Markeing Agent not found' });
          }
      
          res.status(200).json({ MarkeingAgent: updatedMarkeingAgent });
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: 'Something went wrong.' });
        }
      };

      const deleteMarkeingAgent = async (req, res) => {
        const MarkeingAgentId = req.params.id;
      
        try {
          const deletedMarkeingAgent = await markeingAgentModel.findByIdAndDelete(MarkeingAgentId);
          if (!deletedMarkeingAgent) {
            return res.status(404).json({ message: 'Markeing Agent not found' });
          }
      
          res.status(200).json({ message: 'Markeing Agent Deleted Successfully' });
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: 'Something went wrong.' });
        }
      };


module.exports = {signup , signin, viewAllMarkeingAgents, viewSpecificMarkeingAgent, updateMarkeingAgent, deleteMarkeingAgent}