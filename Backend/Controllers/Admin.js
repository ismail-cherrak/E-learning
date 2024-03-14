const express = require('express');
const admin = require('../models/adminSchema');

const addAdmin = async (donnee_admin) => {
    try {
        return await admin.create(donnee_admin);
    } catch (error) {
        throw new Error('Error adding admin: ' + error.message);
    }
};




module.exports = addAdmin;
