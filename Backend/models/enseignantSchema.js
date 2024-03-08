const mongoose = require('mongoose');
const moduleModel = require('../models/moduleSchema')
const enseignantSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    Modules: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'moduleModels'
        },
        estChargeCour: Boolean       
    }]
});
const enseignant = mongoose.model('enseignant', enseignantSchema);
module.exports = enseignant;
