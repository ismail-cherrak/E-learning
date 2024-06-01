const mongoose = require('mongoose')
const File = require('./fileSchema')

// Define the card schema
const cardSchema = new mongoose.Schema({
    files: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'File'
        }],
    },
    visibility: {
        type: Boolean,
        default: true // Default visibility is true
    }
});

// Custom validator to ensure no more than 3 files in a card
function filesLimit(val) {
    return val.length <= 3;
}

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
