const express = require('express');
const enseignant = require('../models/enseignantSchema');
async function addEnseignant(donnee_enseignant) {
    try {
        const newEnseignant = await enseignant.create(donnee_enseignant);
        return newEnseignant;
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error to be handled by the caller
    }
}


module.exports = {addEnseignant}
