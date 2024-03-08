const mongoose = require('mongoose')
const quizzschema = new mongoose.Schema({
    titre:{
        type:string,
        required:true
    },
    nbrQst:Number,
    questions:[{
        enonce:string,
        options:[String],
        correctAnswer:String
    }]
})

module.exports = mongoose.model('quizz',quizzSchema);