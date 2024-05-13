const auth = require('../models/AuthenticationSchema');
const jwt = require("jsonwebtoken");
const express = require('express');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const UserModel = require('../models/AuthenticationSchema');
const Enseignant =require('../models/enseignantSchema');
const Etudiant = require('../models/etudiantSchema');
const Admin = require('../models/adminSchema') 


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

    let userId;
   

    // Create a token
    const token = createToken(user._id);

    // Determine the user's role
    let role;
    if (user.type === 'Etudiant') {
      role = 'etudiantHome';
      const etudiant = await Etudiant.findOne({ email: user.email });
      if (etudiant) {
        etudiant.user_id = user._id.toString();
        await etudiant.save();
        userId = etudiant._id.toString();
      }; 

    } else if (user.type === 'Enseignant') {
      role = 'profHome';
      const enseignant = await Enseignant.findOne({ email: user.email });
      if (enseignant) {
        enseignant.user_id = user._id.toString();
        await enseignant.save();
        userId = enseignant._id.toString();
      }

    } else if (user.type === 'admin') {
      role = 'adminHome';
      const admin = await Admin.findOne({ email: user.email });
      if (admin) {
        admin.user_id = user._id.toString();
        await admin.save();
        userId = admin._id.toString();
      }
    }
    if (!userId) {
      throw new Error('User ID not found');
    }

    // Send response with email, token, role, and user ID
    res.status(200).json({ email, token, role ,id:userId});
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
    

    // Generate a unique 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    // Save the verification code to the user document (optional)
    user.verificationCode = verificationCode;
    await user.save();

    // Send the verification code via email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Verification Code',
      html: `<p>You have requested to reset your password. Please use the following verification code to proceed:</p>
      <p>Verification Code: <strong>${verificationCode}</strong></p>`
    });

    res.status(200).json({ message: 'Verification code sent successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};




// Controller function for verifying the 6-digit PIN
const verifyPin = async (req, res) => {

  const {email} = await req.params;  
  const { pin } = await req.body;
  


    try {
      // Check if the email exists in the database
    const user = await auth.findOne({ email : email });
    const expectedPin = user.verificationCode;
  
    if (!user) {
      throw new Error('Invalid email');
    }
    
    if ( pin.toString() !== expectedPin.toString()) {
      throw new Error('Invalid PIN');
    }
    console.log(pin.toString() == expectedPin.toString());
      res.status(200).json({ success: true ,message: 'PIN verified successfully' })
    } catch (error) {
      res.status(400).json({ error: 'Invalid PIN' })
    }


};


const resetPassword = async (req, res) => {
  
const {email} = await req.params;
const { password } = req.body;

try {
  // Find the user by the reset token
  const user = await auth.findOne({ email :email});

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


module.exports = { addUser, loginUser, forgetPassword,verifyPin, resetPassword  };

