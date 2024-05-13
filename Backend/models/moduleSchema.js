const mongoose = require('mongoose')
const Chapter = require('./chapterSchema')
const Ressource = require('./ressourceSchema')
const quizz = require('./quizzSchema')
const modulesSchema = new mongoose.Schema({
    nom:{
        type:String,
        required:true
    },
    coef:{
        type:Number,
        required:true
    },
    annee:{
        type : Number,
        required:true
    },
    specialite:{
        type : String,
        required:true
    },
    icon:{
        type : String,
        required:true
    },
    program: [{
        type: mongoose.Schema.Types.ObjectId,    // Array of chapters for the program
        ref: 'Chapter',
        required:true
    }],
    ressource: [{
        type: mongoose.Schema.Types.ObjectId,   
        ref: 'Ressource',

        }],
    quizzes: [{
        type: mongoose.Schema.Types.ObjectId,   
        ref: 'quizz'
        }]    


})

module.exports=mongoose.model('moduleModel',modulesSchema)