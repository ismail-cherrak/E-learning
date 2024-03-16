const mongoose = require('mongoose')
const Chapter = require('./chapterSchema')
const Ressource = require('./ressourceSchema')
const modulesSchema = new mongoose.Schema({
    nom:{
        type:String,
        required:true
    },
    coef:{
        type:Number,
        required:true
    },
    annee:Number,
    specialite:String,
    program: [{
        type: mongoose.Schema.Types.ObjectId,    // Array of chapters for the program
        ref: 'Chapter',
        required:true
    }],
    ressource: [{
        type: mongoose.Schema.Types.ObjectId,   
        ref: 'Ressource',
        }]

})

module.exports=mongoose.model('moduleModel',modulesSchema)