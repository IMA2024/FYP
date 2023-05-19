const adminModel = require("../models/admin");
const bcrypt = require("bcrypt");
const { json } = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

        const token = jwt.sign({email : result.email, id : result_id}, process.env.SECRET_KEY);
        res.status(201).json({Admin: result , token: token})

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
        const existingAdmin = await adminModel.findOne({email : email});
        if(!existingAdmin){
            return res.status(404).json({message:"Admin Not Found"})
        }

        const matchPassword = await bcrypt.compare(password,existingAdmin.password);

        if(!matchPassword){
            return res.status(400).json({message:"Invalid Password"});
        }

        const token = jwt.sign({email: existingAdmin.email, id : existingAdmin._id}, process.env.SECRET_KEY);
        res.status(201).json({Admin: existingAdmin, token: token})
    }
        catch (error) {
            console.log(error);
            res.status(500).json({message:"Sonething went wrong."});
        }     
    }

    // const viewAllAdmins = async (req, res) => {
    //     try {
    //       const Admins = await adminModel.find();
    //       res.status(200).json({ Admins });
    //     } catch (error) {
    //       console.log(error);
    //       res.status(500).json({ message: 'Something went wrong.' });
    //     }
    //   };

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


module.exports = {signup , signin, viewSpecificAdmin, updateAdmin, deleteAdmin}