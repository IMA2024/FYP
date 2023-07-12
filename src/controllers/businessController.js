const businessModel = require("../models/business");
const { json } = require("express");
const jwt = require('jsonwebtoken');
require("dotenv").config();

const addBusiness = async (req,res) =>{

    const { name, description, email, phoneNumber, address, city, country, owner } = req.body;
    
    try {

        if (!name || !description || !email || !phoneNumber || !address || !city|| !country || !owner) {
            return res.status(400).json({ error: 'All fields are required' });
          }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email address' });
        
    }
        const existingUser = await businessModel.findOne({email : email});
        if(existingUser){
            return res.status(400).json({message:"Business Already Exist"})
        }

        const result = await businessModel.create({
            name : name,
            description: description,
            email : email,
            phoneNumber: phoneNumber,
            address : address,
            city: city,
            country : country,
            owner: owner
        });

        const token = jwt.sign({email : result.email, id : result_id},process.env.SECRET_KEY);
        res.status(201).json({user: result , token: token})

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong."});
    }
  };

const viewAllBusinesses = async (req, res) => {
  try {
    const Businesses = await businessModel.find();
    res.status(200).json({ Businesses });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

const updateBusiness = async (req, res) => {
    const { name, description, phoneNumber, address, city, country } = req.body;
    const businessId = req.params.id;
  
    try {
      if (!name || !description || !phoneNumber || !address || !city || !country) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      const existingBusiness = await businessModel.findById(businessId);
      if (!existingBusiness) {
        return res.status(404).json({ message: 'Business not found' });
      }
  
      // Update the business fields
      existingBusiness.name = name;
      existingBusiness.description = description;
      existingBusiness.phoneNumber = phoneNumber;
      existingBusiness.address = address;
      existingBusiness.city = city;
      existingBusiness.country = country;
  
      // Save the updated business
      const updatedBusiness = await existingBusiness.save();
  
      // Generate a new token (if needed)
      const token = jwt.sign(
        { email: updatedBusiness.email, id: updatedBusiness._id },
        process.env.SECRET_KEY
      );
  
      res.status(200).json({ business: updatedBusiness, token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong.' });
    }
  };

  const deleteBusiness = async (req, res) => {
    const businessId = req.params.id;
  
    try {
      const deletedBusiness = await businessModel.findByIdAndDelete(businessId);
      if (!deletedBusiness) {
        return res.status(404).json({ message: 'Business not found' });
      }
  
      res.status(200).json({ message: 'Business deleted successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong.' });
    }
  };

  const viewSpecificBusiness = async (req, res) => {
    const email = req.params.email;
  
    try {
      const business = await businessModel.findOne({ email });
      if (!business) {
        return res.status(404).json({ message: 'Business not found' });
      }
      res.status(200).json({ business });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong.' });
    }
  };
  
module.exports = {addBusiness, viewAllBusinesses  , viewSpecificBusiness , updateBusiness, deleteBusiness};