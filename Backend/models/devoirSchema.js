const mongoose = require('mongoose');
const DevoirSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dateRemise: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                // Check if the date is in the future
                return value > Date.now();
            },
            message: 'Date de remise doit être dans le futur' // Custom error message
        }
    },
    submittedBy: [{
        etudiant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Etudiant'
        },
        submittedFile: {
            type: String,
            ref: 'File' // Reference to the File model
        },
        dateSoumission: {
            type: Date,
            default: Date.now() // Date de soumission par défaut à la date actuelle
        }
    }],
    visibility: {
        type: Boolean,
        default: true // Default value for visibility is true (public)
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'enseignant'
    },
    module: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module' // Reference to the Module model
    }
});

const Devoir = mongoose.model('Devoir', DevoirSchema);
module.exports = Devoir;
