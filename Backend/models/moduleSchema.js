const mongoose = require('mongoose')
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
    specialite:String

})

module.exports=mongoose.model('moduleModel',modulesSchema)