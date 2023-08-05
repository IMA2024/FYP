const businessModel = require("../../models/business");
const { json } = require("express");
const jwt = require('jsonwebtoken');
require("dotenv").config();

const addBusiness = async (req, res) => {

  const { photo, type, name, email, address, phoneNumber, description, owner } = req.body;

  try {
    const existingUser = await businessModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "Business Already Exist" })
    }

    const result = await businessModel.create({
      photo: photo,
      type: type,
      name: name,
      email: email,
      address: address,
      phoneNumber: phoneNumber,
      description: description,
      owner: owner
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

const viewAllBusinesses = async (req, res) => {
  try {
    const Businesses = await businessModel.find();
    res.status(200).json(Businesses);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

const updateBusiness = async (req, res) => {
  const { businessId, photo ,type, name, address , phoneNumber, description, owner } = req.body;

  try {
            
    const updatedBusiness = await businessModel.findByIdAndUpdate(businessId,
      { photo, type, name, phoneNumber, description , address, owner  },
      { new: true }
    );

    if (!updatedBusiness) {
      return res.status(404).json({ message: `Business Not Found` });
    }

    return res.status(200).json({ business: updatedBusiness });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong.' });
  }};

const deleteBusiness = async (req, res) => {
    const {businessId} = req.query;

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

module.exports = { addBusiness, viewAllBusinesses, updateBusiness, deleteBusiness };