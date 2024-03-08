const mongoose = require('mongoose');
const authentication = require('./AuthenticationSchema')
const messageSchema = mongoose.Schema({
    context:{
        type:String,
        required:true
    },
    authentication:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'authentication' //the sender
    }

})

module.exports = mongoose.model('message',messageSchema)