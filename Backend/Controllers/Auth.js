const auth = require('../models/AuthenticationSchema')
const express = require('express')
const addUser = async (donnee_user) => {
    try {
        return await auth.create(donnee_user);
    } catch (error) {
        throw new Error('Error adding user: ' + error.message);
    }
};
module.exports=addUser;