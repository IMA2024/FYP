const userModel = require("../../models/user");
const { json } = require("express");
require("dotenv").config();
const {generateToken} = require('../../utils/tokenMiddleware');
 

// Add User

    const addUser = async (req,res) =>{

        const {role, firstName, lastName, email, phoneNumber, address, password} = req.body;
      
        try {
          let existingUser = await userModel.findOne({ email });
      
          if (existingUser) {
            return res.status(400).json({ message: `User Already Exists with this Email` });
          }
      
          const user = await userModel.create({ role, firstName, lastName, email, phoneNumber, address, password });
      
          res.status(201).json({ user : user , message: `${role} Added Successfully`
          });
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: 'Something went wrong.' });
        }
      };

// View All Users

    const viewAllUsers = async (req, res) => {
        try {
          const users = await userModel.find();
          return res.status(200).json( {users : users} );
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: 'Something went wrong.' });
        }
      };

      // Update Profile
      
          const updateUser = async (req, res) => {
          const { userId, photo, role ,firstName, lastName, password, phoneNumber, address } = req.body;
          
          try {
            
            const updatedUser = await userModel.findByIdAndUpdate(userId,
              { photo, firstName, lastName, password, phoneNumber, address },
              { new: true }
            );
        
            if (!updatedUser) {
              return res.status(404).json({ message: `${role} Not Found` });
            }
        
            return res.status(200).json({ user: updatedUser });
          } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Something went wrong.' });
          }
        };


 // Delete User Profile 

      const deleteUser = async (req, res) => {
        const {userId} = req.query;
        try {
          const deletedUser = await userModel.findByIdAndDelete(userId);
        
          if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          return res.status(200).json({ message: 'User Deleted Successfully' });
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: 'Something went wrong.' });
        }
      };
        
module.exports = {addUser, viewAllUsers, updateUser ,deleteUser}