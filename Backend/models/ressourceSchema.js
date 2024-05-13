const mongoose = require('mongoose');

const ressourceSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['file', 'url'], // Enumerated values for resource type
        required: true
    },
    file: {
        type: String, // Store file information (e.g., file name) if type is 'file'
        required: function() {
            return this.type === 'file'; // File is required only if type is 'file'
        }
    },
    url: {
        type: String, // Store URL if type is 'url'
        required: function() {
            return this.type === 'url'; // URL is required only if type is 'url'
        }
    }
});

const Ressource = mongoose.model('Ressource', ressourceSchema);
module.exports = Ressource;
