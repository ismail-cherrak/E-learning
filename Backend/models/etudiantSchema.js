const mongoose = require('mongoose')
const etudiantSchema = new mongoose.Schema({
    nom:{
       type:String,
       required:true 
    },
    prenom:{
        type:String,
        required:true 
     }, 
     email: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    year:{
        type:String,
        required:true 
     }, 
    specialite:{
        type:String,
        required:true 
     },
    groupe:{
        type:String,
        required:true 
     }, 
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'authentication'
      }
});

const etudiant = mongoose.model('Etudiant', etudiantSchema);
module.exports = etudiant;