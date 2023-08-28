const FaqModel = require("../../models/faq");
const { json } = require("express");
require("dotenv").config();
 

// Add FAQ

    const addFAQ = async (req,res) =>{

        const { question , answer} = req.body;
      
        try {
          const faq = await FaqModel.create({ question , answer });
      
          return res.status(201).json({ faq : faq , message: `FAQ Added Successfully`
          });
        } catch (error) {
          return res.status(500).json({ message: 'Something went wrong.' });
        }
      };

// View All Users

    const viewAllFAQs = async (req, res) => {
        try {
          const FAQs = await FaqModel.find();
          return res.status(200).json( {FAQs : FAQs} );
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: 'Something went wrong.' });
        }
      };

      // Update Profile
      
          const updateFAQ = async (req, res) => {
          const { FaqId , question , answer } = req.body;
          
          try {
            
            const updatedFAQ = await FaqModel.findByIdAndUpdate(FaqId,
              { question , answer  },
              { new: true }
            );
        
            if (!updatedFAQ) {
              return res.status(404).json({ message: `FAQ Not Found` });
            }
        
            return res.status(200).json({ message: `FAQ Updated Successfully` });
          } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Something went wrong.' });
          }
        };


 // Delete User Profile 

      const deleteFAQ = async (req, res) => {
        const {FaqId} = req.query;
        try {
          const deletedFAQ = await FaqModel.findByIdAndDelete(FaqId);
        
          if (!deletedFAQ) {
            return res.status(404).json({ message: 'FAQ not found' });
          }
      
          return res.status(200).json({ message: 'FAQ Deleted Successfully' });
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: 'Something went wrong.' });
        }
      };
        
module.exports = { addFAQ , viewAllFAQs , updateFAQ , deleteFAQ }