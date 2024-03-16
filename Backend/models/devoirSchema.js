const mongoose = require('mongoose')
const File = require('./fileSchema')
const devoirSchema = mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String,
    },
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the student who submitted the homework
        ref: 'Student' // Reference to the Student model
    },
    submittedFiles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }]
})
const Devoir = mongoose.model('Devoir',devoirSchema)
module.exports = Devoir;