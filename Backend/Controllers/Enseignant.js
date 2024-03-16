const express = require('express');
const enseignant = require('../models/enseignantSchema');
const mongoose = require('mongoose');

async function addEnseignant(donnee_enseignant) {
    try {
        const user_id = req.user._id
        const newEnseignant = await enseignant.create({donnee_enseignant, user_id});
        return newEnseignant;
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error to be handled by the caller
    }
}


module.exports = {addEnseignant}
