const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    nom:{
        type:String,
        required:true
    },
    prenom:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'authentication'
      }
})

const admin = mongoose.model('Admin',adminSchema)
module.exports = admin; 