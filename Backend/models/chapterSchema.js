const mongoose = require('mongoose');
const Card = require('./cardSchema')
const chapterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    cards: [{
        type: mongoose.Schema.Types.ObjectId,    // Array of cards for each chapter
        ref: 'Card'
    }]
});

const Chapter = mongoose.model('Chapter',chapterSchema)
module.exports = Chapter