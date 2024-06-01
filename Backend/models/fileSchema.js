const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['cours', 'td', 'tp', 'mooc'], // Types allowed: cours, td, tp, devoir
        required: true
    },
    title: {
        type: String,
        required: true
    },
    number:{
        type:String
    },
    moocName:{
        type:String
    },
    url: {
        type: String,
        match: /^(ftp|http|https):\/\/[^ "]+$/
    }
});

module.exports = mongoose.model('File', fileSchema);