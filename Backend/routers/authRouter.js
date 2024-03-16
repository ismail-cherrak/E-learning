const express = require("express");

// controller functions 
const {loginUser ,addUser,forgetPassword,verifyPin, resetPassword} = require("../Controllers/Auth");


const router = express.Router();



// ! login route 

router.post("/login", loginUser);

// ! addUser route 

router.post("/addUser", addUser);

router.post('/forgot-password',forgetPassword);

router.post('/verify-pin',verifyPin);

router.post('/reset-password', resetPassword);


 

module.exports = router ;
