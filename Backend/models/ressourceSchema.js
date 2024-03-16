const mongoose = require('mongoose')

const ressourceSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    url:{
        type:String
    }
})

const Ressource = mongoose.model('Ressource',ressourceSchema)
module.exports = Ressource;