const businessOwnerModel = require("../models/businessOwner");
const bcrypt = require("bcrypt");
const { json } = require("express");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
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

        const token = jwt.sign({email : result.email, id : result_id, role: "businessOwner"}, process.env.SECRET_KEY);
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

        const token = jwt.sign({email: existingOwner.email, id : existingOwner._id, role: "businessOwner"}, process.env.SECRET_KEY);
        res.status(201).json({Owner: existingOwner, token: token})
    }
        catch (error) {
            console.log(error);
            res.status(500).json({message:"Sonething went wrong."});
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


module.exports = {signup , signin, changePassword, viewAllOwners, viewSpecificOwner, updateOwner, deleteOwner}