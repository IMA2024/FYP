const businessModel = require("../../models/business");
const { json } = require("express");
const jwt = require('jsonwebtoken');
require("dotenv").config();

const addBusiness = async (req, res) => {

  const { profilePic, type, name, businessOwner, email, address, phoneNumber, description } = req.body;

  try {
    const existingBusiness = await businessModel.findOne({ email: email });
    if (existingBusiness) {
      return res.status(400).json({ message: "Business Already Exist" })
    }

    const result = await businessModel.create({
      profilePic: profilePic,
      type: type,
      name: name,
      businessOwner: businessOwner,
      email: email,
      address: address,
      phoneNumber: phoneNumber,
      description: description,
    })
    if (result) {
      return res.status(201).json({ message: "Business Added Successfully" });
    } 

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

const viewAllBusinesses = async (req, res) => {
  try {
    const businesses = await businessModel.find().populate('businessOwner');
    return res.status(200).json({ businesses: businesses });
  } 
  
  catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong.' });
  }
};

const updateBusiness = async (req, res) => {
  const { businessId, profilePic, type, name, businessOwner, address, phoneNumber, description } = req.body;

  try {

    const updatedBusiness = await businessModel.findByIdAndUpdate(businessId,
      { profilePic, type, name, businessOwner, phoneNumber, description, address },
      { new: true }
    );

    if (!updatedBusiness) {
      return res.status(404).json({ message: `Business Not Found` });
    }

    return res.status(200).json({ business: updatedBusiness });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong.' });
  }
};

const deleteBusiness = async (req, res) => {
  const { businessId } = req.query;

  try {
    const deletedBusiness = await businessModel.findByIdAndDelete(businessId);
    if (!deletedBusiness) {
      return res.status(404).json({ message: 'Business not found' });
    }
    return res.status(200).json({ message: 'Business Deleted Successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong.' });
  }
};

module.exports = { addBusiness, viewAllBusinesses, updateBusiness, deleteBusiness };