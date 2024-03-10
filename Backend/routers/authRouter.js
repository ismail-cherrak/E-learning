const express = require("express");

// controller functions 
const {loginUser ,addUser,forgetPassword} = require("../Controllers/Auth");


const router = express.Router();



// ! login route 

router.post("/login", loginUser);

// ! addUser route 

router.post("/addUser", addUser);

router.post('/forgot-password',forgetPassword);
 

module.exports = router ;
