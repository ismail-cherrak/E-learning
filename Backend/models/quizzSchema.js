const mongoose = require('mongoose')
const enseignant = require('../models/enseignantSchema')
const Etudiant = require('../models/etudiantSchema')
const quizzschema = new mongoose.Schema({
    titre:{
        type:String,
        required:true
    },
    nbrQst:Number,
    questions:[{
        enonce:String,
        options:[{
            name: String,
            value: Boolean
        }]
    }],
    dateDepot:{
        type: String, 
        required:true
    },
    submittedBy: [{
        etudiant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Etudiant'
        },
        noteEtudiant:{
            type:Number,
        },
        dateSoumission: {
            type: Date,
            default: Date.now() // Date de soumission par défaut à la date actuelle
        }
    }],
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'enseignant'
    },
    visibility: {
        type: Boolean,
        default: true // Default visibility is true
    }

})

const Quizz= mongoose.model('quizz',quizzschema);
module.exports=Quizz;
