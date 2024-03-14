const auth = require('../models/AuthenticationSchema');
const jwt = require("jsonwebtoken");
const express = require('express');
const nodemailer = require('nodemailer');
const UserModel = require('../models/AuthenticationSchema');


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




// // Controller function for verifying the 6-digit PIN
// const verifyPin = (req, res) => {
//   const { pin } = req.body;
//   const expectedPin = verificationCode;

//   if (!expectedPin || pin !== expectedPin.toString()) {
//     res.status(400).json({ error: 'Invalid PIN' });
//     console.log(expectedPin);
//     console.log(pin)
//   } else {
//     // Clear the verification code from temporary storage after successful verification
//     res.status(200).json({ message: 'PIN verified successfully' });
//   }
// };


const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    // Find the user by the reset token
    const user = await UserModel.findOne({ resetToken: token });

    if (!user) {
      throw new Error('Invalid or expired token');
    }

    // Update the user's password
    user.password = password;
    user.resetToken = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { addUser, loginUser, forgetPassword, resetPassword };
