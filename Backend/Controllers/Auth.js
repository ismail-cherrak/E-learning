const auth = require('../models/AuthenticationSchema');
const jwt = require("jsonwebtoken");
const express = require('express');

//create token 
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
  };

// login user 

const loginUser = async (req, res ) => {
    const {email, password} = req.body;

  try {
    const user = await auth.login(email,password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
};

// add a user
const addUser = async (req, res) => {
    const {email, password,type} = req.body;
  
    try {
      const user = await auth.signup(email,password,type);
      // create a token
    const token = createToken(user._id);

      res.status(200).json({email, token})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  };

  const forgetPassword = (req, res) => {
    const { email } = req.body;

    UserModel.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.send({ status: "User not existed" });
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD
                }
            });

            const resetLink = `http://localhost:3000/reset_password/${user._id}/${token}`;

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: user.email,
                subject: 'Reset Password Link',
                text: resetLink
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    return res.send({ status: "Error sending email" });
                } else {
                    return res.send({ status: "Success" });
                }
            });
        })
        .catch(error => {
            console.error(error);
            res.status(500).send({ status: "Internal Server Error" });
        });
};
module.exports= {addUser , loginUser ,forgetPassword};
