const FaqModel = require("../../models/faq");
const { json } = require("express");
require("dotenv").config();

const viewAllFAQs = async (req, res) => {
    try {
      const FAQs = await FaqModel.find();
      return res.status(200).json( {FAQs : FAQs} );
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Something went wrong.' });
    }
  };

  module.exports = { viewAllFAQs };