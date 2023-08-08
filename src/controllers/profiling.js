const userModel = require('../models/user');
// const otpModel = require('../models/otp');
const { json } = require("express");
const {generateToken} = require("../utils/tokenMiddleware");
require("dotenv").config();


// Sign Up

const signup = async (req, res) => {
  const { role, firstName, lastName, email, phoneNumber, password } = req.body;

  try {
    let existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: `User Already Exists with this Email` });
    }

    const user = await userModel.create({ role, firstName, lastName, email, phoneNumber, password });

    return res.status(201).json({ user:user, message: `${role} Sign Up Successfully`});

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

// Sign in

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    let existingUser = await userModel.findOne({ email });

    if (existingUser && await existingUser.matchPassword(password)) {

      return res.status(200).json({
        _id: existingUser.id,
        role: existingUser.role,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        email: existingUser.email,
        phoneNumber: existingUser.phoneNumber,
        status:existingUser.status,
        token: generateToken(existingUser),
      });
    } else {
      return res.status(401).json({ message: 'Invalid Credentials' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong.' });
  }
};

// Forget Password

// const emailSend = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const userModelList = [adminModel, marketingAgentModel, businessOwnerModel, customerModel];
//     let data;
//     for (const userModel of userModelList) {
//       data = await userModel.findOne({ email });
//       if (data) break;
//     }

//     if (data) {
//       let otpCode = Math.floor(Math.random() * 10000) + 1;
//       let otpData = new otpModel({
//         email: req.body.email,
//         code: otpCode,
//         expiresIn: new Date().getTime() + 300 * 1000
//       });
//       let otpResponse = await otpData.save();
//       res.status(200).json({ message: 'Please check your Email Inbox.' });
//     } else {
//       res.status(200).json({ message: 'Email Id not exists in Record.' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// const resetPassword = async (req, res) => {
//   let data = await otpModel.find({email:req.body.email,code: req.body.otpCode});
//   const response = {}
//   if(data){
//     let currentTime = new Date().getTime();
//     let diff = data.expiresIn - currentTime;
//     if (diff < 0){
//       res.json({message: "Token Expires!"});
//     }else{
//       let user = await adminModel.findOne({email:req.body.email});
//       user.password = req.body.password;
//       user.save();
//       res.json({message: "Password Changed Successfully !"})
//     }
//   }else{
//     res.json({message: "Invalid OTP Code !"})
//   }
//   res.status(200).json(response);
// };

// const mailer = (email, otpCode) =>{
//   var nodemailer = require('nodemailer');
//   var mailTransporter = nodemailer.createTransport({
//   service: 'gmail',
//   secure: false,
//   auth: {
//     user: process.env.MAIL_USERNAME,
//     pass: process.env.MAIL_PASSWORD,
//   }
// });

// var mailDetails = {
// 	from: 'alamb@gmail.com',
// 	to: 'm.a.butt.2k@gmail.com',
// 	subject: 'OTP Code',
// 	text: 'Confirm OTP Code and reset password.'
// };

// mailTransporter.sendMail(mailDetails, function(err, data) {
// 	if(err) {
// 		console.log('Something went wrong.'+err);
// 	} else {
// 		console.log('Email Sent Successfully');
// 	}
// });
// }

// Change Password

//   const changePassword = async (req, res) => {
//   const { currentPassword, newPassword } = req.body;
//   const userId = req.user.id;

//   try {
//     // Find the user in the database
//     const user = await userModel.findById(userId);

//     // Check if the current password matches
//     const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
//     if (!isCurrentPasswordValid) {
//       return res.status(401).json({ error: 'Current password is incorrect' });
//     }

//     // Update the businessOwner's password
//     businessOwner.password = hashedNewPassword;
//     await businessOwner.save();

//     res.json({ message: 'Password changed successfully', token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while changing the password' });
//   }
// };


module.exports = { signup, signin };