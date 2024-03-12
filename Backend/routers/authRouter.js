const express = require("express");

// controller functions 
const {loginUser ,addUser,forgetPassword, resetPassword} = require("../Controllers/Auth");


const router = express.Router();



// ! login route 

router.post("/login", loginUser);

// ! addUser route 

router.post("/addUser", addUser);

router.post('/forgot-password',forgetPassword);

router.post('/reset-password', resetPassword)
 

module.exports = router ;
