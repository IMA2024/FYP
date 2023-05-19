const businessOwnerModel = require("../models/businessOwner");
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

        const token = jwt.sign({email : result.email, id : result_id}, process.env.SECRET_KEY);
        res.status(201).json({Owner: result , token: token})

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
        const existingOwner = await businessOwnerModel.findOne({email : email});
        if(!existingOwner){
            return res.status(404).json({message:"Business Owner Not Found"})
        }

        const matchPassword = await bcrypt.compare(password,existingOwner.password);

        if(!matchPassword){
            return res.status(400).json({message:"Invalid Password"});
        }

        const token = jwt.sign({email: existingOwner.email, id : existingOwner._id}, process.env.SECRET_KEY);
        res.status(201).json({Owner: existingOwner, token: token})
    }
        catch (error) {
            console.log(error);
            res.status(500).json({message:"Sonething went wrong."});
        }     
    }

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


module.exports = {signup , signin, viewAllOwners, viewSpecificOwner, updateOwner, deleteOwner}