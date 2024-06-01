const mongoose = require('mongoose')

const forumSchema = new mongoose.Schema({
    context:{
        type:String,
        required:true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'authentication' ,//the sender
        required:true

    },
   
    replies: [{
        type: mongoose.Schema.Types.ObjectId,    // Array of chapters for the program
        ref: 'forum'
        
    }],
    module:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'moduleModel'
    },
    date: {
        type: Date,
        default: Date.now() // Date de soumission par défaut à la date actuelle
    }
})

module.exports=mongoose.model('forum',forumSchema)