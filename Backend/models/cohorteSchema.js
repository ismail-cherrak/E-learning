const mongoose = require('mongoose')
const enseignant = require('./enseignantSchema')
const module = require('./moduleSchema')
const cohorteSchema = new mongoose.Schema({
    enseignant:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    module:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    url: {
        type: String,
        validate: {
            validator: function(v) {
                return /^https?:\/\/.+/.test(v); // Basic URL format validation
            },
            message: props => "${props.value} is not a valid URL!"
        }
    }
})