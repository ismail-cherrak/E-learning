const auth = require('../models/AuthenticationSchema');
const jwt = require("jsonwebtoken");
const express = require('express');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const UserModel = require('../models/AuthenticationSchema');
let TheEmail = '';


// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 1200,
  direct: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Create token function
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await auth.login(email, password);

    // Create a token
    const token = createToken(user._id);

    // Determine the user's role
    let role;
    if (user.type === 'Etudiant') {
      role = 'etudiantHome';
    } else if (user.type === 'Prof') {
      role = 'profHome';
    } else if (user.type === 'admin') {
      role = 'adminHome';
    }

    res.status(200).json({ email, token, role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Add a user
const addUser = async (req, res) => {
  const { email, password, type } = req.body;

  try {
    const user = await auth.signup(email, password, type);
    // Create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};

// Controller function for forgot password
const forgetPassword = async (req, res) => {
  const { email } = req.body;
  
  
  try {
    // Check if the email exists in the database
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error('Invalid email');
    }
    TheEmail = await email;

    // Generate a unique 6-digit verification code
    const vCode = Math.floor(100000 + Math.random() * 900000);

    // Save the verification code to the user document (optional)
    user.verificationCode = vCode;
    await user.save();

    // Send the verification code via email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Verification Code',
      html: `<p>You have requested to reset your password. Please use the following verification code to proceed:</p>
      <p>Verification Code: <strong>${vCode}</strong></p>`
    });

    res.status(200).json({ message: 'Verification code sent successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  

};




// Controller function for verifying the 6-digit PIN
const verifyPin = async (req, res) => {

    
    const { pin } = await req.body;
    


      try {
        // Check if the email exists in the database
      const user = await auth.findOne({ email : TheEmail });
      const expectedPin = user.verificationCode;
    
      if (!user) {
        throw new Error('Invalid email');
      }
      
      if ( pin.toString() !== expectedPin.toString()) {
        throw new Error('Invalid PIN');
      }
      console.log(pin.toString() == expectedPin.toString());
        res.status(200).json({ message: 'PIN verified successfully' })
      } catch (error) {
        res.status(400).json({ error: 'Invalid PIN' })
      }
  

};


const resetPassword = async (req, res) => {
  const { password } = req.body;

  try {
    // Find the user by the reset token
    const user = await auth.findOne({ email :TheEmail});

    if (!user) {
      throw new Error('Invalid or expired token');
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    // Update the user's password
    user.password = hash;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error reset password  ' });
  }
};

module.exports = { addUser, loginUser, forgetPassword,verifyPin, resetPassword };
