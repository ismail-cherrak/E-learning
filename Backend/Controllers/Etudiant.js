const express = require('express');
const etudiant = require('../models/etudiantSchema');
const addEtudiant = async (donnee_etudiant) => {
    try {
        return await etudiant.create(donnee_etudiant);
    } catch (error) {
        throw new Error('Error adding etudiant: ' + error.message);
    }
};
    module.exports = addEtudiant;
